/**
 * ============================================================
 * MANAS – Traditional Indian Clothing Brand
 * script.js – Main JavaScript
 * ============================================================
 */

'use strict';

/* ── Product Data ────────────────────────────────────────────
   Central product catalog used across all pages.
   ──────────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,
    name: 'Banarasi Silk Saree',
    category: 'saree',
    gender: 'women',
    price: 8999,
    originalPrice: 12999,
    image: 'images/saree.png',
    badge: 'Bestseller',
    occasion: 'wedding',
    rating: 5,
    desc: 'Handwoven Banarasi silk saree with intricate zari border and pallu. A timeless classic for weddings and festive occasions, crafted in the heart of Varanasi by master weavers.'
  },
  {
    id: 2,
    name: 'Bridal Lehenga Choli',
    category: 'lehenga',
    gender: 'women',
    price: 24999,
    originalPrice: 34999,
    image: 'images/lehenga.png',
    badge: 'New',
    occasion: 'wedding',
    rating: 5,
    desc: 'Opulent bridal lehenga choli featuring heavy zardozi embroidery on pure georgette. Comes with a matching dupatta and is perfect for your big day.'
  },
  {
    id: 3,
    name: 'Royal Embroidered Sherwani',
    category: 'sherwani',
    gender: 'men',
    price: 18499,
    originalPrice: 24999,
    image: 'images/sherwani.png',
    badge: 'offer',
    occasion: 'wedding',
    rating: 4,
    desc: 'Regal achkan-style sherwani in deep maroon with gold zari embroidery and antique buttons. Paired with matching churidar for a complete groom ensemble.'
  },
  {
    id: 4,
    name: 'Ivory Silk Kurta Set',
    category: 'kurta',
    gender: 'men',
    price: 4299,
    originalPrice: 5999,
    image: 'images/kurta.png',
    badge: null,
    occasion: 'festive',
    rating: 4,
    desc: 'Classic ivory silk kurta with hand-embroidered collar and cuffs. Paired with matching palazzo pants. Perfect for pujas, festivals, and family gatherings.'
  },
  {
    id: 5,
    name: 'Chanderi Cotton Saree',
    category: 'saree',
    gender: 'women',
    price: 3499,
    originalPrice: 4999,
    image: 'images/saree.png',
    badge: null,
    occasion: 'casual',
    rating: 4,
    desc: 'Lightweight Chanderi cotton saree with delicate gold border — ideal for office, casual outings, and daytime events.'
  },
  {
    id: 6,
    name: 'Anarkali Lehenga Set',
    category: 'lehenga',
    gender: 'women',
    price: 11999,
    originalPrice: 15999,
    image: 'images/lehenga.png',
    badge: 'offer',
    occasion: 'party',
    rating: 5,
    desc: 'Flared Anarkali lehenga with resham embroidery and a gorgeous contrasting dupatta. Perfect for sangeet nights and cocktail parties.'
  },
  {
    id: 7,
    name: 'Nehru Jacket Kurta',
    category: 'kurta',
    gender: 'men',
    price: 5499,
    originalPrice: 7499,
    image: 'images/kurta.png',
    badge: 'New',
    occasion: 'festive',
    rating: 5,
    desc: 'Contemporary Nehru jacket paired with a straight-cut kurta. Features subtle block-print detailing and mandarin collar — perfect fusion ethnic wear for modern men.'
  },
  {
    id: 8,
    name: 'Velvet Sherwani',
    category: 'sherwani',
    gender: 'men',
    price: 21999,
    originalPrice: 28999,
    image: 'images/sherwani.png',
    badge: 'Premium',
    occasion: 'wedding',
    rating: 5,
    desc: 'Luxurious velvet sherwani with swarovski-inspired stone work and silk lining. An absolute showstopper for grooms and baraat ceremonies.'
  }
];

/* ── Valid Coupon Codes ───────────────────────────────────────── */
const COUPONS = {
  BRIDAL20: { type: 'percent', value: 20, label: 'Bridal 20% Off' },
  FEST15:   { type: 'percent', value: 15, label: 'Festive 15% Off' },
  SHIP2500: { type: 'ship',    value: 0,  label: 'Free Shipping'   }
};

/* ── Cart Helpers ─────────────────────────────────────────────── */
function getCart() {
  try { return JSON.parse(localStorage.getItem('manas_cart')) || []; } catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem('manas_cart', JSON.stringify(cart));
  updateCartBadge();
}
function updateCartBadge() {
  const cart  = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total ? 'grid' : 'none';
  });
}
function addToCart(productId, qty = 1, size = 'M') {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const cart = getCart();
  const idx  = cart.findIndex(i => i.id === productId && i.size === size);
  if (idx > -1) {
    cart[idx].qty = Math.min(10, cart[idx].qty + qty);
  } else {
    cart.push({ id: productId, qty, size, name: product.name, price: product.price, image: product.image, category: product.category });
  }
  saveCart(cart);
  showToast(`🛍️ "${product.name}" added to cart!`);
}

/* ── Toast ────────────────────────────────────────────────────── */
function showToast(msg, icon = '🛍️') {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-msg');
  const icnEl = document.getElementById('toast-icon');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  if (icnEl) icnEl.textContent = icon;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ── Navbar Scroll Shadow ─────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

/* ── Hamburger Menu ───────────────────────────────────────────── */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });
  // Close when a nav link is clicked
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    btn.classList.remove('open');
    nav.classList.remove('open');
  }));
}

/* ── Scroll Reveal ────────────────────────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
}

/* ── Product Card Builder ─────────────────────────────────────── */
function buildProductCard(product) {
  const off = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
  return `
    <div class="product-card reveal" data-id="${product.id}" data-cat="${product.category}">
      <div class="product-img-wrap">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
        </a>
        ${product.badge ? `<span class="product-badge ${product.badge === 'offer' ? 'offer' : ''}">${product.badge === 'offer' ? 'SALE' : product.badge}</span>` : ''}
        <button class="product-wishlist" aria-label="Add to wishlist" title="Wishlist">
          <i class="far fa-heart"></i>
        </button>
      </div>
      <div class="product-body">
        <div class="product-cat">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
        <div class="product-name"><a href="product.html?id=${product.id}">${product.name}</a></div>
        <div class="product-price">
          <span class="price-current">₹${product.price.toLocaleString('en-IN')}</span>
          ${product.originalPrice ? `<span class="price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
          ${off > 0 ? `<span class="price-off">${off}% off</span>` : ''}
        </div>
        <div style="margin-bottom:.6rem;font-size:.82rem;color:var(--gold);">${stars}</div>
        <div class="product-actions">
          <button class="btn btn-outline add-to-cart-btn" data-id="${product.id}">
            <i class="fas fa-shopping-bag"></i> Add to Cart
          </button>
          <a href="product.html?id=${product.id}" class="btn btn-gold" style="flex:0 0 auto;">
            <i class="fas fa-eye"></i>
          </a>
        </div>
      </div>
    </div>`;
}

function bindAddToCartBtns(container) {
  container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id, 10);
      addToCart(id);
      btn.innerHTML = '<i class="fas fa-check"></i> Added!';
      btn.style.background = 'var(--maroon)';
      btn.style.color = 'var(--cream)';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-shopping-bag"></i> Add to Cart';
        btn.style.background = '';
        btn.style.color = '';
      }, 1800);
    });
  });

  // Wishlist toggle
  container.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', () => {
      const icon = btn.querySelector('i');
      if (icon.classList.contains('far')) {
        icon.classList.replace('far', 'fas');
        btn.style.background = 'var(--maroon)';
        btn.style.color = 'var(--white)';
        showToast('❤️ Added to wishlist!', '❤️');
      } else {
        icon.classList.replace('fas', 'far');
        btn.style.background = '';
        btn.style.color = '';
      }
    });
  });
}

/* ============================================================
   HOME PAGE – Featured Products
   ============================================================ */
function initHomePage() {
  const container = document.getElementById('featured-products');
  if (!container) return;
  // Show first 4 products as featured
  const featured = PRODUCTS.slice(0, 4);
  container.innerHTML = featured.map(buildProductCard).join('');
  bindAddToCartBtns(container);
  initScrollReveal();
}

/* ============================================================
   PRODUCTS PAGE
   ============================================================ */
function initProductsPage() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  let filtered  = [...PRODUCTS];
  let sortBy    = 'default';
  let maxPrice  = 30000;
  let activeCategories = [];
  let activeCoupon = null;

  // Read URL param for category pre-filter
  const urlCat = new URLSearchParams(window.location.search).get('cat');
  if (urlCat) {
    const chk = document.getElementById(`cat-${urlCat}`);
    const allChk = document.getElementById('cat-all');
    if (chk) { chk.checked = true; if (allChk) allChk.checked = false; }
  }

  function render() {
    // Gather checked categories
    const catAll  = document.getElementById('cat-all');
    activeCategories = [];
    ['saree','lehenga','kurta','sherwani','ethnic'].forEach(c => {
      const el = document.getElementById(`cat-${c}`);
      if (el && el.checked) activeCategories.push(c);
    });
    const showAll = (catAll && catAll.checked) || activeCategories.length === 0;

    // Filter
    filtered = PRODUCTS.filter(p => {
      const catMatch   = showAll || activeCategories.includes(p.category);
      const priceMatch = p.price <= maxPrice;
      return catMatch && priceMatch;
    });

    // Sort
    if (sortBy === 'price-asc')  filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sortBy === 'name-asc')   filtered.sort((a, b) => a.name.localeCompare(b.name));

    grid.innerHTML = filtered.length
      ? filtered.map(buildProductCard).join('')
      : `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);">
           <div style="font-size:3rem;margin-bottom:1rem;">🔍</div>
           <h3 style="font-family:var(--font-serif);color:var(--maroon-dark);">No products found</h3>
           <p>Try adjusting your filters.</p>
         </div>`;

    document.getElementById('product-count').textContent = filtered.length;
    bindAddToCartBtns(grid);
    initScrollReveal();
    renderActiveTags();
  }

  function renderActiveTags() {
    const box = document.getElementById('active-filters');
    if (!box) return;
    const tags = [];
    activeCategories.forEach(c => tags.push(`<span class="filter-tag">${c} <button onclick="clearCat('${c}')"><i class='fas fa-times'></i></button></span>`));
    box.innerHTML = tags.join('');
  }

  window.clearCat = function(cat) {
    const el = document.getElementById(`cat-${cat}`);
    if (el) { el.checked = false; }
    render();
  };

  // Category checkboxes
  ['all','saree','lehenga','kurta','sherwani','ethnic'].forEach(c => {
    const el = document.getElementById(`cat-${c}`);
    if (!el) return;
    el.addEventListener('change', () => {
      if (c === 'all' && el.checked) {
        ['saree','lehenga','kurta','sherwani','ethnic'].forEach(x => { const e = document.getElementById(`cat-${x}`); if (e) e.checked = false; });
      } else {
        const allChk = document.getElementById('cat-all');
        if (allChk) allChk.checked = false;
      }
      render();
    });
  });

  // Sort
  document.getElementById('sort-select')?.addEventListener('change', e => { sortBy = e.target.value; render(); });

  // Price range
  const priceRange = document.getElementById('price-range');
  const priceLabel = document.getElementById('price-max-label');
  priceRange?.addEventListener('input', () => {
    maxPrice = parseInt(priceRange.value, 10);
    priceLabel.textContent = `₹${maxPrice.toLocaleString('en-IN')}`;
    render();
  });

  // Clear filters
  document.getElementById('clear-filters')?.addEventListener('click', () => {
    ['saree','lehenga','kurta','sherwani','ethnic'].forEach(c => { const e = document.getElementById(`cat-${c}`); if (e) e.checked = false; });
    const allChk = document.getElementById('cat-all'); if (allChk) allChk.checked = true;
    if (priceRange) { priceRange.value = 30000; maxPrice = 30000; if (priceLabel) priceLabel.textContent = '₹30,000'; }
    sortBy = 'default';
    const sortEl = document.getElementById('sort-select'); if (sortEl) sortEl.value = 'default';
    render();
  });

  // View toggle
  document.getElementById('grid-view-btn')?.addEventListener('click', () => {
    grid.style.gridTemplateColumns = 'repeat(auto-fill,minmax(260px,1fr))';
    document.getElementById('grid-view-btn').classList.add('active');
    document.getElementById('list-view-btn').classList.remove('active');
  });
  document.getElementById('list-view-btn')?.addEventListener('click', () => {
    grid.style.gridTemplateColumns = '1fr';
    document.getElementById('list-view-btn').classList.add('active');
    document.getElementById('grid-view-btn').classList.remove('active');
  });

  render();
}

/* ============================================================
   PRODUCT DETAIL PAGE
   ============================================================ */
function initProductDetailPage() {
  const nameEl = document.getElementById('detail-name');
  if (!nameEl) return;

  const id = parseInt(new URLSearchParams(window.location.search).get('id'), 10);
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  // Breadcrumb
  const bc = document.getElementById('breadcrumb-name');
  if (bc) bc.textContent = product.name;

  // Fill details
  document.getElementById('detail-cat').textContent  = product.category.charAt(0).toUpperCase() + product.category.slice(1);
  document.getElementById('detail-name').textContent = product.name;
  document.getElementById('detail-price').textContent = `₹${product.price.toLocaleString('en-IN')}`;
  document.getElementById('detail-desc').textContent  = product.desc || '';
  document.getElementById('detail-stars').textContent = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);

  const origEl = document.getElementById('detail-original');
  const offEl  = document.getElementById('detail-off');
  if (product.originalPrice) {
    origEl.textContent = `₹${product.originalPrice.toLocaleString('en-IN')}`;
    const off = Math.round((1 - product.price / product.originalPrice) * 100);
    offEl.textContent = `${off}% off`;
  }

  // Main image
  const mainImg = document.getElementById('main-product-img');
  if (mainImg) { mainImg.src = product.image; mainImg.alt = product.name; }

  // Thumbnails (reuse same image for demo)
  const thumbGrid = document.getElementById('thumb-grid');
  if (thumbGrid) {
    const thumbImages = [product.image, product.image, product.image, product.image];
    thumbGrid.innerHTML = thumbImages.map((src, i) =>
      `<div class="thumb-item ${i === 0 ? 'active' : ''}" data-src="${src}">
         <img src="${src}" alt="View ${i + 1}" loading="lazy" />
       </div>`
    ).join('');
    thumbGrid.querySelectorAll('.thumb-item').forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbGrid.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        mainImg.src = thumb.dataset.src;
      });
    });
  }

  // Size selector
  document.getElementById('size-options')?.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Quantity
  let qty = 1;
  const qtyInput = document.getElementById('qty-input');
  document.getElementById('qty-minus')?.addEventListener('click', () => {
    if (qty > 1) { qty--; qtyInput.value = qty; }
  });
  document.getElementById('qty-plus')?.addEventListener('click', () => {
    if (qty < 10) { qty++; qtyInput.value = qty; }
  });

  // Add to Cart
  document.getElementById('add-to-cart-btn')?.addEventListener('click', () => {
    const selectedSize = document.querySelector('.size-btn.selected')?.textContent.trim() || 'M';
    addToCart(product.id, qty, selectedSize);
  });

  // Buy Now
  document.getElementById('buy-now-btn')?.addEventListener('click', () => {
    const selectedSize = document.querySelector('.size-btn.selected')?.textContent.trim() || 'M';
    addToCart(product.id, qty, selectedSize);
    window.location.href = 'cart.html';
  });

  // Product Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(`tab-${btn.dataset.tab}`);
      if (panel) panel.classList.add('active');
    });
  });

  // Related products
  const relatedContainer = document.getElementById('related-products');
  if (relatedContainer) {
    const related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
    const fallback = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);
    const toShow = related.length >= 2 ? related : fallback;
    relatedContainer.innerHTML = toShow.map(buildProductCard).join('');
    bindAddToCartBtns(relatedContainer);
  }

  initScrollReveal();
}

/* ============================================================
   CART PAGE
   ============================================================ */
function initCartPage() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  let appliedCoupon = null;

  function formatINR(n) { return `₹${n.toLocaleString('en-IN')}`; }

  function renderCart() {
    const cart = getCart();
    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">🛍️</div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything yet. Explore our collections!</p>
          <a href="products.html" class="btn btn-primary">Shop Now</a>
        </div>`;
      updateSummary(cart);
      return;
    }

    container.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
        <div class="cart-item-info">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
          <div>
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-meta">Size: ${item.size} &nbsp;|&nbsp; Category: ${item.category}</div>
          </div>
        </div>
        <div class="cart-item-price">${formatINR(item.price)}</div>
        <div>
          <div class="qty-control">
            <button class="qty-btn cart-qty-minus" data-id="${item.id}" data-size="${item.size}"><i class="fas fa-minus"></i></button>
            <input type="number" class="qty-input" value="${item.qty}" min="1" max="10" readonly />
            <button class="qty-btn cart-qty-plus" data-id="${item.id}" data-size="${item.size}"><i class="fas fa-plus"></i></button>
          </div>
        </div>
        <div class="cart-item-total">${formatINR(item.price * item.qty)}</div>
        <button class="cart-remove" data-id="${item.id}" data-size="${item.size}" title="Remove item">
          <i class="fas fa-trash"></i>
        </button>
      </div>`).join('');

    // Qty minus
    container.querySelectorAll('.cart-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        updateQty(parseInt(btn.dataset.id), btn.dataset.size, -1);
      });
    });
    // Qty plus
    container.querySelectorAll('.cart-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        updateQty(parseInt(btn.dataset.id), btn.dataset.size, 1);
      });
    });
    // Remove
    container.querySelectorAll('.cart-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        removeFromCart(parseInt(btn.dataset.id), btn.dataset.size);
      });
    });

    updateSummary(cart);
  }

  function updateQty(id, size, delta) {
    const cart = getCart();
    const idx  = cart.findIndex(i => i.id === id && i.size === size);
    if (idx === -1) return;
    cart[idx].qty = Math.max(1, Math.min(10, cart[idx].qty + delta));
    saveCart(cart);
    renderCart();
    showToast('🛒 Cart updated!', '🛒');
  }

  function removeFromCart(id, size) {
    let cart = getCart();
    cart = cart.filter(i => !(i.id === id && i.size === size));
    saveCart(cart);
    renderCart();
    showToast('🗑️ Item removed from cart.', '🗑️');
  }

  function updateSummary(cart) {
    const subtotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping  = subtotal >= 2500 ? 0 : 199;
    const tax       = Math.round(subtotal * 0.05);
    let discount    = 0;

    if (appliedCoupon) {
      const c = COUPONS[appliedCoupon];
      if (c?.type === 'percent') discount = Math.round(subtotal * c.value / 100);
      if (c?.type === 'ship')    discount = shipping;
    }

    const total = subtotal + (appliedCoupon && COUPONS[appliedCoupon]?.type === 'ship' ? 0 : shipping) + tax - discount;

    document.getElementById('item-count').textContent  = cart.reduce((s, i) => s + i.qty, 0);
    document.getElementById('subtotal').textContent    = formatINR(subtotal);
    document.getElementById('shipping-cost').textContent = shipping === 0 ? 'FREE' : formatINR(shipping);
    document.getElementById('tax-amount').textContent  = formatINR(tax);
    document.getElementById('discount-amount').textContent = `- ${formatINR(discount)}`;
    document.getElementById('total-amount').textContent = formatINR(Math.max(0, total));
  }

  // Coupon
  document.getElementById('apply-coupon')?.addEventListener('click', () => {
    const code  = document.getElementById('coupon-input').value.trim().toUpperCase();
    const msgEl = document.getElementById('coupon-msg');
    if (COUPONS[code]) {
      appliedCoupon = code;
      msgEl.textContent = `✅ Coupon "${COUPONS[code].label}" applied!`;
      msgEl.style.color = 'var(--gold-dark)';
      updateSummary(getCart());
    } else {
      msgEl.textContent = '❌ Invalid coupon code.';
      msgEl.style.color = 'var(--maroon)';
    }
  });

  // Checkout
  document.getElementById('checkout-btn')?.addEventListener('click', () => {
    if (getCart().length === 0) {
      showToast('⚠️ Your cart is empty!', '⚠️');
      return;
    }
    showToast('✅ Proceeding to checkout…', '✅');
    setTimeout(() => alert('🎉 Thank you for shopping with Manas!\nThis is a demo — no actual checkout is processed.'), 600);
  });

  renderCart();
}

/* ============================================================
   CONTACT PAGE
   ============================================================ */
function initContactPage() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fields = ['first-name', 'last-name', 'email', 'subject', 'message'];
    let valid = true;
    fields.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (!el.value.trim()) {
        el.style.borderColor = 'var(--maroon)';
        valid = false;
      } else {
        el.style.borderColor = '';
      }
    });
    if (!valid) { showToast('⚠️ Please fill all required fields.', '⚠️'); return; }

    // Show success
    document.getElementById('form-area').style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
    showToast('✅ Message sent! We\'ll reply within 24 hours.', '✅');
  });

  // Real-time error clear
  form.querySelectorAll('.form-control').forEach(el => {
    el.addEventListener('input', () => { el.style.borderColor = ''; });
  });
}

/* ============================================================
   INIT – Route to correct page logic
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  updateCartBadge();

  const page = location.pathname.split('/').pop() || 'index.html';

  if (page === 'index.html' || page === '' || page === '/') {
    initHomePage();
  } else if (page === 'products.html') {
    initProductsPage();
  } else if (page === 'product.html') {
    initProductDetailPage();
  } else if (page === 'cart.html') {
    initCartPage();
  } else if (page === 'contact.html') {
    initContactPage();
  }

  // Generic scroll reveal for static pages (about, contact)
  initScrollReveal();
});
