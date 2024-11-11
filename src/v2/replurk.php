<!doctype html>
<html class="no-js" lang="en">

<head>
    <?php
    $currentyear = date("Y");
    $currentmonth = date('n');

    if ($currentmonth >= 1 && $currentmonth <= 10) $currentyear--;

    if (isset($_GET["year"])) {
        $year = (int)$_GET["year"];
        if ($year < 2008) $year = 2008;
        if ($year >= $currentyear) $year = $currentyear;
        $shortyear = $year - 2000;
        if ($shortyear < 10) $shortyear = "0" . $shortyear;

        $prevyear = $year - 1;
        if ($prevyear <=  2000) $showprev = false;
        else $showprev = true;

        $nextyear = $year + 1;
        if ($nextyear > $currentyear) $shownext = false;
        else $shownext = true;

        $title = "RePlurk " . $year;
        $description = "Unofficial Plurk Year End Recap for " . $year;
    } else {
        $title = "Replurk";
        $description = "A Year End Review of Your Plurk Account";
    }

    include_once "part_metacss.php";
    ?>
</head>

<body data-barba="wrapper">
    <?php include_once "part_head.php" ?>

    <?php
    if (isset($_GET["year"])) {
        include_once "replurk_statistics.php";
    } else {
        include_once "replurk_detail.php";
    }
    ?>

    <?php include_once "part_footer.php"; ?>
</body>

<?php include_once "part_script.php"; ?>

</html>