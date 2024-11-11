<?php
	$secretKey = "MrGoatInDwanDotCom";
	$configFile = "ig-config.txt";

	$postdata = http_build_query(
		array(
			'client_id' => '270549030587767',
			'client_secret' => 'e1bd68c199d782ecf3a62ba989f3ef6b',
			'grant_type' => 'authorization_code',
			'redirect_uri' => 'https://dwaan.com/ig',
			'code' => $_GET["code"]
		)
    );

	// Get short lived token
	$ch = curl_init('https://api.instagram.com/oauth/access_token');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
	$response = curl_exec($ch);
	curl_close($ch);

	$obj = json_decode($response);
	if ($obj->error_type == "OAuthException") {
		echo $obj->error_message . "\n\n";
	} else {
		$igFile = fopen($configFile, "w") or die("Can't write config file");
		$encrypted_string = openssl_encrypt($obj->access_token, "AES-128-ECB", $secretKey);
		fwrite($igFile, $encrypted_string);
		echo "IG short lived auth code succesfully acquired\n\n";
		fclose($igFile);
	}

	echo "<hr/>";

	// Get long lived token
	$igFile = fopen($configFile, "r") or die("Can't read config file");
	$shortLivedToken = openssl_decrypt(fread($igFile, filesize($configFile)), "AES-128-ECB", $secretKey);
	fclose($igFile);

	$getdata = http_build_query(
		array(
			'client_secret' => 'e1bd68c199d782ecf3a62ba989f3ef6b',
			'grant_type' => 'ig_exchange_token',
			'access_token' => $shortLivedToken
		)
    );
	$ch = curl_init('https://graph.instagram.com/access_token?' . $getdata);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$response = curl_exec($ch);
	curl_close($ch);

	$obj = json_decode($response);
	if ($obj->error->type == "IGApiException") {
		echo $obj->error->message . "\n\n";
	} else {
		$igFile = fopen($configFile, "w") or die("Can't write config file");
		$encrypted_string = openssl_encrypt($obj->access_token, "AES-128-ECB", $secretKey);
		fwrite($igFile, $encrypted_string);
		echo "IG long lived auth code succesfully acquired\n\n";
		fclose($igFile);
	}
?>