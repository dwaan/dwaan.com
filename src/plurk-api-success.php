<!doctype html>
<html lang="en">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Login Success</title>
	<script>
        var namespace = window.opener.document.querySelector("main[data-barba=container]").getAttribute("data-barba-namespace");

        if(namespace == "replurk2021") { window.opener.replurk2021.login(); namespace = ""; }
        else if(namespace == "replurk2020") { window.opener.replurk2020.login(); namespace = ""; }
        else if(namespace == "replurk") { window.opener.replurk.login(); namespace = ""; }

		if(namespace == "") window.close();
	</script>
	<meta name="theme-color" content="#FFD700">
    <style>
        * {
            line-height: 1.2;
            margin: 0;
        }

        html {
            color: rgba(0,0,0,.75);
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
            background-color: #FFD700;
        }

        h1 {
            color: #000;
            font-size: 2em;
            font-weight: 400;
        }

        p {
            margin: 10px auto;
            width: 380px;
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
    <h1>Success 🥳</h1>
    <p>Please close this window and refresh RePlurk page manually if this window didn't automatically close.</p>
    <p>If you open this web app inside Plurk app. please reaopen the web app in your browser and restart the autorization process.</p>
</body>
</html>

