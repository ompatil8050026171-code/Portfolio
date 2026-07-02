// Reveal hero immediately on load
document.querySelector('.hero .reveal')?.classList.add('revealed');

// Scroll reveal animations
const revealElements = document.querySelectorAll('.reveal:not(.revealed)');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth active nav link highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

// Resume modal
const resumeModal = document.getElementById('resumeModal');
const viewResumeBtn = document.getElementById('viewResumeBtn');
const closeResumeBtn = document.getElementById('closeResumeBtn');

if (viewResumeBtn && resumeModal) {
    viewResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resumeModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
}

if (closeResumeBtn && resumeModal) {
    closeResumeBtn.addEventListener('click', () => {
        resumeModal.classList.remove('open');
        document.body.style.overflow = '';
    });

    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            resumeModal.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal?.classList.contains('open')) {
        resumeModal.classList.remove('open');
        document.body.style.overflow = '';
    }
});

// Typing effect for tagline
const tagline = document.querySelector('.tagline-typed');
if (tagline) {
    const text = tagline.getAttribute('data-text') || tagline.textContent;
    tagline.textContent = '';
    let i = 0;
    const type = () => {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(type, 80);
        }
    };
    setTimeout(type, 600);
}

// Parallax glow orbs
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.glow-orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});
