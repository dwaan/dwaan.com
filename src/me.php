<?php
	$secretKey = "MrGoatInDwanDotCom";
	$configFile = "ig-config.txt";
	$cacheFile = "ig-post.txt";

	// Get long lived token from config
	$igFile = fopen($configFile, "r") or die("Can't read config file");
	$longLivedToken = openssl_decrypt(fread($igFile, filesize($configFile)), "AES-128-ECB", $secretKey);
	fclose($igFile);
	// Get new long lived token
	$getdata = http_build_query(
		array(
			'grant_type' => 'ig_refresh_token',
			'access_token' => $longLivedToken
		)
    );
	$ch = curl_init('https://graph.instagram.com/refresh_access_token?' . $getdata);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$response = curl_exec($ch);
	curl_close($ch);

	if (file_exists($cacheFile)) {
		// Read post from file if exist
		$igFile = fopen($cacheFile, "r");
		$json = openssl_decrypt(fread($igFile, filesize($cacheFile)), "AES-128-ECB", $secretKey);
		$obj = json_decode($json);
		fclose($igFile);

		// Check if the file is reacing 60 days, delete it to create a new one
		$cache_life = 30*24*60*60;
		$filemtime = @filemtime($cacheFile);
		if (!$filemtime or (time() - $filemtime >= $cache_life)){
			// Delete file
			unlink($cacheFile);
		}
	} else {
		// Rewrite the long lived token again before it expired
		$obj = json_decode($response);
		if ($obj->error->type == "IGApiException") {
			die($obj->error->message);
		} else {
			$igFile = fopen($configFile, "w") or die("Can't write config file");
			$encrypted_string = openssl_encrypt($obj->access_token, "AES-128-ECB", $secretKey);
			fwrite($igFile, $encrypted_string);
			fclose($igFile);
		}

		// Get newest post form IG
		ini_set("allow_url_fopen", 1);
		$json = file_get_contents("https://graph.instagram.com/me/media?fields=media_type,thumbnail_url,media_url,permalink,caption,permalink&access_token=" . $longLivedToken);
		$obj = json_decode($json);

		// Write newest post as a file
		$igFile = fopen($cacheFile, "w") or die("Can't write config file");
		$encrypted_string = openssl_encrypt($json, "AES-128-ECB", $secretKey);
		fwrite($igFile, $encrypted_string);
		fclose($igFile);
	}
?>
<!doctype html>
<html class="no-js" lang="en">

<head>
	<?php
		$title = "About";
		include_once "part_metacss.php";
	?>
</head>

<body data-barba="wrapper">
	<?php include_once "part_head.php" ?>

	<main data-barba="container" data-barba-namespace="me" class="me">
		<section class="imuiux middle">
			<div class="main-text">
				<h1>Hello, my name is <strong>Dwan</strong></h1>
			</div>
			<div class="arrow-big">
				<a href="#imuiux" class="arrow scrollto">
					<span>scroll down</span>
				</a>
			</div>
		</section>

		<section id="imuiux" class="intro middle">
			<div class="text">
				<h2>I'm a UI/UX <br/> Designer and <br/> Strategist</h2>
				<p>a.k.a. Web Designer in Steroid</p>
			</div>
			<div class="arrow-big">
				<a href="#webdesigner" class="arrow scrollto">
					<span>before</span>
				</a>
			</div>
		</section>

		<section id="webdesigner" class="intro middle">
			<div class="text">
				<span>1 <hr/> 3</span>
				<h3>&amp; <br/> Before <br/> <strong>Web Designer</strong></h3>
				<p>I did many of things in the past, like becoming Macromedia Flash Expert, Database Programmer, Creative Director, Chief Creative Officer, and CIO among others.</p>
			</div>
			<div class="arrow-big">
				<a href="#sayhi" class="arrow scrollto">
					<span>would you?</span>
				</a>
			</div>
		</section>

		<section id="sayhi" class="intro middle">
			<div class="text">
				<div class="title">
					<span>2 <hr/> 3</span>
					<h3>Would <br/> You <br/> Like To <br/> <strong>Say Hi!</strong>?</h3>
				</div>
				<p>I happen to live in in Tel Aviv-Yafo right now. If you happened to know any Indonesian living in Tel Aviv-Yafo, Mr. Goat wants to meet them. Other then that, if you wanted to work with me feel free to <a href="./say-hi" class="spring big">say hi</a>.</p>
			</div>
			<div class="arrow-big">
				<a href="#startmrgoat" class="arrow scrollto">
					<span>mr. goat?</span>
				</a>
			</div>
		</section>


		<section id="startmrgoat" class="mrgoat middle">
			<div class="text">
				<div class="h2"><h2>This is <b>Mr. Goat</b></h2></div>
			</div>
			<div class="thumbs">
				<?php for ($x = 1; $x <= 26; $x++) { ?>
				<img class="mrgoat<?php echo $x; ?>" src="/dwaan/img/mrgoat/mrgoat<?php echo $x; ?>.png" width="" height="" alt="Mr. Goat" />
				<?php } ?>
			</div>
			<div class="text textoverlay">
				<div id="viet" class="float"><span class="dot"><hr /><i></i></span><span class="line"><hr /></span><p>He's a vietnamese</p></div>
				<div id="nyc" class="float"><span class="dot"><hr /><i></i></span><span class="line"><hr /></span><p>He got this neckles in NYC</p></div>
				<div id="food" class="float"><span class="dot"><hr /><i></i></span><span class="line"><hr /></span><p>He likes to eat fancy food</p></div>
				<div id="travel" class="float"><span class="dot"><hr /><i></i></span><span class="line"><hr /></span><p>He travel all over the world</p></div>
				<div id="post" class="float">
					<svg width="29" height="48" id="phone" viewBox="0 0 29 48" fill="black" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M28.3636 4.36364C28.3636 1.95367 26.41 0 24 0H4.36364C1.95367 0 0 1.95366 0 4.36363V43.6364C0 46.0463 1.95367 48 4.36364 48H24C26.41 48 28.3636 46.0463 28.3636 43.6364L28.3636 4.36364ZM7.091 3.27271C4.98228 3.27271 3.27282 4.98216 3.27282 7.09089V13.6363C3.27282 15.7451 4.98228 17.4545 7.091 17.4545C9.19973 17.4545 10.9092 15.7451 10.9092 13.6363V7.09089C10.9092 4.98216 9.19973 3.27271 7.091 3.27271ZM9.27282 7.63641C9.27282 8.84139 8.29598 9.81823 7.091 9.81823C5.88601 9.81823 4.90918 8.84139 4.90918 7.63641C4.90918 6.43142 5.88601 5.45459 7.091 5.45459C8.29598 5.45459 9.27282 6.43142 9.27282 7.63641ZM7.09144 15.2727C7.99518 15.2727 8.72781 14.5401 8.72781 13.6364C8.72781 12.7326 7.99518 12 7.09144 12C6.1877 12 5.45508 12.7326 5.45508 13.6364C5.45508 14.5401 6.1877 15.2727 7.09144 15.2727Z"/>
					</svg>
					<p>Here's some of his instagram posts</p>
				</div>
			</div>
		</section>

		<section class="igstage middle">
			<div class="thumbs">
				<?php
					$length = 12;
					for ($i = 0; $i < $length; $i++) {
						$data = $obj->data[$i];
						if($data->media_type == "IMAGE" || $data->media_type == "CAROUSEL_ALBUM") {
							echo "<a href='" . $data->permalink . "' data-barba-prevent target='BLANK' rel='noopener noreferrer'><img src='" . $data->media_url . "' alt='" . $data->caption . "' /></a>";
						} elseif($data->media_type == "VIDEO") {
							echo "<a href='" . $data->permalink . "' data-barba-prevent target='BLANK' rel='noopener noreferrer'><img src='" . $data->thumbnail_url . "' alt='" . $data->caption . "' /></a>";
						}
					}
				?>
			</div>
		</section>

		<div id="cofound" class="cofound middle clip">
			<div class="text">
				<h2>and  10 Years Ago</h2>
				<p>My friend and I decide to create Sagara, an I.T. Solutions company based in Jakarta, where I work there full-time since 2010 until I moved to Tel Aviv. I still own small part of the company and act as their business partner right now.</p>
				<a href="http://sagara.id" class="spring" data-barba-prevent target="BLANK" rel='noopener noreferrer'>More about sagara.id</a>
			</div>
			<div class="thumbs">
				<picture>
					<source media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" srcset="img/sagara/sagara@2x.jpg">
					<img src="img/sagara/sagara.jpg" width="" height="" alt="Sagara" />
				</picture>
			</div>
		</div>

		<section class="links">
			<nav>
				<div class="prototype">
					<a href="./say-hi"><span>say hi</span></a>
				</div>
				<div class="continue">
					<a href="./random-case-study"><span><strong>random case study</strong> <i>- Tiket Apa Saja</i></span></a>
				</div>
			</nav>
		</section>

		<section class="footer">
			<a class="reading">Reading time: 120 seconds</a>
		</section>
	</main>

	<?php include_once "part_script.php"; ?>
</body>
</html>