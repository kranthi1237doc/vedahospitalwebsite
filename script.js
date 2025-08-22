// Veda Hospital Website - JavaScript Functionality
// This file contains all interactive features for the website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Veda Hospital website loaded successfully');

    // Initialize all functionality
    initializeNavigation();
    initializeAppointmentForm();
    initializeContactForm();
    initializeScrollEffects();
    initializeMobileMenu();
    initializePhoneLinks();
});

// Mobile Navigation Menu
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

// Smooth scrolling for navigation links
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Close mobile menu if open
            const navMenu = document.querySelector('.nav__menu');
            const menuToggle = document.querySelector('.nav__toggle');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
}

// Appointment form functionality
function initializeAppointmentForm() {
    const appointmentForm = document.getElementById('appointment-form');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const date = formData.get('date');
            const time = formData.get('time');
            const service = formData.get('service');

            // Basic validation
            if (!name || !phone || !date || !time) {
                alert('Please fill in all required fields.');
                return;
            }

            // Show success message
            showSuccessMessage('Appointment request submitted successfully! We will contact you soon.');

            // Reset form
            this.reset();
        });
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Show success message
            showSuccessMessage('Message sent successfully! We will respond to you soon.');

            // Reset form
            this.reset();
        });
    }
}

// Phone number click functionality
function initializePhoneLinks() {
    const phoneButtons = document.querySelectorAll('.phone-btn');

    phoneButtons.forEach(button => {
        button.addEventListener('click', function() {
            const phoneNumber = this.textContent.replace(/\D/g, '');
            window.location.href = `tel:+91${phoneNumber}`;
        });
    });
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Add scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Show success message
function showSuccessMessage(message) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        max-width: 300px;
        font-weight: 500;
    `;

    // Add to page
    document.body.appendChild(messageDiv);

    // Remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Utility function for smooth scrolling to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Emergency contact functionality
function callEmergency() {
    window.location.href = 'tel:+917901228989';
}

// Book appointment shortcut
function bookAppointment() {
    scrollToElement('appointment');
}

console.log('Veda Hospital JavaScript loaded successfully! 🏥');
