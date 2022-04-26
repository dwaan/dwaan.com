<meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"><!-- Primary Meta Tags --><title><?php echo $title; if($title != "Dwan") echo " - Dwan"; ?></title><meta name="title" content="<?php echo $title; if($title != "Dwan") echo " - Dwan"; ?>"><meta name="description" content="<?php echo $description; ?>"> <?php
	// check for the server side x-barba request header
	if(!isset($_SERVER['HTTP_X_BARBA'])) {
?> <link rel="stylesheet" media="all" href="/dwaan/css/bundle.css?<?php echo filemtime('css/bundle.css') ?>"><link rel="stylesheet" media="screen and (min-aspect-ratio: 1/1)" href="/dwaan/css/horizontal-screen.css?<?php echo filemtime('css/horizontal-screen.css') ?>"><link rel="stylesheet" media="screen and (max-aspect-ratio: 1/1)" href="/dwaan/css/vertical-screen.css?<?php echo filemtime('css/vertical-screen.css') ?>"><script type="text/javascript">var classcollection = "no-js";
		/* See if it's in dark mode */
		h = document.querySelector("html");
		if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
			classcollection = "dark";
		}
		// Displaying rounded corner only on fullscreen
		if (window.innerWidth == screen.width && window.innerHeight == screen.height) {
			classcollection += " rounded"
		}
		// Set the class
		h.setAttribute('class', classcollection);</script> <?php
		$protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']),'https') === FALSE ? 'http' : 'https';

		$host = $_SERVER['HTTP_HOST'];
		$uri = $_SERVER['REQUEST_URI'];
		$params = @$_SERVER['QUERY_STRING'];

		if ($params == "") $url = $protocol . '://' . $host . $uri;
		else $url = $protocol . '://' . $host . $uri . '?' . $params;
	?> <link rel="apple-touch-icon" sizes="180x180" href="/dwaan/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="/dwaan/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/dwaan/favicon-16x16.png"><link rel="manifest" href="/dwaan/site.webmanifest"><link rel="mask-icon" href="/dwaan/safari-pinned-tab.svg" color="#000000"><meta name="msapplication-TileColor" content="#ffc40d"><meta name="msapplication-TileImage" content="/dwaan/mstile-144x144.png"><meta name="theme-color" content="#ffffff"><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url" content="<?php echo $url; ?>"><meta property="og:title" content="<?php echo $title; if($title != "Dwan") echo " - Dwan"; ?>"><meta property="og:description" content="<?php echo $description; ?>"><meta property="og:image" content="https://dwaan.com/dwaan/meta1200×628.jpg"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url" content="<?php echo $url; ?>"><meta property="twitter:title" content="<?php echo $title; if($title != "Dwan") echo " - Dwan"; ?>"><meta property="twitter:description" content="<?php echo $description; ?>"><meta property="twitter:image" content="https://dwaan.com/dwaan/meta1200×628.jpg"> <?php
	}
?>