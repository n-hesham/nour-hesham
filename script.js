console.log("script.js loaded successfully!");

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');
            if (navLinks && burger) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
            }
        });
    });

    // Burger menu toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    if (burger && navLinks) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
            }
        });
    }

    // Scroll animations for sections
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Trigger animations for specific section elements
                if (entry.target.id === 'services') {
                    document.querySelectorAll('.service-item').forEach((item, index) => {
                        item.style.animationDelay = `${index * 0.2}s`;
                        item.classList.add('animate');
                    });
                } else if (entry.target.id === 'experience') {
                    document.querySelectorAll('.experience-item').forEach((item, index) => {
                        item.style.animationDelay = `${index * 0.2}s`;
                        item.classList.add('animate');
                    });
                } else if (entry.target.id === 'projects') {
                    document.querySelectorAll('.project-item').forEach((item, index) => {
                        item.style.animationDelay = `${index * 0.15}s`;
                        item.classList.add('visible');
                    });
                } else if (entry.target.id === 'about') {
                    document.querySelectorAll('#about p').forEach((p, index) => {
                        p.style.animationDelay = `${index * 0.2}s`;
                        p.classList.add('animate');
                    });
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('fade-in');
        sectionObserver.observe(section);
    });

    // Project filtering with staggered animation
    const projectItems = document.querySelectorAll('.project-item');
    const filterButtons = document.querySelector('.filter-buttons');
    if (filterButtons) {
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');
                const filter = button.getAttribute('data-filter');
                projectItems.forEach((item, index) => {
                    item.style.display = 'none';
                    item.classList.remove('visible');
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 150);
                    }
                });
            });
        });
    }

    // Assign categories to projects
    projectItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        if (title.includes('x-ray') || title.includes('heart') || title.includes('churn')) {
            item.classList.add('machine-learning');
        } else if (title.includes('dashboard')) {
            item.classList.add('data-visualization');
        }
    });

    // Back-to-top button
    const backToTop = document.createElement('button');
    backToTop.classList.add('back-to-top');
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    // Active nav link highlighting
    const navLinksAll = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active-link');
            }
        });
    });

    // Initial project animation on load
    setTimeout(() => {
        projectItems.forEach((item, index) => {
            if (item.style.display !== 'none') {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 150);
            }
        });
    }, 100);
});