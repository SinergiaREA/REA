/**
 * SinergiaFooter.js
 * 
 * Vanilla Web Component para el Footer global.
 * Permite mantener un solo origen de la verdad (DRY) para el pie de página,
 * inyectando de forma asincrónica en cualquier archivo HTML.
 */

class SinergiaFooter extends HTMLElement {
    constructor() {
        super();
        this.whatsappNumber = "525645003181";
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="footer-accent-bar"></div>
            <footer>
                <div class="footer-inner">
                    <div class="footer-logo">
                        <span class="fl-sin">Sin</span><span class="fl-ergia">ergia</span>&nbsp;<span class="fl-rea">REA</span>
                    </div>
                    <div class="footer-tagline">
                        Tu Solución Integral · Papelería & servicios contables e informáticos · Veracruz, México 2026
                    </div>
                    <a href="https://wa.me/${this.whatsappNumber}?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios"
                        class="footer-cta" target="_blank" rel="noopener noreferrer">
                        <span>💬</span> CONTÁCTANOS POR WHATSAPP
                    </a>
                    <div class="footer-tags">
                        <span class="footer-tag">PAPELERÍA</span><span class="footer-tag">IMPRESIONES COLOR</span>
                        <span class="footer-tag">COPIAS INE</span><span class="footer-tag">SAT</span>
                        <span class="footer-tag">IMSS</span><span class="footer-tag">INFONAVIT</span>
                        <span class="footer-tag">MICROSOFT OFFICE</span><span class="footer-tag">FORMATEO PC</span>
                        <span class="footer-tag">MATERIAL EDUCATIVO</span><span class="footer-tag">PERFUMES L'BEL</span>
                        <span class="footer-tag">TAREAS ESCOLARES</span><span class="footer-tag">VERACRUZ 2026</span>
                    </div>
                    <div class="footer-divider"></div>
                    <div class="footer-legal">
                        <br />
                        🦅 · © 2026 Sinergia REA
                    </div>
                    <div class="footer-location">
                        📍 San Andrés Tuxtla, Veracruz
                    </div>
                </div>
            </footer>
        `;
    }
}

// Definir el elemento personalizado
customElements.define('sinergia-footer', SinergiaFooter);
