<?php
	// Combine with gulp-connect-php to remove .php extension from url
	$ext = ".php";

	if (preg_match('/\.(?:png|jpg|jpeg|gif|js|css|map)/', $_SERVER["REQUEST_URI"])) {
		return false;
	} else {
		if ($_SERVER["REQUEST_URI"] == "/dwaan/") $ext = "index.php";
		include_once str_replace("/dwaan/", "", $_SERVER["REQUEST_URI"]).$ext;
	}
?>