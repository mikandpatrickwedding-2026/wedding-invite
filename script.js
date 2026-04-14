const intro = document.getElementById("intro");
const main = document.getElementById("main");
const music = document.getElementById("bgMusic");

let musicStarted = false;

function startMusic() {
  if (musicStarted) return;

  music.volume = 0.6;

  music.play().then(() => {
    musicStarted = true;
  }).catch(err => {
    console.log("Music blocked until user interacts:", err);
  });
}

document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);

/* =========================
   🎬 CINEMATIC INTRO FLOW
========================= */
window.onload = () => {
  music.volume = 0.6;
  music.play().catch(() => {
    console.log("Autoplay blocked until user interaction");
  });

  setTimeout(() => {
    if (intro) intro.classList.add("fade-out");

    setTimeout(() => {
      if (intro) intro.style.display = "none";
      if (main) main.classList.remove("hidden");
    }, 1500);
  }, 5000);

  // INIT CAROUSEL
  updateCarousel();
  startAutoSlide();
};

/* =========================
   🎵 MUSIC TOGGLE
========================= */
function toggleMusic() {
  if (music.paused) music.play();
  else music.pause();
}

/* =========================
   🔍 GUEST SEARCH
========================= */
async function searchGuest() {
  const input = document
    .getElementById("searchName")
    .value
    .trim()
    .toLowerCase();

  const resultBox = document.getElementById("result");

  try {
    const res = await fetch("./guests.json");
    const data = await res.json();

    const matches = data.filter(g =>
      g.name.toLowerCase().includes(input)
    );

    if (matches.length > 0) {
      resultBox.innerHTML = matches
        .map(g => `✨ <b>${g.name}</b> — ${g.role}`)
        .join("<br>");
    } else {
      resultBox.innerText = "Not on list";
    }

  } catch (error) {
    console.error(error);
    resultBox.innerText = "Unable to load guest list.";
  }
}

/* =========================
   🖼️ CAROUSEL DATA
========================= */
const images = [
  { src: "img1.jpg", text: "Love is patient, love is kind." },
  { src: "img2.jpg", text: "It does not envy," },
  { src: "img3.jpg", text: "it does not boast, it is not proud." },
  { src: "img4.jpg", text: "It does not dishonor others," },
  { src: "img5.jpg", text: "it is not self-seeking," },
  { src: "img6.jpg", text: "it is not easily angered," },
  { src: "img7.jpg", text: "it keeps no record of wrongs." },
  { src: "img8.jpg", text: "Love does not delight in evil" },
  { src: "img9.jpg", text: "but rejoices with the truth." },
  { src: "img10.jpg", text: "It always protects, always trusts" },
  { src: "img11.jpg", text: "always hopes, always perseveres." },
  { src: "img12.jpg", text: "1 Corinthians 13:4-7" }
];

let currentIndex = 0;

const imgElement = document.getElementById("carouselImage");
const caption = document.getElementById("captionText");
const carousel = document.getElementById("carousel");

/* =========================
   🔄 UPDATE IMAGE
========================= */
function updateCarousel() {
  if (!imgElement) return;

  imgElement.classList.add("fade-out");

  setTimeout(() => {
    imgElement.src = images[currentIndex].src;

    if (caption) {
      caption.innerText = images[currentIndex].text || "";
    }

    imgElement.classList.remove("fade-out");
  }, 300);
}

/* =========================
   ▶️ CONTROLS
========================= */
function nextSlide(userTriggered = false) {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();

  if (userTriggered) resetAutoSlideTimer();
}

function prevSlide(userTriggered = false) {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();

  if (userTriggered) resetAutoSlideTimer();
}

/* =========================
   ⏱️ AUTO SLIDE (SMART)
========================= */
let autoSlideInterval;
let autoSlideTimeout;

function startAutoSlide() {
  stopAutoSlide();

  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, 4000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function resetAutoSlideTimer() {
  stopAutoSlide();
  clearTimeout(autoSlideTimeout);

  autoSlideTimeout = setTimeout(() => {
    startAutoSlide();
  }, 8000);
}

/* =========================
   📱 SWIPE SUPPORT
========================= */
let startX = 0;

if (carousel) {
  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
      nextSlide(true); // 👈 user interaction
    } else if (endX - startX > 50) {
      prevSlide(true); // 👈 user interaction
    }
  });
}

/* =========================
   🌸 PETALS RANDOMIZER
========================= */
const petals = document.querySelectorAll(".petals span");

petals.forEach(petal => {
  const size = Math.random() * 10 + 8;
  petal.style.width = size + "px";
  petal.style.height = size + "px";

  const duration = Math.random() * 5 + 7;
  petal.style.animationDuration = duration + "s";

  const delay = Math.random() * 5;
  petal.style.animationDelay = delay + "s";
});