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
?> <!doctype html><html class="no-js" lang="en"><head> <?php
		$title = "About";
		include_once "part_metacss.php";
	?> </head><body data-barba="wrapper"> <?php include_once "part_head.php" ?> <main data-barba="container" data-barba-namespace="me" class="me"><section class="imuiux middle"><div class="main-text"><h1>Hello, my name is Dwan</h1></div><div class="arrow-big"><a href="#imuiux" class="arrow scrollto"><span>scroll down</span></a></div></section><section id="imuiux" class="imuiux middle"><div class="text"><h2>I'm a UI/UX Designer and Strategist</h2><p>a.k.a. Web Designer on Steroid</p><h3>Before Becoming Web Designer</h3><p>I did lots of things in the past, like becoming Macromedia Flash Expert, Database Programmer, Creative Director, Chief Creative Officer, and CIO among others.</p><h3>Would You like to Send Me a "Hi!"?</h3><p>I hapen to live in in Tel Aviv-Yafo right now. If you happened to know any Indonesian living in Tel Aviv-Yafo, <strong>Mr. Goat wants to meet them</strong>. Other then that, if you wanted to work with me feel free to <a href="./say-hi" class="spring big">say hi</a>.</p><h4>and who is this Mr. Goat you asked?</h4></div></section><section id="startmrgoat" class="mrgoat us middle"><div class="text"><div class="h2"><h2>This is <b>Mr. Goat</b></h2></div><p>He's a vietnamese, he likes to travel - a lot, and here's some of his instagram posts</p></div><div class="thumbs"><img src="/dwaan/img/mrgoat/mrgoat4.png" width="" height="" alt="Mr. Goat"></div></section><div style="display: none;"><section class="mrgoat us middle"><div class="text"><div class="h2"><h3>He's a Vietnamese</h3></div></div><div class="thumbs"><img src="/dwaan/img/mrgoat/mrgoat8.png" width="" height="" alt="Mr. Goat"></div></section><section class="mrgoat us middle"><div class="text"><div class="h2"><h3>He likes to Travel</h3></div></div><div class="thumbs"><img src="/dwaan/img/mrgoat/mrgoat12.png" width="" height="" alt="Mr. Goat"></div></section><section id="stopmrgoat" class="mrgoat igintro us middle"><div class="text"><div class="h2"><h4>and Here's Some of His Instagram Posts</h4></div></div><div class="thumbs"><img src="/dwaan/img/mrgoat/mrgoat16.png" width="" height="" alt="Mr. Goat"></div><a href="https://instagram.com/mrgoatofficial" data-barba-prevent target="BLANK" class="arrow spring superbig" class="arrow"><span>his instagram</span></a></section><section class="mrgoat spin middle"><div class="thumbs"> <?php for ($x = 1; $x <= 26; $x++) { ?> <img class="mrgoat<?php echo $x; ?>" src="/dwaan/img/mrgoat/mrgoat<?php echo $x; ?>.png" width="" height="" alt="Mr. Goat"> <?php } ?> </div></section></div><section class="igstage middle"><div class="thumbs"> <?php
					$length = 12;
					for ($i = 0; $i < $length; $i++) {
						$data = $obj->data[$i];
						if($data->media_type == "IMAGE" || $data->media_type == "CAROUSEL_ALBUM") {
							echo "<a href='" . $data->permalink . "' data-barba-prevent target='BLANK' rel='noopener noreferrer'><span style='background:#ccc url(" . $data->media_url . ") center no-repeat; background-size:cover' aria-label='" . $data->caption . "'></span></a>";
						} elseif($data->media_type == "VIDEO") {
							echo "<a href='" . $data->permalink . "' data-barba-prevent target='BLANK' rel='noopener noreferrer'><span style='background:#ccc url(" . $data->thumbnail_url . ") center no-repeat; background-size:cover' aria-label='" . $data->caption . "'></span></a>";
						}
					}
				?> </div><a href="#cofound" class="arrow scrollto"><span>fast forward</span></a></section><div class="cofound middle clip"><div class="text"><h2>and  10 Years Ago</h2><p>My friend and I decide to create Sagara, an I.T. Solutions company based in Jakarta, where I work there full-time since 2010 until I moved to Tel Aviv. I still own small part of the company and act as their business partner right now.</p><a href="http://sagara.id" class="spring" data-barba-prevent target="BLANK" rel="noopener noreferrer">More about sagara.id</a></div><div class="thumbs"><picture><source media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" srcset="img/sagara/sagara@2x.jpg"><img src="img/sagara/sagara.jpg" width="" height="" alt="Sagara"></picture></div></div><section class="links"><nav><div class="prototype"><a href="./say-hi"><span>contact me</span></a></div><div class="continue"><a href="./random-case-study"><span><strong>get random case study</strong> <i>- Tiket Apa Saja</i></span></a></div></nav></section><section class="footer"><a class="reading">Reading time: 120 seconds</a></section></main> <?php include_once "part_script.php"; ?> </body></html>