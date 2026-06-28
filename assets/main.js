(function () {
  "use strict";

  // ── Progress bar + scroll top ──
  const bar = document.getElementById("progressBar");
  const top = document.getElementById("scrollTop");
  let tick = false;

  function onScroll() {
    const y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const h =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    if (bar) bar.style.width = (y / h) * 100 + "%";
    if (top) top.classList.toggle("visible", y > 300);
  }

  window.addEventListener(
    "scroll",
    () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => {
        onScroll();
        tick = false;
      });
    },
    { passive: true },
  );

  onScroll();

  if (top) {
    top.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
  }

  // ── Smooth scroll ──
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const t = document.querySelector(a.getAttribute("href"));
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ── Nav hide/show on scroll ──
  let lastY = 0;
  const nav = document.querySelector("nav");
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (nav) {
        nav.style.transform =
          y > lastY && y > 120 ? "translateY(-100%)" : "translateY(0)";
      }
      lastY = y;
    },
    { passive: true },
  );

  // ── Badge dinámico de fecha ──
  document.addEventListener("DOMContentLoaded", () => {
    const b = document.getElementById("heroBadgeText");
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = new Intl.DateTimeFormat('es-MX', options).format(now);
    if (b) {
      b.textContent = dateStr.toUpperCase() + " · PAPELERÍA & SERVICIOS · VERACRUZ";
    }
  });
})();



// ── Menú hamburguesa (Fuera de IIFE para declarar funciones en ámbito superior) ──
(function () {
  "use strict";

  const navBtn = document.getElementById("navMenuBtn");
  const navPanel = document.getElementById("navMobilePanel");
  const navOvly = document.getElementById("navOverlay");

  function openMobileNav() {
    navBtn.classList.add("open");
    navPanel.classList.add("open");
    navOvly.classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  function closeMobileNav() {
    navBtn.classList.remove("open");
    navPanel.classList.remove("open");
    navOvly.classList.remove("visible");
    document.body.style.overflow = "";
  }

  // Exponer a global window para enlaces HTML con onclick
  window.closeMobileNav = closeMobileNav;
  window.openMobileNav = openMobileNav;

  if (navBtn) {
    navBtn.addEventListener("click", () =>
      navBtn.classList.contains("open") ? closeMobileNav() : openMobileNav(),
    );
  }

  if (navOvly) {
    navOvly.addEventListener("click", closeMobileNav);
  }

  // Escapar para cerrar
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileNav();
  });
})();

// ── Inicialización de AOS, Parallax y Efectos de Campaña ──
document.addEventListener('DOMContentLoaded', function() {
  "use strict";

  setTimeout(function() {
    if (typeof AOS !== 'undefined') {
      AOS.init({ once: true, duration: 1000 });
    }
    
    var parallaxImages = document.querySelectorAll('.parallax-img');
    if (parallaxImages.length > 0 && typeof simpleParallax !== 'undefined') {
      new simpleParallax(parallaxImages, {
        orientation: 'up',
        scale: 3.0,
        delay: 1.0,
        transition: 'cubic-bezier(0,0,0,1)'
      });
    }
  }, 100);

  // ── Lógica Motor Inteligente de Fechas ──
  const camp = window.REA_CAMPAIGN;
  if (camp) {
    // Banner Efemérides
    const infoWrap = document.getElementById('infoMesWrap');
    const infoLabel = document.getElementById('infoMesLabel');
    const infoGrid = document.getElementById('infoMesGrid');
    
    if (camp.efemerides && camp.efemerides.length > 0 && infoWrap) {
      if (camp.bannerImg) {
        const bannerBg = document.querySelector('.banner-bg-img');
        if (bannerBg) bannerBg.src = camp.bannerImg;
      }
      if (infoLabel) infoLabel.textContent = camp.monthName.toUpperCase();
      if (infoGrid) {
        infoGrid.innerHTML = '';
        camp.efemerides.forEach(ef => {
          infoGrid.innerHTML += `
            <div class="info-mes-item">
              <span class="imi-emoji">${ef.emoji}</span>
              <div>
                <strong>${ef.title}</strong>
                <p>${ef.desc}</p>
              </div>
            </div>
          `;
        });
      }
      infoWrap.style.display = 'block';
    }

    // Pop-up sugerencia especial
    if (camp.showPopup) {
      const popup = document.createElement('div');
      popup.className = 'campaign-popup';
      popup.style.cssText = 'position: fixed; bottom: 30px; left: 20px; background: var(--rosa); color: white; padding: 15px 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(255, 45, 120, 0.4); z-index: 1000; font-family: "Poppins", sans-serif; cursor: pointer; opacity: 0; transform: translateY(20px); transition: all 0.5s ease;';
      popup.onclick = () => window.location.href = camp.ctaLink || "galeria_perfumes.html";
      popup.innerHTML = `
        <div style="font-size: 14px; font-weight: 700; margin-bottom: 5px;">Sugerencia de Regalo 🎁</div>
        <div style="font-size: 12px;">${camp.ctaText}</div>
        <div style="position: absolute; top: -10px; right: -10px; background: white; color: var(--rosa); width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);" onclick="event.stopPropagation(); this.parentElement.style.display='none';">✖</div>
      `;
      document.body.appendChild(popup);
      
      setTimeout(() => {
        popup.style.opacity = '1';
        popup.style.transform = 'translateY(0)';
      }, 3000);
    }
  }
});
