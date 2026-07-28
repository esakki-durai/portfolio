(function () {
  "use strict";

  function formEmbedSrc(url) {
    if (!url || typeof url !== "string") return "";
    var u = url.trim();
    if (!u) return "";
    if (u.indexOf("embedded=true") !== -1) return u;
    return u + (u.indexOf("?") >= 0 ? "&" : "?") + "embedded=true";
  }

  var formUrl = window.PORTFOLIO_GOOGLE_FORM_URL;
  if (formUrl && typeof formUrl === "string" && formUrl.trim().length > 0) {
    var clean = formUrl.trim();
    document.querySelectorAll("a.link-gform").forEach(function (a) {
      a.href = clean;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    });
    var frame = document.getElementById("googleFormFrame");
    if (frame) {
      var embed = formEmbedSrc(clean);
      if (embed) frame.src = embed;
    }
    var note = document.getElementById("gformSetupNote");
    if (note) note.classList.add("d-none");
  }

  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar .nav-link");

  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 24) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    const scrollPos = window.scrollY + 100;
    document.querySelectorAll("section[id]").forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId.length < 2) return;
      const el = document.querySelector(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        const bsCollapse = document.querySelector(".navbar-collapse");
        if (bsCollapse && bsCollapse.classList.contains("show")) {
          bootstrap.Collapse.getOrCreateInstance(bsCollapse).hide();
        }
      }
    });
  });
})();
