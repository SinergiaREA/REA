(function() {
    'use strict';

    function initHeroParticles() {
        const tsContainer = document.getElementById('tsparticles');
        if (!tsContainer || typeof tsParticles === 'undefined') return;

        // Determinar colores basados en la hora del día y la paleta de Sinergia REA
        const now = new Date();
        const mexicoTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
        const hour = mexicoTime.getHours();

        let particleColors = ["#ffffff"];
        let linkColor = "#ffffff";
        let bgColor = "transparent";

        // Colores de Sinergia: Azul #0057FF, Verde #00C875, Morado #7B2FBE, Magenta #e9009b, Amarillo #ffd200
        
        if (hour >= 6 && hour < 12) {
            // Mañana: Tonos más claros, cálidos y vibrantes
            particleColors = ["#0057FF", "#00C875", "#ffd200"];
            linkColor = "#0057FF";
        } else if (hour >= 12 && hour < 18) {
            // Tarde: Tonos más púrpuras y magentas
            particleColors = ["#e9009b", "#7B2FBE", "#0057FF"];
            linkColor = "#7B2FBE";
        } else {
            // Noche: Tonos muy brillantes de neón para contrastar en la oscuridad
            particleColors = ["#00E5FF", "#00C875", "#e9009b"];
            linkColor = "#00E5FF";
        }

        const config = {
            fullScreen: { enable: false, zIndex: 0 },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: { enable: true, mode: "push" },
                    onHover: { enable: true, mode: "grab" },
                    resize: true,
                },
                modes: {
                    push: { quantity: 4 },
                    grab: { distance: 200, links: { opacity: 0.8, color: linkColor } },
                },
            },
            particles: {
                color: { value: particleColors },
                links: {
                    color: linkColor,
                    distance: 150,
                    enable: true,
                    opacity: 0.4,
                    width: 1.5,
                    triangles: { enable: true, opacity: 0.05 }
                },
                collisions: { enable: true },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: { default: "bounce" },
                    random: true, 
                    speed: { min: 0.5, max: 1.5 }, 
                    straight: false,
                },
                number: {
                    density: { enable: true, area: 800 },
                    value: 50, 
                },
                opacity: { value: { min: 0.3, max: 0.7 } },
                shape: {
                    type: ["circle", "polygon", "triangle"], 
                    options: { polygon: { sides: 6 } }
                },
                size: { value: { min: 2, max: 5 } },
            },
            detectRetina: true,
        };

        // Cargar en el Hero
        tsParticles.load("tsparticles", config);
        
        // Cargar en el Banner de Efemérides (con menos partículas para no saturar)
        if (document.getElementById('tsparticles-banner')) {
            const bannerConfig = JSON.parse(JSON.stringify(config));
            bannerConfig.particles.number.value = 25; // Menos densidad
            bannerConfig.particles.links.distance = 100; // Conexiones más cortas
            tsParticles.load("tsparticles-banner", bannerConfig);
        }
    }

    document.addEventListener('DOMContentLoaded', initHeroParticles);
})();
