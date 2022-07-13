<!doctype html>
<html class="no-js" lang="en">

<head>
    <?php
    $title = "Suzuki Website Redesign";
    $description = "A short study case of website redesign pitching for Suzuki Indonesia";
    include_once "part_metacss.php";
    ?>
</head>

<body data-barba="wrapper">
    <?php include_once "part_head.php" ?>

    <main data-barba="container" data-barba-namespace="detail" class="detail suzuki">
        <section class="middle full snap">
            <div class="padding">
                <span><img src="/dwaan/img/logo/suzuki.svg" width="147" height="180" class="logo" alt="Suzuki's Logo" /></span>
            </div>
            <h4 class="year">/2020</h4>
            <div class="arrow-big">
                <a href="#more" class="arrow scrollto">
                    <span>read more</span>
                </a>
            </div>
        </section>

        <section id="more" class="middle style-spread clip snap">
            <div class="text">
                <div class="titles">
                    <h4>Project Pitching</h4>
                    <h1>Suzuki Indonesia</h1>
                </div>
                <p>Suzuki Indonesia just recently redesign their website, but they experience several issues and felt
                    that their website needs more improvement.</p>
            </div>
            <div class="thumbs">
                <?php for ($i = 4; $i <= 5; $i++) { ?>
                    <picture class="pic-<?php echo $i ?>">
                        <source media="(-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 216dpi)" srcset="/dwaan/img/suzuki/suzuki-<?php echo $i ?>@3x.webp">
                        <source media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" srcset="/dwaan/img/suzuki/suzuki-<?php echo $i ?>@2x.webp">
                        <img src="/dwaan/img/suzuki/suzuki-<?php echo $i ?>.webp" width="" height="" alt="Suzuki Indonesia Website Redesign - Page <?php echo $i ?> - by Dwan" />
                    </picture>
                <?php } ?>
            </div>
        </section>

        <section class="middle style-top snap">
            <div class="text">
                <h2>Main Key Suggestions</h2>
                <ol class="zero">
                    <li>Suzuki need to reinforce their corporate color into their website and their marketing materials.
                    </li>
                    <li>Restructuring their website information based on initial user persona is the key vital point for
                        redesign.</li>
                    <li>Further more, suggesting some improvement on their website server infrastructures.</li>
                </ol>
            </div>
            <div class="thumbs">
                <?php for ($i = 2; $i <= 9; $i++) { ?>
                    <picture class="pic-<?php echo $i ?>">
                        <source media="(-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 216dpi)" srcset="/dwaan/img/suzuki/suzuki-<?php echo $i ?>@3x.webp">
                        <source media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" srcset="/dwaan/img/suzuki/suzuki-<?php echo $i ?>@2x.webp">
                        <img src="/dwaan/img/suzuki/suzuki-<?php echo $i ?>.webp" width="" height="" alt="Suzuki Indonesia Website Redesign - Page <?php echo $i ?> - by Dwan" />
                    </picture>
                <?php } ?>
            </div>
        </section>

        <section class="middle style-flex auto snap">
            <div class="style-row">
                <div class="style-column">
                    <div class="meta">
                        <img src="/dwaan/img/logo/suzuki.svg" width="70" height="85" alt="Suzuki's Logo" />
                    </div>
                    <div class="text">
                        <h3>Corporate Identity</h3>
                        <p>Reinforcing their corporate identity - in this case their logo - into their website and their
                            marketing materials to provide consistency on visual elements.</p>
                    </div>
                </div>
                <div class="style-column">
                    <div class="meta color">
                        <ul class="flat">
                            <li style="background: #E20A17"></li>
                            <li style="background: #003399"></li>
                            <li>Primary</li>
                        </ul>
                        <ul class="flat">
                            <li style="background: #FFD700"></li>
                            <li style="background: #fff"></li>
                            <li style="background: #000"></li>
                            <li>Secondary</li>
                        </ul>
                    </div>
                    <div class="text">
                        <small>The color scheme derived from logo color with inpiration from super hero color
                            scheme.</small>
                    </div>
                </div>
                <div class="style-column">
                    <div class="meta">
                        <ul class="bland">
                            <li style="background: #E20A17"></li>
                            <li style="background: #003399"></li>
                        </ul>
                    </div>
                    <div class="text">
                        <small>The shape of the S logo provide distinctive look on button element.</small>
                    </div>
                </div>
            </div>
        </section>

        <section class="middle style-masonry snap-center">
            <div class="thumbs">
                <?php for ($i = 1; $i <= 11; $i++) { ?>
                    <?php if ($i == 7) { ?>
                        <div class="text">
                            <h3>Optimizing Layout</h3>
                            <p>Products page layout are more optimized for mobile visitor with clear separation between information.</p>
                        </div>
                    <?php } ?>
                    <picture class="pic-<?php echo $i ?>">
                        <source media="(-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 216dpi)" srcset="/dwaan/img/suzuki/suzuki-<?php echo $i ?>@3x.webp">
                        <source media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" srcset="/dwaan/img/suzuki/suzuki-<?php echo $i ?>@2x.webp">
                        <img src="/dwaan/img/suzuki/suzuki-<?php echo $i ?>.webp" width="" height="" alt="Suzuki Indonesia Website Redesign - Page <?php echo $i ?> - by Dwan" />
                    </picture>
                <?php } ?>
            </div>
            <div class="shade"></div>
        </section>

        <section class="middle style-angled snap-bottom clip">
            <div class="text">
                <h3>Navigation</h3>
                <p>Further improvement in navigation means visitor can easily see their latest products with fewer taps.
                </p>
            </div>
            <div class="thumbs">
                <?php for ($i = 1; $i <= 11; $i++) { ?>
                    <picture class="pic-<?php echo $i ?>">
                        <source media="(-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 216dpi)" srcset="/dwaan/img/suzuki/suzuki-<?php echo $i ?>@3x.webp">
                        <source media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" srcset="/dwaan/img/suzuki/suzuki-<?php echo $i ?>@2x.webp">
                        <img src="/dwaan/img/suzuki/suzuki-<?php echo $i ?>.webp" width="" height="" alt="Suzuki Indonesia Website Redesign - Page <?php echo $i ?> - by Dwan" />
                    </picture>
                <?php } ?>
            </div>
        </section>

        <section class="links snap-bottom">
            <nav>
                <div class="prototype">
                    <a href="https://www.figma.com/proto/wHx1vyiae61nxxQ71gyREp/Suzuki?page-id=0%3A1&node-id=2%3A3&viewport=348%2C25%2C0.1&scaling=scale-down&starting-point-node-id=2%3A3" aria-label="Figma Prototype - Suzuki - Website Redesign" target="_BLANK" class="title"><span>visit the prototype</span></a>
                    <a href="https://www.figma.com/proto/wHx1vyiae61nxxQ71gyREp/Suzuki?page-id=0%3A1&node-id=2%3A3&viewport=348%2C25%2C0.1&scaling=scale-down&starting-point-node-id=2%3A3" aria-label="Figma Prototype - Suzuki - Website Redesign" target="_BLANK"><span>mobile</span></a>
                </div>
                <div class="continue">
                    <a href="./musiku" class="title"><span>next case study</span></a>
                    <a href="./musiku"><span><i>Musiku</i></span></a>
                </div>
            </nav>
        </section>

        <section class="footer">
            <p class="reading">Reading time: 50 seconds</p>
        </section>
    </main>

    <?php include_once "part_script.php"; ?>
</body>

</html>