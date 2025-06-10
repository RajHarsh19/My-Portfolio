// Typed.js-like typing effect (simple vanilla JS version)
function typeText(element, words, speed = 100, delayBetweenWords = 1500) {
  let wordIndex = 0;
  let charIndex = 0;
  let currentWord = '';
  let isDeleting = false;

  function type() {
    if (wordIndex >= words.length) {
      wordIndex = 0;
    }
    currentWord = words[wordIndex];

    if (!isDeleting) {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, delayBetweenWords);
        return;
      }
    } else {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex++;
      }
    }
    setTimeout(type, speed);
  }

  type();
}

// Check if element is in viewport
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

document.addEventListener("DOMContentLoaded", () => {
  // Typed effect
  const typedSpan = document.querySelector(".text");
  let typingStarted = false;

  function onScroll() {
    if (!typingStarted && isInViewport(typedSpan)) {
      typedSpan.classList.add("fade-in");
      typeText(typedSpan, ["Frontend Developer", "Coder", "Tech Enthusiast", "AI/ML Enthusiast"]);
      typingStarted = true;
      window.removeEventListener("scroll", onScroll);
    }
  }

  // Initial check in case element is already visible
  onScroll();

  // Listen to scroll events
  window.addEventListener("scroll", onScroll);

  // Smooth scroll for navbar links
  const navLinks = document.querySelectorAll(".navbar a");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Smooth scroll for buttons with .btn-box class if they have href="#section"
  const buttons = document.querySelectorAll(".btn-box");
  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      const href = button.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Contact form validation & submission
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = contactForm.elements["name"];
      const email = contactForm.elements["email"];
      const message = contactForm.elements["message"];

      let valid = true;

      // Reset border colors
      [name, email, message].forEach(field => {
        field.style.borderColor = "";
      });

      // Simple validation
      if (!name.value.trim()) {
        valid = false;
        name.style.borderColor = "red";
      }
      if (!email.value.trim()) {
        valid = false;
        email.style.borderColor = "red";
      } else {
        // Email format check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
          valid = false;
          email.style.borderColor = "red";
        }
      }
      if (!message.value.trim()) {
        valid = false;
        message.style.borderColor = "red";
      }

      if (!valid) {
        alert("Please fill all fields correctly.");
        return;
      }

      // Submit form if valid
      contactForm.submit();
    });
  }
});
