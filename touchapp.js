document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.querySelector('.md\\:flex');

    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    const purchaseButtons = document.querySelectorAll('a[href="#purchase"]');
    const purchaseModal = document.getElementById('purchase');
    const closePurchaseButton = document.getElementById('close-purchase');

    purchaseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            purchaseModal.classList.remove('hidden');
            purchaseModal.classList.add('flex');
        });
    });

    closePurchaseButton.addEventListener('click', function() {
        purchaseModal.classList.remove('flex');
        purchaseModal.classList.add('hidden');
    });

    purchaseModal.addEventListener('click', function(e) {
        if (e.target === purchaseModal) {
            purchaseModal.classList.remove('flex');
            purchaseModal.classList.add('hidden');
        }
    });
});