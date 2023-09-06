<?php
// check for the server side x-barba request header
if (!isset($_SERVER['HTTP_X_BARBA'])) {
?>
	<link rel="stylesheet" media="print" href="/dwaan/css/print.css?<?php echo filemtime('css/print.css') ?>">
<?php
}
?>