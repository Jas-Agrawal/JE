// ================================================================
//  our-products.js  —  Main brand category page logic
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
                    <span class="product-count"><strong>${count}</strong> products</span>
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
        const brandSection = document.getElementById('brandCardsSection');

        if (term.length < 2) {
            // Hide results, show brand cards
            resultsSection.classList.remove('visible');
            brandSection.style.display = 'block';
            return;
        }

        // Show results, hide brand cards
        brandSection.style.display = 'none';
        resultsSection.classList.add('visible');
        document.getElementById('searchTermDisplay').textContent = `"${term}"`;

        const filtered = productData.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.brand.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
        );

        const grid = document.getElementById('globalSearchGrid');

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No products found for "<strong>${term}</strong>".</p>
                    <p style="margin-top:8px; font-size:0.85rem;">Try searching a brand name like "Kapson" or a product type like "jack".</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = filtered.map(p => buildProductCard(p)).join('');
    }, 300);
}

// Clear search when input is cleared
document.getElementById('globalSearch').addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('globalSearch').value = '';
        handleGlobalSearch();
    }
});


// ── Product card builder (shared) ─────────────────────────────
function buildProductCard(product) {
    const tags = [];
    if (product.bestSeller) tags.push(`<span class="tag-bestseller"><i class="fas fa-fire"></i> Best Seller</span>`);
    if (product.newArrival) tags.push(`<span class="tag-new">New</span>`);

    return `
        <div class="product-card" onclick="openModal(${product.id})">
            <div class="card-tags">${tags.join('')}</div>
            <img class="card-img" src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
            <div class="product-info">
                <div class="brand-tag">${product.brand}</div>
                <h3>${product.name}</h3>
                <div class="price">Rs ${product.price.toLocaleString('en-IN')}</div>

                <div class="qty-selector" onclick="event.stopPropagation()">
                    <button onclick="changeQty('qty-${product.id}', -1)">−</button>
                    <input type="number" id="qty-${product.id}" value="1" min="1" max="99">
                    <button onclick="changeQty('qty-${product.id}', 1)">+</button>
                </div>

                <button class="btn-add-inquiry" onclick="event.stopPropagation(); addToInquiry(${product.id}, 'qty-${product.id}')">
                    <i class="fas fa-clipboard-list"></i> Send Inquiry
                </button>
            </div>
        </div>
    `;
}

function changeQty(inputId, delta) {
    const input = document.getElementById(inputId);
    if (!input) return;
    let val = parseInt(input.value) + delta;
    if (val < 1) val = 1;
    input.value = val;
}


// ── Modal ──────────────────────────────────────────────────────
let activeProductId = null;

function openModal(id) {
    const product = productData.find(p => p.id === id);
    if (!product) return;
    activeProductId = id;

    document.getElementById('modalBrand').textContent = product.brand;
    document.getElementById('modalName').textContent = product.name;
    document.getElementById('modalDesc').textContent = product.description;
    document.getElementById('modalImg').src = product.image;
    document.getElementById('modalPrice').textContent = 'Rs ' + product.price.toLocaleString('en-IN');
    document.getElementById('modalQty').value = 1;

    // Tags
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

// Close modal when clicking outside
document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('productModal')) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});


// ── Inquiry logic ──────────────────────────────────────────────
function addToInquiry(productId, qtyInputId) {
    const product = productData.find(p => p.id === productId);
    const qtyEl = document.getElementById(qtyInputId);
    const qty = qtyEl ? parseInt(qtyEl.value) || 1 : 1;

    let cart = JSON.parse(localStorage.getItem('userInquiries')) || [];
    const existing = cart.find(item => item.id === productId);

    if (existing) {
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
