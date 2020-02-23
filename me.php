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
		$title = "Yes";
		include_once "part_metacss.php";
	?>
</head>

<body>
	<?php include_once "part_head.php" ?>

	<div id="barba-wrapper">
		<div class="barba-container" data-namespace="me">
			<main class="block__clear">
				<div class="me">
					<div id="firstscene">
						<div class="imuiux block__full">
							<div class="block__middle">
								<h1>I'm a UI/UX Designer and Strategist</h1>
								<p>...mostly for website and mobile application. But I like to call myself a web designer. I studied in computer science but decide to follow my dream and becoming <strike>fabulous</strike> web designer.</p>
								<img src="/dwaan/img/roll-eyes-up.png" width="" height="" alt="Dwan rolling his eyes up" />
							</div>
						</div>

						<div class="us block__full">
							<div class="block__middle">
								<h2>me, my partner and <strong>mr. goat</strong> live in tel aviv-yafo</h2>
								<p>I'm one of the few Indonesian who live in Israel, it's very rare indeed. I haven't seen any Indonesian who live in here, yet. So hit me up if you know anyone.</p>
								<img src="/dwaan/img/roll-eyes-up.png" width="" height="" alt="Dwan rolling his eyes up" />
							</div>
						</div>
					</div>

					<div class="mrgoat block__full">
						<div class="mrgate block__full">
							<div class="h2"><h2 class="h21">this is <b>mr. goat</b></h2></div>
							<div class="h2"><h3 class="h22">he's a vietnamese</h3></div>
							<div class="h2"><h3 class="h23">he likes to travel</h3></div>
							<div class="h4"><h4>and he have his own instagram account, scroll more to check out his latest instagram posts</h4></div>
							<div class="img">
								<?php for ($x = 1; $x <= 26; $x++) { ?>
								<img class="mrgoat<?php echo $x; ?>" src="/dwaan/img/mrgoat/mrgoat<?php echo $x; ?>.png" width="" height="" alt="Mr. Goat" />
								<?php } ?>
							</div>
						</div>
						<div class="igstage">
							<div id="ig">
								<?php
									$length = 12;
									for ($i = 0; $i < $length; $i++) {
										$data = $obj->data[$i];
										echo "<div class='item'>";

										if($data->media_type == "IMAGE" || $data->media_type == "CAROUSEL_ALBUM") {
											echo "<a href='" . $data->permalink . "' class='img-ig no-barba' target='_blank' rel='noopener noreferrer'><img src='" . $data->media_url . "' width='200' height='auto' alt='" . $data->caption . "' /></a>";
										} elseif($data->media_type == "VIDEO") {
											echo "<a href='" . $data->permalink . "' class='img-ig no-barba' target='_blank' rel='noopener noreferrer'><img src='" . $data->thumbnail_url . "' width='200' height='auto' alt='" . $data->caption . "' /></a>";
										}
										echo "</div>";
									}
								?>
							</div>
						</div>
					</div>

					<div class="capabilities block__full">
						<div class="anyway">
							<div class="block block__clear">
								<div class="block__left">
									<h3>anyway...</h3>
									<p>I like to call myself a web designer not UI/UX bla bla... I do lots of things in the past, like becoming Flash <strike>R.I.P</strike> Designer and Programmer, Database Programmer, Creative Director, and CIO. Anyway, as a web designer my design philosophy has always been bringing the most important information front and foremost, creating simplicity while incorporating user-centric design and keeping the brand identity prominent.</p>
								</div>
								<div class="block__right">
									<h4>my capabilities</h4>
									<ul class="plain">
										<li><span>concepting</span></li>
										<li><span>user experience design</span></li>
										<li><span>user interface design</span></li>
										<li><span>art directing</span></li>
										<li><span>web development</span></li>
										<li><span>design system</span></li>
									</ul>
								</div>
							</div>
						</div>

						<div class="work__list">
							<h5><small>if you haven’t seen</small> my latest works</h5>
							<ul class="block block__clear flat">
								<li><a href="./melon-tiket-apa-saja"><span><img src="/dwaan/img/ss-tiketapasaja/tiket-apa-saja.jpg" width="" height="" alt="PPATK - E-Learning for Banking Frontliner" /></span><span>Melon - Tiket Apa Saja</span></a></li>
								<li><a href="./ppatk-e-learning-for-banking-frontliner"><span><img src="/dwaan/img/ss1.jpg" width="" height="" alt="PPATK - E-Learning for Banking Frontliner" /></span><span>PPATK - E-Learning for Banking Frontliner</span></a></li>
								<li><a href="./angkasa-pura-services"><span><img src="/dwaan/img/ss3.jpg" width="" height="" alt="Angkasa Pura 1 - Airports of Indonesia" /></span><span>Angkasa Pura 1 - Airports of Indonesia</span></a></li>
								<li><a href="./loket-point-of-sales"><span><img src="/dwaan/img/ss4.jpg" width="" height="" alt="Loket - Point of Sales System" /></span><span>Loket - Point of Sales System</span></a></li>
							</ul>
						</div>
					</div>

					<div class="cofound block__full">
						<div class="block__middle">
							<h3>I’m also the owner of <a href="http://sagara.id" class="no-barba" target="_blank" rel="noopener noreferrer">Sagara</a>, an IT Solutions company based in Jakarta, Indonesia.</h3>
							<hr />
							<h4>but I didn't work there anymore 😬</h4>
							<p>as I resign from my positions few years ago to persue my other personal life goals</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	</div>

<?php include_once "part_script.php"; ?>
</body>
</html>