<!doctype html>
<html class="no-js" lang="en">

<head>
	<?php
		$title = "How to call me?";
		include_once "part_metacss.php";
	?>
</head>

<body data-barba="wrapper">
	<?php include_once "part_head.php" ?>

	<main data-barba="container" data-barba-namespace="hi" class="hi">
		<section class="middle">
			<div class="main-text">
				<h1><span class="email">me</span><span class="social">@dwaan</span><span class="website">.com</span></h1>
			</div>
		</section>

		<section class="flares">
			<?php
				for ($j = 1; $j <= 3; $j++) {
					for ($i = 1; $i <= 5; $i++) {
						if($i % 5 == 0) $class = "green";
						else if($i % 4 == 0) $class = "yellow";
						else if($i % 3 == 0) $class = "purple";
						else if($i % 2 == 0) $class = "red";
						else $class = "blue";
						echo '<img src="img/flares/flare' . $i. '.png" width="" height="" alt="" class="flare' . $j . ' ' . $class . '" />';
					}
				}
			?>
		</section>
	</main>
	<?php include_once "part_script.php"; ?>
</body>
</html>