// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

/* ===============================
   PRELOADER
=================================*/
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("preloader-hidden");
    }, 400); // small delay so the animation is felt, not just flashed
  }
});

// Safety net: force-hide preloader after 4s even if load event is slow/misses
setTimeout(() => {
  const preloader = document.getElementById("preloader");
  if (preloader) preloader.classList.add("preloader-hidden");
}, 4000);

/* ===============================
   HERO — typewriter role cycler
=================================*/
const roles = [
  "Fullstack Developer",
  "UI/UX Designer",
  "API Integrator",
  "React & Laravel Dev",
];

const typedEl = document.getElementById("hero-typed");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!typedEl) return;

  const currentRole = roles[roleIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typedEl.textContent = currentRole.substring(0, charIndex);

  let delay = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentRole.length) {
    delay = 1400; // pause at full word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 300;
  }

  setTimeout(typeLoop, delay);
}

typeLoop();

/* ===============================
   MOBILE MENU TOGGLE
=================================*/
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuBars = document.querySelectorAll(".menu-bar");

function closeMenu() {
  mobileMenu.classList.add("hidden");
  mobileMenu.classList.remove("flex");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBars[0].style.transform = "";
  menuBars[1].style.opacity = "1";
  menuBars[2].style.transform = "";
}

function toggleMenu() {
  const isOpen = !mobileMenu.classList.contains("hidden");
  if (isOpen) {
    closeMenu();
  } else {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("flex");
    menuBtn.setAttribute("aria-expanded", "true");
    menuBars[0].style.transform = "translateY(6px) rotate(45deg)";
    menuBars[1].style.opacity = "0";
    menuBars[2].style.transform = "translateY(-6px) rotate(-45deg)";
  }
}

if (menuBtn) {
  menuBtn.addEventListener("click", toggleMenu);
}

document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close mobile menu automatically if window is resized back to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth >= 640) {
    closeMenu();
  }
});

/* ===============================
   SKILLS — animate bars into view
=================================*/
const skillBars = document.querySelectorAll(".skill-bar");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width;
        skillObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.4 }
);

skillBars.forEach((bar) => {
  bar.style.width = "0%";
  bar.style.transition = "width 1s ease";
  skillObserver.observe(bar);
});

/* ===============================
   LIGHTBOX (shared: projects + certificates)
=================================*/
const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightbox-content");
const lightboxClose = document.getElementById("lightbox-close");

function openLightbox() {
  lightbox.classList.remove("hidden");
  lightbox.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.add("hidden");
  lightbox.classList.remove("flex");
  lightboxContent.innerHTML = ""; // stops any playing video
  document.body.style.overflow = "";
}

/* --- Project gallery: image / video preview --- */
function openMediaLightbox(type, src, poster) {
  lightboxContent.innerHTML = "";
  lightboxContent.className = "max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl";

  if (type === "video") {
    const video = document.createElement("video");
    video.src = src;
    video.poster = poster || "";
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.className = "w-full h-full max-h-[80vh] object-contain bg-black";
    lightboxContent.appendChild(video);
  } else {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Project preview";
    img.className = "w-full h-full max-h-[80vh] object-contain bg-black";
    lightboxContent.appendChild(img);
  }

  openLightbox();
}

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const type = item.dataset.type;
    const src = item.dataset.src;
    const poster = item.dataset.poster;
    openMediaLightbox(type, src, poster);
  });
});

/* --- Certificates: professional card preview (PDF) --- */
function openCertificateLightbox(src, title, issuer) {
  lightboxContent.innerHTML = "";
  lightboxContent.className = "max-w-2xl w-full";

  const card = document.createElement("div");
  card.className = "bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col";

  card.innerHTML = `
    <div class="bg-navy-900 h-[55vh] sm:h-[65vh]">
      <iframe src="${src}#toolbar=1&view=FitH" title="${title} certificate"
              class="w-full h-full border-0" loading="lazy"></iframe>
    </div>
    <div class="p-5 sm:p-7 flex items-center justify-between gap-4">
      <div class="min-w-0">
        <p class="text-[11px] font-semibold uppercase tracking-widest text-accent-500 mb-1">Certificate</p>
        <h3 class="font-display font-bold text-lg text-navy-950 truncate">${title}</h3>
        <p class="text-sm text-slate-500 mt-1">${issuer}</p>
      </div>
      <div class="shrink-0 flex items-center gap-2">
        <a href="${src}" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
           aria-label="Open certificate in a new tab">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
        <a href="${src}" download
           class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent-500/10 text-accent-500 hover:bg-accent-500 hover:text-white transition"
           aria-label="Download certificate">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </a>
      </div>
    </div>
  `;

  lightboxContent.appendChild(card);
  openLightbox();
}

document.querySelectorAll(".cert-view").forEach((btn) => {
  btn.addEventListener("click", () => {
    const src = btn.dataset.src;
    const title = btn.dataset.title;
    const issuer = btn.dataset.issuer;
    openCertificateLightbox(src, title, issuer);
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* ===============================
   CONTACT FORM — Formspree AJAX submission
=================================*/
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");
const submitBtnText = document.getElementById("submit-btn-text");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    // loading state
    submitBtn.disabled = true;
    submitBtnText.textContent = "Sending...";
    formStatus.classList.add("hidden");

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        // success state
        submitBtnText.textContent = "Submitted ✓";
        formStatus.textContent = "Thanks  your message is on its way. I'll get back to you soon.";
        formStatus.className = "text-sm text-center text-emerald-600";
        formStatus.classList.remove("hidden");

        contactForm.reset();

        // return button to normal after a short pause
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtnText.textContent = "Send Message";
        }, 3000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (err) {
      submitBtn.disabled = false;
      submitBtnText.textContent = "Send Message";
      formStatus.textContent = "Something went wrong sending that. Please try again or email me directly.";
      formStatus.className = "text-sm text-center text-red-500";
      formStatus.classList.remove("hidden");
    }
  });
}