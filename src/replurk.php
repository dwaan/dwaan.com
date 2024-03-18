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
        <img loading="lazy" src="/img/qr/replurk.svg" width="64" height="64" alt="Dwan - RePlurk" class="print qr" hidden />

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
                    <h1>Waterpark is <strong>RePlurk</strong> 🤷‍♂️</h1>
                </div>
                <p>RePlurk is a web app that I created to review my plurk account in graphical and interesting way. You can also use it if you have plurk account. Long story short it's a Dashboard.</p>
                <p><a href="./replurk2023" class="cta">Visit RePlurk 2023</a></p>
            </div>
        </section>

        <hr />
        <section id="i-bet-you-are" class="middle style-background style-background-basic style-background-left clip snap">
            <div class="text">
                <div class="titles">
                    <h4>I bet you're wondering</h4>
                    <h2>What is&nbsp;<br hidden />Plurk? 👀</h2>
                </div>
                <p>A very long time ago, when human started creating web 2.0, there were several social media born at that time. Plurk is one of them.</p>
                <p>Plurk have all the fun of timeline based update and emoticons and responses long before other social media did that. But it didn't reach mass addoption like other, but instead it grew into a niche.</p>
                <p><a href="https://www.plurk.com/dwan/" target="_BLANK">Visit My Plurk Profile</a></p>
            </div>
            <div class="thumbs">
                <img loading="lazy" src="/img/replurk/replurk-14.webp" style="width: 100%" alt="RePlurk - Page 14 - by Dwan" />
            </div>
        </section>

        <hr />

        <section class="middle style-spread style-spread-big clip snap">
            <div class="text">
                <div class="titles">
                    <h4>Just like a cat</h4>
                    <h2>Hand Coded&nbsp;<br hidden />From <strong>Scratch</strong> 🐈</h2>
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
                        <img loading="lazy" src="/img/replurk/replurk-<?php echo $i ?>.webp" style="width: 100%" alt="RePlurk - Page <?php echo $i ?> - by Dwan" />
                    </picture>
                <?php } ?>
            </div>
        </section>

        <hr />

        <section class="middle style-top snap">
            <div class="text">
                <div class="titles">
                    <h4>Design Concept</h4>
                    <h2>Controlled Randomness 🎰</h2>
                </div>
                <p>A wise man (me) said that universes were created randomly, but it was a controlled randomness. Therefore the colors of each blocks of this web app were randomly choosen, but the randomness were controlled to prevent unreadable text.</p>
            </div>
            <div class="thumbs">
                <?php for ($i = 8; $i <= 13; $i++) { ?>
                    <picture class="pic-<?php echo $i ?>">
                        <img loading="lazy" src="/img/replurk/replurk-<?php echo $i ?>.webp" height="250" alt="RePlurk - Controlled Randomness - <?php echo $i - 7 ?> - by Dwan" />
                    </picture>
                <?php } ?>
            </div>
        </section>

        <hr />

        <section class="middle style-single-image snap">
            <div class="text">
                <div class="titles">
                    <h4>Well, It's Not Actually</h4>
                    <h2>A Weekend Project 👷</h2>
                </div>
                <p>I dedicated my free time to create this app. This is a labour of love from me to the Plurk community that have been with me over the past <?php echo date("Y") - 2008; ?> years. Enjoy the screenshoot of my Plurk statistics if you didn't have plurk account.</p>
            </div>
            <div class="thumbs">
                <picture class="pic-15 top">
                    <img loading="lazy" src="/img/replurk/replurk-15.webp" style="width: 100%" alt="RePlurk - All Block - by Dwan" />
                </picture>
            </div>
        </section>

        <hr />

        <section class="middle style-single-image style-reveal clip snap-bottom">
            <h2 class="hidden">Thank You</h2>
            <div class="thumbs">
                <picture class="pic-3">
                    <img loading="lazy" src="/img/replurk/replurk-3.webp" style="width: 100%" alt="RePlurk - Page Thank You - by Dwan" />
                </picture>
            </div>
        </section>

        <hr />

        <div class="links snap-bottom">
            <nav>
                <div class="prototype">
                    <a href="./replurk2023" aria-label="RePlurk 2023 - Web App" target="_BLANK" class="title"><span>visit the web app</span></a>
                    <a href="./replurk2020" aria-label="RePlurk 2020 - Web App" target="_BLANK"><span>2020</span></a>
                    <a href="./replurk2021" aria-label="RePlurk 2021 - Web App" target="_BLANK"><span>2021</span></a>
                    <a href="./replurk2022" aria-label="RePlurk 2022 - Web App" target="_BLANK"><span>2022</span></a>
                    <a href="./replurk2023" aria-label="RePlurk 2023 - Web App" target="_BLANK"><span>2023</span></a>
                </div>
                <div class="continue">
                    <a href="./musiku" class="title"><span>next case study</span></a>
                    <a href="./musiku"><span><i>Musiku</i></span></a>
                </div>
            </nav>
        </div>

        <hr />

        <div class="footer">
            <p class="reading">Reading time: 30 seconds</p>
        </div>
    </main>

    <?php include_once "part_footer.php"; ?>
</body>

<?php include_once "part_script.php"; ?>

</html>