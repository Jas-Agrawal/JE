// ================================================================
//  brand.js  —  Individual brand page logic
//  Reads ?brand=Kapson from the URL and loads that brand's data
// ================================================================

// ── Navbar & inquiry count ─────────────────────────────────────
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

function updateInquiryCount() {
    const items = JSON.parse(localStorage.getItem('userInquiries')) || [];
    const badge = document.getElementById('inquiry-count');
    if (badge) badge.innerText = items.length;
}
updateInquiryCount();


// ── Get brand from URL ─────────────────────────────────────────
const urlParams = new URLSearchParams(window.location.search);
const currentBrand = urlParams.get('brand');

// If no brand in URL, redirect to main products page
if (!currentBrand || !brandInfo[currentBrand]) {
    window.location.href = 'our-products.html';
}

const brand = brandInfo[currentBrand];
const brandProducts = productData.filter(p => p.brand === currentBrand);
const bestSellers = brandProducts.filter(p => p.bestSeller);
const otherProducts = brandProducts.filter(p => !p.bestSeller);


// ── Fill in page header ────────────────────────────────────────
document.title = `Janish Enterprises | ${brand.name}`;
document.getElementById('breadcrumbBrand').textContent = brand.name;
document.getElementById('brandPageTitle').innerHTML = `${brand.name} <span>Products</span>`;
document.getElementById('brandPageDesc').textContent = brand.description;
document.getElementById('productsHeading').textContent = `${brand.name} — All Products`;
document.getElementById('productCountLabel').textContent = `${brandProducts.length} product${brandProducts.length !== 1 ? 's' : ''}`;


// ── Render product cards ───────────────────────────────────────
function buildProductCard(product) {
    const tags = [];
    if (product.bestSeller) tags.push(`<span class="tag-bestseller"><i class="fas fa-fire"></i> Best Seller</span>`);
    if (product.newArrival) tags.push(`<span class="tag-new">New</span>`);

    return `
        <div class="product-card" onclick="openModal(${product.id})">
            <div class="card-tags">${tags.join('')}</div>
            <img class="card-img" src="${product.image}" alt="${product.name}"
                 onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
            <div class="product-info">
                <div class="brand-tag">${product.brand}</div>
                <h3>${product.name}</h3>
                <div class="price">Rs ${product.price.toLocaleString('en-IN')}</div>

                <div class="qty-selector" onclick="event.stopPropagation()">
                    <button onclick="changeQty('qty-${product.id}', -1)">−</button>
                    <input type="number" id="qty-${product.id}" value="1" min="1" max="99">
                    <button onclick="changeQty('qty-${product.id}', 1)">+</button>
                </div>

                <button class="btn-add-inquiry"
                    onclick="event.stopPropagation(); addToInquiry(${product.id}, 'qty-${product.id}')">
                    <i class="fas fa-clipboard-list"></i> Send Inquiry
                </button>
            </div>
        </div>
    `;
}

// Render best sellers separately at top
if (bestSellers.length > 0) {
    document.getElementById('bestSellerSection').style.display = 'block';
    document.getElementById('bestSellerGrid').innerHTML = bestSellers.map(buildProductCard).join('');
}

// Render remaining products
document.getElementById('productGrid').innerHTML =
    otherProducts.length > 0
    ? otherProducts.map(buildProductCard).join('')
    : `<div class="no-results"><i class="fas fa-box-open"></i><p>All products from this brand are Best Sellers — see above!</p></div>`;


// ── Brand search (within this brand only) ─────────────────────
let brandSearchTimeout;

function handleBrandSearch() {
    clearTimeout(brandSearchTimeout);
    brandSearchTimeout = setTimeout(() => {
        const term = document.getElementById('brandSearch').value.trim().toLowerCase();

        if (term.length < 2) {
            // Restore normal layout
            renderNormal();
            return;
        }

        // Filter within this brand
        const filtered = brandProducts.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
        );

        // Hide best seller section, show all in main grid
        document.getElementById('bestSellerSection').style.display = 'none';
        document.getElementById('allProductsLabel').textContent =
            `Search results (${filtered.length} found)`;

        document.getElementById('productGrid').innerHTML =
            filtered.length > 0
            ? filtered.map(buildProductCard).join('')
            : `<div class="no-results"><i class="fas fa-search"></i><p>No products found for "<strong>${term}</strong>".</p></div>`;

        document.getElementById('productCountLabel').textContent = `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`;
    }, 300);
}

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

// Escape key clears brand search
document.getElementById('brandSearch').addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('brandSearch').value = '';
        handleBrandSearch();
    }
});


// ── Other brands section ───────────────────────────────────────
const otherBrandsGrid = document.getElementById('otherBrandsGrid');
otherBrandsGrid.innerHTML = Object.keys(brandInfo)
    .filter(b => b !== currentBrand)
    .map(brandKey => {
        const b = brandInfo[brandKey];
        const count = productData.filter(p => p.brand === brandKey).length;
        return `
            <a class="brand-card" href="brand.html?brand=${encodeURIComponent(brandKey)}">
                <div class="brand-card-top">
                    <div class="brand-icon-circle"><i class="${b.icon}"></i></div>
                    <div>
                        <h3>${b.name}</h3>
                        <p>${b.tagline}</p>
                    </div>
                </div>
                <div class="brand-card-bottom">
                    <span class="product-count"><strong>${count}</strong> products</span>
                    <span class="arrow-btn"><i class="fas fa-arrow-right"></i></span>
                </div>
            </a>
        `;
    }).join('');


// ── Modal ──────────────────────────────────────────────────────
function openModal(id) {
    const product = productData.find(p => p.id === id);
    if (!product) return;

    document.getElementById('modalBrand').textContent = product.brand;
    document.getElementById('modalName').textContent = product.name;
    document.getElementById('modalDesc').textContent = product.description;
    document.getElementById('modalImg').src = product.image;
    document.getElementById('modalPrice').textContent = 'Rs ' + product.price.toLocaleString('en-IN');
    document.getElementById('modalQty').value = 1;

    const tagsEl = document.getElementById('modalTags');
    tagsEl.innerHTML = '';
    if (product.bestSeller) tagsEl.innerHTML += `<span class="tag-bestseller"><i class="fas fa-fire"></i> Best Seller</span>`;
    if (product.newArrival) tagsEl.innerHTML += `<span class="tag-new">New Arrival</span>`;

    document.getElementById('modalAddBtn').onclick = () => addToInquiry(id, 'modalQty');
    document.getElementById('productModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('productModal').classList.remove('open');
    document.body.style.overflow = '';
}

function changeModalQty(delta) {
    const input = document.getElementById('modalQty');
    let val = parseInt(input.value) + delta;
    if (val < 1) val = 1;
    input.value = val;
}

function changeQty(inputId, delta) {
    const input = document.getElementById(inputId);
    if (!input) return;
    let val = parseInt(input.value) + delta;
    if (val < 1) val = 1;
    input.value = val;
}

document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('productModal')) closeModal();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });


// ── Inquiry logic ──────────────────────────────────────────────
function addToInquiry(productId, qtyInputId) {
    const product = productData.find(p => p.id === productId);
    const qtyEl = document.getElementById(qtyInputId);
    const qty = qtyEl ? parseInt(qtyEl.value) || 1 : 1;

    let cart = JSON.parse(localStorage.getItem('userInquiries')) || [];

    if (cart.find(item => item.id === productId)) {
        showToast('Already in your inquiry list!', true);
        return;
    }

    cart.push({
        id: product.id,
        name: product.name,
        category: product.brand,
        qty: qty,
        priceEach: product.price,
        totalPrice: product.price * qty
    });

    localStorage.setItem('userInquiries', JSON.stringify(cart));
    updateInquiryCount();
    showToast(`${product.name} added to inquiry!`);
}


// ── Toast ──────────────────────────────────────────────────────
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.innerHTML = `<i class="fas fa-${isError ? 'exclamation-circle' : 'check-circle'}"></i> ${message}`;
    toast.className = `toast${isError ? ' error' : ''} show`;
    setTimeout(() => toast.classList.remove('show'), 3000);
}
