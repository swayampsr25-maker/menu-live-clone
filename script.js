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

// Highlight active nav link based on current file
const setActiveNav = () => {
    const links = document.querySelectorAll('.nav-menu a');
    const path = window.location.pathname.split('/').pop();
    // Normalize for default index
    const current = path === '' ? 'index.html' : path;
    links.forEach(a => {
        const href = a.getAttribute('href');
        // If link is a hash to index sections, treat index anchors as index
        if (href === current || (href === 'index.html' && (current === 'index.html' || current === ''))) {
            a.classList.add('active-link');
        } else if (href === window.location.hash) {
            a.classList.add('active-link');
        } else {
            a.classList.remove('active-link');
        }
    });
};

window.addEventListener('load', setActiveNav);
window.addEventListener('popstate', setActiveNav);

// Feature rotator: cycles feature texts in the hero (if present)
(() => {
    const features = [
        'WITH SELF ORDER KIOSK (SOK)',
        'WITH TABLE ORDER KIOSK (TOK)',
        'WITH POINT OF SALE',
        'WITH DIGITAL MENU DISPLAY',
        'WITH QR ORDER & PAYMENT',
        'WITH INVENTORY MANAGER DISPLAY',
        'WITH CUSTOMER TOKEN DISPLAY',
        'WITH KITCHEN ORDER DISPLAY',
        'WITH ONLINE ORDERING'
    ];

    const el = document.getElementById('feature-text');
    if (!el) return;

    let idx = 0;
    // Ensure initial text
    el.textContent = features[0];

    const rotate = () => {
        // fade out
        el.classList.add('fade-out');
        setTimeout(() => {
            idx = (idx + 1) % features.length;
            el.textContent = features[idx];
            el.classList.remove('fade-out');
            el.classList.add('fade-in');
            setTimeout(() => el.classList.remove('fade-in'), 350);
        }, 280);
    };

      // rotate every 3 seconds
    setInterval(rotate, 3000);
})();

// Hardware images carousel (open on double-click)
(function() {
    const carousel = document.getElementById('hardware-carousel');
    if (!carousel) return;

    const overlay = carousel.querySelector('.carousel-overlay');
    const imgEl = carousel.querySelector('.carousel-slide img');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const closeBtn = carousel.querySelector('.carousel-close');
    const counter = carousel.querySelector('.carousel-counter');

    // collect hardware image srcs in document order
    const hwImgs = Array.from(document.querySelectorAll('.hardware-grid .hardware-item .hardware-img'))
        .map(i => i.getAttribute('src'))
        .filter(Boolean);

    let current = 0;

    function showAt(index) {
        if (!hwImgs.length) return;
        current = (index + hwImgs.length) % hwImgs.length;
        imgEl.src = hwImgs[current];
        imgEl.alt = document.querySelectorAll('.hardware-grid .hardware-item .hardware-img')[current]?.alt || '';
        counter.textContent = `${current + 1} / ${hwImgs.length}`;
        carousel.classList.add('visible');
        carousel.setAttribute('aria-hidden', 'false');
        // lock scrolling
        document.body.style.overflow = 'hidden';
        // focus for keyboard
        closeBtn && closeBtn.focus();
    }

    function closeCarousel() {
        carousel.classList.remove('visible');
        carousel.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function prev() { showAt(current - 1); }
    function next() { showAt(current + 1); }

    // attach dblclick to hardware images (delegation)
    document.addEventListener('dblclick', (e) => {
        const img = e.target.closest('.hardware-grid .hardware-item .hardware-img');
        if (!img) return;
        // find index by matching src attribute
        const src = img.getAttribute('src');
        const idx = hwImgs.indexOf(src);
        if (idx === -1) return;
        showAt(idx);
    });

    // controls
    overlay && overlay.addEventListener('click', closeCarousel);
    closeBtn && closeBtn.addEventListener('click', closeCarousel);
    prevBtn && prevBtn.addEventListener('click', prev);
    nextBtn && nextBtn.addEventListener('click', next);

    // keyboard navigation
    window.addEventListener('keydown', (e) => {
        if (!carousel.classList.contains('visible')) return;
        if (e.key === 'Escape') closeCarousel();
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    });

    // when modal hides, clear src to release memory
    const observer = new MutationObserver(() => {
        if (!carousel.classList.contains('visible')) {
            imgEl.removeAttribute('src');
        }
    });
    observer.observe(carousel, { attributes: true, attributeFilter: ['class'] });
})();
