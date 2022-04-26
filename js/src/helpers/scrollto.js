function scrollto(el) {
    el.addEventListener("click", function (e) {
        e.preventDefault();
        removeClass(_q("html"), "snap");

        gsap.to(window, {
            duration: .75,
            ease: "expo.inOut",
            scrollTo: e.target.getAttribute("href"),
            onComplete: function () {
                addClass(_q("html"), "snap");
            }
        });
    });
}