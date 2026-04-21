/**
 * CalculosFiscalesModel.js
 * 
 * Modelo [M] del esquema MVC.
 * Propósito: Centralizar todas las tasas, cuotas y algoritmos fiscales
 * de Sinergia REA en un solo lugar inmutable.
 * 
 * Fundamento Legal (Base): 
 * - LIVA (Ley del Impuesto al Valor Agregado) Art. 1, 2-A.
 * - LISR (Ley del Impuesto Sobre la Renta) tarifas aplicables.
 */

export class CalculosFiscalesModel {
    constructor() {
        // Constantes Fiscales Actuales (México 2026)
        this.TASAS_IVA = {
            GENERAL: 0.16,
            FRONTERIZA: 0.08,
            EXENTO: 0.0
        };

        this.RETENCIONES = {
            IVA_SERVICIOS_PROFESIONALES: 0.106667,   // 2/3 de IVA
            ISR_SERVICIOS_PROFESIONALES: 0.10,       // 10% ISR
            ISR_RESICO: 0.0125                       // 1.25% Máximo RESICO
        };
    }

    /**
     * Calcula el IVA de un monto base.
     * @param {number} subtotal 
     * @param {string} tipoTasa - 'GENERAL', 'FRONTERIZA', 'EXENTO'
     * @returns {number} Monto de IVA calculado
     */
    calcularIVA(subtotal, tipoTasa = 'GENERAL') {
        const tasa = this.TASAS_IVA[tipoTasa] !== undefined ? this.TASAS_IVA[tipoTasa] : this.TASAS_IVA.GENERAL;
        return subtotal * tasa;
    }

    /**
     * @param {number} subtotal 
     * @returns {Object} Desglose completo de factura
     */
    calcularDesgloseFacturaGeneral(subtotal) {
        const iva = this.calcularIVA(subtotal, 'GENERAL');
        const total = subtotal + iva;
        
        return {
            subtotal: parseFloat(subtotal.toFixed(2)),
            iva: parseFloat(iva.toFixed(2)),
            total: parseFloat(total.toFixed(2))
        };
    }
}
