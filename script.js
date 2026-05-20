document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');
    const footerYearElement = document.querySelector('footer p');

    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    const projectTiles = document.querySelectorAll('.project-tile');

    // Smooth scroll for nav links
    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (nav && nav.classList.contains('open')) {
                nav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }

            if (targetSection) {
                // Offset scroll so sticky nav does not cover section heading.
                requestAnimationFrame(() => {
                    const navHeight = nav ? nav.getBoundingClientRect().height : 0;
                    const extraGap = 12;
                    const targetTop = targetSection.getBoundingClientRect().top + window.scrollY;

                    window.scrollTo({
                        top: Math.max(targetTop - navHeight - extraGap, 0),
                        behavior: 'smooth'
                    });
                });
            }
        });
    });

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen.toString());
        });
    }

    projectTiles.forEach((tile) => {
        const setSelectedTile = () => {
            projectTiles.forEach((item) => item.classList.remove('is-selected'));
            tile.classList.add('is-selected');
        };

        tile.addEventListener('click', setSelectedTile);
        tile.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setSelectedTile();
            }
        });
    });

    // Animate sections when they enter the viewport
    // Use Intersection Observer for efficient section reveal
    const observerOptions = {
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    // Define revealOnScroll to avoid ReferenceError
    function revealOnScroll() {
        // Example: Add logic to reveal sections on scroll if needed
        // This can be left empty or customized as per your requirements
    }
    if (footerYearElement) {
        const currentYear = new Date().getFullYear();
        footerYearElement.textContent = `© ${currentYear} Profile. All rights reserved.`;
    }
});
