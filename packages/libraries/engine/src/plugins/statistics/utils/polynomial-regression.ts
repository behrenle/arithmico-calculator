import { cramerSolver, det } from '../../../utils/math-utils/matrix-utils';
import {qrDecompositionSolver} from "../../../utils/math-utils/solve-linear-equation-utils";

export function calculatePolynomialRegressionCoefficients(xs: number[], ys: number[], degree: number) {
    const arrayLength = degree + 1;
    const coefficients: number[][] = new Array(arrayLength).fill(0).map(() => new Array(arrayLength).fill(0));
    const constants: number[] = new Array(arrayLength).fill(0);

    coefficients.forEach((row, i) =>
        row.forEach((value, j) => {
            coefficients[i][j] = xs.map((x) => x ** (i + j)).reduce((a, b) => a + b);
        }),
    );

    constants.forEach((_, index) => (constants[index] = xs.map((x, i) => x ** index * ys[i]).reduce((a, b) => a + b)));

    return cramerSolver(coefficients, constants, det(coefficients));
}
