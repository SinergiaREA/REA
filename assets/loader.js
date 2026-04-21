// ========== LOADER OPTIMIZADO - MARZO: BENITO JUÁREZ & PRIMAVERA ==========
(function() {
    'use strict';

    // Configuración centralizada para Marzo
    const config = {
        // Elección aleatoria entre flores y mariposas
        /* ← Emojis flotantes en el loader */ emojis: ['🌸', '🌼', '🌻', '🦋', '🌺', '💫', '⭐', '✨'],
        /* ← Emojis de estrellas */ starEmojis: ['✨', '💫', '🌟', '⭐'],
        /* ← Colores de partículas — modifica estos para cambiar los colores */ colors: ['#0057FF', '#00C875', '#00E5FF', '#A855F7', '#3D8BFF', '#7B2FBE'],
        elementCount: 20,
        particleCount: 24,
        starCount: 9,
        glitterCount: 10,
        loaderDuration: 6500
    };
    let loaderActive = true;

    // Elementos del DOM
    const elements = {
        loader: document.getElementById('sinergiaLoader'),
        elementsContainer: document.getElementById('elementsContainer'),
        heartsContainer: document.getElementById('heartsContainer'), // Para compatibilidad
        particlesContainer: document.getElementById('particlesContainer')
    };

    // ========== VERIFICAR SI YA SE MOSTRÓ EL LOADER ==========
    function loaderAlreadyShown() {
        try {
            // El loader en index.html siempre debe mostrarse
            // El flag solo previene el ciclo cuando viene de loader.html
            return false;
        } catch(e) {
            return false;
        }
    }

    function markLoaderShown() {
        try {
            sessionStorage.setItem('loaderShown', 'true');
        } catch(e) {}
    }

    // ========== TEMAS POR HORA DEL DÍA - MARZO ==========
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

    // ========== ELEMENTOS FLOTANTES DE MARZO (FLORES Y MARIPOSAS) ==========
    function createFloatingElements() {
        if (!loaderActive) return;

        const fragment = document.createDocumentFragment();
        const containerRef = elements.elementsContainer || elements.heartsContainer;
        
        for (let i = 0; i < config.elementCount; i++) {
            const emoji = config.emojis[Math.floor(Math.random() * config.emojis.length)];
            const isButterly = emoji === '🦋';
            const elementType = isButterly ? 'floating-butterfly' : 'floating-flower';
            
            const element = createAnimatedElement(elementType, {
                content: emoji,
                maxDelay: 2.5,
                fontSize: isButterly ? `${16 + Math.random() * 12}px` : `${14 + Math.random() * 14}px`
            });
            fragment.appendChild(element);
        }
        
        if (containerRef) containerRef.appendChild(fragment);
        
        // Recrear elementos continuamente
        setTimeout(() => {
            if (loaderActive) createFloatingElements();
        }, 1500 + Math.random() * 1000);
    }

    // Compatibilidad con versiones anteriores
    function createFloatingHearts() {
        createFloatingElements();
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
            markLoaderShown();

            setTimeout(() => {
                if (elements.elementsContainer) elements.elementsContainer.textContent = '';
                if (elements.heartsContainer) elements.heartsContainer.textContent = '';
                elements.particlesContainer.textContent = '';
            }, 700);
        }, config.loaderDuration);
    }

    // ========== INTEGRADOR DE CAMPAÑAS ==========
    function applyCampaignData() {
        const camp = window.REA_CAMPAIGN;
        if (camp) {
            // Actualizar icono central dinámico
            const iconEl = document.getElementById('loaderDynamicIcon');
            if (iconEl && camp.loaderIcon) {
                iconEl.textContent = camp.loaderIcon;
            }
            // Actualizar imagen de fondo parallax
            const bgImg = document.getElementById('loaderBgImg');
            if (bgImg && camp.bannerImg) {
                bgImg.src = camp.bannerImg;
            }
            // Actualizar partículas y colores si existen en la campaña
            if (camp.loaderEmojis && camp.loaderEmojis.length > 0) {
                config.emojis = camp.loaderEmojis;
            }
            if (camp.loaderColors && camp.loaderColors.length > 0) {
                config.colors = camp.loaderColors;
            }
        }
    }

    // ========== INICIALIZACIÓN ==========
    function init() {
        // Compatibilidad: usar elementsContainer si existe, sino heartsContainer
        if (!elements.elementsContainer && elements.heartsContainer) {
            elements.elementsContainer = elements.heartsContainer;
        }
        
        if (!elements.loader || !elements.particlesContainer) {
            return;
        }

        // Si el loader ya se mostró en esta sesión, ocultarlo inmediatamente
        if (loaderAlreadyShown()) {
            elements.loader.style.display = 'none';
            loaderActive = false;
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            config.elementCount = 8;
            config.particleCount = 10;
            config.starCount = 4;
            config.glitterCount = 4;
            config.loaderDuration = 1800;
        }

        applyCampaignData(); // <--- Inyectar campaña
        applyDayTheme();
        
        // Iniciar las partículas cuánticas del nuevo motor Canvas
        if (typeof window.initQuantumParticles === 'function') {
            window.initQuantumParticles();
        }
        
        hideLoader();
    }

    // Inicializar cuando DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
