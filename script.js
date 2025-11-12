const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
// --- Starry Background ---
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let stars = Array.from({ length: 150 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.2,
  s: Math.random() * 0.5 + 0.2,
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.s;
    if (star.y > canvas.height) star.y = 0;
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// --- Typing Effect ---
const introText = "Hello, it's me Afolarin Oluwasegun.";
const roles = [
  "Fullstack Developer",
  "Graphic Designer",
  "UI/UX Designer"
];

const introEl = document.getElementById("intro");
const roleEl = document.getElementById("role");

let roleIndex = 0;

function typeText(el, text, delay = 100) {
  return new Promise(resolve => {
    el.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i === text.length) {
        clearInterval(interval);
        setTimeout(resolve, 1000);
      }
    }, delay);
  });
}

async function startTyping() {
  // First line types fully
  await typeText(introEl, introText);

  // Now continuously type roles only
  while (true) {
    const role = roles[roleIndex];
    await typeText(roleEl, role);
    roleIndex = (roleIndex + 1) % roles.length;
  }
}

startTyping();

// === ABOUT SECTION ANIMATIONS ===

// Fade-in on scroll
const aboutSection = document.querySelector('.about-container');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // run once
      }
    });
  },
  { threshold: 0.3 }
);

observer.observe(aboutSection);

// Ripple effect for the Download CV button
const cvButton = document.querySelector('.cv-btn');
cvButton.addEventListener('click', function (e) {
  const circle = document.createElement('span');
  const rect = this.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.classList.add('ripple');
  this.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
});

// ==== SKILLS ANIMATION (v2) ====

document.addEventListener("DOMContentLoaded", () => {
  const skillCards = document.querySelectorAll(".skill-card");

  // Physics-inspired number animation
  function animateValue(el, target, duration) {
    let startTime = null;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    function update(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const value = Math.floor(easedProgress * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // Animate cards when visible
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const valueEl = card.querySelector(".skill-value");
          const targetValue = parseInt(card.dataset.target, 10);
          if (!isNaN(targetValue)) {
            animateValue(valueEl, targetValue, 2000);
          }
          card.classList.add("visible");
          obs.unobserve(card);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillCards.forEach((card) => observer.observe(card));
});
// ===== PROJECTS SCRIPT =====

// Run everything after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const preloader = document.getElementById("projects-preloader");

  // ==== FILTER FUNCTIONALITY ====
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (category === "all" || cardCategory === category) {
          card.style.display = "block";
          setTimeout(() => card.classList.add("visible"), 100);
        } else {
          card.classList.remove("visible");
          setTimeout(() => (card.style.display = "none"), 200);
        }
      });
    });
  });

  // ==== SCROLL REVEAL ====
  const animatedElements = document.querySelectorAll("[data-animate]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    animatedElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback for old browsers
    animatedElements.forEach((el) => el.classList.add("visible"));
  }

  // ==== PROJECTS PRELOADER ====
  window.addEventListener("load", () => {
    if (preloader) {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 800);
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const textEl = document.getElementById("testimonial-text");
  const nameEl = document.getElementById("testimonial-name");
  const roleEl = document.getElementById("testimonial-role");
  const imgEl = document.getElementById("testimonial-img");
  const cardEl = document.getElementById("testimonial-card");

  const testimonials = [
    {
      text: "Collaborating with Afolarin was effortless — his understanding of both design and development made our web experience seamless.",
      name: "David Ikenna",
      role: "Product Manager, SoftNet",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      text: "He delivered a flawless UI that perfectly matched our brand’s voice. Every detail felt intentional and professional.",
      name: "Zainab Yusuf",
      role: "Founder, ZDesign Studio",
      img: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
      text: "Afolarin’s full-stack skills are sharp. From database logic to pixel alignment, everything was clean and scalable.",
      name: "Michael Chukwu",
      role: "CTO, Cloudify Africa",
      img: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
      text: "He transformed our brand visuals into something modern and memorable. The logo system he built still stands out today.",
      name: "Fatima Bello",
      role: "Creative Director, ArtHaus",
      img: "https://randomuser.me/api/portraits/women/41.jpg",
    },
    {
      text: "Professional, disciplined, and imaginative. Afolarin brings ideas to life faster than expected and better than planned.",
      name: "John Eze",
      role: "Entrepreneur",
      img: "https://randomuser.me/api/portraits/men/50.jpg",
    },
  ];

  let index = 0;

  function showTestimonial() {
    const { text, name, role, img } = testimonials[index];
    cardEl.classList.remove("fade-in");
    cardEl.classList.add("fade-out");

    setTimeout(() => {
      textEl.textContent = text;
      nameEl.textContent = name;
      roleEl.textContent = role;
      imgEl.src = img;

      cardEl.classList.remove("fade-out");
      cardEl.classList.add("fade-in", "visible");
    }, 600);

    index = (index + 1) % testimonials.length;
  }

  showTestimonial();
  setInterval(showTestimonial, 7000);
});
// === FOOTER YEAR ===
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
// === SCROLL REVEAL + SKILL COUNTER ===
document.addEventListener("DOMContentLoaded", () => {
  const skillCards = document.querySelectorAll(".skill-card");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          card.classList.add("visible");

          // Start counting animation
          const numberEl = card.querySelector(".number");
          const target = parseInt(card.dataset.value, 10);
          let current = 0;
          const duration = 1500; // 1.5s total duration
          const stepTime = Math.max(Math.floor(duration / target), 20);

          const counter = setInterval(() => {
            current += 1;
            numberEl.textContent = `${current}%`;
            if (current >= target) {
              clearInterval(counter);
              numberEl.textContent = `${target}%`;
            }
          }, stepTime);

          // Stop observing after first reveal
          obs.unobserve(card);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillCards.forEach((card) => observer.observe(card));
});
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const submitBtn = form.querySelector("button[type='submit']");

  // Create feedback message element
  const messageEl = document.createElement("p");
  messageEl.className = "form-message";
  messageEl.style.marginTop = "1rem";
  messageEl.style.textAlign = "center";
  messageEl.style.fontWeight = "600";
  form.appendChild(messageEl);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    messageEl.textContent = "";
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    if (!navigator.onLine) {
      showMessage("⚠️ No internet connection.", "#ff4d4d");
      resetButton();
      return;
    }

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        showMessage("🎉 Message sent successfully! Thank you for reaching out to Afolarin.", "#00c851");
      } else {
        showMessage("⚠️ Something went wrong. Please try again.", "#ff4d4d");
      }
    } catch (error) {
      showMessage("⚠️ Something went wrong. Please try again.", "#ff4d4d");
      console.error(error);
    } finally {
      resetButton();
    }
  });

  function showMessage(text, color) {
    messageEl.textContent = text;
    messageEl.style.color = color;
    messageEl.style.opacity = "1";

    // Clear message after 4 seconds
    setTimeout(() => {
      messageEl.style.transition = "opacity 0.5s ease";
      messageEl.style.opacity = "0";
      setTimeout(() => (messageEl.textContent = ""), 500);
    }, 4000);
  }

  function resetButton() {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
});