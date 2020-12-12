<!doctype html>
<html class="no-js" lang="en">

<head>
	<?php
		$title = "Hello!";
		include_once "part_metacss.php";
	?>
</head>

<body data-barba="wrapper">
	<?php include_once "part_head.php" ?>

	<main data-barba="container" data-barba-namespace="home" class="home">
		<section class="middle full">
			<div class="main-text">
				<h1>Hello, my name is <a href="./me" arial-title="About Dwan">Dwan</a></h1>
			</div>
			<div class="arrow-big">
				<a href="#casestudy" title="Scroll Down" class="arrow scrollto">
					<span>case studies</span>
				</a>
			</div>
		</section>

		<section id="casestudy" class="middle full">
			<div class="padding">
				<a href="./replurk2020" class="plurktitle">Replurk 2020</a>
			</div>
			<div class="arrow-small">
				<a href="./replurk2020" class="arrow">
					<span>Weekend Project</span>
				</a>
			</div>
		</section>

		<section class="middle full">
			<div class="padding">
				<a href="./suzuki-website-redesign-pitching" aria-label="Suzuki Website Redesign">
					<img src="/dwaan/img/logo-suzuki.svg" width="147" height="180" class="logo" alt="Logo Suzuki" />
				</a>
			</div>
			<div class="arrow-small">
				<a href="./suzuki-website-redesign-pitching" aria-label="Suzuki Website Redesign" class="arrow">
					<span>Concept Pitching</span>
				</a>
			</div>
		</section>

		<section class="middle full">
			<div class="padding">
				<a href="./melon-tiket-apa-saja" aria-label="Melon - Tiket Apa Saja Website Redesign">
					<img src="/dwaan/img/logo-tiketapasaja.svg" width="489" height="59" class="tas logo" alt="Logo Tike Apa Saja" />
				</a>
			</div>
			<div class="arrow-small">
				<a href="./melon-tiket-apa-saja" class="arrow">
					<span>Design Solutions</span>
				</a>
			</div>
		</section>

		<section class="middle full">
			<div class="padding">
				<a href="http://v1.dwaan.com" class="dwantitle" data-barba-prevent>dwaan <br /> <small>v1</small></a>
			</div>
			<div class="arrow-small">
				<a href="http://v1.dwaan.com" class="arrow" data-barba-prevent>
					<span>Previous version</span>
				</a>
			</div>
		</section>

		<section class="footer">
			<a href="./say-hi" class="email" title="me@dwaan.com" aria-label="me@dwaan.com">me@dwaan.com</a>
			<div class="location">
				<span>Jakarta</span>
				<svg id="airplane" width="16" height="16" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
					<path d="M4.79998 1.59998L6.25415 6.93331H2.88019L1.59998 4.79998H1.06665V7.46664V9.06664V11.2H1.59998L2.88019 9.06664H6.25415L4.79998 14.4H5.86665L9.74582 9.06664H13.8666C14.456 9.06664 14.9333 8.58931 14.9333 7.99998C14.9333 7.41064 14.456 6.93331 13.8666 6.93331H9.74582L5.86665 1.59998H4.79998Z"/>
				</svg>
				<span>Tel Aviv-Yafo</span>
			</div>
			<div></div>
		</section>

		<section class="flares side">
			<?php
				for ($img = $i = 1; $i <= 7; $i++) {
					echo '<img src="/dwaan/img/flares/flare' . $img. '.png" width="" height="" alt="" class="flare' . $i . '" />';
					if(++$img > 5) $img = 1;
				}
			?>
		</section>
	</main>

	<?php include_once "part_script.php"; ?>
</body>
</html>