<!doctype html>
<html class="no-js" lang="en">

<head>
    <?php
    $title = "Replurk";
    $description = "A Year End Review of Your Plurk Account";
    include_once "part_metacss.php";
    ?>
</head>

<body data-barba="wrapper">
    <?php include_once "part_head.php" ?>

    <main data-barba="container" data-barba-namespace="detail" class="detail replurk">
        <!-- <img src="/dwaan/img/qr/aai.svg" width="64" height="64" alt="Dwan - RePlurk" class="print qr" hidden /> -->

        <hr />

        <section class="middle full snap">
            <div class="padding">
                <h2 class="plurktitle">RePlurk</h2>
            </div>
            <h4 class="year">/2022</h4>
            <div class="arrow-big">
                <a href="#more" class="arrow scrollto">
                    <span>read more</span>
                </a>
            </div>
        </section>

        <hr />

        <section id="more" class="middle style-plain clip snap">
            <div class="text">
                <div class="titles">
                    <h4>Weekend Project</h4>
                    <h1>Waterpark is RePlurk?</h1>
                </div>
                <p>RePlurk is a web app that I created to review my plurk account in graphical and interesting way. You can also use it if you have plurk account. Long story short it's a Dashboard.</p>
                <p><a href="./replurk2021" class="cta">Visit RePlurk 2021</a></p>
            </div>
        </section>

        <hr />
        <section id="more" class="middle style-background style-background-basic style-background-left clip snap">
            <div class="text">
                <div class="titles">
                    <h4>I bet you're wondering</h4>
                    <h2>What is Plurk?</h2>
                </div>
                <p>A very long time ago, when human started creating web 2.0, there were several social media born at that time. Plurk is one of them.</p>
                <p>Plurk have all the fun of timeline based update and emoticons and responses long before other social media did that. But it didn't reach mass addoption like other, but instead it grew into a niche.</p>
                <p><a href="https://plurk.com/dwan/" target="_BLANK">Visit My Plurk Profile</a></p>
            </div>
            <div class="thumbs">
                <img src="/dwaan/img/replurk/replurk-14.webp" width="" height="" alt="RePlurk - Page 14 - by Dwan" />
            </div>
        </section>

        <hr />

        <section class="middle style-spread style-spread-big  clip snap">
            <div class="text">
                <div class="titles">
                    <h2>Hand Coded&nbsp;<br hidden />From Scratch</h2>
                </div>
                <p>Just like a cat who like to scratch, I created this web app using pure JavaScript code. I use no framework and also with minimum overhead library. Same like this website actually. With that, the web app should run fast.</p>
                <!-- <ol class="zero">
                    <li>The web app contain pure JavaScript code I created from scratch. With no framework and also with minimum overhead library, so it should run fast.</li>
                    <li>Designs were concepted inside my mind and implemented right away into the code. It's vibrant in color with simple layouting.</li>
                </ol> -->
            </div>
            <div class="thumbs">
                <?php for ($i = 1; $i <= 1; $i++) { ?>
                    <picture class="pic-<?php echo $i ?> top">
                        <source media="(-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 216dpi)" srcset="/dwaan/img/replurk/replurk-<?php echo $i ?>@3x.webp">
                        <source media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" srcset="/dwaan/img/replurk/replurk-<?php echo $i ?>@2x.webp">
                        <img src="/dwaan/img/replurk/replurk-<?php echo $i ?>.webp" width="" height="250" alt="RePlurk - Page <?php echo $i ?> - by Dwan" />
                    </picture>
                <?php } ?>
            </div>
        </section>

        <hr />

        <section class="middle style-top snap">
            <div class="text">
                <div class="titles">
                    <h4>Design Concept</h4>
                    <h2>Controlled Randomness</h2>
                </div>
                <p>A wise man (me) said that universes were created randomly, but it was a controlled randomness. Therefore the colors of each blocks of this web app were randomly choosen, but the randomness were controlled to prevent unreadable text.</p>
            </div>
            <div class="thumbs">
                <?php for ($i = 8; $i <= 13; $i++) { ?>
                    <picture class="pic-<?php echo $i ?>">
                        <source media="(-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 216dpi)" srcset="/dwaan/img/replurk/replurk-<?php echo $i ?>@3x.webp">
                        <source media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" srcset="/dwaan/img/replurk/replurk-<?php echo $i ?>@2x.webp">
                        <img src="/dwaan/img/replurk/replurk-<?php echo $i ?>.webp" width="auto" height="250" alt="RePlurk - Controlled Randomness - <?php echo $i - 7 ?> - by Dwan" />
                    </picture>
                <?php } ?>
            </div>
        </section>

        <hr />

        <section class="middle style-background style-background-cover style-background-right clip snap-bottom">
            <!-- <div class="text">
                <div class="titles">
                    <h3>Well, It's Not Actually A Weekend Project</h3>
                </div>
                <p>I dedicated my free time to create this app. This is a labour of love from me to the Plurk community that have been with me over the past <?php echo date("Y") - 2008; ?> years.</p>
            </div> -->
            <div class="thumbs">
                <img src="/dwaan/img/replurk/replurk-3.webp" width="" height="" alt="RePlurk - Page 3 - by Dwan" />
            </div>
        </section>

        <hr />

        <section class="links snap-bottom">
            <nav>
                <div class="prototype">
                    <a href="./replurk2021" aria-label="RePlurk 2021 - Web App" target="_BLANK" class="title"><span>visit the web app</span></a>
                    <a href="./replurk2021" aria-label="RePlurk 2021 - Web App" target="_BLANK"><span>2021</span></a>
                    <a href="./replurk2020" aria-label="RePlurk 2020 - Web App" target="_BLANK"><span>2020</span></a>
                </div>
                <div class="continue">
                    <a href="./musiku" class="title"><span>next case study</span></a>
                    <a href="./musiku"><span><i>Musiku</i></span></a>
                </div>
            </nav>
        </section>

        <hr />

        <section class="footer">
            <p class="reading">Reading time: 30 seconds</p>
        </section>
    </main>

    <?php include_once "part_script.php"; ?>
</body>

</html>