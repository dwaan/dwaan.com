<!doctype html>
<html class="no-js" lang="en">

<head>
    <?php
    $title = "Asosiasi Antropologi Indonesia | AAI Website Solution";
    $description = "A short study case of website redesign for Asosiasi Antropologi Indonesia | AAI";
    include_once "part_metacss.php";
    ?>
</head>

<body data-barba="wrapper">
    <?php include_once "part_head.php" ?>

    <main data-barba="container" data-barba-namespace="detail" class="detail aai">
        <img src="/img/qr/aai.svg" width="64" height="64" alt="Dwan - Asosiasi Antropologi Indonesia | AAI Website Solution" class="print qr" hidden />

        <hr />

        <section class="middle full snap">
            <div class="padding">
                <span>
                    <svg width="160" height="55" viewBox="0 0 199 68" class="logo aai" aria-label="Asosiasi Antropologi Indonesia's Logo">
                        <use href="/img/logo.svg#logo/aai"></use>
                    </svg>
                </span>
            </div>
            <h4 class="year">/2023</h4>
            <div class="arrow-big">
                <a href="#more" class="arrow scrollto">
                    <span>read more</span>
                </a>
            </div>
        </section>

        <hr />

        <section id="more" class="middle style-spread style-spread-big clip snap">
            <div class="text">
                <div class="titles">
                    <h4>Website Redesign</h4>
                    <h1>Asosiasi Antropologi Indonesia</h1>
                </div>
                <p>Asosiasi Antropologi Indonesia (AAI) website was due to redesign. They have a clear idea on how their website should look like and I'm helping them to create it.</p>
            </div>
            <div class="thumbs wide">
                <?php for ($i = 1; $i <= 3; $i++) { ?>
                    <picture class="pic-<?php echo $i ?>">
                        <source media="(-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 216dpi)" srcset="/img/aai/aai-<?php echo $i ?>@3x.webp">
                        <source media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" srcset="/img/aai/aai-<?php echo $i ?>@2x.webp">
                        <img src="/img/aai/aai-<?php echo $i ?>.webp" height="200" alt="AAI Website Redesign - Page <?php echo $i ?> - by Dwan" />
                    </picture>
                <?php } ?>
            </div>
        </section>

        <hr />

        <section class="middle style-top style-top-auto snap">
            <div class="text">
                <h2>From Idea&nbsp;<br hidden />to Execution</h2>
                <ol class="zero">
                    <li>AAI have clear idea on how the website will look. Because of that, the design process was quick
                        without the need of long brain storming.</li>
                    <li>With a very minimum brand Identity, I help them to acknowladge their brand identity using
                        current available resources.</li>
                </ol>
            </div>
            <div class="thumbs wide">
                <?php for ($i = 4; $i <= 7; $i++) { ?>
                    <picture class="pic-<?php echo $i ?>">
                        <source media="(-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 216dpi)" srcset="/img/aai/aai-<?php echo $i ?>@3x.webp">
                        <source media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" srcset="/img/aai/aai-<?php echo $i ?>@2x.webp">
                        <img src="/img/aai/aai-<?php echo $i ?>.webp" height="150" alt="AAI Website Redesign - Page <?php echo $i ?> - by Dwan" />
                    </picture>
                <?php } ?>
            </div>
        </section>

        <hr />

        <section class="middle style-flex style-flex-swap auto snap">
            <div class="style-row">
                <div class="style-column big">
                    <div class="meta">
                        <svg width="140" height="48" viewBox="0 0 199 68" class="logo aai" aria-label="Asosiasi Antropologi Indonesia's Logo">
                            <use href="/img/logo.svg#logo/aai"></use>
                        </svg>
                    </div>
                    <div class="text">
                        <h3>Brand Identity</h3>
                        <p>The use non common word “<strong>Kerabat</strong>”, which means "you + family" to refer “you” was a way to make the website sounds like antropolog.</p>
                    </div>
                </div>
                <div class="style-column">
                    <div class="meta color" hidden>
                        <ul class="flat">
                            <li style="background: #A0290B"></li>
                            <li style="background: #2E1415"></li>
                            <li style="background: #fff"></li>
                            <li style="background: #FAFBAB"></li>
                            <li></li>
                        </ul>
                    </div>
                    <div class="text">
                        <small>The color of red in the logo was suitable obvious pick for brand identity. Using it as prominent color.</small>
                    </div>
                </div>
                <div class="style-column">
                    <div class="meta">
                        <img src="/img/aai/slant.svg" width="46" height="32" alt="AAI's Slant Identity" />
                    </div>
                    <div class="text">
                        <small>The slant on the A in the logo was use extensively as decoration and brand identity.</small>
                    </div>
                </div>
            </div>
        </section>

        <hr />

        <section class="middle style-masonry style-masonry-2 snap-center">
            <div class="thumbs">
                <?php for ($i = 8; $i <= 18; $i++) { ?>
                    <?php if ($i == 14) { ?>
                        <div class="text">
                            <h3>The Visual Treatment</h3>
                            <p>Providing thematic photos as visual guide to break from monotonous wordy content.</p>
                        </div>
                    <?php } ?>
                    <picture class="pic-<?php echo $i ?>">
                        <source media="(-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 216dpi)" srcset="/img/aai/aai-<?php echo $i ?>@3x.webp">
                        <source media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" srcset="/img/aai/aai-<?php echo $i ?>@2x.webp">
                        <img src="/img/aai/aai-<?php echo $i ?>.webp" height="250" alt="AAI Website Redesign - Page <?php echo $i ?> - by Dwan" />
                    </picture>
                <?php } ?>
            </div>
            <div class="shade"></div>
        </section>

        <hr />

        <section class="middle style-background clip snap-center">
            <div class="text">
                <h3>The&nbsp;<br hidden />Interface&nbsp;<br hidden />Guideline</h3>
                <p>The newly created interface guideline will provide consistent interface development in the future.</p>
            </div>
            <div class="thumbs">
                <img src="/img/aai/guideline.svg" height="500" alt="AAI Website Redesign - Guideline - by Dwan" />
            </div>
        </section>

        <hr />

        <section class="middle style-3d snap-bottom">
            <div class="thumbs">
                <?php for ($i = 3; $i >= 1; $i--) { ?>
                    <div>
                        <picture class="pic-<?php echo $i ?>">
                            <source media="(-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 216dpi)" srcset="/img/aai-wp/aai-<?php echo $i ?>@4x.webp">
                            <source media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" srcset="/img/aai-wp/aai-<?php echo $i ?>@3x.webp">
                            <img src="/img/aai-wp/aai-<?php echo $i ?>@2x.webp" height="250" alt="AAI Website Redesign - WordPress Page <?php echo $i ?> - by Dwan" />
                        </picture>
                    </div>
                <?php } ?>
            </div>
            <div class="text">
                <h3>And The CMS&nbsp;<br hidden />Development</h3>
                <p>It was develop using WordPress for&nbsp;<br hidden />fast development, which just under 2 weeks.&nbsp;<br hidden />And most importanly the familiarity of&nbsp;<br hidden />the platform from the website editorial.</p>
            </div>
        </section>

        <hr />

        <div class="links snap-bottom">
            <nav>
                <div class="prototype">
                    <a href="https://antropologiindonesia.or.id" aria-label="AAI - Website" target="_BLANK" class="title"><span>visit the website</span></a>
                    <a href="https://antropologiindonesia.or.id" aria-label="AAI - Website" target="_BLANK"><span>Asosiasi Antropologi Indonesia</span></a>
                </div>
                <div class="continue">
                    <a href="./bkpm" aria-label="Ministry of Investment/BKPM Website Redesign" class="title"><span>next case study</span></a>
                    <a href="./bkpm" aria-label="Ministry of Investment/BKPM Website Redesign"><span>Ministry of Investment/BKPM Website Redesign</span></a>
                </div>
            </nav>
        </div>

        <hr />

        <div class="footer">
            <p class="reading">Reading time: 40 seconds</p>
        </div>
    </main>

    <?php include_once "part_footer.php"; ?>
</body>

<?php include_once "part_script.php"; ?>

</html>