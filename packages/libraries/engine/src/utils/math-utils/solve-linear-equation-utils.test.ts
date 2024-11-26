import { qrFactorization, solveWithBackSubstitution } from './solve-linear-equation-utils';

test('backSubstitution', () => {
    expect(
        solveWithBackSubstitution(
            [
                [1, -1, 2],
                [0, -1, 2],
                [0, 0, 6],
            ],
            [0, 0, 3],
        ),
    ).toStrictEqual([0, 1, 0.5]);
});

test('calculateQRFactorization #1', () => {
    expect(
        qrFactorization([
            [1, -1, 2],
            [-2, 1, -6],
            [0, 1, -2],
        ]),
    ).toStrictEqual([
        [],
        [
            [1, -1, 2],
            [0, -1, 2],
            [0, 0, 6],
        ],
    ]);
});

test('calculateQRFactorization #2', () => {
    expect(
        qrFactorization([
            [12, -51, 4],
            [6, 167, -68],
            [-4, 24, 41],
        ]),
    ).toStrictEqual([
        [
            [6 / 7, -69 / 175, -58 / 175],
            [3 / 7, 158 / 175, 6 / 175],
            [-2 / 7, 6 / 35, -33 / 35],
        ],
        [
            [14, 21, -14],
            [0, 175, 70],
            [0, 0, 35],
        ],
    ]);
});
