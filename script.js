/* ==========================================================================
   OM UMESH PATIL — PORTFOLIO JAVASCRIPT
   Interactive Behaviors, Typing Animation, Modal, and Smooth Scroll
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. TYPEWRITER EFFECT --- */
    const roleTypedElement = document.getElementById('roleTyped');
    if (roleTypedElement) {
        const roles = [
            'Full Stack Java Developer',
            'Spring Boot Developer',
            'REST API Specialist',
            'Problem Solver'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeRole() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                roleTypedElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                roleTypedElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000; // Pause at full text
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before typing next word
            }

            setTimeout(typeRole, typeSpeed);
        }

        typeRole();
    }

    /* --- 2. MOBILE DRAWER NAVIGATION --- */
    const hamburger = document.getElementById('hamburger');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerLinks = mobileDrawer ? mobileDrawer.querySelectorAll('a') : [];

    if (hamburger && mobileDrawer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileDrawer.classList.toggle('active');
        });

        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileDrawer.classList.remove('active');
            });
        });
    }

    /* --- 3. STICKY NAVBAR & ACTIVE LINK HIGHLIGHT --- */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky Navbar background
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section link highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* --- 4. SCROLL REVEAL ANIMATION --- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* --- 5. SKILL PROGRESS BARS ANIMATION --- */
    const skillSection = document.getElementById('skills');
    const barFills = document.querySelectorAll('.bar-fill');

    if (skillSection && barFills.length > 0) {
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    barFills.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-w') || '80';
                        bar.style.width = `${targetWidth}%`;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        skillObserver.observe(skillSection);
    }

    /* --- 6. RESUME MODAL CONTROL --- */
    const resumeModal = document.getElementById('resumeModal');
    const viewResumeBtn = document.getElementById('viewResumeBtn');
    const viewResumeBtnContact = document.getElementById('viewResumeBtnContact');
    const closeResumeBtn = document.getElementById('closeResumeBtn');

    function openModal() {
        if (resumeModal) {
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (resumeModal) {
            resumeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (viewResumeBtn) viewResumeBtn.addEventListener('click', openModal);
    if (viewResumeBtnContact) viewResumeBtnContact.addEventListener('click', openModal);
    if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeModal);

    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    /* --- 7. CONTACT FORM SUBMISSION & TOAST NOTIFICATION --- */
    const contactForm = document.getElementById('contactForm');
    const toastWrap = document.getElementById('toastWrap');

    function showToast(message, iconClass = 'fas fa-check-circle') {
        if (!toastWrap) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="${iconClass}"></i> <span>${message}</span>`;
        toastWrap.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const submitText = document.getElementById('submitText');

            if (submitBtn && submitText) {
                submitBtn.disabled = true;
                submitText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }

            setTimeout(() => {
                if (submitBtn && submitText) {
                    submitBtn.disabled = false;
                    submitText.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                }

                contactForm.reset();
                showToast('Thank you! Your message has been sent successfully.');
            }, 1200);
        });
    }

    /* --- 8. DYNAMIC FOOTER YEAR --- */
    const footerYear = document.getElementById('footerYear');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

});
