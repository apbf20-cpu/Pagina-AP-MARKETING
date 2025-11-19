/* ============================================
   AP Marketing Pro - Landing Page de Vendas
   JavaScript para Interatividade
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Background on Scroll
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Animate Elements on Scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.benefit-card, .niche-card, .process-step, .faq-item');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial state for animated elements
    const animatedElements = document.querySelectorAll('.benefit-card, .niche-card, .process-step, .testimonial-card, .portfolio-item');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });

    // Run animation on scroll and load
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Animated Counter for Stats Section
    const animateStats = function() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;

            const updateStat = function() {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateStat);
                } else {
                    stat.textContent = target;
                }
            };

            updateStat();
        });
    };

    // Trigger stats animation when visible
    const socialProofSection = document.querySelector('.social-proof');
    let statsAnimated = false;

    if (socialProofSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    animateStats();
                    statsAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(socialProofSection);
    }

    // Parallax effect for hero
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });

    // Form field focus effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
    });

    // Real-time form validation
    const validateField = function(field) {
        const value = field.value.trim();
        const type = field.type;
        const name = field.name;
        let isValid = true;
        let message = '';

        if (field.required && !value) {
            isValid = false;
            message = 'Este campo é obrigatório';
        } else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'E-mail inválido';
            }
        } else if (name === 'telefone' && value) {
            const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                message = 'Telefone inválido';
            }
        }

        // Update field visual state
        const formGroup = field.parentElement;
        formGroup.classList.remove('error', 'success');

        if (value) {
            if (isValid) {
                formGroup.classList.add('success');
            } else {
                formGroup.classList.add('error');
            }
        }

        return isValid;
    };

    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });

    // Counter Animation for Price
    const animateCounter = function(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);

        const updateCounter = function() {
            start += increment;
            if (start < target) {
                element.textContent = 'R$ ' + Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = 'R$ ' + target;
            }
        };

        updateCounter();
    };

    // Trigger counter animation when price section is visible
    const priceSection = document.querySelector('.pricing');
    let counterAnimated = false;

    const observerCallback = function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                const priceMain = document.querySelector('.price-main');
                if (priceMain) {
                    animateCounter(priceMain, 397, 1000);
                    counterAnimated = true;
                }
            }
        });
    };

    if (priceSection) {
        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.5
        });
        observer.observe(priceSection);
    }

    // Add loading animation to buttons
    const ctaButtons = document.querySelectorAll('.btn-primary');

    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // Phone mask
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.slice(0, 11);

                if (value.length > 0) {
                    value = '(' + value;
                }
                if (value.length > 3) {
                    value = value.slice(0, 3) + ') ' + value.slice(3);
                }
                if (value.length > 10) {
                    value = value.slice(0, 10) + '-' + value.slice(10);
                }

                e.target.value = value;
            });
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const telefone = document.getElementById('telefone').value;
            const email = document.getElementById('email').value;
            const empresa = document.getElementById('empresa').value;
            const nicho = document.getElementById('nicho').value;

            // Log form data (you can integrate with your backend/email service here)
            console.log('Novo lead:', { nome, telefone, email, empresa, nicho });

            // Show success message
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado com Sucesso!';
            submitBtn.style.background = '#28a745';
            submitBtn.disabled = true;

            // Create success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p><strong>Obrigado, ${nome.split(' ')[0]}!</strong></p>
                <p>Recebemos sua solicitação e entraremos em contato em breve pelo WhatsApp ou e-mail.</p>
            `;
            contactForm.appendChild(successMsg);

            // Reset form after 5 seconds
            setTimeout(function() {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                successMsg.remove();
            }, 5000);
        });
    }

    // Console message
    console.log('AP Marketing Pro - Landing Page de Vendas carregada com sucesso!');
    console.log('Desenvolvido por AP Marketing Pro - apmarketingpro.com');
});