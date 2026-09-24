/* ==========================================================================
   SUTRI PAAR — main.js
   Header state, mobile nav, scroll progress, back-to-top,
   FAQ accordion, hotel filter, package tabs, contact form validation,
   lightbox, button ripple.
   ========================================================================== */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initMobileNav();
    initScrollProgress();
    initBackToTop();
    initFaqAccordion();
    initHotelFilter();
    initPackageTabs();
    initContactForm();
    initLightbox();
    initRipple();
  });

  /* ---------------- Header scroll state ---------------- */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var hasHero = document.querySelector(".hero");

    function setState() {
      var scrolled = window.scrollY > 40;
      if (scrolled || !hasHero) {
        header.classList.add("is-solid");
        header.classList.remove("is-transparent");
      } else {
        header.classList.add("is-transparent");
        header.classList.remove("is-solid");
      }
    }
    setState();
    window.addEventListener("scroll", setState, { passive: true });
  }

  /* ---------------- Mobile nav ---------------- */
  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".main-nav");
    var scrim = document.querySelector(".nav-scrim");
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove("is-open");
      if (scrim) scrim.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    function open() {
      nav.classList.add("is-open");
      if (scrim) scrim.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.contains("is-open");
      isOpen ? close() : open();
    });
    if (scrim) scrim.addEventListener("click", close);
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------------- Scroll progress bar ---------------- */
  function initScrollProgress() {
    var bar = document.querySelector(".scroll-progress");
    if (!bar) return;
    function update() {
      var doc = document.documentElement;
      var scrollTop = doc.scrollTop || document.body.scrollTop;
      var height = doc.scrollHeight - doc.clientHeight;
      var pct = height > 0 ? (scrollTop / height) * 100 : 0;
      bar.style.width = pct + "%";
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  /* ---------------- Back to top ---------------- */
  function initBackToTop() {
    var btn = document.querySelector(".back-to-top");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("is-visible", window.scrollY > 700);
    }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  /* ---------------- FAQ accordion ---------------- */
  function initFaqAccordion() {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      if (!q || !a) return;
      q.addEventListener("click", function () {
        var isOpen = q.getAttribute("aria-expanded") === "true";
        items.forEach(function (other) {
          var oq = other.querySelector(".faq-q");
          var oa = other.querySelector(".faq-a");
          if (!oq || !oa) return;
          oq.setAttribute("aria-expanded", "false");
          oa.style.maxHeight = null;
        });
        if (!isOpen) {
          q.setAttribute("aria-expanded", "true");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------------- Hotel filter ---------------- */
  function initHotelFilter() {
    var buttons = document.querySelectorAll("[data-hotel-filter]");
    var cards = document.querySelectorAll("[data-hotel-cat]");
    if (!buttons.length) return;
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var filter = btn.getAttribute("data-hotel-filter");
        cards.forEach(function (card) {
          var cat = card.getAttribute("data-hotel-cat");
          var show = filter === "all" || cat === filter;
          card.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  /* ---------------- Package tabs (filter by category) ---------------- */
  function initPackageTabs() {
    var tabs = document.querySelectorAll("[data-pkg-filter]");
    var cards = document.querySelectorAll("[data-pkg-cat]");
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("is-active"); });
        tab.classList.add("is-active");
        var filter = tab.getAttribute("data-pkg-filter");
        cards.forEach(function (card) {
          var cat = card.getAttribute("data-pkg-cat");
          var show = filter === "all" || cat === filter;
          card.hidden = !show;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---------------- Contact form validation ---------------- */
  function initContactForm() {
    var form = document.querySelector("#enquiry-form");
    if (!form) return;
    var success = document.querySelector(".form-success");

    var validators = {
      name: function (v) { return v.trim().length >= 2; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
      phone: function (v) { return /^[+]?[0-9\s-]{7,15}$/.test(v.trim()); },
      destination: function (v) { return v.trim().length > 0; },
      travelDate: function (v) { return v.trim().length > 0; },
      travellers: function (v) { return Number(v) > 0; },
      message: function (v) { return v.trim().length >= 10; }
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      Object.keys(validators).forEach(function (name) {
        var input = form.elements[name];
        if (!input) return;
        var field = input.closest(".field");
        var ok = validators[name](input.value);
        if (field) field.classList.toggle("has-error", !ok);
        if (!ok) valid = false;
      });

      if (valid) {
        form.reset();
        form.style.display = "none";
        if (success) success.classList.add("is-visible");
      } else {
        var firstError = form.querySelector(".has-error");
        if (firstError) firstError.querySelector("input, textarea, select").focus();
      }
    });

    Object.keys(validators).forEach(function (name) {
      var input = form.elements[name];
      if (!input) return;
      input.addEventListener("input", function () {
        var field = input.closest(".field");
        if (field && field.classList.contains("has-error") && validators[name](input.value)) {
          field.classList.remove("has-error");
        }
      });
    });
  }

  /* ---------------- Lightbox ---------------- */
  function initLightbox() {
    var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
    if (!triggers.length) return;

    var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.innerHTML =
      '<div class="lightbox-backdrop" data-close></div>' +
      '<button class="lightbox-nav lightbox-prev" aria-label="Previous image">&#8592;</button>' +
      '<div class="lightbox-panel">' +
        '<button class="lightbox-close" aria-label="Close image preview">&times;</button>' +
        '<div class="lightbox-media"><img src="" alt=""></div>' +
        '<div class="lightbox-body"><h3></h3><p></p></div>' +
      '</div>' +
      '<button class="lightbox-nav lightbox-next" aria-label="Next image">&#8594;</button>';
    document.body.appendChild(lightbox);

    var lastFocused = null;
    var img = lightbox.querySelector("img");
    var title = lightbox.querySelector("h3");
    var desc = lightbox.querySelector("p");
    var current = 0;

    function renderSlide(i) {
      current = (i + triggers.length) % triggers.length;
      var t = triggers[current];
      img.src = t.getAttribute("data-lightbox-image") || t.querySelector("img") && t.querySelector("img").src;
      img.alt = t.getAttribute("data-lightbox-alt") || "";
      title.textContent = t.getAttribute("data-lightbox-title") || "";
      desc.textContent = t.getAttribute("data-lightbox-desc") || "";
    }

    function openAt(i) {
      renderSlide(i);
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
      var closeBtn = lightbox.querySelector(".lightbox-close");
      if (closeBtn) closeBtn.focus();
    }
    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    }

    triggers.forEach(function (t, i) {
      t.addEventListener("click", function (e) {
        // Triggers can sit inside a real link (destination cards). Keep the
        // card's own navigation intact and only open the preview from here.
        e.preventDefault();
        e.stopPropagation();
        lastFocused = t;
        openAt(i);
      });
    });

    lightbox.querySelectorAll("[data-close], .lightbox-close").forEach(function (el) {
      el.addEventListener("click", closeLightbox);
    });
    lightbox.querySelector(".lightbox-prev").addEventListener("click", function () { renderSlide(current - 1); });
    lightbox.querySelector(".lightbox-next").addEventListener("click", function () { renderSlide(current + 1); });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") renderSlide(current - 1);
      if (e.key === "ArrowRight") renderSlide(current + 1);
    });
  }

  /* ---------------- Button ripple ---------------- */
  function initRipple() {
    document.querySelectorAll(".btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        var rect = btn.getBoundingClientRect();
        var ripple = document.createElement("span");
        var size = Math.max(rect.width, rect.height);
        ripple.className = "btn-ripple";
        ripple.style.width = ripple.style.height = size + "px";
        var originX = e.clientX || rect.left + rect.width / 2;
        var originY = e.clientY || rect.top + rect.height / 2;
        ripple.style.left = (originX - rect.left - size / 2) + "px";
        ripple.style.top = (originY - rect.top - size / 2) + "px";
        btn.appendChild(ripple);
        setTimeout(function () { ripple.remove(); }, 700);
      });
    });
  }
})();
