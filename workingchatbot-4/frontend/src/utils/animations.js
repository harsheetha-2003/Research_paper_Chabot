class Animations {
    static fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    }

    static slideInFromRight(element, duration = 300) {
        element.style.transform = 'translateX(100%)';
        element.style.transition = `transform ${duration}ms ease-out`;
        
        setTimeout(() => {
            element.style.transform = 'translateX(0)';
        }, 10);
    }

    static slideInFromLeft(element, duration = 300) {
        element.style.transform = 'translateX(-100%)';
        element.style.transition = `transform ${duration}ms ease-out`;
        
        setTimeout(() => {
            element.style.transform = 'translateX(0)';
        }, 10);
    }

    static slideUp(element, duration = 300) {
        element.style.transform = 'translateY(20px)';
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms ease-out`;
        
        setTimeout(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }, 10);
    }

    static bounceIn(element, duration = 600) {
        element.style.transform = 'scale(0.3)';
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        }, 10);
    }

    static pulse(element, duration = 1000) {
        element.style.animation = `pulse ${duration}ms ease-in-out infinite`;
    }

    static typewriter(element, text, speed = 100) {
        element.textContent = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }

    static countUp(element, start, end, duration = 2000) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = end.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    static staggeredFadeIn(elements, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                this.fadeIn(element);
            }, index * delay);
        });
    }

    static parallaxScroll(element, speed = 0.5) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -speed;
            element.style.transform = `translateY(${rate}px)`;
        });
    }

    static onScrollReveal(elements, options = {}) {
        const {
            threshold = 0.1,
            rootMargin = '0px 0px -50px 0px'
        } = options;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.slideUp(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold, rootMargin });

        elements.forEach((element) => {
            observer.observe(element);
        });
    }

    static morphButton(button, newText, newIcon = null) {
        const originalText = button.textContent;
        const originalHTML = button.innerHTML;
        
        button.style.transform = 'scale(0.95)';
        button.style.transition = 'all 0.2s ease';
        
        setTimeout(() => {
            if (newIcon) {
                button.innerHTML = `<i class="${newIcon} mr-2"></i>${newText}`;
            } else {
                button.textContent = newText;
            }
            button.style.transform = 'scale(1)';
        }, 100);
        
        return () => {
            button.innerHTML = originalHTML;
        };
    }

    static shimmerLoading(element) {
        element.classList.add('animate-pulse');
        element.style.background = 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)';
        element.style.backgroundSize = '200% 100%';
        element.style.animation = 'shimmer 1.5s infinite';
    }

    static removeShimmer(element) {
        element.classList.remove('animate-pulse');
        element.style.background = '';
        element.style.animation = '';
    }
}

// Add shimmer keyframe to document if not exists
if (!document.querySelector('#shimmer-keyframes')) {
    const style = document.createElement('style');
    style.id = 'shimmer-keyframes';
    style.textContent = `
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
    `;
    document.head.appendChild(style);
}

// Export for use in other components
window.Animations = Animations;