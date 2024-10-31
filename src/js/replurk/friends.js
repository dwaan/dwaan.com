"use strict"

import api from "./api.js"

/*
	Friends object spesification:

	1. data: contains all the friends collection data
	2. add(data): add friend to friends collection data
	3. find(user_id): return friend data based on their id
	4. findByUsername(nick_name): return friend data based on their nick name
	5. getAvatar(user_id): return avatar url based on their id for from friends collection data
	6. getAvatarByUsername(user_id): return avatar url based on their nick name for from friends collection data
*/

class friends {
	constructor() {
		this.data = {}
		this.unavailable = []
	}

	/**
	 * Add JSON object as a friends data
	 *
	 * ```js
	 * friends.add({});
	 * ```
	 *
	 * @param {new_friends}: New friends JSON from /APP/Profile/getPublicProfile
	 * @memberof friends
	 * @link https://www.plurk.com/API/2/
	 */
	add(new_friends) {
		Object.assign(this.data, new_friends)
	}

	async find(user_id) {
		if (this.unavailable.findIndex(el => el == user_id) >= 0) return false

		if (this.data && this.data[user_id]) {
			return this.data[user_id]
		} else {
			var result = await api.call("?fetch=APP&url=/Profile/getPublicProfile&user_id=" + user_id)

			if (result.success) {
				var temp = {}
				temp[result.message.user_info.id] = result.message.user_info
				this.add(temp)
				return result.message.user_info
			} else {
				this.unavailable.push(user_id)
				return false
			}
		}
	}

	async findByUsername(nick_name) {
		var user_id = false

		if (this.unavailable.findIndex(el => el == nick_name) >= 0) return false

		for (var index in this.data) {
			if (this.data[index].nick_name.toLowerCase() == nick_name.toLowerCase()) {
				user_id = index
				break
			}
		}

		if (user_id) {
			return this.data[user_id]
		} else {
			var result = await api.call("?fetch=APP&url=/Profile/getPublicProfile&nick_name=" + nick_name)

			if (result.success) {
				var temp = {}
				temp[result.message.user_info.id] = result.message.user_info
				this.add(temp)
				return result.message.user_info
			} else {
				this.unavailable.push(nick_name)
				return false
			}
		}
	}

	getAvatar(user_id) {
		if (user_id && this.data && this.data[user_id]) {
			if (this.data[user_id].has_profile_image) {
				var avatar = ""
				if (this.data[user_id].avatar) avatar = this.data[user_id].avatar
				return 'https://avatars.plurk.com/' + user_id + '-big' + avatar + '.jpg'
			}
		}
		return 'https://plurk.com/static/default_big.jpg'
	}

	getAvatarByUsername(user_name) {
		var user_id = false

		if (user_name) {
			for (var index in this.data) {
				if (this.data[index].nick_name.toLowerCase() == user_name.toLowerCase()) {
					user_id = index
					break
				}
			}
		}

		return this.getAvatar(user_id)
	}
}

export default friends