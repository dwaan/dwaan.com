	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link rel="stylesheet" media="screen" href="/dwaan/css/bundle.css?<?php echo filemtime('css/bundle.css') ?>">
	<link rel="stylesheet" media="screen and (min-aspect-ratio: 1/1)" href="/dwaan/css/horizontal-screen.css?<?php echo filemtime('css/horizontal-screen.css') ?>">
	<link rel="stylesheet" media="screen and (max-aspect-ratio: 1/1)" href="/dwaan/css/vertical-screen.css?<?php echo filemtime('css/vertical-screen.css') ?>">

	<script type="text/javascript">
		var classcollection = "no-js";
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
		h.setAttribute('class', classcollection);
	</script>

	<?php
		$protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']),'https') === FALSE ? 'http' : 'https';

		$host = $_SERVER['HTTP_HOST'];
		$uri = $_SERVER['REQUEST_URI'];
		$params = @$_SERVER['QUERY_STRING'];

		if ($params == "") $url = $protocol . '://' . $host . $uri;
		else $url = $protocol . '://' . $host . $uri . '?' . $params;
	?>

	<link rel="apple-touch-icon" sizes="57x57" href="/dwaan/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="/dwaan/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="/dwaan/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="/dwaan/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="/dwaan/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="/dwaan/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="/dwaan/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="/dwaan/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="/dwaan/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"  href="/dwaan/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/dwaan/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="/dwaan/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/dwaan/favicon-16x16.png">
	<link rel="manifest" href="/dwaan/manifest.json">
	<meta name="msapplication-TileColor" content="#A4CDD6">
	<meta name="msapplication-TileImage" content="/dwaan/ms-icon-144x144.png">
	<meta name="theme-color" content="#A4CDD6">

	<!-- Primary Meta Tags -->
	<title><?php echo $title; ?> - Dwan</title>
	<meta name="title" content="<?php echo $title; ?> - Dwan">
	<meta name="description" content="Hello! my name is dwan and I do stuff like concept-ing, designing, producing and also delivering UI and UX.">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="<?php echo $url; ?>">
	<meta property="og:title" content="<?php echo $title; ?> - Dwan">
	<meta property="og:description" content="Hello! My name is dwan and I do stuff like concept-ing, designing, producing and also delivering UI and UX.">
	<meta property="og:image" content="https://dwaan.com/dwaan/meta1200×628.jpg">

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image">
	<meta property="twitter:url" content="<?php echo $url; ?>">
	<meta property="twitter:title" content="<?php echo $title; ?> - Dwan">
	<meta property="twitter:description" content="Hello! My name is dwan and I do stuff like concept-ing, designing, producing and also delivering UI and UX.">
	<meta property="twitter:image" content="https://dwaan.com/dwaan/meta1200×628.jpg">