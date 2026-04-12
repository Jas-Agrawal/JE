// ================================================================
//  shared-product-ui.js  —  Janish Enterprises
//  Shared logic used by BOTH our-products.js and brand.js:
//    - Product card builder
//    - Modal with image gallery + variant selector
//    - Inquiry cart logic
//    - Toast notifications
// ================================================================


// ── Inquiry count badge ────────────────────────────────────────
function updateInquiryCount() {
    const items = JSON.parse(localStorage.getItem('userInquiries')) || [];
    const badge = document.getElementById('inquiry-count');
    if (badge) badge.innerText = items.length;
}


// ── Helpers ────────────────────────────────────────────────────

// Returns the starting price of a product (lowest variant or fixed price)
function getStartingPrice(product) {
    if (product.variants && product.variants.length > 0) {
        return Math.min(...product.variants.map(v => v.price));
    }
    return product.price || 0;
}

// Returns display price string for the card
function getPriceDisplay(product) {
    if (product.variants && product.variants.length > 0) {
        const min = Math.min(...product.variants.map(v => v.price));
        return `<span class="from-label">From</span> Rs ${min.toLocaleString('en-IN')}`;
    }
    return `Rs ${(product.price || 0).toLocaleString('en-IN')}`;
}

// Returns up to 3 variant chips for the card preview
function getVariantChips(product) {
    if (!product.variants || product.variants.length === 0) return '';
    const shown = product.variants.slice(0, 3);
    const remaining = product.variants.length - 3;
    let html = shown.map(v => `<span class="variant-chip-preview">${v.label}</span>`).join('');
    if (remaining > 0) html += `<span class="variant-chip-preview more">+${remaining} more</span>`;
    return `<div class="card-variants-preview">${html}</div>`;
}


// ── Product card builder ───────────────────────────────────────
function buildProductCard(product) {
    const tags = [];
    if (product.bestSeller) tags.push(`<span class="tag-bestseller"><i class="fas fa-fire"></i> Best Seller</span>`);
    if (product.newArrival)  tags.push(`<span class="tag-new">New</span>`);

    const firstImage = (product.images && product.images[0]) || 'https://via.placeholder.com/400x300?text=No+Image';

    return `
        <div class="product-card" onclick="openModal(${product.id})">
            <div class="card-tags">${tags.join('')}</div>
            <img class="card-img" src="${firstImage}" alt="${product.name}"
                 onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
            <div class="product-info">
                <div class="brand-tag">${product.brand}</div>
                <h3>${product.name}</h3>
                <div class="price">${getPriceDisplay(product)}</div>
                ${getVariantChips(product)}
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

function changeQty(inputId, delta) {
    const input = document.getElementById(inputId);
    if (!input) return;
    let val = parseInt(input.value) + delta;
    if (val < 1) val = 1;
    input.value = val;
}


// ── Modal state ────────────────────────────────────────────────
let activeProductId   = null;
let activeVariantIdx  = null;  // index of selected variant (null = none)
let activeImageIdx    = 0;

function openModal(id) {
    const product = productData.find(p => p.id === id);
    if (!product) return;

    activeProductId  = id;
    activeVariantIdx = null;
    activeImageIdx   = 0;

    // ── Brand tag & name ──
    document.getElementById('modalBrand').textContent = product.brand;
    document.getElementById('modalName').textContent  = product.name;
    document.getElementById('modalDesc').textContent  = product.description;

    // ── Tags ──
    const tagsEl = document.getElementById('modalTags');
    tagsEl.innerHTML = '';
    if (product.bestSeller) tagsEl.innerHTML += `<span class="tag-bestseller"><i class="fas fa-fire"></i> Best Seller</span>`;
    if (product.newArrival)  tagsEl.innerHTML += `<span class="tag-new">New Arrival</span>`;

    // ── Image gallery ──
    buildGallery(product);

    // ── Variant selector ──
    buildVariants(product);

    // ── Price ──
    updateModalPrice(product);

    // ── Reset qty ──
    document.getElementById('modalQty').value = 1;

    // ── Add button handler ──
    document.getElementById('modalAddBtn').onclick = () => addToInquiry(id, 'modalQty');

    document.getElementById('productModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('productModal').classList.remove('open');
    document.body.style.overflow = '';
}

// Close on outside click or Escape
document.getElementById('productModal').addEventListener('click', e => {
    if (e.target === document.getElementById('productModal')) closeModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });


// ── Image gallery builder ──────────────────────────────────────
function buildGallery(product) {
    const images = product.images && product.images.length > 0
        ? product.images
        : ['https://via.placeholder.com/400x300?text=No+Image'];

    // Main image
    const mainImg = document.getElementById('galleryMainImg');
    mainImg.src = images[0];
    mainImg.alt = product.name;

    // Thumbs
    const thumbsWrap = document.getElementById('galleryThumbs');

    if (images.length <= 1) {
        thumbsWrap.classList.add('hidden');
        return;
    }

    thumbsWrap.classList.remove('hidden');
    thumbsWrap.innerHTML = images.map((src, i) => `
        <img class="thumb-img ${i === 0 ? 'active' : ''}"
             src="${src}" alt="View ${i + 1}"
             onclick="switchGalleryImage(${i})"
             onerror="this.src='https://via.placeholder.com/60x60?text=X'">
    `).join('');
}

function switchGalleryImage(index) {
    const product = productData.find(p => p.id === activeProductId);
    if (!product) return;
    const images = product.images || [];

    activeImageIdx = index;
    const mainImg = document.getElementById('galleryMainImg');
    mainImg.style.opacity = '0';
    setTimeout(() => {
        mainImg.src = images[index];
        mainImg.style.opacity = '1';
    }, 150);

    // Update active thumb
    document.querySelectorAll('.thumb-img').forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
}


// ── Variant selector builder ───────────────────────────────────
function buildVariants(product) {
    const section = document.getElementById('variantSection');

    if (!product.variants || product.variants.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    document.getElementById('variantTypeName').textContent = product.variantType || 'Option';

    const buttonsEl = document.getElementById('variantButtons');
    buttonsEl.innerHTML = product.variants.map((v, i) => `
        <button class="variant-btn" onclick="selectVariant(${i})">${v.label}</button>
    `).join('');

    document.getElementById('selectedVariantName').textContent = '— Select one';
}

function selectVariant(index) {
    activeVariantIdx = index;
    const product = productData.find(p => p.id === activeProductId);
    if (!product) return;

    // Update button styles
    document.querySelectorAll('.variant-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });

    // Show selected label
    document.getElementById('selectedVariantName').textContent = product.variants[index].label;

    // Update price
    updateModalPrice(product);
}

function updateModalPrice(product) {
    const priceEl = document.getElementById('modalPrice');

    if (product.variants && product.variants.length > 0) {
        if (activeVariantIdx !== null) {
            const v = product.variants[activeVariantIdx];
            priceEl.innerHTML = `Rs ${v.price.toLocaleString('en-IN')}`;
        } else {
            const min = Math.min(...product.variants.map(v => v.price));
            const max = Math.max(...product.variants.map(v => v.price));
            if (min === max) {
                priceEl.innerHTML = `Rs ${min.toLocaleString('en-IN')}`;
            } else {
                priceEl.innerHTML = `Rs ${min.toLocaleString('en-IN')} <span class="price-note">— Rs ${max.toLocaleString('en-IN')}</span>`;
            }
        }
    } else {
        priceEl.innerHTML = `Rs ${(product.price || 0).toLocaleString('en-IN')}`;
    }
}

function changeModalQty(delta) {
    const input = document.getElementById('modalQty');
    let val = parseInt(input.value) + delta;
    if (val < 1) val = 1;
    input.value = val;
}


// ── Add to Inquiry ─────────────────────────────────────────────
function addToInquiry(productId, qtyInputId) {
    const product = productData.find(p => p.id === productId);
    const qtyEl = document.getElementById(qtyInputId);
    const qty = qtyEl ? parseInt(qtyEl.value) || 1 : 1;

    // If product has variants, one must be selected
    if (product.variants && product.variants.length > 0 && activeVariantIdx === null && qtyInputId === 'modalQty') {
        showToast('Please select a variant first!', true);
        return;
    }

    let cart = JSON.parse(localStorage.getItem('userInquiries')) || [];

    // Build a unique key: productId + variantIdx
    const variantLabel = (product.variants && activeVariantIdx !== null)
        ? product.variants[activeVariantIdx].label
        : null;
    const uniqueKey = variantLabel ? `${productId}-${activeVariantIdx}` : `${productId}`;

    if (cart.find(item => item.uniqueKey === uniqueKey)) {
        showToast('Already in your inquiry list!', true);
        return;
    }

    // Price: use selected variant price, or fixed price
    const priceEach = (product.variants && activeVariantIdx !== null)
        ? product.variants[activeVariantIdx].price
        : (product.price || getStartingPrice(product));

    // Build item name — append variant label if selected
    const itemName = variantLabel
        ? `${product.name} — ${variantLabel}`
        : product.name;

    cart.push({
        uniqueKey,
        id: product.id,
        name: itemName,
        category: product.brand,
        qty,
        priceEach,
        totalPrice: priceEach * qty
    });

    localStorage.setItem('userInquiries', JSON.stringify(cart));
    updateInquiryCount();
    showToast(`${itemName} added to inquiry!`);
}


// ── Toast ──────────────────────────────────────────────────────
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.innerHTML = `<i class="fas fa-${isError ? 'exclamation-circle' : 'check-circle'}"></i> ${message}`;
    toast.className = `toast${isError ? ' error' : ''} show`;
    setTimeout(() => toast.classList.remove('show'), 3000);
}
