(function() {
    'use strict';

    function initQuantumParticles() {
        const canvas = document.getElementById('quantumCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        let particles = [];
        // Ajustamos la cantidad de esferas según la pantalla
        const particleCount = window.innerWidth < 768 ? 20 : 40; 

        // Colores base de la campaña (Colores Sinergia por defecto)
        let colors = ['#0057FF', '#00C875', '#e9009b', '#7B2FBE', '#ffd200'];
        if (window.REA_CAMPAIGN && window.REA_CAMPAIGN.loaderColors) {
            colors = window.REA_CAMPAIGN.loaderColors;
        }

        // Conversor de hex a rgb para transparencias fluidas
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
        };

        const mouse = { x: -1000, y: -1000, radius: 250 };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        });

        class QuantumOrb {
            constructor() {
                this.size = Math.random() * 40 + 15; // Orbes grandes y difuminados
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.rgb = hexToRgb(this.color);
                
                // Velocidad lenta y fluida
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = (Math.random() - 0.5) * 1.5;
                
                // Variación de opacidad
                this.opacity = Math.random() * 0.6 + 0.3;
                this.pulsePhase = Math.random() * Math.PI * 2;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                
                // Creación del halo de luz (Gravedad visual / Quantum Blur)
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                
                // Pulsación sutil
                const currentOpacity = this.opacity + (Math.sin(this.pulsePhase) * 0.15);
                
                gradient.addColorStop(0, `rgba(${this.rgb}, ${currentOpacity})`);
                gradient.addColorStop(0.3, `rgba(${this.rgb}, ${currentOpacity * 0.6})`);
                gradient.addColorStop(1, `rgba(${this.rgb}, 0)`);
                
                ctx.fillStyle = gradient;
                ctx.globalCompositeOperation = 'screen'; // Mezcla aditiva para brillo intenso
                ctx.fill();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.pulsePhase += 0.02;

                // Reaparecer al salir de la pantalla (flujo continuo)
                if (this.x < -this.size) this.x = width + this.size;
                if (this.x > width + this.size) this.x = -this.size;
                if (this.y < -this.size) this.y = height + this.size;
                if (this.y > height + this.size) this.y = -this.size;

                // Simulación Cuántica de Gravedad: Atraídos sutilmente por el ratón
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    // Atracción suave
                    this.vx += forceDirectionX * 0.03;
                    this.vy += forceDirectionY * 0.03;
                    
                    // Limite térmico de velocidad
                    const maxSpeed = 3.5;
                    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                    if(speed > maxSpeed) {
                        this.vx = (this.vx / speed) * maxSpeed;
                        this.vy = (this.vy / speed) * maxSpeed;
                    }
                }

                this.draw();
            }
        }

        function init() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new QuantumOrb());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            
            const loader = document.getElementById('sinergiaLoader');
            if (loader && !loader.classList.contains('hidden')) {
                requestAnimationFrame(animate);
            }
        }

        init();
        animate();
    }

    window.initQuantumParticles = initQuantumParticles;
})();
