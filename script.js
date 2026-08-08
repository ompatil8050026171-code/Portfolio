/* ============================================
   OM UMESH PATIL — PORTFOLIO SCRIPT
   ============================================ */

'use strict';

/* ── Utility: Toast Notifications ────────── */
function showToast(msg, icon = 'fas fa-check-circle', duration = 3200) {
    const wrap = document.getElementById('toastWrap');
    const t = document.createElement('div');
    t.className = 'toast-item';
    t.innerHTML = `<i class="${icon}"></i><span>${msg}</span>`;
    wrap.appendChild(t);
    requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
    setTimeout(() => {
        t.classList.remove('show');
        setTimeout(() => t.remove(), 500);
    }, duration);
}

/* ── Utility: Open / Close Modal ─────────── */
function openModal(el) {
    el?.classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeModal(el) {
    el?.classList.remove('open');
    document.body.style.overflow = '';
}

/* ============================================
   1. SCROLL REVEAL (IntersectionObserver)
   ============================================ */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                revealObserver.unobserve(e.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

// Reveal hero immediately, rest on scroll
document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('visible'));
document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));

/* ============================================
   2. NAVBAR — Scroll Style + Active Link + Mobile
   ============================================ */
const navbar       = document.getElementById('navbar');
const hamburger    = document.getElementById('hamburger');
const mobileDrawer = document.getElementById('mobileDrawer');
const allNavLinks  = document.querySelectorAll('.nav-links a, .mobile-drawer a');
const allSections  = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    // Scrolled class
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Active section highlight
    let current = '';
    allSections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    allNavLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
}, { passive: true });

// Mobile menu toggle
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileDrawer.classList.toggle('open');
});

// Close drawer on link click
mobileDrawer?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileDrawer.classList.remove('open');
    });
});

/* ============================================
   3. HERO TYPING EFFECT
   ============================================ */
const typedEl  = document.getElementById('roleTyped');
const phrases  = [
    'web applications.',
    'clean Java backends.',
    'intuitive UIs.',
    'real-world solutions.'
];

if (typedEl) {
    let pi = 0, ci = 0, deleting = false;

    function typeStep() {
        const phrase = phrases[pi];
        typedEl.textContent = deleting
            ? phrase.slice(0, ci--)
            : phrase.slice(0, ci++);

        let delay = deleting ? 45 : 85;

        if (!deleting && ci > phrase.length) {
            delay = 2000;
            deleting = true;
        } else if (deleting && ci < 0) {
            deleting = false;
            ci = 0;
            pi = (pi + 1) % phrases.length;
            delay = 400;
        }
        setTimeout(typeStep, delay);
    }
    setTimeout(typeStep, 1000);
}

/* ============================================
   4. SKILL PROGRESS BARS — Animate on Scroll
   ============================================ */
const barObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const target = e.target.getAttribute('data-w');
                setTimeout(() => { e.target.style.width = target + '%'; }, 150);
                barObserver.unobserve(e.target);
            }
        });
    },
    { threshold: 0.25 }
);
document.querySelectorAll('.bar-fill').forEach(b => barObserver.observe(b));

/* ============================================
   5. RESUME MODAL
   ============================================ */
const resumeModal     = document.getElementById('resumeModal');
const viewResumeBtn   = document.getElementById('viewResumeBtn');
const viewResumeBtnC  = document.getElementById('viewResumeBtnContact');
const closeResumeBtn  = document.getElementById('closeResumeBtn');

viewResumeBtn?.addEventListener('click',  () => openModal(resumeModal));
viewResumeBtnC?.addEventListener('click', () => openModal(resumeModal));
closeResumeBtn?.addEventListener('click', () => closeModal(resumeModal));
resumeModal?.addEventListener('click', e => { if (e.target === resumeModal) closeModal(resumeModal); });

/* ============================================
   6. CONTACT FORM — Send Simulation
   ============================================ */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const submitText  = document.getElementById('submitText');

contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('senderName')?.value.trim();
    const email   = document.getElementById('senderEmail')?.value.trim();
    const message = document.getElementById('senderMessage')?.value.trim();

    if (!name || !email || !message) {
        showToast('Please fill in all required fields.', 'fas fa-triangle-exclamation');
        return;
    }

    submitBtn.disabled = true;
    submitText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    setTimeout(() => {
        submitBtn.disabled = false;
        submitText.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        showToast(`Thanks ${name}! I'll get back to you soon.`, 'fas fa-circle-check', 4000);
        contactForm.reset();
    }, 1800);
});

/* ============================================
   7. KEYBOARD SHORTCUTS
   ============================================ */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeModal(resumeModal);
    }
});

/* ============================================
   8. SMOOTH SCROLL ON ANCHOR CLICKS
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

/* ============================================
   9. ANIMATED NUMBER COUNTERS — About Section
   ============================================ */
function animateCounter(el, to, duration = 1800) {
    const isFloat  = String(to).includes('.');
    const decimals = isFloat ? (String(to).split('.')[1]?.length || 2) : 0;
    const start    = performance.now();

    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        const val      = eased * to;
        el.textContent = isFloat ? val.toFixed(decimals) : Math.floor(val);
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const target = parseFloat(e.target.getAttribute('data-target'));
                if (!isNaN(target)) animateCounter(e.target, target);
                counterObserver.unobserve(e.target);
            }
        });
    },
    { threshold: 0.5 }
);

// Map fact numbers to data-target
const factNums = { '8.43': 8.43, '3+': 3, '2': 2 };
document.querySelectorAll('.fact-num').forEach(el => {
    const raw = el.textContent.replace('+', '').trim();
    const val = parseFloat(raw);
    if (!isNaN(val)) {
        el.setAttribute('data-target', val);
        el.textContent = '0';
        counterObserver.observe(el);
    }
});

/* ============================================
   10. CARD SUBTLE 3D TILT
   ============================================ */
const TILT_AMOUNT = 6; // degrees

document.querySelectorAll('.project-card, .cert-card, .hobby-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
        const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
        card.style.transform = `perspective(900px) rotateX(${-y * TILT_AMOUNT}deg) rotateY(${x * TILT_AMOUNT}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* ============================================
   11. TECH CARD HOVER SOUND (optional, silent by default)
   ============================================ */
// No audio by default — keeps it clean and professional for a fresher

/* ============================================
   12. FOOTER YEAR
   ============================================ */
const yearEl = document.getElementById('footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================
   13. WELCOME TOAST
   ============================================ */
window.addEventListener('load', () => {
    setTimeout(() => {
        showToast('Welcome! Feel free to explore and reach out.', 'fas fa-hand-wave', 4000);
    }, 1500);
});

/* ============================================
   14. SECTION ENTRANCE STAGGER
      (staggered delay for child cards)
   ============================================ */
function addStaggerDelay(parentSelector, childSelector, baseDelay = 100) {
    document.querySelectorAll(parentSelector).forEach(parent => {
        parent.querySelectorAll(childSelector).forEach((child, i) => {
            child.style.transitionDelay = `${i * baseDelay}ms`;
        });
    });
}

addStaggerDelay('.tech-grid',      '.tech-card',    80);
addStaggerDelay('.projects-grid',  '.project-card', 100);
addStaggerDelay('.hobbies-grid',   '.hobby-card',   90);
addStaggerDelay('.certs-grid',     '.cert-card',    120);
addStaggerDelay('.edu-timeline',   '.edu-card',     100);

/* ============================================
   15. ACTIVE LINK INIT ON LOAD
   ============================================ */
window.dispatchEvent(new Event('scroll'));
