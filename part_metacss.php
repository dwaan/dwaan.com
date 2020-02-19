	<script type="text/javascript">
		// See if it's in dark mode
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.querySelector("html").setAttribute('class', "dark");
		}
	</script>

	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<title><?php echo $title; ?> - This is me @dwaan .com</title>
	<meta name="description" content="<?php echo $title; ?> - This is me @dwaan .com">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link rel="manifest" href="site.webmanifest">
	<link rel="apple-touch-icon" href="icon.png">

	<link rel="stylesheet" href="/dwaan/css/normalize.css?<?php echo filemtime('css/normalize.css') ?>">
	<link rel="stylesheet" href="/dwaan/css/main.css?<?php echo filemtime('css/main.css') ?>">

	<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>