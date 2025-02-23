// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lightbox
    lightbox.option({
        'resizeDuration': 300,
        'wrapAround': true,
        'showImageNumberLabel': true,
        'fadeDuration': 300,
        'imageFadeDuration': 300,
        'albumLabel': 'Image %1 of %2',
        'disableScrolling': true,
        'positionFromTop': 100,
        'maxWidth': 1200,
        'maxHeight': 800
    });

    // Handle form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                organization: document.getElementById('organization').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                employees: document.getElementById('employees').value,
                message: document.getElementById('message').value
            };

            // Here you would typically send this data to your server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your booking request! We will contact you shortly.');
            
            // Reset form
            bookingForm.reset();
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation class to elements when they become visible
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature-box, .stat-box, .testimonial-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop >= 0) && (elementBottom <= window.innerHeight);
            
            if (isVisible) {
                element.classList.add('animate');
            }
        });
    };

    // Initial check for elements in view
    animateOnScroll();

    // Check for elements in view on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Add keyboard navigation for gallery
    document.addEventListener('keydown', function(e) {
        if (document.querySelector('.gallery-track')) {
            if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            }
        }
    });
});

// Gallery Functions
function updateMainImage(element, imageSrc) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = imageSrc;
        
        // Remove active class from all gallery items
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to clicked item
        element.classList.add('active');
    }
}

function nextImage() {
    const items = document.querySelectorAll('.gallery-item');
    const activeItem = document.querySelector('.gallery-item.active');
    let nextItem;

    if (activeItem) {
        const currentIndex = Array.from(items).indexOf(activeItem);
        nextItem = items[currentIndex + 1] || items[0];
    } else {
        nextItem = items[0];
    }

    if (nextItem) {
        const img = nextItem.querySelector('img');
        if (img) {
            updateMainImage(nextItem, img.src);
        }
    }
}

function prevImage() {
    const items = document.querySelectorAll('.gallery-item');
    const activeItem = document.querySelector('.gallery-item.active');
    let prevItem;

    if (activeItem) {
        const currentIndex = Array.from(items).indexOf(activeItem);
        prevItem = items[currentIndex - 1] || items[items.length - 1];
    } else {
        prevItem = items[items.length - 1];
    }

    if (prevItem) {
        const img = prevItem.querySelector('img');
        if (img) {
            updateMainImage(prevItem, img.src);
        }
    }
}

// Function to add new images to gallery
function addNewImagesToGallery(newImages) {
    const galleryTrack = document.querySelector('.gallery-track');
    const hiddenLightboxLinks = document.querySelector('.d-none');
    
    if (!galleryTrack || !hiddenLightboxLinks) return;

    // Add new images to gallery track
    newImages.forEach(imagePath => {
        // Create gallery item
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.onclick = () => updateMainImage(div, imagePath);
        div.innerHTML = `
            <img src="${imagePath}" alt="Health Camp" class="img-fluid rounded">
        `;
        galleryTrack.appendChild(div);

        // Create duplicate for infinite scroll
        const divDuplicate = div.cloneNode(true);
        divDuplicate.onclick = () => updateMainImage(divDuplicate, imagePath);
        galleryTrack.appendChild(divDuplicate);

        // Add lightbox link
        const link = document.createElement('a');
        link.href = imagePath;
        link.setAttribute('data-lightbox', 'camp-gallery');
        hiddenLightboxLinks.appendChild(link);
    });
}

// Function to check for new images
async function checkForNewImages() {
    try {
        const response = await fetch('/api/gallery-images');
        const images = await response.json();
        
        // Get current images
        const currentImages = Array.from(document.querySelectorAll('.gallery-item img')).map(img => img.src);
        const uniqueCurrentImages = [...new Set(currentImages)];
        
        // Find new images
        const newImages = images.filter(imagePath => !uniqueCurrentImages.includes(imagePath));
        
        // Add new images if any found
        if (newImages.length > 0) {
            addNewImagesToGallery(newImages);
        }
    } catch (error) {
        console.error('Error checking for new images:', error);
    }
}

// Check for new images periodically (every 5 minutes)
if (document.querySelector('.gallery-track')) {
    setInterval(checkForNewImages, 300000);
}
