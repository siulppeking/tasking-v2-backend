const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
require('dayjs/locale/es');

dayjs.extend(relativeTime);
dayjs.locale('es');

const fechaHelper = {
    /**
     * Formatea una fecha según el tipo especificado.
     * @param {Date | string} fecha - Fecha a formatear.
     * @param {string} tipo - 'relativo', 'iso', 'fecha', 'hora', 'custom'.
     * @param {string} formatoPersonalizado - Usado solo si tipo === 'custom'.
     * @returns {string}
     */
    formatear: (fecha, tipo = 'relativo', formatoPersonalizado = '') => {
        const fechaDayjs = dayjs(fecha);

        switch (tipo) {
            case 'relativo':
                return fechaDayjs.fromNow(); // Ej: "hace 2 minutos"
            case 'iso':
                return fechaDayjs.toISOString(); // Ej: "2025-05-13T18:30:00.000Z"
            case 'fecha':
                return fechaDayjs.format('DD/MM/YYYY'); // Ej: "13/05/2025"
            case 'hora':
                return fechaDayjs.format('HH:mm:ss'); // Ej: "14:45:00"
            case 'custom':
                return fechaDayjs.format(formatoPersonalizado); // Ej: "dddd D [de] MMMM"
            default:
                return fechaDayjs.toString(); // Valor por defecto
        }
    }
};

module.exports = fechaHelper;
