<?php
// check for the server side x-barba request header
if (!isset($_SERVER['HTTP_X_BARBA'])) {
?> <script type="text/javascript" src="/dwaan/js/bundle.js?<?php echo filemtime('js/bundle.js') ?>" async></script><style>.no-js #loader,
		.no-js #mode {
			display: none;
		}

		.no-js main,
		.no-js header,
		.no-js .footer {
			opacity: 1;
		}</style><link rel="stylesheet" media="print" href="/dwaan/css/print.css?<?php echo filemtime('css/print.css') ?>"> <?php
}
?>