<?php
	// check for the server side x-barba request header
	if(!isset($_SERVER['HTTP_X_BARBA'])) {
?>
	<div id="back"></div>

	<div class="support">
		<div class="content">
			<h1>😭</h1>
			<h2>Please don't squaze me 😱.</h2>
			<p>I think your screen is just to small for me to support it.</p>
			<p>Please rotate your 📱 screen or resize your 💻 browser for better looking layout.</p>
		</div>
	</div>

	<script type="text/javascript" src="/dwaan/js/main.js?<?php echo filemtime('js/main.js') ?>"></script>
	<style type="text/css">.no-js #loader, .no-js #mode { display: none; } .no-js main, .no-js header, .no-js .footer { opacity: 1; }</style>
<?php
	}
?>
