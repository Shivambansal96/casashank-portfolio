// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initNavigation();
    initAnimations();
    initCarousel();
    initForms();
    initScrollEffects();
    init3DTilt();
    initChangingText();
});

function initChangingText() {
    const changingText = document.getElementById('changingText');
    const texts = [
        'Tax Expert',
        'Audit Professional',
        'GST Consultant',
        'Financial Advisor',
        'Compliance Specialist',
        'Business Partner'
    ];
    let currentIndex = 0;
    
    function changeText() {
        // Fade out
        changingText.style.opacity = '0';
        changingText.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % texts.length;
            changingText.textContent = texts[currentIndex];
            
            // Fade in
            changingText.style.opacity = '1';
            changingText.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Initial style
    changingText.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    // Change text every 2 seconds
    setInterval(changeText, 2000);
}

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    
    themeToggle.addEventListener('click', function() {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        
        const icon = themeToggle.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
}

// Navigation
function initNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Highlight active section
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Animations
function initAnimations() {
    // Animated counters
    const counters = document.querySelectorAll('.stat-number[data-count]');
    const observerOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // Progress bars
    const progressBars = document.querySelectorAll('.progress-fill[data-progress]');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                setTimeout(() => {
                    entry.target.style.width = progress + '%';
                }, 200);
                progressObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => progressObserver.observe(bar));
    
    // AOS (Animate on Scroll)
    const aosElements = document.querySelectorAll('[data-aos]');
    
    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });
    
    aosElements.forEach(el => aosObserver.observe(el));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target >= 100 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Skills Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        skillCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Service Modal
const serviceDetails = {
    1: {
        title: 'Income Tax Planning & Filing',
        description: 'Comprehensive income tax services designed to optimize your tax liability while ensuring full compliance with tax regulations.',
        features: [
            'Personal Income Tax Planning',
            'Corporate Tax Planning',
            'Tax Return Filing (ITR)',
            'Tax Deduction Optimization',
            'Investment Planning for Tax Savings',
            'TDS Return Filing',
            'Tax Assessment Support',
            'Tax Notice Handling'
        ]
    },
    2: {
        title: 'GST & Tax Compliance',
        description: 'End-to-end GST services including registration, return filing, and compliance to keep your business running smoothly.',
        features: [
            'GST Registration',
            'GST Return Filing (GSTR-1, GSTR-3B)',
            'Input Tax Credit Optimization',
            'GST Refund Processing',
            'GST Audit Support',
            'Annual GST Return (GSTR-9)',
            'GST Notice Handling',
            'E-way Bill Compliance'
        ]
    },
    3: {
        title: 'Audit & Assurance',
        description: 'Professional audit services providing independent verification and assurance for your financial statements and operations.',
        features: [
            'Statutory Audit',
            'Internal Audit',
            'Tax Audit',
            'Bank Audit',
            'Stock Audit',
            'Management Audit',
            'Compliance Certifications',
            'Due Diligence Services'
        ]
    },
    4: {
        title: 'Financial Advisory',
        description: 'Strategic financial planning and advisory services to help businesses and individuals make informed financial decisions.',
        features: [
            'Business Financial Planning',
            'Investment Advisory',
            'Cash Flow Management',
            'Budgeting & Forecasting',
            'Financial Risk Assessment',
            'Business Valuation',
            'Mergers & Acquisitions Advisory',
            'Startup Financial Consulting'
        ]
    }
};

function openServiceModal(id) {
    const modal = document.getElementById('serviceModal');
    const modalBody = document.getElementById('modalBody');
    const service = serviceDetails[id];
    
    modalBody.innerHTML = `
        <h2 style="margin-bottom: 1rem; color: var(--text-primary);">${service.title}</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.8;">${service.description}</p>
        <h3 style="margin-bottom: 1rem; color: var(--text-primary);">Key Services:</h3>
        <ul style="list-style: none; padding: 0;">
            ${service.features.map(feature => `
                <li style="padding: 0.75rem 0; padding-left: 2rem; position: relative; color: var(--text-secondary);">
                    <i class="fas fa-check-circle" style="position: absolute; left: 0; color: var(--primary-color);"></i>
                    ${feature}
                </li>
            `).join('')}
        </ul>
        <div style="margin-top: 2rem; text-align: center;">
            <a href="#contact" class="btn btn-primary" onclick="closeServiceModal()">
                <i class="fas fa-envelope"></i> Get Started
            </a>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('active');
}

// Close modal on outside click
document.getElementById('serviceModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeServiceModal();
    }
});

// Testimonials Carousel
let currentSlide = 0;
const testimonials = [
    {
        name: 'Vikram Singh',
        company: 'Tech Innovation Ltd',
        position: 'CEO',
        feedback: 'Exceptional CA who transformed our financial management! His expertise in tax planning saved us significant costs.',
        rating: 5
    },
    {
        name: 'Priya Sharma',
        company: 'Manufacturing & Co.',
        position: 'Finance Director',
        feedback: 'Professional, timely, and extremely knowledgeable. Best decision we made was hiring Sashank for our audits.',
        rating: 5
    }
];

function initCarousel() {
    renderTestimonials();
    updateCarousel();
}

function renderTestimonials() {
    const track = document.getElementById('testimonialTrack');
    const indicators = document.getElementById('carouselIndicators');
    
    track.innerHTML = testimonials.map((testimonial, index) => `
        <div class="testimonial-card glass-effect">
            <div class="testimonial-header">
                <div class="testimonial-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.position}, ${testimonial.company}</p>
                </div>
                <div class="testimonial-rating">
                    ${'⭐'.repeat(testimonial.rating)}
                </div>
            </div>
            <p class="testimonial-feedback">"${testimonial.feedback}"</p>
        </div>
    `).join('');
    
    indicators.innerHTML = testimonials.map((_, index) => `
        <span class="indicator ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></span>
    `).join('');
}

function updateCarousel() {
    const track = document.getElementById('testimonialTrack');
    const indicators = document.querySelectorAll('.indicator');
    const cardWidth = 350;
    const gap = 32;
    
    track.style.transform = `translateX(-${currentSlide * (cardWidth + gap)}px)`;
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function moveCarousel(direction) {
    const maxSlide = testimonials.length - 1;
    currentSlide = Math.max(0, Math.min(maxSlide, currentSlide + direction));
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Touch swipe for carousel
let touchStartX = 0;
let touchEndX = 0;

const carouselContainer = document.querySelector('.carousel-container');

if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        moveCarousel(1);
    }
    if (touchEndX > touchStartX + 50) {
        moveCarousel(-1);
    }
}

// Forms
function initForms() {
    // Feedback form
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('feedbackName').value;
            const company = document.getElementById('feedbackCompany').value;
            const position = document.getElementById('feedbackPosition').value;
            const rating = parseInt(document.getElementById('feedbackRating').value);
            const message = document.getElementById('feedbackMessage').value;
            
            const newTestimonial = {
                name: name,
                company: company,
                position: position,
                feedback: message,
                rating: rating
            };
            
            testimonials.push(newTestimonial);
            renderTestimonials();
            
            // Show success message
            alert('Thank you for your feedback! Your testimonial has been added.');
            
            // Reset form
            feedbackForm.reset();
            
            // Scroll to new testimonial
            currentSlide = testimonials.length - 1;
            updateCarousel();
        });
    }
    
    // Contact form - FormSubmit handles the submission
    // We just need to show loading state
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = contactForm.querySelector('.btn-submit');
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // FormSubmit will handle the actual submission and redirect
            // No need to prevent default as we want the form to submit normally
        });
    }
}

// Scroll Effects
function initScrollEffects() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 3D Tilt Effect
function init3DTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((centerX - x) / centerX) * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', function() {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Parallax effect for floating shapes
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});