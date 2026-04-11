function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
}

function updateInquiryCount() {
    const items = JSON.parse(localStorage.getItem('userInquiries')) || [];
    const badge = document.getElementById('inquiry-count');
    if (badge) badge.innerText = items.length;
}

function loadInquiries() {
    const listContainer = document.getElementById('inquiryList');
    const items = JSON.parse(localStorage.getItem('userInquiries')) || [];

    // --- Empty State ---
    if (items.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <h3>Your inquiry list is empty</h3>
                <p>Browse our products and add items you're interested in.</p>
                <a href="our-products.html">Browse Products</a>
            </div>
        `;
        return;
    }

    // --- Calculate Grand Total ---
    const grandTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

    // --- Build the Table ---
    listContainer.innerHTML = `
        <div class="inquiry-card">

            <!-- Table Header -->
            <div class="inquiry-table-head">
                <span>Product <span class="item-count-badge">${items.length} item${items.length > 1 ? 's' : ''}</span></span>
                <span>Qty</span>
                <span>Price Each</span>
                <span>Total</span>
                <span></span>
            </div>

            <!-- Product Rows -->
            ${items.map((item, index) => `
                <div class="inquiry-row">
                    <div>
                        <div class="product-name">${item.name}</div>
                        <div class="product-category">${item.category || 'Product'}</div>
                    </div>
                    <div>
                        <span class="qty-pill">× ${item.qty}</span>
                    </div>
                    <div class="price-each">Rs ${item.priceEach.toLocaleString('en-IN')}</div>
                    <div class="price-total">Rs ${item.totalPrice.toLocaleString('en-IN')}</div>
                    <button class="remove-btn" onclick="removeItem(${index})" title="Remove">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('')}

            <!-- Grand Total -->
            <div class="grand-total-bar">
                <span class="label">Grand Total</span>
                <span class="amount">Rs ${grandTotal.toLocaleString('en-IN')}</span>
            </div>

        </div>
    `;
}

function removeItem(index) {
    let items = JSON.parse(localStorage.getItem('userInquiries')) || [];
    items.splice(index, 1);
    localStorage.setItem('userInquiries', JSON.stringify(items));
    loadInquiries();
    updateInquiryCount();
}

function clearInquiries() {
    if (!confirm("Are you sure you want to clear your entire inquiry list?")) return;
    localStorage.removeItem('userInquiries');
    loadInquiries();
    updateInquiryCount();
}

function sendFinalInquiry() {
    const items = JSON.parse(localStorage.getItem('userInquiries')) || [];
    if (items.length === 0) return alert("Your inquiry list is empty!");

    const grandTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

    const lines = items.map(item =>
        `- ${item.name} | Qty: ${item.qty} | Rs ${item.priceEach.toLocaleString('en-IN')} each | Total: Rs ${item.totalPrice.toLocaleString('en-IN')}`
    ).join('%0A');

    const message = `Hello Janish Enterprises,%0A%0AI am interested in the following products:%0A%0A${lines}%0A%0AGrand Total: Rs ${grandTotal.toLocaleString('en-IN')}%0A%0APlease get in touch with me. Thank you!`;
    
    const phoneNumber = "917972210365";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// Run on page load
loadInquiries();
updateInquiryCount();
