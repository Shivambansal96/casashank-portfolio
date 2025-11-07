// Initialize
document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initNavigation();
    initAnimations();
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
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const currentText = texts[currentIndex];

        if (!isDeleting) {
            changingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } else {
                typingSpeed = 100;
            }
        } else {
            changingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;

            if (charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % texts.length;
                typingSpeed = 500;
            }
        }

        setTimeout(typeText, typingSpeed);
    }

    typeText();
}

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');

    themeToggle.addEventListener('click', function () {
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

    mobileMenuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');

            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function () {
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
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

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
    },
    5: {
        title: 'Transfer Pricing',
        description: 'Expert transfer pricing services ensuring compliance with regulations for multinational transactions.',
        features: [
            'Transfer Pricing Documentation',
            'Benchmarking Analysis',
            'Country-by-Country Reporting',
            'Master File Preparation',
            'Advance Pricing Agreements',
            'Transfer Pricing Audits',
            'Dispute Resolution',
            'Compliance Advisory'
        ]
    },
    6: {
        title: 'Company Registration',
        description: 'Complete assistance for company formation and registration across various business structures in India.',
        features: [
            'Private Limited Company Registration',
            'Public Limited Company Registration',
            'One Person Company (OPC)',
            'Limited Liability Partnership (LLP)',
            'Partnership Firm Registration',
            'Sole Proprietorship Setup',
            'Digital Signature Certificate',
            'Director Identification Number'
        ]
    },
    7: {
        title: 'Bookkeeping & Accounting',
        description: 'Professional bookkeeping and accounting services to maintain accurate financial records for your business.',
        features: [
            'Daily Transaction Recording',
            'Bank Reconciliation',
            'Accounts Payable Management',
            'Accounts Receivable Management',
            'Financial Statements Preparation',
            'General Ledger Maintenance',
            'Payroll Processing',
            'Expense Management'
        ]
    },
    8: {
        title: 'Payroll Management',
        description: 'Efficient payroll processing and compliance management solutions for businesses of all sizes.',
        features: [
            'Salary Processing',
            'Provident Fund (PF) Compliance',
            'Employee State Insurance (ESI)',
            'Professional Tax (PT)',
            'Income Tax Deductions (TDS)',
            'Form 16 Generation',
            'Payroll Reports',
            'Statutory Compliance'
        ]
    },
    9: {
        title: 'Business Consultation',
        description: 'Strategic business consulting services to help your business grow and achieve operational excellence.',
        features: [
            'Business Strategy Planning',
            'Market Entry Strategy',
            'Operational Efficiency',
            'Cost Optimization',
            'Growth Strategy',
            'Business Process Improvement',
            'Performance Management',
            'Change Management'
        ]
    },
    10: {
        title: 'Corporate Compliance',
        description: 'Comprehensive corporate compliance services ensuring your business meets all regulatory requirements.',
        features: [
            'ROC Compliance',
            'Annual Filing Requirements',
            'Board Meeting Minutes',
            'Statutory Register Maintenance',
            'Share Transfer Procedures',
            'Director Appointments',
            'Company Law Compliance',
            'Secretarial Services'
        ]
    },
    11: {
        title: 'Litigation Support',
        description: 'Expert representation and support in tax disputes, appeals, and legal proceedings.',
        features: [
            'Income Tax Appeals',
            'GST Litigation',
            'Tax Dispute Resolution',
            'Representation before Authorities',
            'Advance Rulings',
            'Settlement Commission',
            'Tribunal Proceedings',
            'Legal Opinion'
        ]
    },
    12: {
        title: 'Business Taxation',
        description: 'Comprehensive taxation services for businesses covering all aspects of direct and indirect taxes.',
        features: [
            'Corporate Tax Planning',
            'Business Tax Returns',
            'Tax Compliance Management',
            'Withholding Tax Services',
            'International Taxation',
            'Cross-border Transactions',
            'Tax Efficiency Strategies',
            'Tax Health Check'
        ]
    },
    13: {
        title: 'Taxation of Expatriates',
        description: 'Specialized tax planning and compliance services for expatriates working in India.',
        features: [
            'Residential Status Determination',
            'Tax Liability Assessment',
            'Foreign Income Taxation',
            'Double Taxation Avoidance',
            'Form 67 Filing',
            'Salary Structuring',
            'Retirement Benefits',
            'Exit Tax Planning'
        ]
    },
    14: {
        title: 'Foreign Investment Approvals',
        description: 'Expert guidance on FDI regulations, compliance, and approval processes in India.',
        features: [
            'FDI Policy Advisory',
            'FEMA Compliance',
            'RBI Approvals',
            'Foreign Investment Structuring',
            'Repatriation Services',
            'ODI (Outbound Investment)',
            'ECB (External Commercial Borrowings)',
            'Investment Documentation'
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

document.getElementById('serviceModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeServiceModal();
    }
});

// Forms
function initForms() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const submitBtn = contactForm.querySelector('.btn-submit');
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        });
    }
}

// Scroll Effects
function initScrollEffects() {
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', function () {
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
        element.addEventListener('mousemove', function (e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((centerX - x) / centerX) * 10;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        element.addEventListener('mouseleave', function () {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Parallax effect for floating shapes
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Office Hours Status
function updateOfficeStatus() {
    const statusElement = document.getElementById('officeStatus');
    if (!statusElement) return;

    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    let isOpen = false;
    let statusText = '';
    let responseTime = '';

    // Check if currently open
    if (day === 0) {
        // Sunday - Closed
        isOpen = false;
        statusText = 'Closed';
        responseTime = 'Opens Monday 10:00 AM';
    } else if (day === 6) {
        // Saturday: 10 AM - 2 PM
        const openTime = 10 * 60; // 10:00 AM
        const closeTime = 22 * 60; // 9:00 PM

        if (currentTime >= openTime && currentTime < closeTime) {
            isOpen = true;
            statusText = 'Open Now';
            responseTime = 'Within 4 hours';
        } else {
            isOpen = false;
            statusText = 'Closed';
            responseTime = day === 6 && currentTime >= closeTime ? 'Opens Monday 10:00 AM' : 'Opens at 10:00 AM';
        }
    } else {
        // Monday - Friday: 10 AM - 9 PM
        const openTime = 10 * 60; // 10:00 AM
        const closeTime = 22 * 60; // 9:00 PM

        if (currentTime >= openTime && currentTime < closeTime) {
            isOpen = true;
            statusText = 'Open Now';
            // responseTime = 'Within 4 hours';
        } else {
            isOpen = false;
            statusText = 'Closed';
            if (currentTime < openTime) {
                responseTime = 'Opens at 10:00 AM';
            } else {
                // responseTime = day === 5 ? 'Opens Monday 10:00 AM' : 'Opens tomorrow 10:00 AM';
                responseTime = 'Opens tomorrow 10:00 AM';
            }
        }
    }
    statusElement.className = `office-status ${isOpen ? 'open' : 'closed'}`;
    statusElement.innerHTML = isOpen
        ? statusText
        : `${statusText} <span class="response-time">• ${responseTime}</span>`;
}
// Update office status on load and every minute
updateOfficeStatus();
setInterval(updateOfficeStatus, 60000);