// Shop Page Functionality
class ShopController {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentFilter = 'all';
        this.currentSort = 'featured';
        this.init();
    }

    init() {
        this.setupFilters();
        this.setupSorting();
        this.setupProductInteractions();
        this.setupQuickView();
        this.loadProducts();
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                e.target.classList.add('active');
                
                // Update current filter
                this.currentFilter = e.target.dataset.filter;
                
                // Filter products
                this.filterProducts();
            });
        });
    }

    setupSorting() {
        const sortSelect = document.querySelector('.sort-select');
        
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.sortProducts();
            });
        }
    }

    setupProductInteractions() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                this.animateProductHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateProductHover(card, false);
            });
            
            // Color option interactions
            const colorOptions = card.querySelectorAll('.color-option');
            colorOptions.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.selectColor(card, option);
                });
            });
            
            // Add to cart functionality
            const addToCartBtn = card.querySelector('.add-to-cart');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.addToCart(card);
                });
            }
        });
    }

    animateProductHover(card, isEntering) {
        const image = card.querySelector('.product-image img');
        const overlay = card.querySelector('.product-overlay');
        const info = card.querySelector('.product-info');
        
        if (isEntering) {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            
            if (image) {
                image.style.transform = 'scale(1.1) rotate(2deg)';
                image.style.filter = 'brightness(1.1) contrast(1.1)';
            }
            
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.backdropFilter = 'blur(10px)';
            }
            
            if (info) {
                info.style.transform = 'translateY(-5px)';
            }
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            
            if (image) {
                image.style.transform = 'scale(1) rotate(0deg)';
                image.style.filter = 'brightness(1) contrast(1)';
            }
            
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.backdropFilter = 'blur(0px)';
            }
            
            if (info) {
                info.style.transform = 'translateY(0)';
            }
        }
    }

    selectColor(card, selectedOption) {
        const colorOptions = card.querySelectorAll('.color-option');
        const productImage = card.querySelector('.product-image img');
        
        // Remove active state from all color options
        colorOptions.forEach(option => {
            option.style.transform = 'scale(1)';
            option.style.boxShadow = 'none';
        });
        
        // Add active state to selected option
        selectedOption.style.transform = 'scale(1.2)';
        selectedOption.style.boxShadow = '0 0 0 3px var(--accent-gold)';
        
        // Color change animation
        if (productImage) {
            productImage.style.transition = 'all 0.3s ease';
            productImage.style.opacity = '0.7';
            
            setTimeout(() => {
                productImage.style.opacity = '1';
                // Here you would typically change the image source based on color
            }, 150);
        }
        
        this.showColorChangeEffect(selectedOption);
    }

    showColorChangeEffect(colorOption) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(212, 175, 55, 0.3);
            transform: scale(0);
            animation: colorRipple 0.6s ease-out;
            width: 40px;
            height: 40px;
            top: -10px;
            left: -10px;
            pointer-events: none;
        `;
        
        colorOption.style.position = 'relative';
        colorOption.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    addToCart(card) {
        const productName = card.querySelector('.product-name').textContent;
        const productPrice = card.querySelector('.product-price').textContent;
        const selectedColor = card.querySelector('.color-option[style*="scale(1.2)"]');
        
        // Create add to cart animation
        this.createAddToCartAnimation(card);
        
        // Show success message
        this.showAddToCartSuccess(productName, productPrice);
        
        // Update cart (would typically integrate with cart system)
        this.updateCartCount();
    }

    createAddToCartAnimation(card) {
        const productImage = card.querySelector('.product-image img');
        const cartIcon = document.querySelector('.cart-icon') || document.querySelector('.nav-logo');
        
        if (productImage && cartIcon) {
            const imageClone = productImage.cloneNode(true);
            const imageRect = productImage.getBoundingClientRect();
            const cartRect = cartIcon.getBoundingClientRect();
            
            imageClone.style.cssText = `
                position: fixed;
                top: ${imageRect.top}px;
                left: ${imageRect.left}px;
                width: ${imageRect.width}px;
                height: ${imageRect.height}px;
                z-index: 10000;
                pointer-events: none;
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                transform: scale(1);
                opacity: 1;
            `;
            
            document.body.appendChild(imageClone);
            
            // Animate to cart
            setTimeout(() => {
                imageClone.style.transform = `scale(0.1) translate(${cartRect.left - imageRect.left}px, ${cartRect.top - imageRect.top}px)`;
                imageClone.style.opacity = '0';
            }, 100);
            
            // Remove clone
            setTimeout(() => {
                imageClone.remove();
            }, 900);
        }
    }

    showAddToCartSuccess(productName, productPrice) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="cart-notification-content">
                <div class="cart-success-icon">✓</div>
                <div class="cart-notification-text">
                    <strong>${productName}</strong><br>
                    ${productPrice} added to cart
                </div>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--accent-gold);
            color: var(--primary-black);
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    }

    updateCartCount() {
        // This would typically update a cart counter in the navigation
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const currentCount = parseInt(cartCount.textContent) || 0;
            cartCount.textContent = currentCount + 1;
            
            // Animate cart count
            cartCount.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 200);
        }
    }

    setupQuickView() {
        const quickViewBtns = document.querySelectorAll('.quick-view');
        
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productCard = btn.closest('.product-card');
                this.openQuickView(productCard);
            });
        });
    }

    openQuickView(productCard) {
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        const productImage = productCard.querySelector('.product-image img').src;
        
        const modal = this.createQuickViewModal(productName, productPrice, productImage);
        document.body.appendChild(modal);
        
        // Animate modal in
        setTimeout(() => {
            modal.classList.add('active');
        }, 100);
    }

    createQuickViewModal(name, price, imageSrc) {
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="${imageSrc}" alt="${name}">
                    </div>
                    <div class="modal-info">
                        <h2>${name}</h2>
                        <div class="modal-price">${price}</div>
                        <p class="modal-description">
                            Premium quality fabric with exceptional attention to detail. 
                            This piece represents the pinnacle of luxury fashion craftsmanship.
                        </p>
                        <div class="modal-sizes">
                            <h4>Size</h4>
                            <div class="size-options">
                                <button class="size-btn">XS</button>
                                <button class="size-btn">S</button>
                                <button class="size-btn active">M</button>
                                <button class="size-btn">L</button>
                                <button class="size-btn">XL</button>
                            </div>
                        </div>
                        <button class="btn btn-primary modal-add-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;
        
        // Add event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeQuickView(modal);
        });
        
        modal.querySelector('.modal-backdrop').addEventListener('click', () => {
            this.closeQuickView(modal);
        });
        
        // Size selection
        modal.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                modal.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        return modal;
    }

    closeQuickView(modal) {
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        
        setTimeout(() => {
            modal.remove();
        }, 300);
    }

    filterProducts() {
        const products = document.querySelectorAll('.product-card');
        
        products.forEach((product, index) => {
            const category = product.dataset.category;
            const shouldShow = this.currentFilter === 'all' || category === this.currentFilter;
            
            if (shouldShow) {
                product.style.display = 'block';
                setTimeout(() => {
                    product.style.opacity = '1';
                    product.style.transform = 'translateY(0)';
                }, index * 50);
            } else {
                product.style.opacity = '0';
                product.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    product.style.display = 'none';
                }, 300);
            }
        });
    }

    sortProducts() {
        const productsContainer = document.getElementById('productsGrid');
        const products = Array.from(productsContainer.children);
        
        products.sort((a, b) => {
            const priceA = parseInt(a.querySelector('.product-price').textContent.replace(/[^0-9]/g, ''));
            const priceB = parseInt(b.querySelector('.product-price').textContent.replace(/[^0-9]/g, ''));
            
            switch (this.currentSort) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'newest':
                    // Would typically sort by date
                    return Math.random() - 0.5;
                default:
                    return 0;
            }
        });
        
        // Re-append sorted products with animation
        products.forEach((product, index) => {
            product.style.opacity = '0';
            product.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                productsContainer.appendChild(product);
                setTimeout(() => {
                    product.style.opacity = '1';
                    product.style.transform = 'translateY(0)';
                }, 50);
            }, index * 50);
        });
    }

    loadProducts() {
        // This would typically fetch products from an API
        // For now, we'll just add animation to existing products
        const products = document.querySelectorAll('.product-card');
        
        products.forEach((product, index) => {
            product.style.opacity = '0';
            product.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                product.style.transition = 'all 0.6s ease';
                product.style.opacity = '1';
                product.style.transform = 'translateY(0)';
            }, index * 100 + 500);
        });
    }
}

// Add CSS for shop animations
const shopStyles = document.createElement('style');
shopStyles.textContent = `
    @keyframes colorRipple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .quick-view-modal.active {
        opacity: 1 !important;
        visibility: visible !important;
    }
    
    .quick-view-modal .modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
    }
    
    .quick-view-modal .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 10px;
        max-width: 800px;
        width: 90%;
        max-height: 90%;
        overflow-y: auto;
    }
    
    .quick-view-modal .modal-close {
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        z-index: 1;
    }
    
    .quick-view-modal .modal-body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        padding: 2rem;
    }
    
    .quick-view-modal .modal-image img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 5px;
    }
    
    .quick-view-modal .modal-info h2 {
        font-family: var(--font-primary);
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    
    .quick-view-modal .modal-price {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--accent-gold);
        margin-bottom: 1rem;
    }
    
    .quick-view-modal .modal-description {
        color: var(--medium-gray);
        line-height: 1.6;
        margin-bottom: 2rem;
    }
    
    .quick-view-modal .size-options {
        display: flex;
        gap: 0.5rem;
        margin: 1rem 0 2rem;
    }
    
    .quick-view-modal .size-btn {
        padding: 0.5rem 1rem;
        border: 2px solid var(--medium-gray);
        background: transparent;
        cursor: pointer;
        transition: var(--transition-fast);
    }
    
    .quick-view-modal .size-btn.active,
    .quick-view-modal .size-btn:hover {
        border-color: var(--accent-gold);
        color: var(--accent-gold);
    }
    
    .cart-notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .cart-success-icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: var(--primary-black);
        color: var(--accent-gold);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }
    
    @media (max-width: 768px) {
        .quick-view-modal .modal-body {
            grid-template-columns: 1fr;
            padding: 1rem;
        }
        
        .quick-view-modal .modal-image img {
            height: 300px;
        }
    }
`;

document.head.appendChild(shopStyles);

// Initialize shop functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.products-section')) {
        new ShopController();
    }
});

// Export for use in other modules
window.ShopController = ShopController;