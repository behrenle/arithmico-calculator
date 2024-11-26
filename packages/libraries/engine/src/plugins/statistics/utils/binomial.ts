import { binco } from '../../../utils/math-utils/binco';
import { calculateIncompleteBetaFunctionComplementary } from './incomplete-beta-function';

export function calculateBinom(n: number, p: number, k: number) {
    return binco(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

export function calculateCBinom(n: number, p: number, k: number) {
    return calculateIncompleteBetaFunctionComplementary(p, k + 1, n - k);
}

export function calculateQuantileOfBinomialCDF(p_q: number, n: number, p_success: number) {
    for (let k = 0; k < n + 1; k++) {
        if (calculateCBinom(n, p_success, k) >= p_q) {
            return k;
        }
    }
    return n + 1;
}
