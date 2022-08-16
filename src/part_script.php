<?php
// check for the server side x-barba request header
if (!isset($_SERVER['HTTP_X_BARBA'])) {
?>
	<div id="back"></div>

	<div id="support" class="support"></div>
	<script>
		document.getElementById("support").innerHTML = "\
			<div class=\"content\">\
				<h2>😭</h2>\
				<h3>Please don't squeeze me 😱.</h3>\
				<p>I think your screen is just to small for me to support it.</p>\
				<p>Please rotate your 📱 screen or resize your 💻 browser for better looking layout.</p>\
			</div>\
		";
	</script>

	<script type="text/javascript" src="/dwaan/js/bundle.js?<?php echo filemtime('js/bundle.js') ?>" async></script>
	<style type="text/css">
		.no-js #loader,
		.no-js #mode {
			display: none;
		}

		.no-js main,
		.no-js header,
		.no-js .footer {
			opacity: 1;
		}
	</style>

	<link rel="stylesheet" media="print" href="/dwaan/css/print.css?<?php echo filemtime('css/print.css') ?>" defer async>
<?php
}
?>