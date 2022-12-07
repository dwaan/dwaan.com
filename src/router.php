<?php
    $explode = explode("?", trim($_SERVER["REQUEST_URI"]));
    $url = $explode[0];

    if (preg_match('/\.(?:png|jpg|jpeg|gif|svg|js|css|map|woff|io|webp|webmanifest)/', $url)) {
		return false;
	} else {
        $files = explode(".php", $url);

        $explode = explode("/", $files[0]);

        if ($explode[sizeof($explode) - 1] == "") $url .= "index.php";
        else $url .= ".php";

        foreach ($_GET as $key => $value) {
            $_GET[$key] = $value;
        }
        foreach ($_POST as $key => $value) {
            $_POST[$key] = $value;
        }

		if (file_exists($_SERVER['DOCUMENT_ROOT'] . $url) == true)
            include $_SERVER['DOCUMENT_ROOT'] . $url;
		else {
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Page Not Found</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * {
            line-height: 1.2;
            margin: 0;
        }

        html {
            color: #888;
            display: table;
            font-family: sans-serif;
            height: 100%;
            text-align: center;
            width: 100%;
        }

        body {
            display: table-cell;
            vertical-align: middle;
            margin: 2em auto;
        }

        h1 {
            color: #555;
            font-size: 2em;
            font-weight: 400;
        }

        p {
            margin: 10px auto;
            width: 280px;
        }

        @media only screen and (max-width: 280px) {

            body, p {
                width: 95%;
            }

            h1 {
                font-size: 1.5em;
                margin: 0 0 0.3em;
            }

        }
    </style>
</head>
<body>
    <h1>No index.php 😱</h1>
    <p>Hello! this directory doesn't exist or doesn't contain index.php, please create them.</p>
</body>
</html>
<?php
		}
	}
?>