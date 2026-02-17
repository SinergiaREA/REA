// ========== SALUDO DINÁMICO SEGÚN HORA DE MÉXICO ==========
const DEBUG = false;
const debugLog = (...args) => { if (DEBUG) console.log(...args); };
const debugError = (...args) => { if (DEBUG) console.error(...args); };

function updateGreeting() {
    // Obtener hora de México (GMT-6)
    const now = new Date();
    const mexicoTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Mexico_City' }));
    const hour = mexicoTime.getHours();

    const greetingElement = document.getElementById('dynamicGreeting');
    const subtitleElement = document.getElementById('dynamicSubtitle');
    const headerElement = document.querySelector('.header');
    const heroElement = document.querySelector('.hero-section');

    let greeting = '';
    let emoji = '';
    let subtitle = '';
    let themeClass = '';

    // 6 AM - 12 PM: Buenos días
    if (hour >= 6 && hour < 12) {
        greeting = '¡Buenos días!';
        emoji = '🌅';
        subtitle = '💫 ¡Excelente inicio de día! Que tengas un día productivo 🎉';
        themeClass = 'morning-theme';
    }
    // 12 PM - 6 PM: Buenas tardes
    else if (hour >= 12 && hour < 18) {
        greeting = '¡Buenas tardes!';
        emoji = '☀️';
        subtitle = '🌟 ¡Esperamos que tu tarde sea maravillosa! ✨';
        themeClass = 'afternoon-theme';
    }
    // 6 PM - 6 AM: Buenas noches
    else {
        greeting = '¡Buenas noches!';
        emoji = '🌙';
        subtitle = '⭐ ¡Que tengas una noche tranquila y agradable! 💫';
        themeClass = 'night-theme';
    }

    debugLog('🕐 Hora actual de México:', hour + ':00');
    debugLog('👋 Saludo:', greeting);
    debugLog('🎨 Tema aplicado:', themeClass);

    if (greetingElement) {
        greetingElement.textContent = `${emoji} ${greeting} ${emoji}`;
    }
    if (subtitleElement) {
        subtitleElement.textContent = subtitle;
    }
    if (headerElement) {
        headerElement.classList.remove('morning-theme', 'afternoon-theme', 'night-theme');
        headerElement.classList.add(themeClass);
    }
    if (heroElement) {
        heroElement.classList.remove('morning-theme', 'afternoon-theme', 'night-theme');
        heroElement.classList.add(themeClass);
    }

    createTimeSpheres(hour);
}

// ========== ESFERAS ANIMADAS SEGÚN HORA ==========
function createTimeSpheres(hour) {
    const spheresContainer = document.getElementById('timeSpheres');
    if (!spheresContainer) return;

    spheresContainer.replaceChildren();

    let colors = [];
    const count = 6;

    if (hour >= 6 && hour < 12) {
        // Mañana: amarillos, naranjas
        colors = ['#FFD700', '#FFA500', '#FFE4B5', '#FFDAB9'];
    } else if (hour >= 12 && hour < 18) {
        // Tarde: naranjas, rojos suaves
        colors = ['#FF8C00', '#FF6347', '#FFB6C1', '#FFA07A'];
    } else {
        // Noche: azules, púrpuras
        colors = ['#4169E1', '#9370DB', '#6495ED', '#8A2BE2'];
    }

    for (let i = 0; i < count; i++) {
        const sphere = document.createElement('div');
        sphere.className = 'sphere';

        const size = 14 + Math.random() * 30;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;

        sphere.style.width = `${size}px`;
        sphere.style.height = `${size}px`;
        sphere.style.backgroundColor = color;
        sphere.style.left = `${left}%`;
        sphere.style.top = `${top}%`;
        sphere.style.animationDelay = `${delay}s`;

        spheresContainer.appendChild(sphere);
    }
}

// Ejecutar al cargar la página
updateGreeting();

// Actualizar cada minuto por si la página queda abierta
setInterval(updateGreeting, 60000);

// ========== COUNTDOWN TIMER ==========
function updateCountdown() {
    const flagDay = new Date('2026-02-24T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = flagDay - now;

    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;

        countdownEl.dataset.celebrated = 'false';
    } else if (countdownEl.dataset.celebrated !== 'true') {
        countdownEl.replaceChildren();
        const title = document.createElement('h3');
        title.textContent = '🇲🇽 ¡Día de la Bandera! 🇲🇽';
        countdownEl.appendChild(title);
        countdownEl.dataset.celebrated = 'true';
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ========== SCROLL PROGRESS BAR + SCROLL TO TOP ==========
const progressBar = document.getElementById('progressBar');
const scrollTopBtn = document.getElementById('scrollTop');
let scrollTicking = false;

function updateScrollUI() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    if (progressBar) {
        progressBar.style.width = `${scrolled}%`;
    }

    if (!scrollTopBtn) return;
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', () => {
    if (scrollTicking) return;

    scrollTicking = true;
    window.requestAnimationFrame(() => {
        updateScrollUI();
        scrollTicking = false;
    });
}, { passive: true });

updateScrollUI();

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== FILTROS DE GALERÍA ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'flex';
                item.style.animation = 'scaleIn 0.5s ease-out';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ========== LAZY LOADING PARA IMÁGENES ==========
const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');
lazyImages.forEach(img => {
    if ('loading' in HTMLImageElement.prototype) {
        img.loading = 'lazy';
    }
    if (img.dataset.src && !img.getAttribute('src')) {
        img.src = img.dataset.src;
    }
});

// ========== SCROLL REVEAL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .gallery-item, .trust-badge').forEach(el => {
    observer.observe(el);
});

// ========== PREVENCIÓN XSS ==========
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', function() {
    const userInputs = document.querySelectorAll('input, textarea');
    if (!userInputs.length) return;

    userInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/<script[^>]*>.*?<\/script>/gi, '');
            this.value = sanitizeInput(this.value);
        });
    });
});

// ========== SMOOTH SCROLL PARA ANCLAS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ========== DEBUG IMÁGENES DE GALERÍA ==========
document.addEventListener('DOMContentLoaded', function() {
    if (!DEBUG) return;

    const galleryImages = document.querySelectorAll('.gallery-item img');
    let loadedCount = 0;
    let errorCount = 0;

    debugLog(`🖼️ Total de imágenes en galería: ${galleryImages.length}`);
    debugLog('📁 Ruta de las imágenes: img/*.jpeg');

    galleryImages.forEach((img, index) => {
        const parentItem = img.closest('.gallery-item');

        img.addEventListener('load', function() {
            loadedCount++;
            if (parentItem) {
                parentItem.classList.add('loaded');
            }
            debugLog(`✅ Imagen ${index + 1}/${galleryImages.length} cargada: ${this.src}`);
            if (loadedCount + errorCount === galleryImages.length) {
                debugLog(`🎉 RESUMEN: ${loadedCount} cargadas ✅ | ${errorCount} errores ❌`);
                if (errorCount > 0) {
                    debugError(`⚠️ IMPORTANTE: ${errorCount} imágenes no cargaron. Verifica:`);
                    debugError("   1. Carpeta 'img/' está en la raíz (mismo nivel que index.html)");
                    debugError('   2. Los archivos se llaman: 1.jpeg, 2.jpeg, etc. (no .jpg)');
                }
            }
        });

        img.addEventListener('error', function() {
            errorCount++;
            debugError(`❌ Error ${index + 1}/${galleryImages.length}: ${this.src}`);
            debugError('   → Archivo no encontrado o ruta incorrecta');
            if (loadedCount + errorCount === galleryImages.length) {
                debugLog(`🎉 RESUMEN: ${loadedCount} cargadas ✅ | ${errorCount} errores ❌`);
                if (errorCount > 0) {
                    debugError('⚠️ SOLUCIÓN:');
                    debugError(`   1. Verifica que carpeta 'img/' esté en: ${window.location.origin}/img/`);
                    debugError('   2. Archivos deben ser .jpeg (no .jpg ni .JPG)');
                    debugError('   3. Presiona Ctrl+Shift+R para limpiar caché');
                }
            }
        });
    });

    setTimeout(() => {
        galleryImages.forEach(img => {
            if (!img.complete) {
                img.src = img.src;
            }
        });
    }, 100);
});
