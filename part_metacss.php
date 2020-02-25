
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<script type="text/javascript">/* See if it's in dark mode */if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)document.querySelector("html").setAttribute('class','dark');</script>

	<?php
		$protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']),'https') === FALSE ? 'http' : 'https';

		$host = $_SERVER['HTTP_HOST'];
		$uri = $_SERVER['REQUEST_URI'];
		$params= $_SERVER['QUERY_STRING'];

		if ($params == "") $url = $protocol . '://' . $host . $uri;
		else $url = $protocol . '://' . $host . $uri . '?' . $params;
	?>

	<link rel="manifest" href="site.webmanifest">
	<link rel="apple-touch-icon" href="icon.png">

	<!-- Primary Meta Tags -->
	<title><?php echo $title; ?> - This is me @dwaan .com</title>
	<meta name="title" content="<?php echo $title; ?> - This is me @dwaan .com">
	<meta name="description" content="Hello! my Mame is dwan and I do stuff like concept-ing, designing, producing and also delivering UI and UX.">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="<?php echo $url; ?>">
	<meta property="og:title" content="<?php echo $title; ?> - This is me @dwaan .com">
	<meta property="og:description" content="Hello! My name is dwan and I do stuff like concept-ing, designing, producing and also delivering UI and UX.">
	<meta property="og:image" content="https://dwaan.com/dwaan/meta1200×628.jpg">

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image">
	<meta property="twitter:url" content="<?php echo $url; ?>">
	<meta property="twitter:title" content="<?php echo $title; ?> - This is me @dwaan .com">
	<meta property="twitter:description" content="Hello! My name is dwan and I do stuff like concept-ing, designing, producing and also delivering UI and UX.">
	<meta property="twitter:image" content="https://dwaan.com/dwaan/meta1200×628.jpg">

	<link rel="stylesheet" href="/dwaan/css/bundle.css?<?php echo filemtime('css/bundle.css') ?>">

