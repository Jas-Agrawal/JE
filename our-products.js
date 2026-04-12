// ================================================================
//  our-products.js  —  Main brand category page
//  Depends on: products-data.js, shared-product-ui.js
// ================================================================

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

updateInquiryCount();


// ── Build brand cards ──────────────────────────────────────────
function buildBrandCards() {
    const grid = document.getElementById('brandCardsGrid');

    grid.innerHTML = Object.keys(brandInfo).map(brandKey => {
        const brand = brandInfo[brandKey];
        const count = productData.filter(p => p.brand === brandKey).length;

        return `
            <a class="brand-card" href="brand.html?brand=${encodeURIComponent(brandKey)}">
                <div class="brand-card-top">
                    <div class="brand-icon-circle">
                        <i class="${brand.icon}"></i>
                    </div>
                    <div>
                        <h3>${brand.name}</h3>
                        <p>${brand.tagline}</p>
                    </div>
                </div>
                <div class="brand-card-bottom">
                    <span class="product-count"><strong>${count}</strong> product${count !== 1 ? 's' : ''}</span>
                    <span class="arrow-btn"><i class="fas fa-arrow-right"></i></span>
                </div>
            </a>
        `;
    }).join('');
}

buildBrandCards();


// ── Global search ──────────────────────────────────────────────
let searchTimeout;

function handleGlobalSearch() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const term = document.getElementById('globalSearch').value.trim().toLowerCase();
        const resultsSection = document.getElementById('searchResultsSection');
        const brandSection   = document.getElementById('brandCardsSection');

        if (term.length < 2) {
            resultsSection.classList.remove('visible');
            brandSection.style.display = 'block';
            return;
        }

        brandSection.style.display = 'none';
        resultsSection.classList.add('visible');
        document.getElementById('searchTermDisplay').textContent = `"${term}"`;

        const filtered = productData.filter(p =>
            p.name.toLowerCase().includes(term)        ||
            p.brand.toLowerCase().includes(term)       ||
            p.description.toLowerCase().includes(term) ||
            (p.variants && p.variants.some(v => v.label.toLowerCase().includes(term)))
        );

        const grid = document.getElementById('globalSearchGrid');

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No products found for "<strong>${term}</strong>".</p>
                    <p style="margin-top:8px;font-size:0.85rem;">Try a brand name like "Kapson" or product type like "jack".</p>
                </div>`;
            return;
        }

        grid.innerHTML = filtered.map(p => buildProductCard(p)).join('');
    }, 300);
}

// Escape clears search
document.getElementById('globalSearch').addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.getElementById('globalSearch').value = '';
        handleGlobalSearch();
    }
});
