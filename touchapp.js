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

    // Stripe integration
    const stripe = Stripe('your_stripe_public_key');
    const purchaseForm = document.querySelector('#purchase form');

    purchaseForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Collect form data
        const formData = new FormData(purchaseForm);
        const paymentMethod = await stripe.createPaymentMethod({
            type: 'card',
            card: {
                number: formData.get('card_number'),
                exp_month: formData.get('exp_month'),
                exp_year: formData.get('exp_year'),
                cvc: formData.get('cvc')
            }
        });

        // Process the payment
        try {
            const response = await stripe.confirmCardPayment('your_stripe_client_secret', {
                payment_method: paymentMethod.paymentMethod.id
            });

            if (response.paymentIntent.status === 'succeeded') {
                // Payment successful
                console.log('Payment successful!');
            } else {
                // Payment failed
                console.error('Payment failed:', response.error.message);
            }
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    });
});