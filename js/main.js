<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                timestamp: new Date().toLocaleString(),
                name: document.getElementById('name').value,
                organization: document.getElementById('organization').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                employees: document.getElementById('employees').value,
                package: document.getElementById('package').value,
                message: document.getElementById('message').value
            };

            try {
                // Show loading state
                const submitButton = bookingForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
                submitButton.disabled = true;

                // Submit to Google Sheets
                const params = new URLSearchParams();
                for (const [key, value] of Object.entries(formData)) {
                    params.append(key, value);
                }

                const response = await fetch('https://script.google.com/macros/s/AKfycbx_C0L6xaJFhW_ebYHXRRIGKMzeUSyy3_qy5ZLPfk1Pm9xf9PB0dvDxF_XB2Yh0tBOr/exec?' + params.toString(), {
                    method: 'GET',
                    mode: 'no-cors',
                    redirect: 'follow'
                });

                // Wait a moment to ensure the submission completes
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Reset form and show success message
                bookingForm.reset();
                alert('Thank you for your booking! We will contact you shortly.');

            } catch (error) {
                console.error('Error:', error);
                alert('There was an error submitting your booking. Please try again.');
            } finally {
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }

    // Handle package selection from pricing cards
    const packageButtons = document.querySelectorAll('.card .btn');
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageType = this.closest('.card').querySelector('h2').textContent;
            const packageSelect = document.getElementById('package');
            if (packageSelect) {
                // Map the package names to the select values
                const packageMap = {
                    'Health 1 Plan': 'health1',
                    'Health 2 Plan': 'health2'
                };
                packageSelect.value = packageMap[packageType] || '';
            }
        });
    });
=======
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'showImageNumberLabel': false,
        'fadeDuration': 200,
        'imageFadeDuration': 200,
        'albumLabel': "Image %1 of %2",
        'disableScrolling': true,
        'positionFromTop': 100,
        'maxWidth': 1200,
        'maxHeight': 800
    });

    // Add click event listeners to gallery items
    document.querySelectorAll('.gallery-link').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const lightboxAnchor = this;
            lightbox.start(lightboxAnchor);
        });
    });

    // Handle form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                timestamp: new Date().toLocaleString(),
                name: document.getElementById('name').value,
                organization: document.getElementById('organization').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                employees: document.getElementById('employees').value,
                message: document.getElementById('message').value
            };

            try {
                // Show loading state
                const submitButton = bookingForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
                submitButton.disabled = true;

                // Submit to Google Sheets
                const params = new URLSearchParams();
                for (const [key, value] of Object.entries(formData)) {
                    params.append(key, value);
                }

                const response = await fetch('https://script.google.com/macros/s/AKfycbx_C0L6xaJFhW_ebYHXRRIGKMzeUSyy3_qy5ZLPfk1Pm9xf9PB0dvDxF_XB2Yh0tBOr/exec?' + params.toString(), {
                    method: 'GET',
                    mode: 'no-cors',
                    redirect: 'follow'
                });

                // Wait a moment to ensure the submission completes
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Reset form and show success message
                bookingForm.reset();
                alert('Thank you for your booking! We will contact you shortly.');

            } catch (error) {
                console.error('Error:', error);
                alert('There was an error submitting your booking. Please try again.');
            } finally {
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
>>>>>>> 48a8075 (Initial commit from Cursor AI)
}); 