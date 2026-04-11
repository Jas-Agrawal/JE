// Shared functions used across all pages

function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
}

function updateInquiryCount() {
    const items = JSON.parse(localStorage.getItem('userInquiries')) || [];
    const badge = document.getElementById('inquiry-count');
    if (badge) badge.innerText = items.length;
}

// Run on every page load
updateInquiryCount();