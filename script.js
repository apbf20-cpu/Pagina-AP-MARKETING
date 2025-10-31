// ===================================
// SMOOTH SCROLL
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// FAQ ACCORDION
// ===================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Fechar outros itens
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle item atual
        item.classList.toggle('active');
    });
});

// ===================================
// FORM HANDLING
// ===================================
const leadForm = document.getElementById('leadForm');
const whatsappInput = document.getElementById('whatsapp');
const instagramInput = document.getElementById('instagram');

// Máscara de telefone
if (whatsappInput) {
    whatsappInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }

        e.target.value = value;
    });
}

// Adicionar @ automaticamente no Instagram
if (instagramInput) {
    instagramInput.addEventListener('input', function (e) {
        let value = e.target.value;

        // Remove todos os @ primeiro
        value = value.replace(/@/g, '');

        // Adiciona @ no início se não estiver vazio
        if (value && !value.startsWith('@')) {
            value = '@' + value;
        }

        e.target.value = value;
    });
}

// Submit do formulário
if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Coletar dados do formulário
        const formData = {
            nome: document.getElementById('nome').value,
            whatsapp: document.getElementById('whatsapp').value,
            empresa: document.getElementById('empresa').value,
            email: document.getElementById('email').value,
            instagram: document.getElementById('instagram').value
        };

        // Aqui você pode integrar com seu sistema de CRM/Email
        console.log('Dados do formulário:', formData);

        // Criar mensagem para WhatsApp
        const whatsappMessage = `
*Nova Solicitação de Análise Gratuita - AP Marketing*

*Nome:* ${formData.nome}
*WhatsApp:* ${formData.whatsapp}
*Empresa:* ${formData.empresa}
*Email:* ${formData.email}
*Instagram:* ${formData.instagram}

Olá! Gostaria de receber uma análise gratuita das minhas oportunidades de tráfego pago.
        `.trim();

        // Redirecionar para WhatsApp
        const whatsappNumber = '5511997069878'; // WhatsApp: (11) 99706-9878
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        // Feedback visual
        const submitButton = leadForm.querySelector('button[type="submit"]');
        submitButton.textContent = 'ENVIANDO...';
        submitButton.disabled = true;

        // Simular envio e redirecionar
        setTimeout(() => {
            // Aqui você pode adicionar integração com API de email/CRM
            // Exemplo: fetch('/api/lead', { method: 'POST', body: JSON.stringify(formData) })

            alert('✅ Solicitação enviada com sucesso! Você será redirecionado para o WhatsApp.');
            window.open(whatsappURL, '_blank');

            // Reset form
            leadForm.reset();
            submitButton.textContent = 'QUERO MINHA ANÁLISE GRATUITA AGORA';
            submitButton.disabled = false;
        }, 1000);
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.problem-card, .method-step, .service-card, .credibility-card, .stat-card'
    );

    animatedElements.forEach(el => observer.observe(el));
});

// ===================================
// COUNTER ANIMATION (Números Estatísticos)
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animar contadores quando visíveis
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                const targetText = statNumber.textContent;
                const targetNumber = parseInt(targetText.replace(/\D/g, ''));

                if (!isNaN(targetNumber)) {
                    statNumber.textContent = '0';
                    animateCounter(statNumber, targetNumber, 1500);

                    // Adicionar de volta o sufixo (%, x, etc)
                    setTimeout(() => {
                        statNumber.textContent = targetText;
                    }, 1500);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// ===================================
// STICKY CTA (Botão flutuante em mobile)
// ===================================
let lastScroll = 0;
const stickyCTA = document.createElement('div');
stickyCTA.className = 'sticky-cta';
stickyCTA.innerHTML = `
    <a href="#formulario" class="btn btn-primary">
        QUERO ANÁLISE GRATUITA
    </a>
`;
stickyCTA.style.cssText = `
    position: fixed;
    bottom: -100px;
    left: 0;
    right: 0;
    padding: 1rem;
    background: linear-gradient(135deg, var(--primary-color), #2563EB);
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    transition: bottom 0.3s ease;
    display: none;
`;

document.body.appendChild(stickyCTA);

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    const formSection = document.querySelector('.cta-section');

    if (!heroSection || !formSection) return;

    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    const formTop = formSection.offsetTop;

    // Mostrar CTA fixo em mobile após hero e antes do formulário
    if (window.innerWidth <= 768) {
        if (currentScroll > heroBottom && currentScroll < formTop - 500) {
            stickyCTA.style.display = 'block';
            stickyCTA.style.bottom = '0';
        } else {
            stickyCTA.style.bottom = '-100px';
        }
    } else {
        stickyCTA.style.display = 'none';
    }

    lastScroll = currentScroll;
});

// ===================================
// TRACKING DE EVENTOS (Google Analytics / Meta Pixel)
// ===================================
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }

    // Meta Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }

    console.log('Event tracked:', eventName, eventData);
}

// Track clicks em CTAs
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('cta_click', {
            button_text: button.textContent,
            button_location: button.closest('section')?.id || 'unknown'
        });
    });
});

// Track scroll depth
let scrollDepthTracked = {
    '25': false,
    '50': false,
    '75': false,
    '100': false
};

window.addEventListener('scroll', () => {
    const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    Object.keys(scrollDepthTracked).forEach(depth => {
        if (scrollPercentage >= parseInt(depth) && !scrollDepthTracked[depth]) {
            scrollDepthTracked[depth] = true;
            trackEvent('scroll_depth', { depth: `${depth}%` });
        }
    });
});

// Track FAQ opens
faqItems.forEach((item, index) => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        if (item.classList.contains('active')) {
            trackEvent('faq_opened', {
                question_index: index,
                question_text: item.querySelector('.faq-question span').textContent
            });
        }
    });
});

// ===================================
// PRELOADER (Opcional)
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===================================
// LAZY LOADING DE IMAGENS (Se adicionar imagens)
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// PERFORMANCE: Debounce para eventos de scroll/resize
// ===================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce em scroll events pesados
const debouncedScroll = debounce(() => {
    // Código adicional de scroll se necessário
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// VALIDAÇÕES ADICIONAIS DE FORMULÁRIO
// ===================================
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            this.style.borderColor = '#EF4444';
        } else {
            this.style.borderColor = '#10B981';
        }
    });
}

// ===================================
// CONSOLE PERSONALIZADO (Branding)
// ===================================
console.log(
    '%c🎯 AP Marketing Pro ',
    'color: #1E3A8A; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);'
);
console.log(
    '%cGestão Estratégica de Tráfego Pago 🚀',
    'color: #F59E0B; font-size: 16px; font-weight: bold;'
);
console.log(
    '%cInteressado em fazer parte da equipe? Entre em contato!',
    'color: #10B981; font-size: 14px;'
);

// ===================================
// EXPORT PARA MÓDULOS (Se necessário)
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        trackEvent,
        animateCounter,
        debounce
    };
}