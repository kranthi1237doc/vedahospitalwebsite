// Veda Hospital Website JavaScript - Fixed Version

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeAppointmentForm();
    initializeModal();
    initializeScrollEffects();
    initializeDateRestrictions();
    initializePhoneLinks();
    initializeCTAButtons();
    initializeResponsiveNav();
});

// Navigation functionality - FIXED
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }

    // Close mobile menu when clicking on links and handle smooth scrolling - FIXED
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu
            if (navMenu) {
                navMenu.classList.remove('active');
                
                // Reset hamburger menu
                if (navToggle) {
                    const spans = navToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                }
            }
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll to target section - FIXED
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight || 70;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navToggle && !navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            
            // Reset hamburger menu
            if (navToggle) {
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        }
    });
}

// Initialize responsive navigation - NEW
function initializeResponsiveNav() {
    const navToggle = document.getElementById('nav-toggle');
    
    // Ensure mobile toggle is visible on smaller screens
    function checkScreenSize() {
        const screenWidth = window.innerWidth;
        
        if (screenWidth <= 768) {
            if (navToggle) {
                navToggle.style.display = 'flex';
            }
        } else {
            if (navToggle) {
                navToggle.style.display = 'none';
            }
            // Close mobile menu on larger screens
            const navMenu = document.getElementById('nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        }
    }
    
    // Check on load and resize
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

// Initialize CTA buttons - FIXED
function initializeCTAButtons() {
    // Book Appointment buttons - FIXED
    const bookAppointmentBtns = document.querySelectorAll('#book-appointment-btn');
    const doctorBookBtns = document.querySelectorAll('.doctor-card .btn');
    
    // Handle main book appointment button - FIXED
    bookAppointmentBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight || 70;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Focus on the first form field after scrolling
                setTimeout(() => {
                    const firstInput = document.getElementById('patient-name');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 800);
            }
        });
    });
    
    // Handle doctor consultation buttons - FIXED
    doctorBookBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight || 70;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Pre-fill service type if available
                setTimeout(() => {
                    const serviceSelect = document.getElementById('service-type');
                    const firstInput = document.getElementById('patient-name');
                    
                    if (serviceSelect) {
                        serviceSelect.value = 'general'; // Default to general consultation
                    }
                    
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 800);
            }
        });
    });
}

// Initialize phone links - FIXED
function initializePhoneLinks() {
    // Make all phone numbers clickable - FIXED
    const phoneNumbers = ['7901228989', '7302938979'];
    
    // Find all phone number text and make them clickable
    phoneNumbers.forEach(phoneNumber => {
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            if (element.children.length === 0 && element.textContent.includes(phoneNumber)) {
                const parent = element.parentNode;
                if (parent && !parent.querySelector('a[href^="tel:"]')) {
                    element.innerHTML = element.textContent.replace(
                        phoneNumber, 
                        `<a href="tel:${phoneNumber}" style="color: inherit; text-decoration: none;">${phoneNumber}</a>`
                    );
                }
            }
        });
    });
    
    // Ensure all existing phone links work properly
    const phoneElements = document.querySelectorAll('a[href^="tel:"]');
    
    phoneElements.forEach(link => {
        // Add click tracking
        link.addEventListener('click', function() {
            console.log('Phone call initiated:', this.getAttribute('href'));
        });
        
        // For desktop browsers, show confirmation
        link.addEventListener('click', function(e) {
            if (!navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
                const phoneNumber = this.getAttribute('href').replace('tel:', '');
                const confirmed = confirm(`Call ${phoneNumber}?`);
                if (!confirmed) {
                    e.preventDefault();
                }
            }
        });
    });
}

// Appointment form functionality
function initializeAppointmentForm() {
    const appointmentForm = document.getElementById('appointment-form');

    // Handle appointment form submission
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear any existing error messages
            clearFormErrors();
            
            if (validateAppointmentForm()) {
                submitAppointmentForm();
            }
        });
        
        // Real-time validation
        const formInputs = appointmentForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    showFieldError(this, 'This field is required');
                } else {
                    clearFieldError(this);
                }
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// Clear form errors
function clearFormErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.style.borderColor = '';
        control.classList.remove('error');
    });
}

// Clear individual field error
function clearFieldError(field) {
    field.style.borderColor = '';
    field.classList.remove('error');
    const errorMsg = field.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// Form validation
function validateAppointmentForm() {
    const form = document.getElementById('appointment-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Validate each required field
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            // Additional validation based on field type
            if (field.type === 'email' && !isValidEmail(field.value)) {
                showFieldError(field, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (field.type === 'tel' && !isValidPhone(field.value)) {
                showFieldError(field, 'Please enter a valid 10-digit phone number');
                isValid = false;
            }
            
            if (field.type === 'date' && !isValidDate(field.value)) {
                showFieldError(field, 'Please select a future date');
                isValid = false;
            }
        }
    });

    return isValid;
}

// Show field error
function showFieldError(field, message) {
    // Clear existing error first
    clearFieldError(field);
    
    field.style.borderColor = 'var(--color-error)';
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    
    // Scroll to first error if not visible
    if (!isElementInViewport(field)) {
        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Validation helpers
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

function isValidDate(date) {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
}

// Submit appointment form
function submitAppointmentForm() {
    const appointmentForm = document.getElementById('appointment-form');
    const submitBtn = appointmentForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Booking Appointment...';
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Show success modal
        showAppointmentModal();
        
        // Reset form
        appointmentForm.reset();
        clearFormErrors();
        
        // Send confirmation (in real app, this would be handled by backend)
        sendConfirmation();
    }, 2000);
}

// Initialize modal functionality
function initializeModal() {
    const modal = document.getElementById('appointment-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBackdrop = modal ? modal.querySelector('.modal__backdrop') : null;

    // Close modal functionality
    if (modalClose) {
        modalClose.addEventListener('click', function(e) {
            e.preventDefault();
            hideAppointmentModal();
        });
    }
    
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', function(e) {
            if (e.target === modalBackdrop) {
                hideAppointmentModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            hideAppointmentModal();
        }
    });
}

// Show appointment success modal
function showAppointmentModal() {
    const modal = document.getElementById('appointment-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Focus on close button for accessibility
        setTimeout(() => {
            const closeBtn = document.getElementById('modal-close');
            if (closeBtn) {
                closeBtn.focus();
            }
        }, 100);
    }
}

// Hide appointment modal
function hideAppointmentModal() {
    const modal = document.getElementById('appointment-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Initialize scroll effects - FIXED
function initializeScrollEffects() {
    // Update active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // Throttled scroll event listener
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Smooth scrolling for all anchor links - FIXED
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight || 70;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize date restrictions for appointment form
function initializeDateRestrictions() {
    const dateInput = document.getElementById('appointment-date');
    
    if (dateInput) {
        // Set minimum date to today
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayString = `${yyyy}-${mm}-${dd}`;
        
        dateInput.setAttribute('min', todayString);
        
        // Set maximum date to 3 months from today
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        const maxYyyy = maxDate.getFullYear();
        const maxMm = String(maxDate.getMonth() + 1).padStart(2, '0');
        const maxDd = String(maxDate.getDate()).padStart(2, '0');
        const maxDateString = `${maxYyyy}-${maxMm}-${maxDd}`;
        
        dateInput.setAttribute('max', maxDateString);
    }
}

// Send confirmation (mock function)
function sendConfirmation() {
    const form = document.getElementById('appointment-form');
    const formData = new FormData(form);
    
    console.log('Appointment details:');
    for (let [key, value] of formData.entries()) {
        console.log(key + ':', value);
    }
    
    // In a real application, this would:
    // 1. Send email confirmation to patient
    // 2. Send SMS confirmation
    // 3. Add appointment to hospital management system
    // 4. Notify relevant medical staff
}

// Utility function to format phone numbers
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length <= 10) {
        input.value = value;
    } else {
        input.value = value.substring(0, 10);
    }
}

// Add phone number formatting to phone inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    });
});

// Performance optimization: Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        // Observe service cards and doctor cards for fade-in animation
        const animatedElements = document.querySelectorAll('.service-card, .doctor-card, .stat-item');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.position = 'absolute';
    skipLink.style.left = '-9999px';
    skipLink.addEventListener('focus', function() {
        this.style.left = '0';
        this.style.top = '0';
        this.style.zIndex = '9999';
        this.style.padding = '8px';
        this.style.background = 'var(--color-primary)';
        this.style.color = 'white';
        this.style.textDecoration = 'none';
    });
    skipLink.addEventListener('blur', function() {
        this.style.left = '-9999px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main landmark if it doesn't exist
    const main = document.querySelector('main');
    if (main && !main.id) {
        main.id = 'main';
    }

    // Improve focus management for modal
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', function(e) {
        // Trap focus in modal when open
        const modal = document.getElementById('appointment-modal');
        if (modal && !modal.classList.contains('hidden')) {
            const focusableContent = modal.querySelectorAll(focusableElements);
            const firstFocusable = focusableContent[0];
            const lastFocusable = focusableContent[focusableContent.length - 1];
            
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        }
    });
});

// Error handling for the entire application
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    
    // Show user-friendly error message for critical failures
    if (e.error && e.error.message) {
        console.warn('An error occurred. Please refresh the page if you experience issues.');
    }
});

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Veda Hospital website loaded successfully');
    
    // Additional initialization for immediate functionality
    setTimeout(() => {
        initializePhoneLinks(); // Re-run phone link initialization after page is fully loaded
    }, 500);
});