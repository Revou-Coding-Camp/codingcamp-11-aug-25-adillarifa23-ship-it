// ===== Utility Selector =====
const $ = (sel) => document.querySelector(sel);

// ===== Greeting: "Hi Name" =====
function setName(name) {
  $("#userName").textContent = name || "Name";
}

function askNameIfMissing() {
  let name = localStorage.getItem("visitor_name");
  if (!name) {
    name = prompt("Hi! What's your name?");
    if (name && name.trim().length >= 2) {
      localStorage.setItem("visitor_name", name.trim());
    }
  }
  setName(localStorage.getItem("visitor_name"));
}

function changeNameFlow() {
  const newName = prompt("Enter your name:");
  if (newName && newName.trim().length >= 2) {
    localStorage.setItem("visitor_name", newName.trim());
    setName(newName.trim());
  } else {
    alert("Name must be at least 2 characters.");
  }
}

// ===== Mobile Menu =====
function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("hidden");
    nav.classList.toggle("flex");
    nav.classList.add("flex-col", "gap-4", "bg-gray-800", "p-4");
  });
}

// ===== Form Validation =====
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function validatePhone(num) {
  return /^[0-9]{10,15}$/.test(num.replace(/\D/g, ""));
}

function handleFormSubmit(e) {
  e.preventDefault();
  const name = $("#name").value.trim();
  const email = $("#email").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked')?.value || "-";
  const phone = $("#phone").value.trim().replace(/\D/g, "");
  const message = $("#message").value.trim();

  let valid = true;

  // Name
  if (name.length < 3) {
    $("#err-name").textContent = "Nama minimal 3 karakter.";
    valid = false;
  } else {
    $("#err-name").textContent = "";
  }

  // Email
  if (!validateEmail(email)) {
    $("#err-email").textContent = "Format email tidak valid.";
    valid = false;
  } else {
    $("#err-email").textContent = "";
  }

  // Phone
  if (!validatePhone(phone)) {
    $("#err-phone").textContent = "Nomor telepon 10–15 digit angka.";
    valid = false;
  } else {
    $("#err-phone").textContent = "";
  }

  // Message
  if (message.length < 0) {
    $("#err-message").textContent = "";
    valid = false;
  } else {
    $("#err-message").textContent = "";
  }

  if (!valid) return;

  // Output ke panel hasil
  const result = [
    "=== Message Us Form Data ===",
    `Name    : ${name}`,
    `Email   : ${email}`,
    `Gender  : ${gender}`,
    `Phone   : ${phone}`,
    `Message : ${message}`,
  ].join("\n");

  $("#formResult").textContent = result;
  e.target.reset();
}

function setYear() {
  $("#year").textContent = new Date().getFullYear();
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  askNameIfMissing();
  $("#changeNameBtn").addEventListener("click", changeNameFlow);
  $("#contactForm").addEventListener("submit", handleFormSubmit);
  setupMobileMenu();
  setYear();
});
