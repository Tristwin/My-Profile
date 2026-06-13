document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');
    const footerYearElement = document.querySelector('footer p');

    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const nav = document.querySelector('nav');
    const projectTiles = document.querySelectorAll('.project-tile');
    const SCROLL_GAP = 12;

    const SELECTED_TILE_CLASSES = ['border-blue-500', 'bg-blue-50', 'ring-2', 'ring-blue-200', 'shadow-md'];
    const VISIBLE_SECTION_CLASSES = ['opacity-100', 'translate-y-0'];

    function syncSectionScrollOffset() {
        const navHeight = nav ? nav.getBoundingClientRect().height : 0;
        const offset = Math.max(Math.ceil(navHeight + SCROLL_GAP), 0);

        sections.forEach((section) => {
            section.classList.add('opacity-100', 'translate-y-0');
        });
    }

    function closeMobileNav() {
        if (!navList || !navToggle) return;
        navList.classList.add('hidden');
        navList.classList.remove('flex');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    function openMobileNav() {
        if (!navList || !navToggle) return;
        navList.classList.remove('hidden');
        navList.classList.add('flex');
        navToggle.setAttribute('aria-expanded', 'true');
    }

    syncSectionScrollOffset();
    window.addEventListener('resize', syncSectionScrollOffset);

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (window.innerWidth < 768) {
                closeMobileNav();
            }

            if (targetSection) {
                syncSectionScrollOffset();
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    });

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            const isOpen = navList.classList.contains('flex') && !navList.classList.contains('hidden');
            if (isOpen) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });
    }

    projectTiles.forEach((tile) => {
        const setSelectedTile = () => {
            projectTiles.forEach((item) => item.classList.remove(...SELECTED_TILE_CLASSES));
            tile.classList.add(...SELECTED_TILE_CLASSES);
        };

        tile.addEventListener('click', setSelectedTile);
        tile.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setSelectedTile();
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add(...VISIBLE_SECTION_CLASSES);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

    if (footerYearElement) {
        const currentYear = new Date().getFullYear();
        footerYearElement.textContent = `© ${currentYear} Profile. All rights reserved.`;
    }
});
