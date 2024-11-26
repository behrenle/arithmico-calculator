import { FunctionHeaderItem, NumberNode, Vector } from '../../../types/nodes.types';
import createNumberNode from '../../../node-operations/create-node/create-number-node';
import { getTensorRank, isEveryElementNumber, isSquareMatrix } from '../../../utils/tensor-utils';
import createVector from '../../../node-operations/create-node/create-vector';
import {
    calculateCofactorMatrix,
    createIdentityMatrix,
    createZeroMatrix,
    det,
    tensorToMatrix,
    transpose,
} from '../../../utils/math-utils/matrix-utils';
import createDivided from '../../../node-operations/create-node/create-divided';
import { reduceFraction } from '../../../utils/math-utils/float-utils';
import createNegate from '../../../node-operations/create-node/create-negate';
import { PluginFragment } from '../../../utils/plugin-builder';

const singleVectorHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'vector', evaluate: true }];
const singleNumberHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];
const doubleNumberHeader: FunctionHeaderItem[] = [
    { name: 'n', type: 'number', evaluate: true },
    { name: 'm', type: 'number', evaluate: true },
];

const matrixFragment = new PluginFragment();

__FUNCTIONS.matrixInverse &&
    matrixFragment.addFunction(
        'matrix:inverse',
        singleVectorHeader,
        'inverse a given square matrix if possible',
        'Berechnet die inverse Matrix, falls diese existiert.',
        ({ getParameter, runtimeError }) => {
            const vector = <Vector>getParameter('n');

            if (!isEveryElementNumber(vector)) {
                throw runtimeError('only numbers in a matrix are allowed as elements');
            }
            if (!isSquareMatrix(vector)) {
                throw runtimeError('not a square matrix');
            }

            const matrix = tensorToMatrix(vector);
            const coefficientDet = det(matrix);
            if (coefficientDet === 0) {
                throw runtimeError("The matrix isn't invertible because det = 0");
            }

            const adjunct = transpose(calculateCofactorMatrix(matrix));

            return createVector(
                adjunct.map((value) =>
                    createVector(
                        value.map((element) => {
                            const [numerator, denominator] = reduceFraction(element, coefficientDet);

                            if (denominator === 1) {
                                return createNumberNode(numerator);
                            }

                            if (numerator * denominator < 0) {
                                return createNegate(
                                    createDivided(
                                        createNumberNode(Math.abs(numerator)),
                                        createNumberNode(Math.abs(denominator)),
                                    ),
                                );
                            }
                            return createDivided(createNumberNode(numerator), createNumberNode(denominator));
                        }),
                    ),
                ),
            );
        },
    );

__FUNCTIONS.matrixAdj &&
    matrixFragment.addFunction(
        'matrix:adj',
        singleVectorHeader,
        'calculates the adjugate matrix',
        'Berechnet die adjunkte Matrix.',
        ({ getParameter, runtimeError }) => {
            const tensor = <Vector>getParameter('n');

            if (!isEveryElementNumber(tensor)) {
                throw runtimeError('only numbers in a matrix are allowed as elements');
            }
            if (!isSquareMatrix(tensor)) {
                throw runtimeError('not a square matrix');
            }

            const adjunct = transpose(calculateCofactorMatrix(tensorToMatrix(tensor)));

            return createVector(
                adjunct.map((value) => createVector(value.map((element) => createNumberNode(element)))),
            );
        },
    );

__FUNCTIONS.matrixCof &&
    matrixFragment.addFunction(
        'matrix:cof',
        singleVectorHeader,
        'calculates the cofactor matrix',
        'Berechnet die Cofaktormatrix.',
        ({ getParameter, runtimeError }) => {
            const tensor = <Vector>getParameter('n');

            if (!isEveryElementNumber(tensor)) {
                throw runtimeError('only numbers in a matrix are allowed as elements');
            }
            if (!isSquareMatrix(tensor)) {
                throw runtimeError('not a square matrix');
            }

            const cofactorMatrix = calculateCofactorMatrix(tensorToMatrix(tensor));

            return createVector(
                cofactorMatrix.map((value) => createVector(value.map((element) => createNumberNode(element)))),
            );
        },
    );

__FUNCTIONS.matrixTranspose &&
    matrixFragment.addFunction(
        'matrix:transpose',
        singleVectorHeader,
        'transposes a matrix',
        'Transponiert die Matrix.',
        ({ getParameter, runtimeError }) => {
            const tensor = <Vector>getParameter('n');

            if (getTensorRank(tensor) !== 2) {
                throw runtimeError('n has to be a matrix');
            }

            const transposed = transpose(tensorToMatrix(tensor));

            return createVector(
                transposed.map((value) => createVector(value.map((element) => createNumberNode(element)))),
            );
        },
    );

__FUNCTIONS.matrixDet &&
    matrixFragment.addFunction(
        'matrix:det',
        singleVectorHeader,
        'calculates the determinant of a matrix',
        'Berechnet die Determinante einer Matrix',
        ({ getParameter, runtimeError }) => {
            const vector = <Vector>getParameter('n');

            if (!isEveryElementNumber(vector)) {
                throw runtimeError('only numbers are allowed as elements');
            }
            if (!isSquareMatrix(vector)) {
                throw runtimeError('not a square matrix');
            }

            const matrix = tensorToMatrix(vector);

            return createNumberNode(det(matrix));
        },
    );

__FUNCTIONS.matrixId &&
    matrixFragment.addFunction(
        'matrix:id',
        singleNumberHeader,
        'creates an n x n identity matrix',
        'Erzeugt eine n x n Einheitsmatrix',
        ({ getParameter, runtimeError }) => {
            const n = (<NumberNode>getParameter('n')).value;

            if (n % 1 !== 0) {
                throw runtimeError('only integers are allowed');
            }
            if (n < 0) {
                throw runtimeError('negative numbers are not allowed');
            }
            if (n === 0) {
                throw runtimeError('zero is not allowed');
            }

            const id = createIdentityMatrix(n);

            return createVector(id.map((value) => createVector(value.map((element) => createNumberNode(element)))));
        },
    );

__FUNCTIONS.matrixZero &&
    matrixFragment.addFunction(
        'matrix:zero',
        doubleNumberHeader,
        'creates an n x m matrix',
        'Erzeugt eine n x m Matrix mit Nullen',
        ({ getParameter, runtimeError }) => {
            const n = (<NumberNode>getParameter('n')).value;
            const m = (<NumberNode>getParameter('m')).value;

            if (n % 1 !== 0) {
                throw runtimeError('n has to be an integers.');
            }
            if (n < 0) {
                throw runtimeError('n must not be negative.');
            }
            if (n === 0) {
                throw runtimeError('n must not be zero.');
            }
            if (m % 1 !== 0) {
                throw runtimeError('m has to be an integers.');
            }
            if (m < 0) {
                throw runtimeError('m must not be negative.');
            }
            if (m === 0) {
                throw runtimeError('m must not be zero.');
            }

            const zeroMatrix = createZeroMatrix(n, m);

            return createVector(
                zeroMatrix.map((value) => createVector(value.map((element) => createNumberNode(element)))),
            );
        },
    );

export default matrixFragment;
