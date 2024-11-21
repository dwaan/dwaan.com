import markdownIt from "markdown-it"
import markdownItAnchor from "markdown-it-anchor"
import eleventyPluginFilesMinifier from "@sherby/eleventy-plugin-files-minifier"
import { EleventyI18nPlugin } from "@11ty/eleventy"

export default eleventyConfig => {
	//
	// ! Plugins
	//

	eleventyConfig.addPlugin(eleventyPluginFilesMinifier)

	eleventyConfig.addPlugin(EleventyI18nPlugin, {
		defaultLanguage: "en"
	})

	eleventyConfig.setServerOptions({
		watch: ["sites/js/*"]
	})


	//
	// ! Markdown Overrides
	//

	let markdownLibrary = markdownIt({
		html: true,
		breaks: true,
		linkify: true
	}).use(markdownItAnchor, {
		permalink: false
	})
	eleventyConfig.setLibrary("md", markdownLibrary)


	//
	// ! Default run
	//
	return {
		dir: {
			input: "src/v2",
			output: "v2/",
			includes: "_includes",
			layouts: "_layouts",
			shortcode: "_shortcode"
		},
		passthroughFileCopy: true
	}
}