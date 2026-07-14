// Mobile nav toggle
const burger = document.querySelector(".nav-burger");
const mobileNav = document.querySelector(".nav-mobile");

burger.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(open));
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  });
});

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Quote form: validate, then open a pre-filled WhatsApp chat to Nathan
// TODO: when the business email exists, consider switching this (or adding a fallback) to email
const WHATSAPP_NUMBER = "353851275801";

const form = document.getElementById("quote-form");
const note = document.getElementById("form-note");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;
  form.querySelectorAll(".field").forEach((field) => {
    const input = field.querySelector("input, textarea");
    const error = field.querySelector(".field-error");
    const bad = input.required && !input.value.trim();
    field.classList.toggle("invalid", bad);
    if (error) error.hidden = !bad;
    if (bad) valid = false;
  });
  if (!valid) return;

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const location = form.location.value.trim();
  const details = form.details.value.trim();

  const message = [
    "Hi Nathan, I'd like a quote from Bull Power Solutions.",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    location ? `Location: ${location}` : null,
    "",
    "Job details:",
    details,
  ]
    .filter((line) => line !== null)
    .join("\n");

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");

  note.textContent = "WhatsApp should open with your details filled in. If it doesn't, just call or text Nathan on 085 127 5801.";
  note.hidden = false;
});
