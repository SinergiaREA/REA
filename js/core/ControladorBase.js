/**
 * ControladorBase.js
 * 
 * Controlador [C] del esquema MVC.
 * Propósito: Proveer una clase abstracta o base para orquestar 
 * la comunicación entre los eventos del DOM (Vistas) y los cálculos (Modelos).
 */

export class ControladorBase {
    constructor() {
        this.events = {};
    }

    /**
     * Suscribe un evento del DOM a un handler dentro del controlador.
     * @param {string} selector - Selector CSS del elemento
     * @param {string} eventType - Tipo de evento ('click', 'input', 'change')
     * @param {Function} handler - Función a ejecutar
     */
    bindEvent(selector, eventType, handler) {
        const elements = document.querySelectorAll(selector);
        if (!elements || elements.length === 0) {
            console.warn(`ControladorBase: Elemento no encontrado para selector ${selector}`);
            return;
        }

        elements.forEach(element => {
            element.addEventListener(eventType, handler.bind(this));
        });
    }

    /**
     * Inicializa el controlador (debe sobreescribirse por las clases hijas)
     */
    init() {
        console.log("Controlador Base Inicializado.");
    }
}
