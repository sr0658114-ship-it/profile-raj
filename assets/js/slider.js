/* ==========================================================================
   SUTRI PAAR — slider.js
   Homepage hero slider: autoplay, arrows, dots, swipe, keyboard, pause on hover.
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var hero = document.querySelector(".hero[data-slider]");
    if (!hero) return;

    var slides = Array.prototype.slice.call(hero.querySelectorAll(".hero-slide"));
    var dotsWrap = hero.querySelector(".hero-dots");
    var prevBtn = hero.querySelector(".hero-prev");
    var nextBtn = hero.querySelector(".hero-next");
    var captionPlace = hero.querySelector(".caption-place");
    var captionTitle = hero.querySelector(".caption-title");
    if (!slides.length) return;

    var current = 0;
    var AUTOPLAY_MS = 6000;
    var timer = null;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Build dots
    var dots = [];
    if (dotsWrap) {
      slides.forEach(function (s, i) {
        var d = document.createElement("button");
        d.className = "hero-dot";
        d.type = "button";
        d.setAttribute("aria-label", "Go to slide " + (i + 1));
        d.addEventListener("click", function () { goTo(i); resetTimer(); });
        dotsWrap.appendChild(d);
        dots.push(d);
      });
    }

    function render() {
      slides.forEach(function (s, i) { s.classList.toggle("is-active", i === current); });
      dots.forEach(function (d, i) { d.classList.toggle("is-active", i === current); });
      var active = slides[current];
      slides.forEach(function (s2, i) { s2.setAttribute("aria-hidden", i === current ? "false" : "true"); });
      if (captionPlace) captionPlace.textContent = active.getAttribute("data-place") || "";
      if (captionTitle) captionTitle.textContent = active.getAttribute("data-title") || "";
    }

    function goTo(i) {
      current = (i + slides.length) % slides.length;
      render();
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startTimer() {
      if (reduced) return;
      timer = setInterval(next, AUTOPLAY_MS);
    }
    function stopTimer() { if (timer) clearInterval(timer); }
    function resetTimer() { stopTimer(); startTimer(); }

    if (nextBtn) nextBtn.addEventListener("click", function () { next(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); resetTimer(); });

    hero.addEventListener("mouseenter", stopTimer);
    hero.addEventListener("mouseleave", startTimer);

    hero.setAttribute("tabindex", "0");
    hero.setAttribute("role", "region");
    hero.setAttribute("aria-roledescription", "carousel");
    hero.setAttribute("aria-label", "Featured South India destinations");
    hero.addEventListener("focusin", stopTimer);
    hero.addEventListener("focusout", startTimer);
    hero.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { next(); resetTimer(); }
      if (e.key === "ArrowLeft") { prev(); resetTimer(); }
    });

    // Touch / swipe support
    var touchStartX = 0, touchEndX = 0;
    hero.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    hero.addEventListener("touchend", function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var delta = touchEndX - touchStartX;
      if (Math.abs(delta) > 40) {
        delta < 0 ? next() : prev();
        resetTimer();
      }
    }, { passive: true });

    render();
    startTimer();
  });
})();
