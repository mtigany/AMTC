/**
 * AMTC - Awtad Almanarat Almutaqadimah Co.
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    
    'use strict';
    
    // =========================================
    // 1. MOBILE MENU TOGGLE
    // =========================================
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            nav.classList.toggle('open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('open');
                menuToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking a link
        nav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('open');
                menuToggle.classList.remove('active');
            });
        });
    }
    
    // =========================================
    // 2. HEADER SCROLL EFFECT
    // =========================================
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // =========================================
    // 3. COUNTER ANIMATION (Hero Stats)
    // =========================================
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    function animateCounters() {
        if (countersAnimated) return;
        
        counters.forEach(function(counter) {
            const target = parseInt(counter.getAttribute('data-count'));
            if (!target) return;
            
            let current = 0;
            const increment = target / 60; // 60 frames for animation
            const duration = 1500; // 1.5 seconds
            const stepTime = Math.floor(duration / 60);
            
            const timer = setInterval(function() {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
            }, stepTime);
        });
        
        countersAnimated = true;
    }
    
    // Intersection Observer for counters
    if ('IntersectionObserver' in window) {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(heroSection);
        }
    } else {
        // Fallback for older browsers
        animateCounters();
    }
    
    // =========================================
    // 4. SMOOTH SCROLL FOR ANCHOR LINKS
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =========================================
    // 5. ACTIVE NAV LINK HIGHLIGHT
    // =========================================
    const navLinks = document.querySelectorAll('.nav-list a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(function(link) {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // =========================================
    // 6. REVEAL ANIMATIONS ON SCROLL
    // =========================================
    const revealElements = document.querySelectorAll(
        '.product-card, .service-card, .project-item, .testimonial-card'
    );
    
    if ('IntersectionObserver' in window && revealElements.length) {
        const revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        
        revealElements.forEach(function(el, index) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            el.style.transitionDelay = (index * 0.1) + 's';
            revealObserver.observe(el);
        });
    }
    
    // =========================================
    // 7. PRODUCT IMAGE PLACEHOLDER
    // =========================================
    // This adds a fallback for missing product images
    document.querySelectorAll('.product-image img').forEach(function(img) {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const parent = this.parentElement;
            if (parent) {
                parent.style.background = 'linear-gradient(135deg, #f0f0f0, #e0e0e0)';
                const placeholder = document.createElement('div');
                placeholder.style.cssText = `
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    font-size: 48px;
                    color: #ccc;
                    font-weight: 700;
                `;
                placeholder.textContent = '🏗️';
                parent.appendChild(placeholder);
            }
        });
    });
    
    // =========================================
    // 8. PROJECT IMAGE PLACEHOLDER
    // =========================================
    document.querySelectorAll('.project-item img').forEach(function(img) {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const parent = this.parentElement;
            if (parent) {
                parent.style.background = 'linear-gradient(135deg, #1A2A3A, #2C4054)';
                const placeholder = document.createElement('div');
                placeholder.style.cssText = `
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    font-size: 48px;
                    color: rgba(255,255,255,0.2);
                    font-weight: 700;
                `;
                placeholder.textContent = '🛣️';
                parent.appendChild(placeholder);
            }
        });
    });
    
    // =========================================
    // 9. YEAR IN FOOTER (Auto-update)
    // =========================================
    const yearElements = document.querySelectorAll('.footer-bottom .year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(function(el) {
        el.textContent = currentYear;
    });
    
    // =========================================
    // 10. CONSOLE WELCOME
    // =========================================
    console.log('%c🏗️ AMTC - Awtad Almanarat Almutaqadimah Co.', 'font-size: 20px; font-weight: bold; color: #C9A84C;');
    console.log('%cتصنيع وتوريد أعمدة الإنارة وملحقاتها', 'font-size: 14px; color: #666;');
    console.log('%c🌐 www.amtc.com.sa', 'font-size: 12px; color: #888;');
    
});