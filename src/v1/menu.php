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

	<div id="barba-wrapper">
		<div class="barba-container" data-barba="container" data-barba-namespace="menu">
			<main class="block__clear">
				<div class="menu__item menu__page">
					<div class="border"><div></div></div>
					<div class="menu__pos">
						<ul class="plain">
							<li class="close"><span>close <i class="icn icn_close"></i></span></li>
							<li><a href="https://dwaan.com">new</a></li>
							<li><hr /></li>
							<li><a href="/">home</a></li>
							<li><a href="/me">me</a></li>
							<li><a href="/work">work</a></li>
							<li><hr /></li>
							<li><a href="/say-hi">say, hi!</a></li>
							<li><p>As you can see, I didn’t use cookies or local storage in my website, I don’t need to know where did you coming from, what pages that you read, or anything about you.</p></li>
						</ul>
					</div>
				</div>
			</main>
		</div>
	</div>

<?php include_once "part_script.php"; ?>
</body>
</html>