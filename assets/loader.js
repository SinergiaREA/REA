// ========== LOADER OPTIMIZADO - DÍA DE LA BANDERA ==========
(function() {
    'use strict';

    var config = {
        emojis: ['❤️', '🤍', '💚', '🪅', '🌶️', '🌮'],
        starEmojis: ['⭐', '✨', '🌟'],
        colors: ['#006847', '#ffffff', '#CE1126'],
        heartCount: 16,
        particleCount: 24,
        starCount: 9,
        glitterCount: 8,
        loaderDuration: 5000
    };
    var loaderActive = true;

    var elements = {
        loader: document.getElementById('valentineLoader'),
        heartsContainer: document.getElementById('heartsContainer'),
        particlesContainer: document.getElementById('particlesContainer')
    };

    // ========== SESSIONSSTORAGE: ya se mostró el loader? ==========
    function loaderAlreadyShown() {
        try { return sessionStorage.getItem('loaderShown') === 'true'; } catch(e) { return false; }
    }
    function markLoaderShown() {
        try { sessionStorage.setItem('loaderShown', 'true'); } catch(e) {}
    }

    // ========== TEMAS POR HORA DEL DÍA ==========
    function applyDayTheme() {
        var now = new Date();
        var mexicoTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
        var hour = mexicoTime.getHours();
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
        var element = document.createElement('div');
        element.className = type;
        Object.assign(element.style, {
            left: (Math.random() * 100) + '%',
            bottom: options.bottom || ((-30 - Math.random() * 50) + 'px'),
            fontSize: options.fontSize || ((14 + Math.random() * 26) + 'px'),
            animationDelay: (Math.random() * (options.maxDelay || 2.5)) + 's',
            animationDuration: options.duration || ((2.6 + Math.random() * 2.2) + 's')
        });
        if (options.content) element.textContent = options.content;
        if (options.background) element.style.background = options.background;
        if (options.size) {
            element.style.width = options.size + 'px';
            element.style.height = options.size + 'px';
        }
        return element;
    }

    // ========== CORAZONES FLOTANTES ==========
    function createFloatingHearts() {
        if (!loaderActive) return;
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < config.heartCount; i++) {
            var emoji = config.emojis[Math.floor(Math.random() * config.emojis.length)];
            fragment.appendChild(createAnimatedElement('floating-heart', { content: emoji, maxDelay: 2.2 }));
        }
        elements.heartsContainer.appendChild(fragment);
        setTimeout(function() { if (loaderActive) createFloatingHearts(); }, 1200 + Math.random() * 800);
    }

    // ========== PARTÍCULAS ==========
    function createParticles() {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < config.particleCount; i++) {
            var size = 4 + Math.random() * 7;
            var color = config.colors[Math.floor(Math.random() * config.colors.length)];
            fragment.appendChild(createAnimatedElement('particle', {
                background: color, size: size,
                bottom: (Math.random() * 100) + 'vh',
                maxDelay: 8, duration: (8 + Math.random() * 4) + 's'
            }));
        }
        elements.particlesContainer.appendChild(fragment);
    }

    // ========== ESTRELLAS ==========
    function createStars() {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < config.starCount; i++) {
            var emoji = config.starEmojis[Math.floor(Math.random() * config.starEmojis.length)];
            fragment.appendChild(createAnimatedElement('star', {
                content: emoji, bottom: (Math.random() * 100) + 'vh',
                maxDelay: 6, duration: (8 + Math.random() * 3) + 's'
            }));
        }
        elements.particlesContainer.appendChild(fragment);
    }

    // ========== BRILLOS ==========
    function createGlitter() {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < config.glitterCount; i++) {
            var g = createAnimatedElement('glitter', { maxDelay: 1.5, duration: '1.8s' });
            g.style.top = (Math.random() * 100) + '%';
            g.style.bottom = 'auto';
            fragment.appendChild(g);
        }
        elements.particlesContainer.appendChild(fragment);
    }

    // ========== OCULTAR LOADER ==========
    function hideLoader() {
        setTimeout(function() {
            elements.loader.classList.add('hidden');
            loaderActive = false;
            markLoaderShown();
            setTimeout(function() {
                elements.heartsContainer.textContent = '';
                elements.particlesContainer.textContent = '';
            }, 700);
        }, config.loaderDuration);
    }

    // ========== INICIALIZACIÓN ==========
    function init() {
        if (!elements.loader || !elements.heartsContainer || !elements.particlesContainer) return;

        // Si ya se mostró el loader en esta sesión, ocultarlo sin animaciones
        if (loaderAlreadyShown()) {
            elements.loader.style.display = 'none';
            loaderActive = false;
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
        // SIN redirectFromLoaderPage — ya no existe. No hay redirecciones automáticas.
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
