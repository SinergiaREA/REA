// ========== LOADER OPTIMIZADO - DÍA DE LA BANDERA ==========
(function() {
    'use strict';

    // Configuración centralizada
    const config = {
        // Se omite 🇲🇽 porque en algunos equipos se muestra como texto "MX".
        emojis: ['🪅', '🎺', '🌵', '🎉', '🎗️', '🤍', '❤️', '💚', '🌶️', '🦅', '🎖️'],
        starEmojis: ['⭐', '✨', '🌟'],
        colors: ['#006847', '#ffffff', '#CE1126'],
        heartCount: 16,
        particleCount: 24,
        starCount: 9,
        glitterCount: 8,
        loaderDuration: 6500
    };
    let loaderActive = true;

    // Elementos del DOM
    const elements = {
        loader: document.getElementById('valentineLoader'),
        heartsContainer: document.getElementById('heartsContainer'),
        particlesContainer: document.getElementById('particlesContainer')
    };

    // ========== TEMAS POR HORA DEL DÍA ==========
    function applyDayTheme() {
        const now = new Date();
        const mexicoTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
        const hour = mexicoTime.getHours();
        
        elements.loader.classList.remove('morning', 'afternoon', 'night');
        
        if (hour >= 6 && hour < 12) {
            elements.loader.classList.add('morning');
        } else if (hour >= 12 && hour < 18) {
            elements.loader.classList.add('afternoon');
        } else {
            elements.loader.classList.add('night');
        }
    }

    // ========== CREAR ELEMENTOS ANIMADOS ==========
    function createAnimatedElement(type, options) {
        const element = document.createElement('div');
        element.className = type;
        
        Object.assign(element.style, {
            left: `${Math.random() * 100}%`,
            bottom: options.bottom || `${-30 - Math.random() * 50}px`,
            fontSize: options.fontSize || `${14 + Math.random() * 26}px`,
            animationDelay: `${Math.random() * (options.maxDelay || 2.5)}s`,
            animationDuration: options.duration || `${2.6 + Math.random() * 2.2}s`
        });
        
        if (options.content) {
            element.textContent = options.content;
        }
        
        if (options.background) {
            element.style.background = options.background;
        }
        
        if (options.size) {
            element.style.width = `${options.size}px`;
            element.style.height = `${options.size}px`;
        }
        
        return element;
    }

    // ========== CORAZONES FLOTANTES ==========
    function createFloatingHearts() {
        if (!loaderActive) return;

        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < config.heartCount; i++) {
            const emoji = config.emojis[Math.floor(Math.random() * config.emojis.length)];
            const heart = createAnimatedElement('floating-heart', {
                content: emoji,
                maxDelay: 2.2
            });
            fragment.appendChild(heart);
        }
        
        elements.heartsContainer.appendChild(fragment);
        
        // Recrear hearts continuamente
        setTimeout(() => {
            if (loaderActive) createFloatingHearts();
        }, 1200 + Math.random() * 800);
    }

    // ========== PARTÍCULAS ==========
    function createParticles() {
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < config.particleCount; i++) {
            const randomSize = 4 + Math.random() * 7;
            const randomColor = config.colors[Math.floor(Math.random() * config.colors.length)];
            
            const particle = createAnimatedElement('particle', {
                background: randomColor,
                size: randomSize,
                bottom: `${Math.random() * 100}vh`,
                maxDelay: 8,
                duration: `${8 + Math.random() * 4}s`
            });
            
            fragment.appendChild(particle);
        }
        
        elements.particlesContainer.appendChild(fragment);
    }

    // ========== ESTRELLAS ==========
    function createStars() {
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < config.starCount; i++) {
            const emoji = config.starEmojis[Math.floor(Math.random() * config.starEmojis.length)];
            
            const star = createAnimatedElement('star', {
                content: emoji,
                bottom: `${Math.random() * 100}vh`,
                maxDelay: 6,
                duration: `${8 + Math.random() * 3}s`
            });
            
            fragment.appendChild(star);
        }
        
        elements.particlesContainer.appendChild(fragment);
    }

    // ========== BRILLOS ==========
    function createGlitter() {
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < config.glitterCount; i++) {
            const glitter = createAnimatedElement('glitter', {
                maxDelay: 1.5,
                duration: '1.8s'
            });
            
            glitter.style.top = `${Math.random() * 100}%`;
            glitter.style.bottom = 'auto';
            
            fragment.appendChild(glitter);
        }
        
        elements.particlesContainer.appendChild(fragment);
    }

    // ========== OCULTAR LOADER ==========
    function hideLoader() {
        setTimeout(() => {
            elements.loader.classList.add('hidden');
            loaderActive = false;

            setTimeout(() => {
                elements.heartsContainer.textContent = '';
                elements.particlesContainer.textContent = '';
            }, 700);
        }, config.loaderDuration);
    }

    // ========== INICIALIZACIÓN ==========
    function init() {
        if (!elements.loader || !elements.heartsContainer || !elements.particlesContainer) {
            console.error('Loader: Required elements not found');
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            config.heartCount = 6;
            config.particleCount = 10;
            config.starCount = 4;
            config.glitterCount = 4;
            config.loaderDuration = 1800;
        }

        applyDayTheme();
        createFloatingHearts();
        createParticles();
        createStars();
        createGlitter();
        hideLoader();
    }

    // Inicializar cuando DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

