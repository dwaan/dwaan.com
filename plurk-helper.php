<?php
	function debug($str) {
		print("<pre>");
		print_r($str);
		exit();
	}

	function datediff($today, $date) {
		$diffday = $today->diff($date)->format("%d");
		$diffmonth = $today->diff($date)->format("%m");
		$diffyear = $today->diff($date)->format("%y");

		if ($diffyear == 1) $when = "A year ago";
		else if ($diffyear > 1) $when = $diffyear . " years ago";
		else if ($diffmonth > 1) $when = $diffmonth . " months ago";
		else if ($diffmonth == 1) $when = "A month ago";
		else if ($diffday >= 14) $when = round($diffday / 7) . " weeks ago";
		else if ($diffday >= 7) $when = "A week ago";
		else if ($diffday == 1) $when = "Yesterday";
		else if ($diffday > 1) $when = $diffday . " days ago";
		else $when = "Today at " . date_format($date,"H:i");

		return $when;
	}
?>