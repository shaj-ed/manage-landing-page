// Show Navigation menu //
const html = document.querySelector("html");
const body = document.querySelector("body");
const header = document.querySelector(".header");
const menuButton = document.querySelector(".header__menu-button");
const overlay = document.querySelector(".overlay");

menuButton.addEventListener("click", () => {
  header.classList.toggle("show-nav");
  html.classList.toggle("no-scroll");

  if (!overlay.classList.contains("fade-in")) {
    overlay.classList.remove("fade-out");
    overlay.classList.add("fade-in");
  } else {
    overlay.classList.remove("fade-in");
    overlay.classList.add("fade-out");
  }
});

// Testimonial Slider //
const sliderContainer = document.querySelector(".testimonial-sec__content");
const sliderInner = document.querySelector(".testimonial-sec__inner");
const dotNav = document.querySelector(".testimonial-sec__dots");
const slides = Array.from(sliderContainer.querySelectorAll(".testimonial"));
const dots = Array.from(dotNav.querySelectorAll("span"));

// Get testimonial width
const slideWidth = slides[0].getBoundingClientRect().width;
console.log(slideWidth);

let position = 0;

function nextSlide() {
  sliderOn(dots[position], position);

  if (position < slides.length - 1) {
    position++;
  } else {
    position = 0;
  }
}

// Dot nav click event
dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    const targetDot = e.target;
    const targetIndex = dots.findIndex((dot) => dot === targetDot);
    sliderOn(targetDot, targetIndex);
  });
});

// Slide on
function sliderOn(position, index) {
  // Remove active class
  dots.forEach((dot) => dot.classList.remove("active"));
  // Add active on target element
  position.classList.add("active");

  const amountToMove = index * slideWidth;

  sliderContainer.style.left = `-${amountToMove}px`;
}

// Dragable testimonial slider

let isGrabbing = false;
let pointX;

sliderInner.addEventListener("mouseover", (e) => {
  isGrabbing = false;
  sliderInner.style.cursor = "grab";
});

sliderInner.addEventListener("mousedown", (e) => {
  isGrabbing = true;

  let currentX = e.offsetX;
  let currentLeft = sliderContainer.offsetLeft;
  pointX = currentX - currentLeft;

  sliderInner.style.cursor = "grabbing";
});

sliderInner.addEventListener("mouseup", (e) => {
  isGrabbing = false;
  sliderInner.style.cursor = "grab";
});

sliderInner.addEventListener("mousemove", (e) => {
  if (!isGrabbing) return;

  const eX = e.offsetX - pointX;
  sliderContainer.style.left = `${eX}px`;

  setBound();
});

function setBound() {
  const slidersRect = sliderContainer.getBoundingClientRect();
  const innerRect = sliderInner.getBoundingClientRect();

  if (parseInt(sliderContainer.style.left) > 0) {
    sliderContainer.style.left = 0;
  } else if (slidersRect.right < innerRect.right) {
    sliderContainer.style.left = `-${slidersRect.width - innerRect.width}px`;
  }
}

// Email Validation //
const form = document.querySelector("#form");
const input = document.querySelector("#email");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailValue = input.value;
  const pattern = /\S+\@\S+\.\S+/;

  if (!emailValue) {
    showMessage("Email cannot be empty.", "show-error");
  } else if (!pattern.test(emailValue)) {
    showMessage("Please insert a valid email.", "show-error");
  } else {
    showMessage("Will get in touch.", "show-success");
    input.value = "";
  }
});

// Show message
function showMessage(text, action) {
  const messageEl = document.querySelector("#message");
  messageEl.innerText = text;
  messageEl.classList.add(action);

  setTimeout(() => {
    messageEl.innerText = "";
    messageEl.classList.remove(action);
  }, 1000);
}
