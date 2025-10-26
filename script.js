// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Hardware tab filtering
const tabButtons = document.querySelectorAll('.tab-btn');
const hardwareItems = document.querySelectorAll('.hardware-item');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-tab');
        
        hardwareItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                item.classList.remove('hidden');
            } else {
                item.style.display = 'none';
                item.classList.add('hidden');
            }
        });
    });
});

// Modal functionality
const modal = document.getElementById('contact-modal');
const contactButtons = document.querySelectorAll('button:not(.close):not(.close-modal)');
const closeButton = document.querySelector('.close');
const closeModalButton = document.querySelector('.close-modal');

// Open modal when any button is clicked
contactButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.textContent.toLowerCase().includes('contact') || 
            button.textContent.toLowerCase().includes('trial') ||
            button.textContent.toLowerCase().includes('connect')) {
            e.preventDefault();
            if (modal) {
                modal.style.display = 'block';
            }
        }
    });
});

// Close modal
if (closeButton) {
    closeButton.addEventListener('click', () => {
        if (modal) {
            modal.style.display = 'none';
        }
    });
}

if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
        if (modal) {
            modal.style.display = 'none';
        }
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', { name, email, phone, message });
        
        // Show success message
        alert('Thank you for your interest! Our expert will reach out to you soon.');
        
        // Close modal
        modal.style.display = 'none';
        
        // Reset form
        contactForm.reset();
    });
}

// Animate on scroll
const observeElements = () => {
    const elements = document.querySelectorAll('.use-case-item, .service-item, .hardware-item, .partner-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
};

// Run animation observer when page loads
window.addEventListener('load', observeElements);

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Stats counter animation
const animateCounter = () => {
    const statItems = document.querySelectorAll('.stat-item h3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                let current = 0;
                const increment = target / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = Math.floor(current) + '+';
                }, 20);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statItems.forEach(item => {
        observer.observe(item);
    });
};

window.addEventListener('load', animateCounter);

