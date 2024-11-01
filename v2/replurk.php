<!doctype html><html class="no-js" lang="en"><head> <?php
    $current = date("Y");
    $month = date('n');
    if ($month >= 1 && $month <= 10) $current--;
    if (isset($_GET["year"])) {
        $now = (int)$_GET["year"];
        if ($now == 0 || $now <= 2000 || $current >= $current) $now = $current;
        $short = $now - 2000;

        $prev = $now - 1;
        $next = $now + 1;
        $shownext = false;

        $title = "RePlurk " . $now;
        $description = "Unofficial Plurk Year End Recap for " . $now;
        $replurk = true;
    } else {
        $title = "Replurk";
        $description = "A Year End Review of Your Plurk Account";
    }
    include_once "part_metacss.php";
    ?> </head><body data-barba="wrapper"> <?php include_once "part_head.php" ?> <?php
    if (isset($_GET["year"])) {
        include_once "replurk_statistics.php";
    } else {
        include_once "replurk_detail.php";
    }
    ?> <?php include_once "part_footer.php"; ?> </body> <?php include_once "part_script.php"; ?> </html>