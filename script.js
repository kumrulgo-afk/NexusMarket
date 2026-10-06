// --- 1. PRODUCT DATABASE ---
const products = [
    {
        id: 1,
        title: "Wireless ANC Headphones",
        category: "electronics",
        price: 189.99,
        rating: 4.8,
        reviews: 142,
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        description: "High-fidelity active noise-canceling wireless headphones with 40-hour continuous playback and plush memory foam ear cushions."
    },
    {
        id: 2,
        title: "Minimalist Leather Watch",
        category: "accessories",
        price: 129.50,
        rating: 4.7,
        reviews: 89,
        badge: "Popular",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        description: "Classic analog wrist watch with genuine Italian leather strap, stainless steel casing, and water resistance up to 50 meters."
    },
    {
        id: 3,
        title: "Ergonomic Smart Desk Chair",
        category: "home",
        price: 349.00,
        rating: 4.9,
        reviews: 210,
        badge: "Top Rated",
        image: "https://images.unsplash.com/photo-1580481072645-022f9a6d1270?auto=format&fit=crop&w=600&q=80",
        description: "Breathable mesh ergonomic chair equipped with dynamic lumbar support, 3D adjustable armrests, and recline control."
    },
    {
        id: 4,
        title: "Urban Runner Sneakers",
        category: "fashion",
        price: 95.00,
        rating: 4.5,
        reviews: 64,
        badge: "New Arrival",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
        description: "Lightweight cushioned athletic running shoes designed for high impact absorption, breathability, and everyday streetwear style."
    },
    {
        id: 5,
        title: "Smart RGB Mechanical Keyboard",
        category: "electronics",
        price: 119.99,
        rating: 4.8,
        reviews: 175,
        badge: "Hot Choice",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
        description: "Custom hot-swappable mechanical switches with per-key customizable RGB illumination and durable aluminum frame."
    },
    {
        id: 6,
        title: "Organic Cotton Hoodie",
        category: "fashion",
        price: 68.00,
        rating: 4.6,
        reviews: 98,
        badge: "Eco Friendly",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
        description: "Ultra-soft heavyweight fleece pullover hoodie made from 100% sustainably sourced organic cotton with reinforced stitching."
    },
    {
        id: 7,
        title: "Aromatherapy Ceramic Diffuser",
        category: "home",
        price: 45.00,
        rating: 4.4,
        reviews: 52,
        badge: "Sale",
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",
        description: "Ultrasonic cool mist essential oil diffuser with ambient LED nightlight options and automatic safety shut-off feature."
    },
    {
        id: 8,
        title: "Polarized Sunglasses Gold Rim",
        category: "accessories",
        price: 79.99,
        rating: 4.7,
        reviews: 112,
        badge: "Trending",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
        description: "100% UV400 protection polarized lenses set in a durable lightweight titanium metal alloy gold aviator frame."
    }
];

// --- 2. STATE VARIABLES ---
let cart = [];
let activeCategory = 'all';
let searchQuery = '';
let maxPrice = 1000;
let sortBy = 'featured';

// --- 3. DOM ELEMENTS ---
const productGrid = document.getElementById('productGrid');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const sortSelect = document.getElementById('sortSelect');

const cartBtn = document.getElementById('cartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartPanel = document.getElementById('cartPanel');
const cartItemsList = document.getElementById('cartItemsList');
const cartCountBadge = document.getElementById('cartCountBadge');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

const productModal = document.getElementById('productModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalContent = document.getElementById('modalContent');

const themeToggle = document.getElementById('themeToggle');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');

// Set current footer year
document.getElementById('currentYear').textContent = new Date().getFullYear();


// --- 4. RENDER PRODUCTS ---
function renderProducts() {

    let filtered = products.filter(product => {

        const matchesCategory =
            activeCategory === 'all' ||
            product.category === activeCategory;

        const matchesSearch =
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesPrice =
            product.price <= maxPrice;

        return matchesCategory && matchesSearch && matchesPrice;
    });


    // Sorting
    if (sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    }

    else if (sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    }

    else if (sortBy === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }


    // No results
    if (filtered.length === 0) {

        productGrid.innerHTML = '';
        noResults.classList.remove('hidden');

    }

    else {

        noResults.classList.add('hidden');

        productGrid.innerHTML = filtered.map(product => `

            <div class="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">

                <div class="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-900">

                    <img
                        src="${product.image}"
                        alt="${product.title}"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    >

                    <span class="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg">
                        ${product.badge}
                    </span>

                    <button
                        onclick="openQuickView(${product.id})"
                        class="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-brand-600 hover:text-white transition-all shadow-lg"
                        title="Quick View"
                    >
                        <i class="fa-solid fa-eye text-sm"></i>
                    </button>

                </div>


                <div class="p-5 flex-1 flex flex-col justify-between space-y-4">

                    <div>

                        <div class="flex items-center justify-between gap-2 text-xs text-slate-400 mb-1">

                            <span class="uppercase tracking-wider font-semibold">
                                ${product.category}
                            </span>

                            <span class="flex items-center text-amber-400 font-bold gap-1">
                                <i class="fa-solid fa-star text-xs"></i>
                                ${product.rating} (${product.reviews})
                            </span>

                        </div>


                        <h3 class="font-bold text-base line-clamp-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                            ${product.title}
                        </h3>


                        <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                            ${product.description}
                        </p>

                    </div>


                    <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/50">

                        <span class="text-xl font-black text-brand-600 dark:text-brand-400">
                            $${product.price.toFixed(2)}
                        </span>

                        <button
                            onclick="addToCart(${product.id})"
                            class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-brand-600 hover:text-white dark:hover:bg-brand-600 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95"
                        >
                            <i class="fa-solid fa-plus text-xs"></i>
                            Add
                        </button>

                    </div>

                </div>

            </div>

        `).join('');
    }
}


// --- 5. CART OPERATIONS ---

function addToCart(productId) {

    const product = products.find(product => product.id === productId);

    if (!product) return;

    const existing = cart.find(item => item.id === productId);


    if (existing) {
        existing.quantity += 1;
    }

    else {
        cart.push({
            ...product,
            quantity: 1
        });
    }


    updateCartUI();

    showToast(`Added "${product.title}" to your cart!`);
}


function updateQuantity(productId, change) {

    const item = cart.find(item => item.id === productId);

    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart = cart.filter(item => item.id !== productId);

    }


    updateCartUI();
}


function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    updateCartUI();

    showToast("Item removed from cart.", "info");
}


// --- 6. UPDATE CART UI ---

function updateCartUI() {

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );


    cartCountBadge.textContent = totalItems;


    // Empty cart
    if (cart.length === 0) {

        cartItemsList.innerHTML = `

            <div class="text-center py-12 space-y-3">

                <i class="fa-solid fa-cart-flatbed text-4xl text-slate-300 dark:text-slate-600"></i>

                <p class="text-slate-500 text-sm font-medium">
                    Your cart is currently empty.
                </p>

            </div>

        `;

    }

    else {

        cartItemsList.innerHTML = cart.map(item => `

            <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-700/60">

                <img
                    src="${item.image}"
                    alt="${item.title}"
                    class="w-16 h-16 object-cover rounded-lg"
                >


                <div class="flex-1 min-w-0">

                    <h4 class="text-sm font-bold truncate">
                        ${item.title}
                    </h4>

                    <p class="text-xs text-brand-600 dark:text-brand-400 font-extrabold mt-0.5">
                        $${item.price.toFixed(2)}
                    </p>


                    <div class="flex items-center gap-2 mt-2">

                        <button
                            onclick="updateQuantity(${item.id}, -1)"
                            class="w-6 h-6 rounded-md bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 flex items-center justify-center text-xs font-bold"
                        >
                            -
                        </button>


                        <span class="text-xs font-bold w-4 text-center">
                            ${item.quantity}
                        </span>


                        <button
                            onclick="updateQuantity(${item.id}, 1)"
                            class="w-6 h-6 rounded-md bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 flex items-center justify-center text-xs font-bold"
                        >
                            +
                        </button>

                    </div>

                </div>


                <button
                    onclick="removeFromCart(${item.id})"
                    class="text-slate-400 hover:text-red-500 p-2"
                >
                    <i class="fa-solid fa-trash-can text-sm"></i>
                </button>

            </div>

        `).join('');
    }


    // Calculate totals
    const subtotal = cart.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );


    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;

    cartTotal.textContent = `$${subtotal.toFixed(2)}`;
}


// --- 7. CART DRAWER ---

function toggleCartDrawer(open) {

    if (open) {

        cartDrawer.classList.remove(
            'pointer-events-none',
            'opacity-0'
        );

        cartPanel.classList.remove(
            'translate-x-full'
        );

    }

    else {

        cartDrawer.classList.add(
            'pointer-events-none',
            'opacity-0'
        );

        cartPanel.classList.add(
            'translate-x-full'
        );
    }
}


// --- 8. QUICK VIEW ---

function openQuickView(productId) {

    const product = products.find(
        product => product.id === productId
    );

    if (!product) return;


    modalContent.innerHTML = `

        <div class="h-64 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900">

            <img
                src="${product.image}"
                alt="${product.title}"
                class="w-full h-full object-cover"
            >

        </div>


        <div class="space-y-4">

            <span class="px-2.5 py-1 rounded-md text-xs font-bold uppercase bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400">
                ${product.category}
            </span>


            <h3 class="text-2xl font-bold">
                ${product.title}
            </h3>


            <div class="flex items-center gap-2 text-amber-400 font-bold text-sm">

                <i class="fa-solid fa-star"></i>

                <span>
                    ${product.rating} (${product.reviews} reviews)
                </span>

            </div>


            <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                ${product.description}
            </p>


            <div class="text-3xl font-black text-brand-600 dark:text-brand-400">
                $${product.price.toFixed(2)}
            </div>


            <button
                onclick="addToCart(${product.id}); closeQuickView();"
                class="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-lg shadow-brand-500/20 active:scale-95 transition-all"
            >
                Add To Cart
            </button>

        </div>

    `;


    productModal.classList.remove(
        'opacity-0',
        'pointer-events-none'
    );


    document
        .getElementById('modalContainer')
        .classList.remove('scale-95');
}


function closeQuickView() {

    productModal.classList.add(
        'opacity-0',
        'pointer-events-none'
    );


    document
        .getElementById('modalContainer')
        .classList.add('scale-95');
}


// --- 9. TOAST SYSTEM ---

function showToast(message, type = "success") {

    const container =
        document.getElementById('toastContainer');


    const toast =
        document.createElement('div');


    const bgColor =
        type === 'success'
            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
            : 'bg-red-600 text-white';


    const icon =
        type === 'success'
            ? 'fa-circle-check text-emerald-400'
            : 'fa-circle-info';


    toast.className = `
        pointer-events-auto
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-2xl
        shadow-xl
        ${bgColor}
        text-sm
        font-semibold
        transition-all
        duration-300
        transform
        translate-y-4
        opacity-0
    `;


    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
    `;


    container.appendChild(toast);


    setTimeout(() => {

        toast.classList.remove(
            'translate-y-4',
            'opacity-0'
        );

    }, 10);


    setTimeout(() => {

        toast.classList.add(
            'opacity-0',
            'translate-y-4'
        );


        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);
}


// --- 10. SEARCH ---

searchInput.addEventListener('input', (event) => {

    searchQuery =
        event.target.value.trim();


    clearSearch.classList.toggle(
        'hidden',
        searchQuery.length === 0
    );


    renderProducts();
});


clearSearch.addEventListener('click', () => {

    searchInput.value = '';

    searchQuery = '';

    clearSearch.classList.add('hidden');

    renderProducts();
});


// --- 11. CATEGORY FILTERS ---

document
    .querySelectorAll('#categoryFilters .filter-tab')
    .forEach(button => {

        button.addEventListener('click', () => {

            document
                .querySelectorAll('#categoryFilters .filter-tab')
                .forEach(btn => {

                    btn.classList.remove(
                        'bg-brand-600',
                        'text-white',
                        'shadow-md',
                        'shadow-brand-500/20'
                    );

                    btn.classList.add(
                        'bg-slate-100',
                        'dark:bg-slate-700/60',
                        'text-slate-600',
                        'dark:text-slate-300'
                    );

                });


            button.classList.add(
                'bg-brand-600',
                'text-white',
                'shadow-md',
                'shadow-brand-500/20'
            );


            button.classList.remove(
                'bg-slate-100',
                'dark:bg-slate-700/60',
                'text-slate-600',
                'dark:text-slate-300'
            );


            activeCategory =
                button.getAttribute('data-category');


            renderProducts();

        });

    });


// --- 12. HERO CATEGORY PILLS ---

document
    .querySelectorAll('#quickCategoryPills .pill-btn')
    .forEach(button => {

        button.addEventListener('click', () => {

            const category =
                button.getAttribute('data-cat');


            const targetTab =
                document.querySelector(
                    `#categoryFilters [data-category="${category}"]`
                );


            if (targetTab) {
                targetTab.click();
            }

        });

    });


// --- 13. PRICE RANGE ---

priceRange.addEventListener('input', (event) => {

    maxPrice =
        parseFloat(event.target.value);


    priceValue.textContent =
        `$${maxPrice}`;


    renderProducts();
});


// --- 14. SORT ---

sortSelect.addEventListener('change', (event) => {

    sortBy = event.target.value;

    renderProducts();
});


// --- 15. RESET FILTERS ---

resetFiltersBtn.addEventListener('click', () => {

    activeCategory = 'all';

    searchQuery = '';

    maxPrice = 1000;

    sortBy = 'featured';


    searchInput.value = '';

    priceRange.value = 1000;

    priceValue.textContent = '$1000';

    sortSelect.value = 'featured';


    document
        .querySelector('#categoryFilters [data-category="all"]')
        .click();
});


// --- 16. CART DRAWER EVENTS ---

cartBtn.addEventListener(
    'click',
    () => toggleCartDrawer(true)
);


closeCartBtn.addEventListener(
    'click',
    () => toggleCartDrawer(false)
);


cartBackdrop.addEventListener(
    'click',
    () => toggleCartDrawer(false)
);


// --- 17. QUICK VIEW EVENTS ---

closeModalBtn.addEventListener(
    'click',
    closeQuickView
);


modalBackdrop.addEventListener(
    'click',
    closeQuickView
);


// --- 18. CHECKOUT ---

checkoutBtn.addEventListener('click', () => {

    if (cart.length === 0) {

        showToast(
            "Your cart is empty!",
            "error"
        );

        return;
    }


    showToast(
        "Order placed successfully! Thank you.",
        "success"
    );


    cart = [];

    updateCartUI();

    toggleCartDrawer(false);
});


// --- 19. NEWSLETTER ---

document
    .getElementById('newsletterForm')
    .addEventListener('submit', (event) => {

        event.preventDefault();


        showToast(
            "Subscribed to newsletter!",
            "success"
        );


        event.target.reset();

    });


// --- 20. DARK MODE ---

themeToggle.addEventListener('click', () => {

    document.documentElement.classList.toggle('dark');

});


// --- 21. INITIALIZATION ---

renderProducts();

updateCartUI();