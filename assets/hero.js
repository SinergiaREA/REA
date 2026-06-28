(function () {
  "use strict";

  // ── Detección de timezone con Intl.DateTimeFormat ──────────────────
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Mexico_City",
    hour: "numeric",
    hour12: false
  });
  
  const hour = parseInt(formatter.format(new Date()), 10);

  // ── Configuración de temas ──────────────────────────────
  const campaign = window.REA_CAMPAIGN || {};
  const subDinamico = campaign.heroGreetingSub || 'Bienvenido a Sinergia REA';

  const temas = {
    manana: {
      clase: "theme-manana",
      saludo: "¡Buenos días!",
      sub: subDinamico + " ☀️",
      icono: "🌅",
      esferas: ["#FFD700", "#FFA500", "#FFE4B5", "#87CEEB"],
      loaderBg:
        "linear-gradient(135deg, #81c784 0%, #fff9e6 50%, #ffb300 100%)",
    },
    tarde: {
      clase: "theme-tarde",
      saludo: "¡Buenas tardes!",
      sub: subDinamico + " 🌤️",
      icono: "🌤️",
      esferas: ["#FF8C00", "#FF6347", "#FFB6C1", "#FFA07A"],
      loaderBg:
        "linear-gradient(135deg, #1a472a 0%, #e8f5e9 30%, #fff9e6 50%, #ffd66d 70%, #4caf50 100%)",
    },
    noche: {
      clase: "theme-noche",
      saludo: "¡Buenas noches!",
      sub: subDinamico + " 🌙",
      icono: "🌙",
      esferas: ["#4169E1", "#9370DB", "#6495ED", "#8A2BE2"],
      loaderBg:
        "linear-gradient(135deg, #1A1A3E 0%, #16213E 50%, #533483 100%)",
    },
    madrugada: {
      clase: "theme-madrugada",
      saludo: "¡Buena madrugada!",
      sub: "Velando contigo · Sinergia REA ✨",
      icono: "✨",
      esferas: ["#1a1a6e", "#2c2c8e", "#3a3aae", "#4a4ace"],
      loaderBg:
        "linear-gradient(135deg, #060818 0%, #0A0E27 50%, #1A0533 100%)",
    },
  };

  // ── Determinar tema según horario ──────────────────────
  let tema;
  if (hour >= 6 && hour < 12) tema = temas.manana;
  else if (hour >= 12 && hour < 19) tema = temas.tarde;
  else if (hour >= 19 && hour < 24) tema = temas.noche;
  else tema = temas.madrugada; // 0–5:59am

  // --- CAMPAÑA OVERRIDE ---
  if (campaign.hasSpecialCampaign) {
    tema.esferas = campaign.heroColors || tema.esferas;
    tema.sub = campaign.heroGreetingSub || tema.sub;
    
    // Actualizar CTA
    const ctaEl = document.querySelector('.btn-galeria');
    if (ctaEl && campaign.ctaText) {
      ctaEl.textContent = campaign.ctaText;
      ctaEl.href = campaign.ctaLink || "galeria_perfumes.html";
    }
  }

  // ── Aplicar al hero ────────────────────────────────────
  const heroEl = document.getElementById("heroSection");
  const greetingEl = document.getElementById("heroGreeting");
  const subEl = document.getElementById("heroGreetingSub");
  const iconEl = document.getElementById("heroTimeIcon");

  if (heroEl) heroEl.classList.add(tema.clase);
  if (greetingEl) greetingEl.textContent = tema.saludo;
  if (subEl) subEl.textContent = tema.sub;
  if (iconEl) iconEl.textContent = tema.icono;

  // ── Esferas flotantes ──────────────────────────────────
  const spheresContainer = document.getElementById("heroSpheres");
  if (spheresContainer) {
    for (let i = 0; i < 6; i++) {
      const s = document.createElement("div");
      s.className = "hero-sphere";
      const size = 14 + Math.random() * 32;
      const color =
        tema.esferas[Math.floor(Math.random() * tema.esferas.length)];
      Object.assign(s.style, {
        width: size + "px",
        height: size + "px",
        backgroundColor: color,
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        animationDelay: Math.random() * 6 + "s",
        animationDuration: 8 + Math.random() * 5 + "s",
      });
      spheresContainer.appendChild(s);
    }
  }

  // ── Sincronizar loader con el mismo tema ───────────────
  const loader = document.getElementById("sinergiaLoader");
  if (loader) {
    loader.style.background = tema.loaderBg;
  }
})();
