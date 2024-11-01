<!doctype html><html class="no-js" lang="en"><head> <?php
	$now = (int)$_GET["year"];
	$current = date("Y");
	if($now == 0 || $now <= 2000 || $current >= $current) $now = $current;
	$short = $now - 2000;

	$prev = $now - 1;
	$next = $now + 1;
	$shownext = false;

	$title = "RePlurk " . $now;
	$description = "Unofficial Plurk Year End Recap for " . $now;
	$replurk = true;
	include_once "part_metacss.php";
	?> </head><body data-barba="wrapper"> <?php include_once "part_head.php" ?> <?php include_once "part_footer.php"; ?> </body> <?php include_once "part_script.php"; ?> </html>