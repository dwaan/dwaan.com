<!doctype html>
<html class="no-js" lang="en">

<head>
	<?php
		$title = "Hello, This Menu Page Fallback - P.S. You're in dwaan.com";
		include_once "part_metacss.php";
	?>
</head>

<body data-barba="wrapper">
	<?php include_once "part_head.php" ?>

	<main data-barba="container" data-barba-namespace="menu" class="menu-page">
		<nav class="middle">
			<ul class="bland zero">
				<li><a href="./">Home</a></li>
				<li class="hr"><a href="./me">About Me</a></li>
				<li><a href="./say-hi">Say, Hi!</a></li>
				<li><p>Thank you for visiting my website. For my appreciation for you, I decide not to use cookies nor local storage for tracking. Feel free to browse around my website and leave message in <a href="./say-hi">contact page</a> if you feel like</p></li>
			</ul>
		</nav>
	</main>

<?php include_once "part_script.php"; ?>
</body>
</html>