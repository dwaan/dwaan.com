<!doctype html>
<html class="no-js" lang="en">

<head>
	<?php
		$title = "Hello, my name is Dwan";
		include_once "part_metacss.php";
	?>
</head>

<body data-barba="wrapper">
	<?php include_once "part_head.php" ?>

	<main data-barba="container" data-barba-namespace="home">
		<section class="middle">
			<div class="main-text">
				<h1>Hello, my name is <a href="#dwan">Dwan</a></h1>
			</div>
			<div class="arrow">
				<span>case studies</span>
			</div>
		</section>

		<section class="middle">
			<div class="padding">
				<a href="./suzuki-website-redesign-pitching">
					<img src="img/logo-suzuki.svg" width="147" height="180" class="logo" alt="Logo Suzuki" />
				</a>
			</div>
			<div class="arrow-small">
				<a href="./suzuki-website-redesign-pitching" class="arrow">
					<span>Project Pitching</span>
				</a>
			</div>
		</section>

		<section class="middle">
			<div class="padding">
				<a href="./melon-tiket-apa-saja">
					<img src="img/logo-tiketapasaja.svg" width="489" height="59" class="logo" alt="Logo Tike Apa Saja" />
				</a>
			</div>
			<div class="arrow-small">
				<a href="./melon-tiket-apa-saja" class="arrow">
					<span>Project Pitching</span>
				</a>
			</div>
		</section>

		<section class="footer">
			<a class="email">me@dwaan.com</a>
			<div class="location">
				<span>Jakarta</span>
				<img src="img/icon-airplane.svg" width="16" height="16" alt="Airplane" />
				<span>Tel Aviv-Yafo</span>
			</div>
			<div></div>
		</section>

		<section class="flares">
			<img src="img/flares/flare1.png" width="" height="" alt="Flare" class="flare1" />
			<img src="img/flares/flare2.png" width="" height="" alt="Flare" class="flare2" />
			<img src="img/flares/flare3.png" width="" height="" alt="Flare" class="flare3" />
			<img src="img/flares/flare4.png" width="" height="" alt="Flare" class="flare4" />
			<img src="img/flares/flare5.png" width="" height="" alt="Flare" class="flare5" />
		</section>
	</main>

	<?php include_once "part_script.php"; ?>
</body>
</html>