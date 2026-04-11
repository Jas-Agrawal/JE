function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
}

const grid = document.getElementById('productGrid');

// CHANGED: Now includes a quantity selector (- / + / input) on each card
function displayProducts(items) {
    grid.innerHTML = items.map(product => `
        <div class="product-card" onclick="openModal(${product.id})">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <span class="category-tag">${product.category}</span>
                <h3>${product.name}</h3>
                <div class="price">Rs ${product.price.toLocaleString('en-IN')}</div>

                <!-- NEW: Quantity selector row -->
                <div class="qty-selector" onclick="event.stopPropagation()">
                    <button onclick="changeQty('qty-${product.id}', -1)">−</button>
                    <input type="number" id="qty-${product.id}" value="1" min="1" max="99">
                    <button onclick="changeQty('qty-${product.id}', 1)">+</button>
                </div>

                <button class="add-to-cart" onclick="event.stopPropagation(); addToInquiry(${product.id}, 'qty-${product.id}')">
                    Send Inquiry
                </button>
            </div>
        </div>
    `).join('');
}

// NEW: Increase or decrease quantity, minimum is always 1
function changeQty(inputId, delta) {
    const input = document.getElementById(inputId);
    let val = parseInt(input.value) + delta;
    if (val < 1) val = 1;
    input.value = val;
}

// Modal Logic
function openModal(id) {
    const product = productData.find(p => p.id === id);
    if (!product) return;

    document.getElementById('modalName').innerText = product.name;
    document.getElementById('modalImg').src = product.image;
    document.getElementById('modalCategory').innerText = product.category;
    document.getElementById('modalDesc').innerText = product.description;
    document.getElementById('modalPrice').innerText = "Rs " + product.price.toLocaleString('en-IN');

    // NEW: Set the modal's Add button to use the correct product id
    document.getElementById('modalAddBtn').onclick = function() {
        addToInquiry(product.id, 'modal-qty');
    };

    // Reset modal quantity to 1 every time it opens
    document.getElementById('modal-qty').value = 1;

    document.getElementById('productModal').style.display = "flex";
}

function closeModal() {
    document.getElementById('productModal').style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) closeModal();
}

displayProducts(productData);

function filterProducts() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = productData.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
    displayProducts(filtered);
}

function filterCategory(cat) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    if (cat === 'all') {
        displayProducts(productData);
    } else {
        const filtered = productData.filter(p => p.category === cat);
        displayProducts(filtered);
    }
}

// CHANGED: Now saves an object {name, qty, priceEach, totalPrice} instead of just a name string
function addToInquiry(productId, qtyInputId) {
    const product = productData.find(p => p.id === productId);
    const qty = parseInt(document.getElementById(qtyInputId).value) || 1;
    const totalPrice = product.price * qty;

    // Load existing inquiries
    let inquiryCart = JSON.parse(localStorage.getItem('userInquiries')) || [];

    // Check if this product is already in the list
    const existing = inquiryCart.find(item => item.id === productId);

    if (existing) {
        alert(`${product.name} is already in your inquiry list.`);
        return;
    }

    // Save as an object with full details
    inquiryCart.push({
        id: product.id,
        name: product.name,
        qty: qty,
        priceEach: product.price,
        totalPrice: totalPrice
    });

    localStorage.setItem('userInquiries', JSON.stringify(inquiryCart));
    alert(`${qty} x ${product.name} added to your inquiry list!`);
    updateInquiryCount();
}

function updateInquiryCount() {
    const items = JSON.parse(localStorage.getItem('userInquiries')) || [];
    const badge = document.getElementById('inquiry-count');
    if (badge) badge.innerText = items.length;
}

updateInquiryCount();