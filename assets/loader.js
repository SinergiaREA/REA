// Código JS extraído para inicializar el loader
function initializeValentineLoader() {
    const heartsContainer = document.getElementById('heartsContainer');
    const particlesContainer = document.getElementById('particlesContainer');
    const valentineLoader = document.getElementById('valentineLoader');

    function applyDayTheme() {
        const now = new Date();
        const mexicoTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
        const hour = mexicoTime.getHours();
        valentineLoader.classList.remove('morning','afternoon','night');
        if (hour >= 6 && hour < 12) valentineLoader.classList.add('morning');
        else if (hour >= 12 && hour < 18) valentineLoader.classList.add('afternoon');
        else valentineLoader.classList.add('night');
    }

    function createFloatingHearts() {
        const heartEmojis = ['💕','💖','💗','💝','💓'];
        const heartCount = 15;
        for (let i=0;i<heartCount;i++){
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = heartEmojis[Math.floor(Math.random()*heartEmojis.length)];
            const randomLeft = Math.random()*100;
            const randomDelay = Math.random()*2;
            const randomDuration = 2.5 + Math.random()*1.5;
            heart.style.left = randomLeft + '%';
            heart.style.bottom = '-50px';
            heart.style.animation = `floatUpFade ${randomDuration}s ease-in forwards`;
            heart.style.animationDelay = randomDelay + 's';
            heartsContainer.appendChild(heart);
        }
        setTimeout(createFloatingHearts, 1500);
    }

    function createParticles() {
        const particleCount = 25;
        for (let i=0;i<particleCount;i++){
            const particle = document.createElement('div');
            particle.className = 'particle';
            const randomLeft = Math.random()*100;
            const randomDelay = Math.random()*8;
            const randomDuration = 8 + Math.random()*4;
            const randomSize = 5 + Math.random()*6;
            particle.style.left = randomLeft + '%';
            particle.style.bottom = Math.random()*100 + 'vh';
            particle.style.width = randomSize + 'px';
            particle.style.height = randomSize + 'px';
            particle.style.animation = `floatParticle ${randomDuration}s infinite`;
            particle.style.animationDelay = randomDelay + 's';
            particlesContainer.appendChild(particle);
        }
    }

    function createStars(){
        const starEmojis = ['⭐','✨','💫'];
        const starCount = 12;
        for (let i=0;i<starCount;i++){
            const star = document.createElement('div');
            star.className = 'star';
            star.textContent = starEmojis[Math.floor(Math.random()*starEmojis.length)];
            const randomLeft = Math.random()*100;
            const randomDelay = Math.random()*6;
            const randomDuration = 8 + Math.random()*3;
            star.style.left = randomLeft + '%';
            star.style.bottom = Math.random()*100 + 'vh';
            star.style.animation = `floatStar ${randomDuration}s ease-in-out infinite`;
            star.style.animationDelay = randomDelay + 's';
            particlesContainer.appendChild(star);
        }
    }

    function createGlitter(){
        const glitterCount = 8;
        for (let i=0;i<glitterCount;i++){
            const glitter = document.createElement('div');
            glitter.className = 'glitter';
            const randomLeft = Math.random()*100;
            const randomTop = Math.random()*100;
            const randomDelay = Math.random()*1.5;
            glitter.style.left = randomLeft + '%';
            glitter.style.top = randomTop + '%';
            glitter.style.animation = `twinkleGlitter 1.5s ease-in-out infinite`;
            glitter.style.animationDelay = randomDelay + 's';
            particlesContainer.appendChild(glitter);
        }
    }

    applyDayTheme();
    createFloatingHearts();
    createParticles();
    createStars();
    createGlitter();

    // Ocultar loader después de 8 segundos
    setTimeout(() => {
        valentineLoader.classList.add('hidden');
    }, 8000);
}

// Inicializar cuando DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeValentineLoader);
} else {
    initializeValentineLoader();
}
