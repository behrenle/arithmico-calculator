import {
    createIdentityMatrix,
    createZeroMatrix,
    expandMatrix,
    getColumn,
    getSubMatrix,
    multiplyMatrixMatrix,
    multiplyMatrixVector,
    scalarMultiplication,
    transpose,
} from './matrix-utils';

// Algorithm 5: QR Decomposition
function calculateQRFactorizationWithGramSchmidt(matrixA: number[][]): [number[][], number[][]] {
    /*
reference: Chunawala, Quasar (2023). Fast Algorithms for Solving a System of Linear Equations. https://www.baeldung.com/cs/solving-system-linear-equations. Last updated: 06-13-2023.
following code is inspired by algorithms
 */
    const n = matrixA.length;
    const matrixU = createZeroMatrix(n, n);
    const matrixR = createZeroMatrix(n, n);

    for (let j = 0; j < n - 1; j++) {
        const w_j = getColumn(j, matrixA);

        // Squared norm of w_j
        let sumNormOfW = 0;
        for (let k = 0; k < n; k++) {
            sumNormOfW += w_j[k] * w_j[k];
        }

        // Compute the coefficients of R[i][j]
        let sumCoefficientsOfR = 0;
        for (let i = 0; i < j; i++) {
            const value = scalarMultiplication(w_j, matrixU[i]);
            matrixR[i][j] = value;
            sumCoefficientsOfR += value * value;
        }
        matrixR[j][j] = Math.sqrt(sumNormOfW - sumCoefficientsOfR);

        // Compute vector u[j] using fwd substitution
        let sumvec = new Array(n).fill(0);
        for (let i = 0; i < j; i++) {
            const valueOfR = matrixR[i][j];
            sumvec = sumvec.map((_, index) => sumvec[index] + valueOfR * matrixU[i][index]);
        }
        matrixU[j] = w_j.map((_, index) => (w_j[index] - sumvec[index]) / matrixR[j][j]);
    }

    const matrixQ = transpose(matrixU);
    return [matrixQ, matrixR];
}

function computeHouseholderMatrix(v: number[]) {
    const n = v.length;
    const matrix = createIdentityMatrix(n);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix[i][j] = -2 * v[i] * v[j];
        }
    }

    return matrix;
}

function calculateQRFactorizationWithHouseholder(matrixA: number[][]): [number[][], number[][]] {
    const m = matrixA.length;
    const n = matrixA[0].length;
    const householderMatrices = [];
    let z = matrixA;
    for (let k = 0; k < n && k < m - 1; k++) {
        const z1 = getSubMatrix(z, 0, 0);
        const x_k = getColumn(0, z1);

        const u_k = x_k;
        u_k[0] = x_k[0] + Math.sign(x_k[0]) * Math.hypot(...x_k);
        const normOfu_k = Math.hypot(...u_k);
        const normedVector = u_k.map((x) => x / normOfu_k);
        householderMatrices.push(expandMatrix(computeHouseholderMatrix(normedVector), n));
        z = multiplyMatrixMatrix(householderMatrices[k], z);
    }

    const matrixR = z;
    const matrixQ = householderMatrices.reduce(
        (accumulator, currentValue) => multiplyMatrixMatrix(accumulator, currentValue),
        createIdentityMatrix(m),
    );

    return [matrixQ, matrixR];
}

export function solveWithBackSubstitution(upperTriangleMatrix: number[][], coefficients: number[]) {
    const n = coefficients.length;
    const result: number[] = new Array(n).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        let sum = 0;
        for (let j = i; j < n; j++) {
            sum += result[j] * upperTriangleMatrix[i][j];
        }
        result[i] = (coefficients[i] - sum) / upperTriangleMatrix[i][i];
    }
    return result;
}

export function qrFactorization(matrixA: number[][]) {
    return calculateQRFactorizationWithHouseholder(matrixA)
}
export function qrDecompositionSolver(coefficients: number[][], constants: number[]): number[] {
    const [orthonormalMatrix, upperTriangleMatrix] = qrFactorization(coefficients);
    const modifiedConstants = multiplyMatrixVector(transpose(orthonormalMatrix), constants);

    return solveWithBackSubstitution(upperTriangleMatrix, modifiedConstants);
}
