import { differenceInDays } from 'date-fns';

/**
 * Calcula la diferencia en días entre dos fechas.
 * @param startDate Fecha inicial
 * @param endDate Fecha final
 * @returns Diferencia en días (número entero)
 */
export function calcularDiferenciaDias(
    startDate: Date,
    endDate: Date
): number {
    return differenceInDays(endDate, startDate);
}