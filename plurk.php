<?php
	include_once "plurk-config.php";
	include_once "plurk-helper.php";

	session_start();
	$_SESSION['year'] = "2020";

	// In state=1 the next request should include an oauth_token.
	// If it doesn't go back to 0

	if(!isset($_SESSION['state'])) $_SESSION['state'] = 0;

	if(!isset($_GET['oauth_token'])) {
		if (isset($_SESSION['state']))
			if ($_SESSION['state'] == 1)
				$_SESSION['state'] = 0;
		else
			$_SESSION['state'] = 0;
	} else  {
		if ($_GET['oauth_token'] != "") $_SESSION['oauth_token'] = $_GET['oauth_token'];
		else unset($_GET['oauth_token']);
	}

	if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') $url = "https://";
    else $url = "http://";
    $url.= $_SERVER['HTTP_HOST'];
    $url.= $_SERVER['REQUEST_URI'];

	try {
		$oauth = new OAuth($conskey,$conssec,OAUTH_SIG_METHOD_HMACSHA1,OAUTH_AUTH_TYPE_URI);
		if(!isset($_SESSION['oauth_token']) && !$_SESSION['state']) {
			// Get first token
			$request_token_info = $oauth->getRequestToken($req_url);
			$_SESSION['token'] = $request_token_info['oauth_token'];
			$_SESSION['secret'] = $request_token_info['oauth_token_secret'];
			$_SESSION['state'] = 1;

			// Start - Autorized page
			include_once 'plurk-authorized.php';
			// End - Autorized page

			exit();
		} else if($_SESSION['state']==1) {
			// Get permanent token
			$oauth->setToken($_SESSION['token'], $_SESSION['secret']);
			$access_token_info = $oauth->getAccessToken($acc_url, $url, $_SESSION['oauth_token']);
			$_SESSION['state'] = 2;
			$_SESSION['token'] = $access_token_info['oauth_token'];
			$_SESSION['secret'] = $access_token_info['oauth_token_secret'];
		}
		$oauth->setToken($_SESSION['token'],$_SESSION['secret']);

		// Get User data
		$oauth->fetch("$api_url/Users/me");
		$me = json_decode($oauth->getLastResponse());

		// Get Plurk
		$content = [];
		$parameters = array("filter" => "my");
		$offset = 0;
		$i = 0;
		// echo "<pre>";
		do {
			if ($offset != 0) $parameters = array("offset" => $offset, "filter" => "my");

			$oauth->fetch("$api_url/Timeline/getPlurks", $parameters);
			$plurks = json_decode($oauth->getLastResponse());

			// foreach ($plurks->plurks as $key => $value) {
			// 	$oauth->fetch("$api_url/Responses/get", array('plurk_id' => $value->plurk_id));
			// 	$responses = json_decode($oauth->getLastResponse());
			// 	$plurks->plurks[$key]->responses = $responses;
			// 	print_r($plurks->plurks[$key]);
			// 	echo("<hr>");
			// 	exit();
			// }

			// Get the last plurk date
			$date = date_create($plurks->plurks[sizeof($plurks->plurks) - 1]->posted);
			$offset = date_format($date,"Y-m-d\TH:i:s");
			$year = date_format($date,"Y");

			// Merge the plurk content with previous one
			$content = array_merge($content, $plurks->plurks);
			$i++;
		// } while($year == "2020");
		} while($i < 2);

		// Most response
		$mostfavorite = $content;
		usort($mostfavorite, function($a, $b) {
		    return $b->favorite_count - $a->favorite_count;
		});
		// Most response
		$mostresponse = $content;
		usort($mostresponse, function($a, $b) {
		    return $b->response_count - $a->response_count;
		});
		// Most replurk
		$mostreplurk = $content;
		usort($mostreplurk, function($a, $b) {
		    return $b->replurkers_count - $a->replurkers_count;
		});

		// debug($mostresponse);
	} catch(OAuthException $E) {
		$_POST['lastResponse'] = $E->lastResponse;
		include_once 'plurk-error.php';
    	exit();
	}
?> <!doctype html><html class="no-js" lang="en"><head> <?php
		$title = "Plurk 2020";
		include_once "part_metacss.php";
	?> </head><body data-barba="wrapper"> <?php include_once "part_head.php" ?> <main data-barba="container" data-barba-namespace="plurk" class="plurk"><section id="hello" class="middle first"><div class="thumbs"><img src="<?php echo $me->avatar_big; ?>" class="rounded"></div><div class="text"><h1>Hello, <?php echo $me->display_name; ?>!</h1><p>This is your <?php echo $_SESSION['year']; ?> Plurks</p></div><div class="bgtext"><sup>20</sup><sub>20</sub></div><div class="arrow-big"><a href="#latest-plurk" class="arrow scrollto">scroll</a></div></section><section id="join" class="middle"><div class="text"><p>You've join Plurk <?php echo $me->anniversary->years; ?> years and <?php echo $me->anniversary->days; ?> days.</p></div></section> <?php if ($mostfavorite[0]->favorite_count > 0) { ?> <section id="most-response" class="card middle"><div class="text"><h3>Most<br>Favorite</h3><ol> <?php
					    	for ($i = 0; $i < 5; $i++) {
					    		if ($mostfavorite[$i]->favorite_count > 0) {
		    			?> <li class="content" data-pkey="<?php echo $i + 1; ?>"><div class="presponse"><?php echo $mostfavorite[$i]->favorite_count; ?></div><div class="pcontent" data-pid="<?php echo $mostfavorite[$i]->plurk_id; ?>"><?php echo $mostfavorite[$i]->content; ?></div><div class="pdate"><?php
						    		$today = new DateTime();
						    		$today->setTimezone(new DateTimeZone($me->timezone));

						    		$date = date_create($mostfavorite[$i]->posted);
						    		$date->setTimezone(new DateTimeZone($me->timezone));

									echo datediff($today, $date);
					    		?></div></li> <?php
		    					}
				    		}
				    	?> </ol></div><div class="bgtext">Most<br>Responses</div></section> <?php } ?> <?php if ($mostreplurk[0]->replurkers_count > 0) { ?> <section id="most-replurk" class="card middle"><div class="text"><h3>Most<br>Replurk</h3><ol> <?php
					    	for ($i = 0; $i < 5; $i++) {
					    		if ($mostreplurk[$i]->replurkers_count > 0) {
		    			?> <li class="content" data-pkey="<?php echo $i + 1; ?>"><div class="presponse"><?php echo $mostreplurk[$i]->replurkers_count; ?></div><div class="pcontent" data-pid="<?php echo $mostreplurk[$i]->plurk_id; ?>"><?php echo $mostreplurk[$i]->content; ?></div><div class="pdate"><?php
						    		$today = new DateTime();
						    		$today->setTimezone(new DateTimeZone($me->timezone));

						    		$date = date_create($mostreplurk[$i]->posted);
						    		$date->setTimezone(new DateTimeZone($me->timezone));

									echo datediff($today, $date);
					    		?></div></li> <?php
					    		}
				    		}
				    	?> </ol></div><div class="bgtext">Most<br>Replurk</div></section> <?php } ?> <?php if ($mostresponse[0]->response_count > 0) { ?> <section id="most-response" class="card middle"><div class="text"><h3>Most<br>Responses</h3><ol> <?php
					    	for ($i = 0; $i < 5; $i++) {
					    		if ($mostresponse[$i]->response_count > 0) {
		    			?> <li class="content" data-pkey="<?php echo $i + 1; ?>"><div class="presponse"><?php echo $mostresponse[$i]->response_count; ?></div><div class="pcontent" data-pid="<?php echo $mostresponse[$i]->plurk_id; ?>"><?php echo $mostresponse[$i]->content; ?></div><div class="pdate"><?php
						    		$today = new DateTime();
						    		$today->setTimezone(new DateTimeZone($me->timezone));

						    		$date = date_create($mostresponse[$i]->posted);
						    		$date->setTimezone(new DateTimeZone($me->timezone));

									echo datediff($today, $date);
					    		?></div></li> <?php
		    					}
				    		}
				    	?> </ol></div><div class="bgtext">Most<br>Responses</div></section> <?php } ?> <section class="debug"><p>Token: <?php print($_SESSION['token']); ?></p><p>Secret: <?php print($_SESSION['secret']); ?></p></section></main><script type="text/javascript">var result = <?php print($oauth->getLastResponse()); ?>;
		console.log(result);</script> <?php include_once "part_script.php"; ?> </body></html>