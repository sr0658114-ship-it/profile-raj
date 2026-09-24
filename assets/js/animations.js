/* ==========================================================================
   SUTRI PAAR — animations.js
   IntersectionObserver-driven scroll reveals + animated number counters.
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---- Scroll reveal ---- */
    var revealEls = document.querySelectorAll("[data-reveal]");
    if (revealEls.length) {
      if (reduced || !("IntersectionObserver" in window)) {
        revealEls.forEach(function (el) { el.classList.add("is-visible"); });
      } else {
        var groups = {};
        revealEls.forEach(function (el) {
          var group = el.getAttribute("data-reveal-group") || "default";
          groups[group] = groups[group] || 0;
        });

        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            var group = el.getAttribute("data-reveal-group") || "default";
            var idx = groups[group]++;
            el.style.setProperty("--stagger-delay", Math.min(idx * 90, 540) + "ms");
            el.classList.add("is-visible");
            observer.unobserve(el);
          });
        }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

        revealEls.forEach(function (el) { observer.observe(el); });
      }
    }

    /* ---- Number counters ---- */
    var counters = document.querySelectorAll("[data-counter]");
    if (counters.length && "IntersectionObserver" in window) {
      var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        });
      }, { threshold: 0.6 });
      counters.forEach(function (c) { counterObserver.observe(c); });
    } else {
      counters.forEach(function (c) { c.textContent = c.getAttribute("data-counter") + (c.getAttribute("data-suffix") || ""); });
    }

    function animateCounter(el) {
      var target = parseFloat(el.getAttribute("data-counter"));
      var suffix = el.getAttribute("data-suffix") || "";
      var duration = reduced ? 0 : 1400;
      if (duration === 0) {
        el.textContent = target + suffix;
        el.classList.add("is-counted");
        return;
      }
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = Math.floor(eased * target);
        el.textContent = value + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target + suffix;
          el.classList.add("is-counted");
        }
      }
      requestAnimationFrame(step);
    }
  });
})();
