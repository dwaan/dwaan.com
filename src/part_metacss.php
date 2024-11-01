<?php if ($title != "Dwan 😙") $title .= " - Dwan 😙"; ?>
<?php if (!isset($sharepic)) $sharepic = "https://dwaan.com/sharepic.jpg"; ?>
<?php if (!isset($notfound)) $notfound = false; ?>
<?php if (!isset($replurk)) $replurk = false; ?>

<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<!-- Primary Meta Tags -->
<title><?php echo $title; ?></title>
<meta name="title" content="<?php echo $title; ?>">
<meta name="description" content="<?php echo $description; ?>">

<?php
// check for the server side x-barba request header
if (!isset($_SERVER['HTTP_X_BARBA'])) {
?>
	<link rel="stylesheet" media="screen" href="/css/bundle.css?<?php echo filemtime('v2/css/bundle.css') ?>">
	<link rel="stylesheet" media="screen and (min-aspect-ratio: 1/1)" href="/css/horizontal-screen.css?<?php echo filemtime('v2/css/horizontal-screen.css') ?>">
	<link rel="stylesheet" media="screen and (max-aspect-ratio: 1/1)" href="/css/vertical-screen.css?<?php echo filemtime('v2/css/vertical-screen.css') ?>">

	<?php if ($notfound) { ?>
		<link rel="stylesheet" media="screen" href="/css/404.css?<?php echo filemtime('v2/css/404.css') ?>">
	<?php } ?>
	<?php if (isset($_GET["year"])) { ?>
		<link rel="stylesheet" media="screen" href="/css/plurk.css?<?php echo filemtime('v2/css/plurk.css') ?>">
	<?php } ?>

	<link rel="stylesheet" media="print" href="/css/print.css?<?php echo filemtime('v2/css/print.css') ?>">

	<script>
		var classcollection = "no-js";
		/* See if it's in dark mode */
		h = document.querySelector("html");
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) classcollection = "dark";

		// Displaying rounded corner only on fullscreen
		if (window.innerWidth == screen.width && window.innerHeight == screen.height) classcollection += " rounded";

		// Set the class
		h.setAttribute('class', classcollection);
	</script>
	<script src="/js/bundle.js?<?php echo filemtime('v2/js/bundle.js') ?>" async></script>

	<style>
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

	<?php
	$protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']), 'https') === FALSE ? 'http' : 'https';

	$host = $_SERVER['HTTP_HOST'];
	$uri = $_SERVER['REQUEST_URI'];
	$params = @$_SERVER['QUERY_STRING'];

	if ($params == "") $url = $protocol . '://' . $host . $uri;
	else $url = $protocol . '://' . $host . $uri . '?' . $params;
	?>

	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/site.webmanifest">
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000">

	<meta name="msapplication-TileColor" content="#ffc40d">
	<meta name="msapplication-TileImage" content="/mstile-144x144.png">
	<meta name="theme-color" content="#ffffff">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="<?php echo $url; ?>">
	<meta property="og:title" content="<?php echo $title; ?>">
	<meta property="og:description" content="<?php echo $description; ?>">
	<meta property="og:image" content="<?php echo $sharepic; ?>">

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="<?php echo $url; ?>">
	<meta name="twitter:creator" content="@dwaan">
	<meta name="twitter:title" content="<?php echo $title; ?>">
	<meta name="twitter:description" content="<?php echo $description; ?>">
	<meta name="twitter:image" content="<?php echo $sharepic; ?>">
<?php } ?>