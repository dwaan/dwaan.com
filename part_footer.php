<?php
// check for the server side x-barba request header
if (!isset($_SERVER['HTTP_X_BARBA'])) {
?> <div id="back"></div><div id="support" class="support"></div><script>document.getElementById("support").innerHTML = "\
			<div class=\"content\">\
				<h2>😭</h2>\
				<h3>Please don't squeeze me 😱.</h3>\
				<p>I think your screen is just to small for me to support it.</p>\
				<p>Please rotate your 📱 screen or resize your 💻 browser for better looking layout.</p>\
			</div>\
		";</script> <?php
}
?>