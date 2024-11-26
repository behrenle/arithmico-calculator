import { NumberNode, Vector } from '../../types/nodes.types';

function det2x2(matrix: number[][]): number {
    return matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1];
}

function det3x3(matrix: number[][]): number {
    return (
        matrix[0][0] * matrix[1][1] * matrix[2][2] +
        matrix[0][1] * matrix[1][2] * matrix[2][0] +
        matrix[0][2] * matrix[1][0] * matrix[2][1] -
        matrix[0][2] * matrix[1][1] * matrix[2][0] -
        matrix[0][0] * matrix[1][2] * matrix[2][1] -
        matrix[0][1] * matrix[1][0] * matrix[2][2]
    );
}

export function det(matrix: number[][]): number {
    switch (matrix.length) {
        case 3:
            return det3x3(matrix);
        case 2:
            return det2x2(matrix);
        case 1:
            return matrix[0][0];
        default:
            return matrix
                .map((_, i) => Math.pow(-1, i + 2) * matrix[i][0] * det(getSubMatrix(matrix, i, 0)))
                .reduce((a, b) => a + b);
    }
}

export function getSubMatrix(matrix: number[][], excludedRowIndex: number, excludedColumnIndex: number) {
    return matrix
        .filter((_, rowIndex) => rowIndex !== excludedRowIndex)
        .map((row) => row.filter((_, columnIndex) => columnIndex !== excludedColumnIndex));
}

export function replaceColumn(matrix: number[][], column: number[], index: number): number[][] {
    return matrix.map((row, rowIndex) =>
        row.map((item, columnIndex) => (columnIndex === index ? column[rowIndex] : item)),
    );
}

export function cramerSolver(coefficients: number[][], constants: number[], coefficientsDet: number) {
    const results: number[] = [];
    for (let i = 0; i < coefficients.length; i++) {
        const value = det(replaceColumn(coefficients, constants, i)) / coefficientsDet;
        results.push(value);
    }
    return results;
}

export function createIdentityMatrix(n: number): number[][] {
    return new Array<number[]>(n)
        .fill(new Array(n).fill(0))
        .map((line, lineIndex) => line.map((value, columnIndex) => (lineIndex === columnIndex ? 1 : 0)));
}

export function tensorToMatrix(tensor: Vector): number[][] {
    return tensor.values.map((element) => (<Vector>element).values.map((e) => (<NumberNode>e).value));
}

export function getColumn(columnIndex: number, matrix: number[][]): number[] {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
        result.push(matrix[i][columnIndex]);
    }
    return result;
}

export function addColumn(column: number[], matrix: number[][]): number[][] {
    const result = matrix.map((row) => row.slice());
    for (let i = 0; i < matrix.length; i++) {
        result[i].push(column[i]);
    }
    return result;
}

export function transpose(matrix: number[][]): number[][] {
    const result = [];
    for (let i = 0; i < matrix[0].length; i++) {
        result.push(getColumn(i, matrix));
    }
    return result;
}

export function calculateCofactorMatrix(matrix: number[][]): number[][] {
    return matrix.map((row, i) =>
        row.map((column, j) => ((i + j) % 2 === 0 ? 1 : -1) * det(getSubMatrix(matrix, i, j))),
    );
}

export function createZeroMatrix(rows: number, columns: number): number[][] {
    return new Array<number[]>(rows).fill(new Array(columns).fill(0));
}

export function scalarMultiplication(x: number[], y: number[]) {
    return x.map((_, index) => x[index] * y[index]).reduce((a, b) => a + b);
}

export function dyadicMultiplication(x: number[], y: number[]) {
    return new Array<number[]>(x.length)
        .fill(new Array(y.length).fill(0))
        .map((line, lineIndex) => line.map((value, columnIndex) => x[lineIndex] * y[columnIndex]));
}

// only matrix * vector
export function multiplyMatrixVector(matrix: number[][], vector: number[]): number[] {
    if (matrix[0].length !== vector.length) {
        throw 'Runtime Error: the dimension of the matrix and the vector do not fit  ';
    }

    return vector.map((_, i) => scalarMultiplication(matrix[i], vector));
}

export function multiplyMatrixMatrix(matrixA: number[][], matrixB: number[][]) {
    if (matrixA.length !== matrixB[0].length) {
        throw 'Runtime Error: matrices do not have the correct dimension.';
    }

    return matrixA.map((rows, i) => rows.map((_, j) => scalarMultiplication(matrixA[i], getColumn(j, matrixB))));
}

/*
expand a squared matrix A to the following type:
    | id    0 |
    | 0     A |
 */
export function expandMatrix(matrix: number[][], newSize: number): number[][] {
    const oldSize = matrix.length;
    const difference = newSize - oldSize;

    if (difference === newSize) {
        return matrix;
    }

    const upperHalf = createIdentityMatrix(difference);
    const lowerHalf: number[][] = new Array(oldSize).fill([]);
    for (let i = 0; i < difference; i++) {
        upperHalf[i] = upperHalf[i].concat(new Array<number>(oldSize).fill(0));
    }

    for (let i = 0; i < oldSize; i++) {
        lowerHalf[i] = new Array<number>(difference).fill(0).concat(matrix[i]);
    }

    return upperHalf.concat(lowerHalf);
}
