(() => {
    'use strict';

    const campaign = window.REA_CAMPAIGN || {};
    let lastFocusedElement = null;

    function applyCampaignContent() {
        const galleryTitle = document.getElementById('campaignGalleryHeaderTitle');
        const gallerySubtitle = document.getElementById('campaignGalleryHeaderSubtitle');
        const metaDescription = document.querySelector('meta[name="description"]');
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');

        if (campaign.galleryTitle) document.title = campaign.galleryTitle;
        if (galleryTitle && campaign.galleryHeaderTitle) galleryTitle.textContent = campaign.galleryHeaderTitle;
        if (gallerySubtitle && campaign.galleryHeaderSubtitle) gallerySubtitle.textContent = campaign.galleryHeaderSubtitle;
        if (metaDescription && campaign.galleryMetaDescription) metaDescription.setAttribute('content', campaign.galleryMetaDescription);
        if (ogTitle && campaign.galleryOgTitle) ogTitle.setAttribute('content', campaign.galleryOgTitle);
        if (ogDescription && campaign.galleryOgDescription) ogDescription.setAttribute('content', campaign.galleryOgDescription);
    }

    function openModal(cardEl) {
        const modal = document.getElementById('perfumeModal');
        if (!modal || !cardEl) return;
        lastFocusedElement = document.activeElement;

        const modalImage = modal.querySelector('#modalImage');
        const sourceImg = cardEl.querySelector('.perfume-image img');
        if (sourceImg) {
            modalImage.src = sourceImg.src;
            modalImage.alt = sourceImg.alt || '';
        }

        modal.querySelector('#modalName').textContent =
            cardEl.querySelector('.perfume-name')?.textContent || 'Perfume';
        modal.querySelector('#modalCategory').textContent =
            cardEl.querySelector('.perfume-category')?.textContent || '';
        modal.querySelector('#modalDescription').textContent =
            cardEl.querySelector('.perfume-description')?.textContent || '';

        const modalNotes = modal.querySelector('#modalNotes');
        modalNotes.textContent = '';
        cardEl.querySelectorAll('.perfume-notes .note-tag').forEach((tag) => {
            const clone = document.createElement('span');
            clone.className = 'note-tag';
            clone.textContent = tag.textContent;
            modalNotes.appendChild(clone);
        });

        modal.querySelector('#modalPrice').textContent =
            cardEl.querySelector('.perfume-price')?.textContent || '';

        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modal.querySelector('.close-modal')?.focus();
    }

    function closeModal() {
        const modal = document.getElementById('perfumeModal');
        if (!modal) return;
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    }

    function setupWhatsAppButton() {
        const modal = document.getElementById('perfumeModal');
        const whatsappBtn = modal?.querySelector('#modalWhatsAppBtn');
        if (!modal || !whatsappBtn) return;

        const waNumber = '525645003181';
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const name = modal.querySelector('#modalName')?.textContent.trim() || '';
            const message = `Hola, me interesa el perfume: ${name}`;
            const encoded = encodeURIComponent(message);
            const waWeb = `https://wa.me/${waNumber}?text=${encoded}`;
            const waApp = `whatsapp://send?text=${encoded}`;

            closeModal();

            const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
                .test(navigator.userAgent);
            if (isMobile) {
                window.location.href = waApp;
                setTimeout(() => {
                    window.open(waWeb, '_blank', 'noopener');
                }, 600);
            } else {
                window.open(waWeb, '_blank', 'noopener');
            }

            whatsappBtn.disabled = true;
            setTimeout(() => {
                whatsappBtn.disabled = false;
            }, 2000);
        });
    }

    function setupCards() {
        const cards = document.querySelectorAll('.perfume-card');
        cards.forEach((card, index) => {
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `Ver detalles del perfume ${index + 1}`);

            card.addEventListener('click', () => openModal(card));
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openModal(card);
                }
            });
        });
    }

    function setupModalDismiss() {
        const modal = document.getElementById('perfumeModal');
        const modalContent = modal?.querySelector('.modal-content');
        const closeButton = modal?.querySelector('.close-modal');
        if (!modal || !modalContent || !closeButton) return;

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        closeButton.addEventListener('click', closeModal);
        closeButton.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                closeModal();
            }
        });

        modalContent.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }

    function setupImageLoadingHints() {
        const images = document.querySelectorAll('.perfume-image img');
        images.forEach((img, index) => {
            img.decoding = 'async';
            if (index < 2) {
                img.loading = 'eager';
                img.setAttribute('fetchpriority', 'high');
            }
        });
    }

    function setupObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.perfume-card').forEach((el) => observer.observe(el));
    }

    function setupEscapeClose() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeModal();
        });
    }

    function setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const cards = document.querySelectorAll('.perfume-card');
        if (filterButtons.length === 0 || cards.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                // Activar el botón correspondiente
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');

                const targetCategory = button.getAttribute('data-category');

                cards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (targetCategory === 'all' || cardCategory === targetCategory) {
                        card.classList.remove('hidden');
                        card.setAttribute('aria-hidden', 'false');
                        // Asegurar que sea navegable si está visible
                        card.setAttribute('tabindex', '0');
                    } else {
                        card.classList.add('hidden');
                        card.setAttribute('aria-hidden', 'true');
                        // Quitar del flujo de foco si está oculto
                        card.setAttribute('tabindex', '-1');
                    }
                });

                // Reiniciar AOS para animar las tarjetas que quedan visibles
                if (window.AOS && typeof window.AOS.refresh === 'function') {
                    window.AOS.refresh();
                }
            });
        });
    }

    function setupScrollTop() {
        const top = document.getElementById("scrollTop");
        if (!top) return;

        let tick = false;

        function checkScroll() {
            const y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            top.classList.toggle("visible", y > 300);
        }

        window.addEventListener("scroll", () => {
            if (tick) return;
            tick = true;
            requestAnimationFrame(() => {
                checkScroll();
                tick = false;
            });
        }, { passive: true });

        top.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        // Ejecutar estado inicial
        checkScroll();
    }

    function init() {
        applyCampaignContent();
        setupFilters();
        setupCards();
        setupModalDismiss();
        setupWhatsAppButton();
        setupImageLoadingHints();
        setupObserver();
        setupEscapeClose();
        setupScrollTop();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
