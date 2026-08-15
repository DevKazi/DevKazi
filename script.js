document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // NAVIGATION SCROLL EFFECT
    // -------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once at start to capture reload state

    // -------------------------------------------------------------
    // MOBILE NAVIGATION TOGGLE
    // -------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('navigation-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const toggleMenu = () => {
        mobileToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    };
    
    mobileToggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // -------------------------------------------------------------
    // LIGHT / DARK THEME TOGGLE
    // -------------------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Get stored theme or default to system dark/light preference
    const getStoredTheme = () => {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        
        // Default to dark theme if system preference is not explicit
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };
    
    const currentTheme = getStoredTheme();
    htmlElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const activeTheme = htmlElement.getAttribute('data-theme');
        const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
    });

    // -------------------------------------------------------------
    // SCROLL ACTIVE SECTION LINK TRACKING (SCROLLSPY)
    // -------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    
    const scrollSpy = () => {
        const scrollPosition = window.scrollY + 120; // offset header height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (targetLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    targetLink.classList.add('active');
                }
            }
        });
    };
    
    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Trigger initially

    // -------------------------------------------------------------
    // PROJECT FILTERING
    // -------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state on button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Add slide out animation before toggling display state
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Animate in
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    card.style.display = 'none';
                }
            });
        });
    });

    // -------------------------------------------------------------
    // CONTACT FORM VALIDATION & INTERACTIVE STATE
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const successBanner = document.getElementById('form-success-banner');
    
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Input fields
        const nameField = document.getElementById('form-name');
        const emailField = document.getElementById('form-email');
        const subjectField = document.getElementById('form-subject');
        const messageField = document.getElementById('form-message');
        
        // 1. Validate Name
        if (!nameField.value.trim()) {
            nameField.parentElement.classList.add('invalid');
            isValid = false;
        } else {
            nameField.parentElement.classList.remove('invalid');
        }
        
        // 2. Validate Email
        if (!emailField.value.trim() || !validateEmail(emailField.value)) {
            emailField.parentElement.classList.add('invalid');
            isValid = false;
        } else {
            emailField.parentElement.classList.remove('invalid');
        }
        
        // 3. Validate Subject
        if (!subjectField.value.trim()) {
            subjectField.parentElement.classList.add('invalid');
            isValid = false;
        } else {
            subjectField.parentElement.classList.remove('invalid');
        }
        
        // 4. Validate Message
        if (!messageField.value.trim()) {
            messageField.parentElement.classList.add('invalid');
            isValid = false;
        } else {
            messageField.parentElement.classList.remove('invalid');
        }
        
        // Handle Submit State
        if (isValid) {
            // Show Success Alert
            successBanner.classList.remove('hide');
            
            // Disable button during submit state demonstration
            const submitBtn = document.getElementById('form-submit-btn');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Clear inputs after delay (representing network latency)
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
                
                // Hide banner after 5 seconds
                setTimeout(() => {
                    successBanner.classList.add('hide');
                }, 5000);
            }, 1500);
        }
    });
    
    // Clear validation status dynamically during user typing
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.parentElement.classList.contains('invalid')) {
                input.parentElement.classList.remove('invalid');
            }
        });
    });
});
