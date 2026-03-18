document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const scrollReveal = document.querySelectorAll('.reveal');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Enhanced Reveal on Scroll
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    scrollReveal.forEach(el => revealObserver.observe(el));

    // Active Page Link Highlight
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Simple Filtering for Projects
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                
                projectItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0) scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px) scale(0.95)';
                        setTimeout(() => item.style.display = 'none', 400);
                    }
                });
            });
        });
    }

    // Stats Counter Animation
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const stats = document.querySelectorAll('.stat-val');
        let started = false;

        const countUp = (el) => {
            const target = parseInt(el.dataset.target);
            let count = 0;
            const duration = 2000;
            const inc = target / (duration / 30);
            const timer = setInterval(() => {
                count += inc;
                if (count >= target) {
                    el.innerText = target + (el.dataset.plus ? '+' : '');
                    clearInterval(timer);
                } else {
                    el.innerText = Math.ceil(count);
                }
            }, 30);
        };

        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !started) {
                stats.forEach(s => countUp(s));
                started = true;
            }
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // --- Before/After Slider Logic ---
    const sliders = document.querySelectorAll('.ba-slider');
    sliders.forEach(slider => {
        const after = slider.querySelector('.ba-after');
        const handle = slider.querySelector('.ba-handle');
        
        slider.addEventListener('mousemove', (e) => {
            const rect = slider.getBoundingClientRect();
            let x = e.clientX - rect.left;
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;
            
            let percent = (x / rect.width) * 100;
            after.style.width = percent + '%';
            handle.style.left = percent + '%';
        });

        // Touch support
        slider.addEventListener('touchmove', (e) => {
            const rect = slider.getBoundingClientRect();
            let x = e.touches[0].clientX - rect.left;
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;
            
            let percent = (x / rect.width) * 100;
            after.style.width = percent + '%';
            handle.style.left = percent + '%';
        });
    });
});

