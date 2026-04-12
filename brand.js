// ================================================================
//  brand.js  —  Individual brand page
//  Depends on: products-data.js, shared-product-ui.js
// ================================================================

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

updateInquiryCount();

// ── Read brand from URL ────────────────────────────────────────
const urlParams    = new URLSearchParams(window.location.search);
const currentBrand = urlParams.get('brand');

if (!currentBrand || !brandInfo[currentBrand]) {
    window.location.href = 'our-products.html';
}

const brand        = brandInfo[currentBrand];
const brandProducts  = productData.filter(p => p.brand === currentBrand);
const bestSellers    = brandProducts.filter(p => p.bestSeller);
const otherProducts  = brandProducts.filter(p => !p.bestSeller);


// ── Fill page header ───────────────────────────────────────────
document.title = `Janish Enterprises | ${brand.name}`;
document.getElementById('breadcrumbBrand').textContent        = brand.name;
document.getElementById('brandPageTitle').innerHTML           = `${brand.name} <span>Products</span>`;
document.getElementById('brandPageDesc').textContent          = brand.description;
document.getElementById('productsHeading').textContent        = `${brand.name} — All Products`;
document.getElementById('productCountLabel').textContent      = `${brandProducts.length} product${brandProducts.length !== 1 ? 's' : ''}`;


// ── Render products ────────────────────────────────────────────
function renderNormal() {
    if (bestSellers.length > 0) {
        document.getElementById('bestSellerSection').style.display = 'block';
        document.getElementById('bestSellerGrid').innerHTML = bestSellers.map(buildProductCard).join('');
    }

    document.getElementById('allProductsLabel').textContent = 'All Products';
    document.getElementById('productGrid').innerHTML =
        otherProducts.length > 0
        ? otherProducts.map(buildProductCard).join('')
        : `<div class="no-results"><i class="fas fa-box-open"></i><p>All products from this brand are Best Sellers — see above!</p></div>`;

    document.getElementById('productCountLabel').textContent =
        `${brandProducts.length} product${brandProducts.length !== 1 ? 's' : ''}`;
}

renderNormal();


// ── Brand search (within this brand only) ─────────────────────
let brandSearchTimeout;

function handleBrandSearch() {
    clearTimeout(brandSearchTimeout);
    brandSearchTimeout = setTimeout(() => {
        const term = document.getElementById('brandSearch').value.trim().toLowerCase();

        if (term.length < 2) {
            renderNormal();
            return;
        }

        const filtered = brandProducts.filter(p =>
            p.name.toLowerCase().includes(term)        ||
            p.description.toLowerCase().includes(term) ||
            (p.variants && p.variants.some(v => v.label.toLowerCase().includes(term)))
        );

        document.getElementById('bestSellerSection').style.display = 'none';
        document.getElementById('allProductsLabel').textContent = `Search results (${filtered.length} found)`;
        document.getElementById('productGrid').innerHTML =
            filtered.length > 0
            ? filtered.map(buildProductCard).join('')
            : `<div class="no-results"><i class="fas fa-search"></i><p>No products found for "<strong>${term}</strong>".</p></div>`;

        document.getElementById('productCountLabel').textContent = `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`;
    }, 300);
}

document.getElementById('brandSearch').addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.getElementById('brandSearch').value = '';
        handleBrandSearch();
    }
});


// ── Other brands section ───────────────────────────────────────
document.getElementById('otherBrandsGrid').innerHTML = Object.keys(brandInfo)
    .filter(b => b !== currentBrand)
    .map(brandKey => {
        const b     = brandInfo[brandKey];
        const count = productData.filter(p => p.brand === brandKey).length;
        return `
            <a class="brand-card" href="brand.html?brand=${encodeURIComponent(brandKey)}">
                <div class="brand-card-top">
                    <div class="brand-icon-circle"><i class="${b.icon}"></i></div>
                    <div><h3>${b.name}</h3><p>${b.tagline}</p></div>
                </div>
                <div class="brand-card-bottom">
                    <span class="product-count"><strong>${count}</strong> product${count !== 1 ? 's' : ''}</span>
                    <span class="arrow-btn"><i class="fas fa-arrow-right"></i></span>
                </div>
            </a>
        `;
    }).join('');
