// ── Navbar toggle ──────────────────────────────
function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
}


// ── Inquiry count badge ────────────────────────
function updateInquiryCount() {
    const items = JSON.parse(localStorage.getItem('userInquiries')) || [];
    const badge = document.getElementById('inquiry-count');
    if (badge) badge.innerText = items.length;
}
updateInquiryCount();


// ── Carousel ───────────────────────────────────
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("carouselDots");

// Build dots dynamically based on number of slides
slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => showSlide(i));
    dotsContainer.appendChild(dot);
});

function updateDots() {
    document.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlide);
    });
}

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));

    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides[currentSlide].classList.add("active");
    updateDots();
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Auto-play every 4 seconds
setInterval(() => changeSlide(1), 4000);
