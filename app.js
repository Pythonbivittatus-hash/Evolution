/* Evolution landing page form config
   Paste your deployed Google Apps Script Web App URL below.
   The current form UI is fully live; submissions activate once FORM_ENDPOINT is filled. */
const FORM_ENDPOINT = ""; // e.g. "https://script.google.com/macros/s/AKfycb.../exec"

const form = document.querySelector("#interestForm");
const statusEl = document.querySelector("#formStatus");
const yearEl = document.querySelector("#year");
const interestError = document.querySelector("#interestError");

yearEl.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => observer.observe(item));

function getCheckedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((el) => el.value);
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  interestError.hidden = true;

  const interests = getCheckedValues("interests");
  if (!interests.length) {
    interestError.hidden = false;
    setStatus("Please choose at least one interest area.", true);
    return;
  }

  const data = new FormData(form);
  const payload = {
    timestamp: new Date().toISOString(),
    name: data.get("name") || "",
    email: data.get("email") || "",
    interests,
    versionInterest: data.get("versionInterest") || "",
    skills: data.get("skills") || "",
    message: data.get("message") || "",
    consent: data.get("consent") === "on",
    source: "GitHub Pages landing page"
  };

  if (!FORM_ENDPOINT) {
    setStatus("The page is ready, but the form backend still needs connecting. Add your Google Apps Script Web App URL to app.js.", true);
    console.warn("Form payload preview:", payload);
    return;
  }

  const button = form.querySelector("button[type='submit']");
  button.disabled = true;
  button.textContent = "Submitting...";
  setStatus("Sending your details into the early access pool...");

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    form.reset();
    setStatus("You’re on the Evolution interest list. Thank you for joining the early formation of the project.");
  } catch (error) {
    console.error(error);
    setStatus("Something went wrong. Please try again, or message Glass Mantle Studios directly.", true);
  } finally {
    button.disabled = false;
    button.textContent = "Join the list";
  }
});
