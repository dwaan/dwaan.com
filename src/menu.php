<!doctype html>
<html class="no-js" lang="en">

<head>
	<?php
	$title = "Menu";
	$description = "This is a menu page fallback for browser without javascript enable";
	include_once "part_metacss.php";
	?>
</head>

<body data-barba="wrapper">
	<?php include_once "part_head.php" ?>

	<main data-barba="container" data-barba-namespace="menu" class="menu-page">
		<div class="middle">
			<nav class="menu">
				<div class="items">
					<?php include "part_menu.php"; ?>
				</div>
			</nav>
		</div>
	</main>

    <?php include_once "part_footer.php"; ?>
</body>

<?php include_once "part_script.php"; ?>

</html>