// Inactive plurker object
class inactive {
	constructor(statistics) {
		this.statistics = statistics
		this.year = statistics.year
	}

	draw(data) {
		this.statistics.draw('inactive', this.year + " &#8617;", 'I\'ve been inactive since ' + year + ' <img src="https://s.plurk.com/emoticons/platinum/318416eab5a856bddb1e106a21ff557a.gif" />');
		this.statistics.drawPost('postcontent span2 inactivemore', data.plurk_id, '<i>My last Plurk</i> ' + datediff(data.posted), data.content, data.response_count);
	}

	empty() {
		this.statistics.draw('inactive', '-', 'I didn\'t post anything at this year <img src="https://s.plurk.com/emoticons/platinum/318416eab5a856bddb1e106a21ff557a.gif" />');
	}
}

export default inactive