/*
    Reference:
    ALGORITHM 708, COLLECTED ALGORITHMS FROM ACM.
    THIS WORK PUBLISHED IN TRANSACTIONS ON MATHEMATICAL SOFTWARE,
    VOL. 18, NO. 3, SEPTEMBER, 1992, PP. 360-373z.

    The following algorithm is based heavily on the above work.
    Naming is adopted.
 */

/*
        EVALUATION OF LN(GAMMA(A)) FOR POSITIVE A

        WRITTEN BY ALFRED H. MORRIS
        NAVAL SURFACE WARFARE CENTER
        DAHLGREN, VIRGINIA
 */
function GAMLN(A: number) {
    const D = 0.5 * (Math.log(2 * Math.PI) - 1); // 0.418938533204673

    const C0 = 0.833333333333333e-1,
        C1 = -0.277777777760991e-2,
        C2 = 0.79365066682539e-3,
        C3 = -0.59520293135187e-3,
        C4 = 0.837308034031215e-3,
        C5 = -0.165322962780713e-2;

    if (A <= 0.8) {
        return GAMLN1(A) - Math.log(A);
    }

    if (A <= 2.25) {
        const T = A - 0.5 - 0.5;
        return GAMLN1(T);
    }

    if (A < 10.0) {
        const N = A - 1.25;
        let T = A;
        let W = 1.0;
        for (let I = 1; I <= N; ++I) {
            T = T - 1.0;
            W = T * W;
        }

        return GAMLN1(T - 1.0) + Math.log(W);
    }

    const T = (1.0 / A) ** 2;
    const W = (((((C5 * T + C4) * T + C3) * T + C2) * T + C1) * T + C0) / A;
    return D + W + (A - 0.5) * (Math.log(A) - 1.0);
}

/*
        COMPUTATION OF LN(GAMMA(B)/GAMMA(A+B)) WHEN B .GE. 8

        IN THIS ALGORITHM, DEL(X) IS THE FUNCTION DEFINED BY
        LN(GAMMA(X)) = (X - 0.5)*LN(X) - X + 0.5*LN(2*PI) + DEL(X).
 */
function ALGDIV(A: number, B: number) {
    const C0 = 0.833333333333333e-1,
        C1 = -0.277777777760991e-2,
        C2 = 0.79365066682539e-3,
        C3 = -0.59520293135187e-3,
        C4 = 0.837308034031215e-3,
        C5 = -0.165322962780713e-2;

    let H, C, X, D;
    if (A <= B) {
        H = A / B;
        C = H / (1.0 + H);
        X = 1.0 / (1.0 + H);
        D = B + (A - 0.5);
    } else {
        H = B / A;
        C = 1.0 / (1.0 + H);
        X = H / (1.0 + H);
        D = A + (B - 0.5);
    }

    // SET SN = (1 - X**N)/(1 - X)
    const X2 = X * X;
    const S3 = 1.0 + (X + X2);
    const S5 = 1.0 + (X + X2 * S3);
    const S7 = 1.0 + (X + X2 * S5);
    const S9 = 1.0 + (X + X2 * S7);
    const S11 = 1.0 + (X + X2 * S9);

    // SET W = DEL(B) - DEL(A + B)
    const T = (1.0 / B) ** 2;
    let W = ((((C5 * S11 * T + C4 * S9) * T + C3 * S7) * T + C2 * S5) * T + C1 * S3) * T + C0;
    W = W * (C / B);

    // COMBINE THE RESULTS
    const U = D * ALNREL(A / B);
    const V = A * (Math.log(B) - 1.0);

    return U <= V ? W - U - V : W - V - U;
}

/*
        EVALUATION OF  DEL(A0) + DEL(B0) - DEL(A0 + B0)  WHERE
        LN(GAMMA(A)) = (A - 0.5)*LN(A) - A + 0.5*LN(2*PI) + DEL(A).
        IT IS ASSUMED THAT A0 .GE. 8 AND B0 .GE. 8.
 */
function BCORR(A0: number, B0: number) {
    const C0 = 0.833333333333333e-1,
        C1 = -0.277777777760991e-2,
        C2 = 0.79365066682539e-3,
        C3 = -0.59520293135187e-3,
        C4 = 0.837308034031215e-3,
        C5 = -0.165322962780713e-2;

    const A = Math.min(A0, B0);
    const B = Math.max(A0, B0);

    const H = A / B;
    const C = H / (1.0 + H);
    const X = 1.0 / (1.0 + H);
    const X2 = X * X;

    // SET SN = (1 - X**N)/(1 - X)
    const S3 = 1.0 + (X + X2);
    const S5 = 1.0 + (X + X2 * S3);
    const S7 = 1.0 + (X + X2 * S5);
    const S9 = 1.0 + (X + X2 * S7);
    const S11 = 1.0 + (X + X2 * S9);

    // SET W = DEL(B) - DEL(A + B)
    let T = (1.0 / B) ** 2;
    let W = ((((C5 * S11 * T + C4 * S9) * T + C3 * S7) * T + C2 * S5) * T + C1 * S3) * T + C0;
    W = W * (C / B);

    // COMPUTE DEL(A) + W
    T = (1.0 / A) ** 2;
    return (((((C5 * T + C4) * T + C3) * T + C2) * T + C1) * T + C0) / A + W;
}

/*
        EVALUATION OF THE FUNCTION LN(GAMMA(A + B))
        FOR 1 .LE. A .LE. 2  AND  1 .LE. B .LE. 2
 */
function GSUMLN(A: number, B: number) {
    const X = A + B - 2.0;
    if (X <= 0.25) {
        return GAMLN1(1.0 + X);
    }
    if (X <= 1.25) {
        return GAMLN1(X) + ALNREL(X);
    }
    return GAMLN1(X - 1.0) + Math.log(X * (1.0 + X));
}

/*
        EVALUATION OF THE LOGARITHM OF THE BETA FUNCTION
 */
function BETALN(A0: number, B0: number) {
    const E = 0.5 * Math.log(2 * Math.PI); // 0.918938533204673

    let A = Math.min(A0, B0);
    let B = Math.max(A0, B0);

    if (A >= 8.0) {
        // PROCEDURE WHEN A .GE. 8
        const W = BCORR(A, B);
        const H = A / B;
        const C = H / (1.0 + H);
        const U = -(A - 0.5) * Math.log(C);
        const V = B * ALNREL(H);

        if (U <= V) {
            return -0.5 * Math.log(B) + E + W - U - V;
        } else {
            return -0.5 * Math.log(B) + E + W - V - U;
        }
    }

    if (A < 1.0) {
        // PROCEDURE WHEN A .LT. 1
        if (B >= 8) {
            return GAMLN(A) + ALGDIV(A, B);
        } else {
            return GAMLN(A) + (GAMLN(B) - GAMLN(A + B));
        }
    }

    // PROCEDURE WHEN 1 .LE. A .LT. 8
    let W;
    if (A > 2.0) {
        if (B > 1000.0) {
            // REDUCTION OF A WHEN B .GT. 1000
            const N = A - 1.0;
            W = 1.0;
            for (let I = 1; I <= N; ++I) {
                A = A - 1.0;
                W = W * (A / (1.0 + A / B));
            }

            return Math.log(W) - N * Math.log(B) + (GAMLN(A) + ALGDIV(A, B));
        }

        // REDUCTION OF A WHEN B .LE. 1000
        const N = A - 1.0;
        W = 1.0;
        for (let I = 1; I <= N; ++I) {
            A = A - 1.0;
            const H = A / B;
            W = W * (H / (1.0 + H));
        }

        W = Math.log(W);
        if (B >= 8.0) {
            return W + GAMLN(A) + ALGDIV(A, B);
        }
    } else {
        if (B <= 2.0) {
            return GAMLN(A) + GAMLN(B) - GSUMLN(A, B);
        }
        W = 0.0;
        if (B >= 8.0) {
            return GAMLN(A) + ALGDIV(A, B);
        }
    }

    // REDUCTION OF B WHEN B .LT. 8
    const N = B - 1.0;
    let Z = 1.0;
    for (let I = 1; I <= N; ++I) {
        B = B - 1.0;
        Z = Z * (B / (A + B));
    }

    return W + Math.log(Z) + (GAMLN(A) + (GAMLN(B) - GSUMLN(A, B)));
}

/*
        EVALUATION OF THE DIGAMMA FUNCTION

        PSI(XX) IS ASSIGNED THE VALUE 0 WHEN THE DIGAMMA FUNCTION CANNOT
        BE COMPUTED.

        THE MAIN COMPUTATION INVOLVES EVALUATION OF RATIONAL CHEBYSHEV
        APPROXIMATIONS PUBLISHED IN MATH. COMP. 27, 123-127(1973) BY
        CODY, STRECOK AND THACHER.

        PSI WAS WRITTEN AT ARGONNE NATIONAL LABORATORY FOR THE FUNPACK
        PACKAGE OF SPECIAL FUNCTION SUBROUTINES. PSI WAS MODIFIED BY
        A.H. MORRIS (NSWC).
 */
function PSI(XX: number) {
    const PIOV4 = Math.PI / 4; // 0.785398163397448E0
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    const DX0 = 1.461632144968362341262659542325721325; // ZERO OF PSI TO EXTENDED PRECISION

    /*
        COEFFICIENTS FOR RATIONAL APPROXIMATION OF
        PSI(X) / (X - X0),  0.5 .LE. X .LE. 3.0
 */
    const P1 = [
        0.89538502298197e-2, 0.477762828042627e1, 0.142441585084029e3, 0.118645200713425e4, 0.363351846806499e4,
        0.413810161269013e4, 0.130560269827897e4,
    ];
    const Q1 = [
        0.448452573429826e2, 0.520752771467162e3, 0.22100079924783e4, 0.364127349079381e4, 0.1908310765963e4,
        0.691091682714533e-5,
    ];

    /*
        COEFFICIENTS FOR RATIONAL APPROXIMATION OF
        PSI(X) - LN(X) + 1 / (2*X),  X .GT. 3.0
*/
    const P2 = [-0.212940445131011e1, -0.701677227766759e1, -0.448616543918019e1, -0.648157123766197];
    const Q2 = [0.322703493791143e2, 0.892920700481861e2, 0.546117738103215e2, 0.777788548522962e1];

    /*
            MACHINE DEPENDENT CONSTANTS ...

            XMAX1  = THE SMALLEST POSITIVE FLOATING POINT CONSTANT
                    WITH ENTIRELY INTEGER REPRESENTATION.  ALSO USED
                    AS NEGATIVE OF LOWER BOUND ON ACCEPTABLE NEGATIVE
                    ARGUMENTS AND AS THE POSITIVE ARGUMENT BEYOND WHICH
                    PSI MAY BE REPRESENTED AS ALOG(X).

            XSMALL = ABSOLUTE ARGUMENT BELOW WHICH PI*COTAN(PI*X)
                    MAY BE REPRESENTED BY 1/X.
     */

    const XMAX1 = Number.MAX_SAFE_INTEGER; //Originally: AMIN1(IPMPAR(3), 1.0/SPMPAR(1))
    const XSMALL = 1e-9;

    let X = XX;
    let AUG = 0.0;
    if (X < 0.5) {
        // X .LT. 0.5,  USE REFLECTION FORMULA  PSI(1-X) = PSI(X) + PI * COTAN(PI*X)
        if (Math.abs(X) <= XSMALL) {
            if (X === 0.0) {
                // ERROR RETURN
                return 0.0;
            }

            // 0 .LT. ABS(X) .LE. XSMALL.  USE 1/X AS A SUBSTITUTE  FOR  PI*COTAN(PI*X)
            AUG = -1.0 / X;
        } else {
            // REDUCTION OF ARGUMENT FOR COTAN
            let W = -X;
            let SGN = PIOV4;
            if (W <= 0.0) {
                W = -W;
                SGN = -SGN;
            }

            //  MAKE AN ERROR EXIT IF X .LE. -XMAX1
            if (W >= XMAX1) {
                // ERROR RETURN
                return 0.0;
            }

            let NQ = Math.trunc(W); // int
            W = W - NQ; // double
            NQ = Math.trunc(W * 4.0); // int
            W = 4.0 * (W - NQ * 0.25); // double
            /*
        W IS NOW RELATED TO THE FRACTIONAL PART OF  4.0 * X.
        ADJUST ARGUMENT TO CORRESPOND TO VALUES IN FIRST
        QUADRANT AND DETERMINE SIGN
 */

            let N = NQ / 2;
            if (N + N !== NQ) {
                W = 1.0 - W;
            }
            const Z = PIOV4 * W;
            let M = N / 2;
            if (M + M !== N) {
                SGN = -SGN;
            }

            // DETERMINE FINAL VALUE FOR  -PI*COTAN(PI*X)
            N = (NQ + 1) / 2;
            M = N / 2;
            M = M + M;

            if (M === N) {
                // CHECK FOR SINGULARITY
                if (Z === 0.0) {
                    // ERROR RETURN
                    return 0.0;
                }

                // USE COS/SIN AS A SUBSTITUTE FOR COTAN, AND  SIN/COS AS A SUBSTITUTE FOR TAN
                AUG = SGN * ((Math.cos(Z) / Math.sin(Z)) * 4.0);
            } else {
                AUG = SGN * ((Math.sin(Z) / Math.cos(Z)) * 4.0);
            }
        }
        X = 1.0 - X;
    }

    if (X <= 3.0) {
        // 0.5 .LE. X .LE. 3.0
        let DEN = X;
        let UPPER = P1[0] * X;
        for (let I = 1; I <= 5; ++I) {
            DEN = (DEN + Q1[I - 1]) * X;
            UPPER = (UPPER + P1[I + 1 - 1]) * X;
        }

        DEN = (UPPER + P1[6]) / (DEN + Q1[5]);
        const XMX0 = X - DX0;
        return DEN * XMX0 + AUG;
    }

    // IF X .GE. XMAX1, PSI = LN(X)
    if (X < XMAX1) {
        // 3.0 .LT. X .LT. XMAX1
        const W = 1.0 / (X * X);
        let DEN = W;
        let UPPER = P2[0] * W;

        for (let I = 1; I <= 3; ++I) {
            DEN = (DEN + Q2[I - 1]) * W;
            UPPER = (UPPER + P2[I + 1 - 1]) * W;
        }

        AUG = UPPER / (DEN + Q2[3]) - 0.5 / X + AUG;
    }

    return AUG + Math.log(X);
}

/*
        EVALUATION OF LN(GAMMA(1 + A)) FOR -0.2 .LE. A .LE. 1.25
 */
function GAMLN1(A: number) {
    const P0 = 0.577215664901533,
        P1 = 0.844203922187225,
        P2 = -0.168860593646662,
        P3 = -0.780427615533591,
        P4 = -0.402055799310489,
        P5 = -0.673562214325671e-1,
        P6 = -0.271935708322958e-2;
    const Q1 = 0.288743195473681e1,
        Q2 = 0.312755088914843e1,
        Q3 = 0.156875193295039e1,
        Q4 = 0.361951990101499,
        Q5 = 0.325038868253937e-1,
        Q6 = 0.667465618796164e-3;

    const R0 = 0.422784335098467,
        R1 = 0.848044614534529,
        R2 = 0.565221050691933,
        R3 = 0.156513060486551,
        R4 = 0.17050248402265e-1,
        R5 = 0.497958207639485e-3;
    const S1 = 0.124313399877507e1,
        S2 = 0.548042109832463,
        S3 = 0.10155218743983,
        S4 = 0.713309612391e-2,
        S5 = 0.116165475989616e-3;

    if (A < 0.6) {
        const W =
            ((((((P6 * A + P5) * A + P4) * A + P3) * A + P2) * A + P1) * A + P0) /
            ((((((Q6 * A + Q5) * A + Q4) * A + Q3) * A + Q2) * A + Q1) * A + 1.0);
        return -A * W;
    }

    const X = A - 0.5 - 0.5;
    const W =
        (((((R5 * X + R4) * X + R3) * X + R2) * X + R1) * X + R0) /
        (((((S5 * X + S4) * X + S3) * X + S2) * X + S1) * X + 1.0);
    return X * W;
}

/*
        COMPUTATION OF 1/GAMMA(A+1) - 1  FOR -0.5 .LE. A .LE. 1.5
 */
function GAM1(A: number) {
    const P = [
        0.577215664901533, -0.409078193005776, -0.230975380857675, 0.597275330452234e-1, 0.76696818164949e-2,
        -0.514889771323592e-2, 0.589597428611429e-3,
    ];

    const Q = [0.1e1, 0.427569613095214, 0.158451672430138, 0.261132021441447e-1, 0.423244297896961e-2];

    const R = [
        -0.422784335098468, -0.771330383816272, -0.244757765222226, 0.118378989872749, 0.930357293360349e-3,
        -0.118290993445146e-1, 0.223047661158249e-2, 0.266505979058923e-3, -0.132674909766242e-3,
    ];

    const S1 = 0.273076135303957;
    const S2 = 0.559398236957378e-1;

    let T = A;
    const D = A - 0.5;
    if (D > 0.0) {
        T = D - 0.5;
    }

    if (T === 0) {
        return 0.0;
    }

    if (T > 0) {
        const TOP = (((((P[6] * T + P[5]) * T + P[4]) * T + P[3]) * T + P[2]) * T + P[1]) * T + P[0];
        const BOT = (((Q[4] * T + Q[3]) * T + Q[2]) * T + Q[1]) * T + 1.0;
        const W = TOP / BOT;

        if (D > 0.0) {
            return (T / A) * (W - 0.5 - 0.5);
        }
        return A * W;
    }

    // T < 0
    const TOP =
        (((((((R[8] * T + R[7]) * T + R[6]) * T + R[5]) * T + R[4]) * T + R[3]) * T + R[2]) * T + R[1]) * T + R[0];
    const BOT = (S2 * T + S1) * T + 1.0;
    const W = TOP / BOT;

    if (D > 0.0) {
        return (T * W) / A;
    }
    return A * (W + 0.5 + 0.5);
}

/*
        EVALUATION OF THE COMPLEMENTARY ERROR FUNCTION

        ERFC1(IND,X) = ERFC(X)            IF IND = 0
        ERFC1(IND,X) = EXP(X*X)*ERFC(X)   OTHERWISE
 */
function ERFC1(IND: number, X: number) {
    const C = 0.564189583547756;

    const A = [
        0.77105849500132e-4, -0.133733772997339e-2, 0.323076579225834e-1, 0.479137145607681e-1, 0.128379167095513,
    ];
    const B = [0.301048631703895e-2, 0.538971687740286e-1, 0.375795757275549];

    const P = [
        -1.36864857382717e-7, 5.64195517478974e-1, 7.21175825088309, 4.31622272220567e1, 1.5298928504694e2,
        3.39320816734344e2, 4.51918953711873e2, 3.00459261020162e2,
    ];
    const Q = [
        1.0, 1.27827273196294e1, 7.70001529352295e1, 2.77585444743988e2, 6.38980264465631e2, 9.3135409485061e2,
        7.90950925327898e2, 3.00459260956983e2,
    ];

    const R = [2.10144126479064, 2.62370141675169e1, 2.13688200555087e1, 4.6580782871847, 2.82094791773523e-1];
    const S = [9.4153775055546e1, 1.8711481179959e2, 9.90191814623914e1, 1.80124575948747e1];

    //      ABS(X) .LE. 0.5
    const AX = Math.abs(X);
    if (AX <= 0.5) {
        const T = X * X;
        const TOP = (((A[0] * T + A[1]) * T + A[2]) * T + A[3]) * T + A[4] + 1.0;
        const BOT = ((B[0] * T + B[1]) * T + B[2]) * T + 1.0;
        const ERFC1 = 0.5 + (0.5 - X * (TOP / BOT));
        return IND !== 0 ? Math.exp(T) * ERFC1 : ERFC1;
    }

    //      0.5 .LT. ABS(X) .LE. 4
    let ERFC1;
    if (AX <= 4.0) {
        const TOP =
            ((((((P[0] * AX + P[1]) * AX + P[2]) * AX + P[3]) * AX + P[4]) * AX + P[5]) * AX + P[6]) * AX + P[7];
        const BOT =
            ((((((Q[0] * AX + Q[1]) * AX + Q[2]) * AX + Q[3]) * AX + Q[4]) * AX + Q[5]) * AX + Q[6]) * AX + Q[7];
        ERFC1 = TOP / BOT;
    } else {
        // ABS(X) .GT. 4
        if (X <= -5.6) {
            // LIMIT VALUE FOR LARGE NEGATIVE X
            return IND !== 0 ? 2.0 * Math.exp(X * X) : 2.0;
        }
        if (IND === 0 && (X > 100.0 || X * X > -EXPARG(1))) {
            // LIMIT VALUE FOR LARGE POSITIVE X  WHEN IND = 0
            return 0.0;
        }

        const T = (1.0 / X) ** 2;
        const TOP = (((R[0] * T + R[1]) * T + R[2]) * T + R[3]) * T + R[4];
        const BOT = (((S[0] * T + S[1]) * T + S[2]) * T + S[3]) * T + 1.0;
        ERFC1 = (C - (T * TOP) / BOT) / AX;
    }

    //      FINAL ASSEMBLY
    if (IND !== 0) {
        if (X < 0.0) {
            ERFC1 = 2.0 * Math.exp(X * X) - ERFC1;
        }
        return ERFC1;
    }
    const W = X * X;
    const T = W;
    const E = W - T;
    ERFC1 = (0.5 + (0.5 - E)) * Math.exp(-T) * ERFC1;
    if (X < 0.0) {
        ERFC1 = 2.0 - ERFC1;
    }
    return ERFC1;
}

/*
        EVALUATION OF THE REAL ERROR FUNCTION
 */
function ERF(X: number) {
    const C = 0.564189583547756;

    const A = [
        0.77105849500132e-4, -0.133733772997339e-2, 0.323076579225834e-1, 0.479137145607681e-1, 0.128379167095513,
    ];
    const B = [0.301048631703895e-2, 0.538971687740286e-1, 0.375795757275549];

    const P = [
        -1.36864857382717e-7, 5.64195517478974e-1, 7.21175825088309, 4.31622272220567e1, 1.5298928504694e2,
        3.39320816734344e2, 4.51918953711873e2, 3.00459261020162e2,
    ];
    const Q = [
        1.0, 1.27827273196294e1, 7.70001529352295e1, 2.77585444743988e2, 6.38980264465631e2, 9.3135409485061e2,
        7.90950925327898e2, 3.00459260956983e2,
    ];

    const R = [2.10144126479064, 2.62370141675169e1, 2.13688200555087e1, 4.6580782871847, 2.82094791773523e-1];
    const S = [9.4153775055546e1, 1.8711481179959e2, 9.90191814623914e1, 1.80124575948747e1];

    const AX = Math.abs(X);
    if (AX <= 0.5) {
        const T = X * X;
        const TOP = (((A[0] * T + A[1]) * T + A[2]) * T + A[3]) * T + A[4] + 1.0;
        const BOT = ((B[0] * T + B[1]) * T + B[2]) * T + 1.0;
        return X * (TOP / BOT);
    }

    if (AX <= 4.0) {
        const TOP =
            ((((((P[0] * AX + P[1]) * AX + P[2]) * AX + P[3]) * AX + P[4]) * AX + P[5]) * AX + P[6]) * AX + P[7];
        const BOT =
            ((((((Q[0] * AX + Q[1]) * AX + Q[2]) * AX + Q[3]) * AX + Q[4]) * AX + Q[5]) * AX + Q[6]) * AX + Q[7];
        let ERF = 0.5 + (0.5 - (Math.exp(-X * X) * TOP) / BOT);
        if (X < 0.0) {
            ERF = -ERF;
        }
        return ERF;
    }

    if (AX >= 5.8) {
        return X >= 0 ? 1.0 : -1.0;
    }

    const X2 = X * X;
    const T = 1.0 / X2;
    const TOP = (((R[0] * T + R[1]) * T + R[2]) * T + R[3]) * T + R[4];
    const BOT = (((S[0] * T + S[1]) * T + S[2]) * T + S[3]) * T + 1.0;
    let ERF = (C - TOP / (X2 * BOT)) / AX;
    ERF = 0.5 + (0.5 - Math.exp(-X2) * ERF);
    return X < 0.0 ? -ERF : ERF;
}

/*
        EVALUATION OF THE FUNCTION X - LN(1 + X)
 */
function RLOG1(X: number) {
    const A = 0.566749439387324e-1;
    const B = 0.456512608815524e-1;
    const P0 = 0.333333333333333,
        P1 = -0.224696413112536,
        P2 = 0.620886815375787e-2;
    const Q1 = -0.127408923933623e1,
        Q2 = 0.354508718369557;

    if (X < -0.39 || X > 0.57) {
        const W = X + 0.5 + 0.5;
        return X - Math.log(W);
    }

    //      ARGUMENT REDUCTION
    let H, W1;
    if (X < -0.18) {
        H = X + 0.3;
        H = H / 0.7;
        W1 = A - H * 0.3;
    } else if (X > 0.18) {
        H = 0.75 * X - 0.25;
        W1 = B + H / 3.0;
    } else {
        H = X;
        W1 = 0.0;
    }

    //      SERIES EXPANSION
    const R = H / (H + 2.0);
    const T = R * R;
    const W = ((P2 * T + P1) * T + P0) / ((Q2 * T + Q1) * T + 1.0);
    return 2.0 * T * (1.0 / (1.0 - R) - R * W) + W1;
}

/*
        EVALUATION OF THE FUNCTION LN(1 + A)
 */
function ALNREL(A: number) {
    const P1 = -0.129418923021993e1,
        P2 = 0.405303492862024,
        P3 = -0.178874546012214e-1;
    const Q1 = -0.162752256355323e1,
        Q2 = 0.747811014037616,
        Q3 = -0.845104217945565e-1;

    if (Math.abs(A) <= 0.375) {
        const T = A / (A + 2.0);
        const T2 = T * T;
        const W = (((P3 * T2 + P2) * T2 + P1) * T2 + 1.0) / (((Q3 * T2 + Q2) * T2 + Q1) * T2 + 1.0);
        return 2.0 * T * W;
    }

    const X = 1.0 + A;
    return Math.log(X);
}

/*
        EVALUATION OF THE FUNCTION EXP(X) - 1
 */
function REXP(X: number) {
    const P1 = 0.914041914819518e-9,
        P2 = 0.238082361044469e-1;
    const Q1 = -0.499999999085958,
        Q2 = 0.107141568980644,
        Q3 = -0.119041179760821e-1,
        Q4 = 0.595130811860248e-3;

    if (Math.abs(X) <= 0.15) {
        return X * (((P2 * X + P1) * X + 1.0) / ((((Q4 * X + Q3) * X + Q2) * X + Q1) * X + 1.0));
    }

    const W = Math.exp(X);
    if (X <= 0.0) {
        return W - 0.5 - 0.5;
    }

    return W * (0.5 + (0.5 - 1.0 / W));
}

/*
        EVALUATION OF EXP(MU + X)
 */
function ESUM(MU: number, X: number) {
    if (X > 0.0) {
        const W = MU + X;
        if (MU <= 0 && W >= 0.0) {
            return Math.exp(W);
        }
        return Math.exp(MU) * Math.exp(X);
    }

    if (MU >= 0) {
        const W = MU + X;
        if (W <= 0.0) {
            return Math.exp(W);
        }
    }

    return Math.exp(MU) * Math.exp(X);
}

/*
        IF L = 0 THEN  EXPARG(L) = THE LARGEST POSITIVE W FOR WHICH
        EXP(W) CAN BE COMPUTED.

        IF L IS NONZERO THEN  EXPARG(L) = THE LARGEST NEGATIVE W FOR
        WHICH THE COMPUTED VALUE OF EXP(W) IS NONZERO.

        NOTE... ONLY AN APPROXIMATE VALUE FOR EXPARG(L) IS NEEDED.
 */
function EXPARG(L: number) {
    //B = IPMPAR(4) = returns the base, nowadays base = 2
    const LNB = Math.LN2; //0.69314718055995

    let M;
    if (L === 0) {
        M = 1023; //IPMPAR(7) = the largest exponent (here double)
        return 0.99999 * (M * LNB);
    } else {
        M = -1023; //IPMPAR(6) - 1 = the smallest exponent - 1 (here double)
        return 0.99999 * (M * LNB);
    }
}

/*
        ASYMPTOTIC EXPANSION FOR IX(A,B) FOR LARGE A AND B.
        LAMBDA = (A + B)*Y - B  AND EPS IS THE TOLERANCE USED.
        IT IS ASSUMED THAT LAMBDA IS NONNEGATIVE AND THAT
        A AND B ARE GREATER THAN OR EQUAL TO 15.
 */
function BASYM(A: number, B: number, LAMBDA: number, EPS: number) {
    let J0, J1;

    const A0: number[] = new Array(21).fill(0);
    const B0: number[] = new Array(21).fill(0);
    const C: number[] = new Array(21).fill(0);
    const D: number[] = new Array(21).fill(0);
    /*
        ****** NUM IS THE MAXIMUM VALUE THAT N CAN TAKE IN THE DO LOOP
            ENDING AT STATEMENT 50. IT IS REQUIRED THAT NUM BE EVEN.
            THE ARRAYS A0, B0, C, D HAVE DIMENSION NUM + 1.
     */
    const NUM = 20;
    const E0 = 2 / Math.sqrt(Math.PI); //1.12837916709551
    const E1 = 2 ** (-3 / 2); //0.353553390593274
    let BASYM = 0.0;

    let H, R0, R1, W0;
    if (A >= B) {
        H = B / A;
        R0 = 1.0 / (1.0 + H);
        R1 = (B - A) / A;
        W0 = 1.0 / Math.sqrt(B * (1.0 + H));
    } else {
        H = A / B;
        R0 = 1.0 / (1.0 + H);
        R1 = (B - A) / B;
        W0 = 1.0 / Math.sqrt(A * (1.0 + H));
    }

    const F = A * RLOG1(-LAMBDA / A) + B * RLOG1(LAMBDA / B);
    const T = Math.exp(-F);
    if (T === 0.0) {
        return BASYM;
    }

    const Z0 = Math.sqrt(F);
    const Z = 0.5 * (Z0 / E1);
    const Z2 = F + F;

    A0[0] = (2.0 / 3.0) * R1;
    C[0] = -0.5 * A0[0];
    D[0] = -C[0];
    J0 = (0.5 / E0) * ERFC1(1, Z0);
    J1 = E1;
    let SUM = J0 + D[0] * W0 * J1;

    let S = 1.0;
    const H2 = H * H;
    let HN = 1.0;
    let W = W0;
    let ZNM1 = Z;
    let ZN = Z2;

    for (let N = 2; N <= NUM; N += 2) {
        HN = H2 * HN;
        A0[N - 1] = (2.0 * R0 * (1.0 + H * HN)) / (N + 2.0);
        const NP1 = N + 1;
        S = S + HN;
        A0[NP1 - 1] = (2.0 * R1 * S) / (N + 3.0);

        for (let I = N; I <= NP1; ++I) {
            const R = -0.5 * (I + 1.0);
            B0[0] = R * A0[0];

            for (let M = 2; M <= I; ++M) {
                let BSUM = 0.0;
                const MM1 = M - 1;

                for (let J = 1; J <= MM1; ++J) {
                    const MMJ = M - J;
                    BSUM = BSUM + (J * R - MMJ) * A0[J - 1] * B0[MMJ - 1];
                }
                B0[M - 1] = R * A0[M - 1] + BSUM / M;
            }
            C[I - 1] = B0[I - 1] / (I + 1.0);

            let DSUM = 0.0;
            const IM1 = I - 1;
            for (let J = 1; J <= IM1; ++J) {
                const IMJ = I - J;
                DSUM = DSUM + D[IMJ - 1] * C[J - 1];
            }
            D[I - 1] = -(DSUM + C[I - 1]);
        }

        J0 = E1 * ZNM1 + (N - 1.0) * J0;
        J1 = E1 * ZN + N * J1;
        ZNM1 = Z2 * ZNM1;
        ZN = Z2 * ZN;
        W = W0 * W;
        const T0 = D[N - 1] * W * J0;
        W = W0 * W;
        const T1 = D[NP1 - 1] * W * J1;
        SUM = SUM + (T0 + T1);

        if (Math.abs(T0) + Math.abs(T1) <= EPS * SUM) {
            break;
        }
    }

    const U = Math.exp(-BCORR(A, B));
    BASYM = E0 * T * U * SUM;
    return BASYM;
}

/*
    Evaluation of the incomplete Gamma ratio funcions
    P(A, X) and Q(A, x)

    It is assumed that a <= 1. eps is the tolerance to be used.
    The input argument r has the value e^(-x) * x^a / gamma(a)
 */
function grat1(a: number, x: number, r: number, eps: number): [number, number] {
    let p, q;

    if (a * x === 0.0) {
        [p, q] = x <= a ? [0.0, 1.0] : [1.0, 0.0];
        return [p, q];
    }
    if (a === 0.5) {
        if (x >= 0.25) {
            q = ERFC1(0, Math.sqrt(x));
            p = 0.5 + (0.5 - q);
            return [p, q];
        }
        p = ERF(Math.sqrt(x));
        q = 0.5 + (0.5 - p);
        return [p, q];
    }

    if (x < 1.1) {
        //    Taylor series for P(a, x) / x^a
        let an = 3.0;
        let c = x;
        let sum = x / (a + 3.0);
        const tol = (0.1 * eps) / (a + 1.0);

        let t;
        do {
            an = an + 1.0;
            c = -c * (x / an);
            t = c / (a + an);
            sum = sum + t;
        } while (Math.abs(t) > tol);

        const j = a * x * ((sum / 6.0 - 0.5 / (a + 2.0)) * x + 1.0 / (a + 1.0));

        const z = a * Math.log(x);
        const h = GAM1(a);
        const g = 1.0 + h;

        if ((x < 0.25 && z > -0.13394) || (x >= 0.25 && a < x / 2.59)) {
            const l = REXP(z);
            const w = 0.5 + (0.5 + l);
            q = (w * j - l) * g - h;
            if (q < 0.0) {
                p = 1.0;
                q = 0.0;
                return [p, q];
            }
            p = 0.5 + (0.5 - q);
            return [p, q];
        } else {
            const w = Math.exp(z);
            p = w * g * (0.5 + (0.5 - j));
            q = 0.5 + (0.5 - p);
            return [p, q];
        }
    }

    //    Continued fraction expansion
    let a2nm1 = 1.0;
    let a2n = 1.0;
    let b2nm1 = x;
    let b2n = x + (1.0 - a);
    let c = 1.0;

    let am0;
    let an0;
    do {
        a2nm1 = x * a2n + c * a2nm1;
        b2nm1 = x * b2n + c * b2nm1;
        am0 = a2nm1 / b2nm1;
        c = c + 1.0;
        const CMA = c - a;
        a2n = a2nm1 + CMA * a2n;
        b2n = b2nm1 + CMA * b2n;
        an0 = a2n / b2n;
    } while (Math.abs(an0 - am0) > eps * an0);

    q = r * an0;
    p = 0.5 + (0.5 - q);
    return [p, q];
}

/*
    Asymptotic expansion for I_x(a, b) when a is larger than b.
    The result of the expansion is added to w. It is assumed
    that a >= 15 and b <= 1. eps is the tolerance used.
    ierr is a variable that reports the status of the results. (Replaced with throw in this implementation)
 */
function bgrat(a: number, b: number, x: number, y: number, w: number, eps: number) {
    const bm1 = b - 0.5 - 0.5;
    const nu = a + 0.5 * bm1;

    const lnx = y > 0.375 ? Math.log(x) : ALNREL(-y);
    const z = -nu * lnx;

    if (b * z === 0.0) {
        throw 'bgrat: A OR B IS NEGATIVE';
    }

    // Computation of the expansion set r = exp(-z) * z^b / gamma(b)
    let r = b * (1.0 + GAM1(b)) * Math.exp(b * Math.log(z));
    r = r * Math.exp(a * lnx) * Math.exp(0.5 * bm1 * lnx);
    let u = ALGDIV(b, a) + b * Math.log(nu);
    u = r * Math.exp(-u);
    if (u === 0.0) {
        throw 'bgrat: A OR B IS NEGATIVE';
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [p, q] = grat1(b, z, r, eps);

    const v = 0.25 * (1.0 / nu) ** 2;
    const t2 = 0.25 * lnx * lnx;
    const l = w / u;

    let j = q / r;
    let sum = j;
    let t = 1.0;
    let cn = 1.0;
    let n2 = 0.0;

    const arrayLength = 30;
    const C: number[] = new Array(arrayLength);
    const D: number[] = new Array(arrayLength);

    for (let n = 0; n < arrayLength; n++) {
        const bp2n = b + n2;
        j = (bp2n * (bp2n + 1.0) * j + (z + bp2n + 1.0) * t) * v;
        n2 = n2 + 2.0;
        t = t * t2;
        cn = cn / (n2 * (n2 + 1.0));
        C[n] = cn;
        let S = 0.0;

        if (n !== 0) {
            let coef = b - (n + 1);
            for (let i = 0; i < n; i++) {
                S = S + coef * C[i] * D[n - i - 1]; //original: D[N - I - 1]; alt: D[NM1 - I]
                coef = coef + b;
            }
        }
        D[n] = bm1 * cn + S / (n + 1);
        const DJ = D[n] * j;
        sum = sum + DJ;

        if (sum <= 0.0) {
            throw 'bgrat: A OR B IS NEGATIVE';
        }
        if (Math.abs(DJ) <= eps * (sum + l)) {
            break;
        }
    }

    //    Add the results to w
    w = w + u * sum;
    return w;
}

/*
    Evaluating of exp(mu) * (x^a * y^b / beta(a, b))
 */
function brcmp1(mu: number, a: number, b: number, x: number, y: number) {
    const CONST = 1 / Math.sqrt(2 * Math.PI); // 0.398942280401433

    const a0 = Math.min(a, b);
    if (a0 < 8.0) {
        let lnx, lny;
        if (x <= 0.375) {
            lnx = Math.log(x);
            lny = ALNREL(-x);
        } else if (y <= 0.375) {
            lnx = ALNREL(-y);
            lny = Math.log(y);
        } else {
            lnx = Math.log(x);
            lny = Math.log(y);
        }

        let z = a * lnx + b * lny;
        if (a0 >= 1.0) {
            z = z - BETALN(a, b);
            return ESUM(mu, z);
        }

        //    Procedure for a < 1 or b < 1
        let b0 = Math.max(a, b);
        if (b0 >= 8.0) {
            //    Algorithm for b0 >= 8
            const u = GAMLN1(a0) + ALGDIV(a0, b0);
            return a0 * ESUM(mu, z - u);
        }

        if (b0 <= 1.0) {
            //    Algorithm for b0 <= 1
            const returnValue = ESUM(mu, z);
            if (returnValue === 0.0) {
                return returnValue;
            }

            const apb = a + b;
            if (apb > 1.0) {
                const u = a + b - 1.0;
                z = (1.0 + GAM1(u)) / apb;
            } else {
                z = 1.0 + GAM1(apb);
            }

            const c = ((1.0 + GAM1(a)) * (1.0 + GAM1(b))) / z;
            return (returnValue * (a0 * c)) / (1.0 + a0 / b0);
        }

        //    Algorithm for 1 < b0 < 8
        let u = GAMLN1(a0);
        const n = b0 - 1.0;
        if (n >= 1) {
            let c = 1.0;
            for (let i = 0; i < n; i++) {
                b0 = b0 - 1.0;
                c = c * (b0 / (a0 + b0));
            }
            u = Math.log(c) + u;
        }

        z = z - u;
        b0 = b0 - 1.0;
        const apb = a0 + b0;
        let t;
        if (apb > 1.0) {
            u = a0 + b0 - 1.0;
            t = (1.0 + GAM1(u)) / apb;
        } else {
            t = 1.0 + GAM1(apb);
        }
        return (a0 * ESUM(mu, z) * (1.0 + GAM1(b0))) / t;
    }

    //    Procedure for a >= 8 and b >= 8
    const h = a > b ? b / a : a / b;
    const x0 = a > b ? 1.0 / (1.0 + h) : h / (1.0 + h);
    const y0 = a > b ? h / (1.0 + h) : 1.0 / (1.0 + h);
    const lambda = a > b ? (a + b) * y - b : a - (a + b) * x;

    const e1 = -lambda / a;
    let u;
    if (Math.abs(e1) > 0.6) {
        u = e1 - Math.log(x / x0);
    } else {
        u = RLOG1(e1);
    }

    const e2 = lambda / b;
    let v;
    if (Math.abs(e2) > 0.6) {
        v = e2 - Math.log(y / y0);
    } else {
        v = RLOG1(e2);
    }

    const z = ESUM(mu, -(a * u + b * v));
    return CONST * Math.sqrt(b * x0) * z * Math.exp(-BCORR(a, b));
}

/*
    Evaluating of x^a * y^b / beta(a, b)
 */
function brcomp(a: number, b: number, x: number, y: number) {
    const CONST = 1 / Math.sqrt(2 * Math.PI); // 0.398942280401433
    let returnValue = 0.0;
    if (x === 0.0 || y === 0.0) {
        return returnValue;
    }

    const a0 = Math.min(a, b);
    if (a0 < 8.0) {
        let lnx, lny;
        if (x <= 0.375) {
            lnx = Math.log(x);
            lny = ALNREL(-x);
        } else if (y <= 0.375) {
            lnx = ALNREL(-y);
            lny = Math.log(y);
        } else {
            lnx = Math.log(x);
            lny = Math.log(y);
        }

        let z = a * lnx + b * lny;
        if (a0 >= 1.0) {
            z = z - BETALN(a, b);
            return Math.exp(z);
        }

        //    Procedure for a < 1 or b < 1
        let b0 = Math.max(a, b);
        if (b0 >= 8.0) {
            //    Algorithm for b0 >= 8
            const u = GAMLN1(a0) + ALGDIV(a0, b0);
            return a0 * Math.exp(z - u);
        }

        if (b0 <= 1.0) {
            //    Algorithm for b0 <= 1
            returnValue = Math.exp(z);
            if (returnValue === 0.0) {
                return returnValue;
            }

            const apb = a + b;
            if (apb > 1.0) {
                const u = a + b - 1.0;
                z = (1.0 + GAM1(u)) / apb;
            } else {
                z = 1.0 + GAM1(apb);
            }

            const C = ((1.0 + GAM1(a)) * (1.0 + GAM1(b))) / z;
            return (returnValue * (a0 * C)) / (1.0 + a0 / b0);
        }

        //    Algorithm for 1 < b0 < 8
        let u = GAMLN1(a0);
        const n = b0 - 1.0;
        if (n >= 1) {
            let c = 1.0;
            for (let i = 0; i < n; i++) {
                b0 = b0 - 1.0;
                c = c * (b0 / (a0 + b0));
            }
            u = Math.log(c) + u;
        }

        z = z - u;
        b0 = b0 - 1.0;
        const apb = a0 + b0;
        let t;
        if (apb > 1.0) {
            u = a0 + b0 - 1.0;
            t = (1.0 + GAM1(u)) / apb;
        } else {
            t = 1.0 + GAM1(apb);
        }

        return (a0 * Math.exp(z) * (1.0 + GAM1(b0))) / t;
    }

    //    Procedure for a >= 8 and b >= 8
    const h = a > b ? b / a : a / b;
    const x0 = a > b ? 1.0 / (1.0 + h) : h / (1.0 + h);
    const y0 = a > b ? h / (1.0 + h) : 1.0 / (1.0 + h);
    const lambda = a > b ? (a + b) * y - b : a - (a + b) * x;

    const e1 = -lambda / a;
    let u;
    if (Math.abs(e1) > 0.6) {
        u = e1 - Math.log(x / x0);
    } else {
        u = RLOG1(e1);
    }

    const e2 = lambda / b;
    let v;
    if (Math.abs(e2) > 0.6) {
        v = e2 - Math.log(y / y0);
    } else {
        v = RLOG1(e2);
    }

    const z = Math.exp(-(a * u + b * v));
    return CONST * Math.sqrt(b * x0) * z * Math.exp(-BCORR(a, b));
}

/*
    Continued fraction expansion for I_x(a, b) when a, b > 1.
    It is assumed that lambda = (a + b) * y - b
 */
function bfrac(a: number, b: number, x: number, y: number, lambda: number, eps: number) {
    const returnValue = brcomp(a, b, x, y);
    if (returnValue === 0.0) {
        return returnValue;
    }

    const c = 1.0 + lambda;
    const c0 = b / a;
    const c1 = 1.0 + 1.0 / a;
    const yp1 = y + 1.0;

    let n = 0.0;
    let p = 1.0;
    let s = a + 1.0;
    let an = 0.0;
    let bn = 1.0;
    let anp1 = 1.0;
    let bnp1 = c / c1;
    let r = c1 / c;
    let r0;

    //    Continued fraction calculation
    do {
        n = n + 1.0;
        let t = n / a;
        const w = n * (b - n) * x;
        const e1 = a / s;
        const alpha = p * (p + c0) * e1 * e1 * (w * x);
        const e2 = (1.0 + t) / (c1 + t + t);
        const beta = n + w / s + e2 * (c + n * yp1);
        p = 1.0 + t;
        s = s + 2.0;

        //    Update an, bn, anp1, and bnp1
        t = alpha * an + beta * anp1;
        an = anp1;
        anp1 = t;
        t = alpha * bn + beta * bnp1;
        bn = bnp1;
        bnp1 = t;

        r0 = r;
        r = anp1 / bnp1;
        if (Math.abs(r - r0) <= eps * r) {
            break;
        }

        //    Rescale an, bn, anp1, and bnp1
        an = an / bnp1;
        bn = bn / bnp1;
        anp1 = r;
        bnp1 = 1.0;
    } while (n < 10_000);

    return returnValue * r;
}

/*
    Evaluation of I_x(a, b) - I_x(a * n, b) where n is a positive integer.
    eps is the tolerance used.
 */
function bup(a: number, b: number, x: number, y: number, n: number, eps: number) {
    //    Obtain the scaling factor exp(-mu) and exp(mu) * (x ** a * y ** b / beta(a, b)) / a
    const apb = a + b;
    const ap1 = a + 1.0;
    let mu = 0;
    let d = 1.0;
    if (n !== 1 && a >= 1.0 && apb >= 1.1 * ap1) {
        mu = Math.abs(EXPARG(1));
        const k = EXPARG(0);
        if (k < mu) {
            mu = k;
        }
        d = Math.exp(-mu);
    }

    const returnValue = brcmp1(mu, a, b, x, y) / a;
    if (n === 1 || returnValue === 0.0) {
        return returnValue;
    }
    const nm1 = n - 1;
    let w = d;

    //    Let k be the index of the maximum term
    let k = 0;
    if (b > 1.0) {
        if (y > 1e-4) {
            const r = ((b - 1.0) * x) / y - a;
            if (r >= 1.0) {
                k = r < nm1 ? r : nm1;
            }
        } else {
            k = nm1;
        }

        //    Add the increasing terms of the series
        for (let i = 0; i < k; i++) {
            d = ((apb + i) / (ap1 + i)) * x * d;
            w = w + d;
        }
        if (k === nm1) {
            return returnValue * w;
        }
    }

    //    Add the remaining terms of the series
    for (let i = k; i < nm1; i++) {
        d = ((apb + i) / (ap1 + i)) * x * d;
        w = w + d;
        if (d <= eps * w) {
            break;
        }
    }

    return returnValue * w;
}

/*
    Power series expansion for evaluating I_x(a, b) when b <= 1
    or b * x <= 0.7
 */
function bpser(a: number, b: number, x: number, eps: number) {
    let returnValue = 0.0;
    if (x === 0) {
        return returnValue;
    }

    //    Compute the factor x ** a / (a * beta(a, b))
    const a0 = Math.min(a, b);
    if (a0 >= 1.0) {
        const z = a * Math.log(x) - BETALN(a, b);
        returnValue = Math.exp(z) / a;
        if (returnValue === 0.0 || a <= 0.1 * eps) {
            return returnValue;
        }
    } else {
        let b0 = Math.max(a, b);

        //    Procedure for a0 < 1 and b0 >= 8
        if (b0 >= 8.0) {
            const u = GAMLN1(a0) + ALGDIV(a0, b0);
            const z = a * Math.log(x) - u;
            returnValue = (a0 / a) * Math.exp(z);
            if (returnValue === 0.0 || a <= 0.1 * eps) {
                return returnValue;
            }
        }

        //    Procedure for a0 < 1 and 1 < b0 < 8
        if (b0 > 1.0) {
            let u = GAMLN1(a0);
            const m = b0 - 1.0;
            if (m >= 1) {
                let c = 1.0;
                for (let i = 1; i <= m; i++) {
                    b0 = b0 - 1.0;
                    c = c * (b0 / (a0 + b0));
                }
                u = Math.log(c) + u;
            }
            const z = a * Math.log(x) - u;
            b0 = b0 - 1.0;
            const apb = a0 + b0;
            let t;
            if (apb > 1.0) {
                u = a0 + b0 - 1.0;
                t = (1.0 + GAM1(u)) / apb;
            } else {
                t = 1.0 + GAM1(apb);
            }
            returnValue = (Math.exp(z) * (a0 / a) * (1.0 + GAM1(b0))) / t;
            if (returnValue === 0.0 || a <= 0.1 * eps) {
                return returnValue;
            }
        } else {
            //    Procedure for a0 < 1 and b0 < 1
            returnValue = x ** a;
            if (returnValue === 0.0) {
                return returnValue;
            }

            const apb = a + b;
            let z;
            if (apb > 1.0) {
                const u = a + b - 1.0;
                z = (1.0 + GAM1(u)) / apb;
            } else {
                z = 1.0 + GAM1(apb);
            }
            const c = ((1.0 + GAM1(a)) * (1.0 + GAM1(b))) / z;
            returnValue = returnValue * c * (b / apb);
            if (returnValue === 0.0 || a <= 0.1 * eps) {
                return returnValue;
            }
        }
    }

    //    Computes the series
    let sum = 0.0;
    let n = 0.0;
    let c = 1.0;
    const tol = eps / a;
    let w = c / (a + n);
    while (Math.abs(w) > tol) {
        n = n + 1.0;
        c = c * (0.5 + (0.5 - b / n)) * x;
        w = c / (a + n);
        sum = sum + w;
    }

    return returnValue * (1.0 + a * sum);
}

/*
    apser yields the incomplete beta ratio I_{1 - x}(b, a) for
    a <= min(eps, eps * b), b * x <= 1, and x <= 0.5. Used when
    a is very small. Use only if above inequalities are satisfied.
 */
function apser(a: number, b: number, x: number, eps: number) {
    const G = 0.577215664901533;

    const bx = b * x;
    let t = x - bx;

    let c;
    if (b * eps > 2e-2) {
        c = Math.log(bx) + G + t;
    } else {
        c = Math.log(x) + PSI(b) + G + t;
    }

    const tol = 5.0 * eps * Math.abs(c);
    let j = 1.0;
    let s = 0.0;
    let aj = t / j;

    while (Math.abs(aj) > tol) {
        j = j + 1.0;
        t = t * (x - bx / j);
        aj = t / j;
        s = s + aj;
    }

    return -a * (c + s);
}

/*
    Evaluation of I_x(a, b) for b < min(eps, eps * a) and x <= 0.5.
 */
function fpser(a: number, b: number, x: number, eps: number) {
    let returnValue = 1.0;
    if (a > 1e-3 * eps) {
        returnValue = 0.0;
        const T = a * Math.log(x);
        if (T < EXPARG(1)) {
            return returnValue;
        }
        returnValue = Math.exp(T);
    }

    //    Note that 1 / B(A,B) = B
    returnValue = (b / a) * returnValue;
    const tol = eps / a;
    let an = a + 1.0;
    let t = x;
    let c = t / an;
    let s = t / an;

    while (Math.abs(c) > tol) {
        an = an + 1.0;
        t = x * t;
        c = t / an;
        s = s + c;
    }
    return returnValue * (1.0 + a * s);
}

/*
    Evaluation of the incomplete beta function I_x(a, b).
    Computes the values w = I_x(a, b) and w1 = 1 - I_x(a, b).
 */
function bratio(a: number, b: number, x: number, y: number): [number, number] {
    let eps = Number.EPSILON;

    if (a < 0.0 || b < 0.0) {
        throw 'bratio: A OR B IS NEGATIVE';
    }
    if (a === 0.0 && b === 0.0) {
        throw 'bratio: A = B = 0';
    }
    if (x < 0.0 || x > 1.0) {
        throw 'bratio: X < 0 OR X > 1';
    }
    if (y < 0.0 || y > 1.0) {
        throw 'bratio: Y < 0 OR Y > 1';
    }

    let w = 0.0;
    let w1 = 0.0;
    const Z = x + y - 0.5 - 0.5;
    if (Math.abs(Z) > 3.0 * eps) {
        throw 'bratio: X + Y != 1';
    }

    if (x === 0.0) {
        if (a === 0.0) {
            throw 'bratio: X = A = 0';
        }
        [w, w1] = [0.0, 1.0];
        return [w, w1];
    }
    if (y === 0.0) {
        if (b === 0.0) {
            throw 'bratio: Y = B = 0';
        }
        [w, w1] = [1.0, 0.0];
        return [w, w1];
    }

    if (a === 0.0) {
        [w, w1] = [1.0, 0.0];
        return [w, w1];
    }
    if (b === 0.0) {
        [w, w1] = [0.0, 1.0];
        return [w, w1];
    }

    eps = Math.max(eps, 1e-15);
    if (Math.max(a, b) < 1e-3 * eps) {
        // Procedure for a and b < 1.E-3*EPS
        w = b / (a + b);
        w1 = a / (a + b);
        return [w, w1];
    }

    if (Math.min(a, b) <= 1.0) {
        // Procedure for a0 <= 1 or b0 <= 1
        const noSwap = x <= 0.5;
        const a0 = noSwap ? a : b;
        let b0 = noSwap ? b : a;
        const x0 = noSwap ? x : y;
        const y0 = noSwap ? y : x;

        if (b0 < Math.min(eps, eps * a0)) {
            w = fpser(a0, b0, x0, eps);
            w1 = 0.5 + (0.5 - w);
            return noSwap ? [w, w1] : [w1, w];
        }

        if (a0 < Math.min(eps, eps * b0) && b0 * x0 <= 1.0) {
            w1 = apser(a0, b0, x0, eps);
            w = 0.5 + (0.5 - w1);
            return noSwap ? [w, w1] : [w1, w];
        }

        if (Math.max(a0, b0) > 1.0) {
            if (b0 <= 1.0) {
                w = bpser(a0, b0, x0, eps);
                w1 = 0.5 + (0.5 - w);
                return noSwap ? [w, w1] : [w1, w];
            }
            if (x0 >= 0.3) {
                // R suggests X0 >= 0.29
                w1 = bpser(b0, a0, y0, eps);
                w = 0.5 + (0.5 - w1);
                return noSwap ? [w, w1] : [w1, w];
            }
            if (x0 < 0.1 && (x0 * b0) ** a0 <= 0.7) {
                w = bpser(a0, b0, x0, eps);
                w1 = 0.5 + (0.5 - w);
                return noSwap ? [w, w1] : [w1, w];
            }
            if (b0 > 15.0) {
                w1 = bgrat(b0, a0, y0, x0, w1, 15.0 * eps);
                w = 0.5 + (0.5 - w1);
                return noSwap ? [w, w1] : [w1, w];
            }
        } else {
            // min(A0, B0) <= 1.0 and max(A0, B0) <= 1.0
            if (a0 >= Math.min(0.2, b0)) {
                w = bpser(a0, b0, x0, eps);
                w1 = 0.5 + (0.5 - w);
                return noSwap ? [w, w1] : [w1, w];
            }
            if (x0 ** a0 <= 0.9) {
                w = bpser(a0, b0, x0, eps);
                w1 = 0.5 + (0.5 - w);
                return noSwap ? [w, w1] : [w1, w];
            }
            if (x0 >= 0.3) {
                w1 = bpser(b0, a0, y0, eps);
                w = 0.5 + (0.5 - w1);
                return noSwap ? [w, w1] : [w1, w];
            }
        }

        const n = 20;
        w1 = bup(b0, a0, y0, x0, n, eps);
        b0 = b0 + n;
        w1 = bgrat(b0, a0, y0, x0, w1, 15.0 * eps);
        w = 0.5 + (0.5 - w1);
        return noSwap ? [w, w1] : [w1, w];
    }

    //      Procedure for a0 > 1 and b0 > 1
    let lambda = a > b ? (a + b) * y - b : a - (a + b) * x;
    const noSwap = lambda >= 0.0;
    let a0 = noSwap ? a : b;
    let b0 = noSwap ? b : a;
    const x0 = noSwap ? x : y;
    const y0 = noSwap ? y : x;
    lambda = noSwap ? lambda : Math.abs(lambda);

    if (b0 < 40.0) {
        if (b0 * x0 <= 0.7) {
            w = bpser(a0, b0, x0, eps);
            w1 = 0.5 + (0.5 - w);
            return noSwap ? [w, w1] : [w1, w];
        }

        let n = Math.trunc(b0);
        b0 = b0 - n;
        if (b0 === 0.0) {
            n = n - 1;
            b0 = 1.0;
        }
        w = bup(b0, a0, y0, x0, n, eps);
        if (x0 <= 0.7) {
            w = w + bpser(a0, b0, x0, eps);
            w1 = 0.5 + (0.5 - w);
            return noSwap ? [w, w1] : [w1, w];
        }

        if (a0 <= 15.0) {
            n = 20;
            w = w + bup(a0, b0, x0, y0, n, eps);
            a0 = a0 + n;
        }
        w = bgrat(a0, b0, x0, y0, w, 15.0 * eps);
        w1 = 0.5 + (0.5 - w);
        return noSwap ? [w, w1] : [w1, w];
    }

    if (a0 <= b0 && (a0 <= 100.0 || lambda > 0.03 * a0)) {
        w = bfrac(a0, b0, x0, y0, lambda, 15.0 * eps);
        w1 = 0.5 + (0.5 - w);
        return noSwap ? [w, w1] : [w1, w];
    }
    if (b0 <= 100.0 || lambda > 0.03 * b0) {
        w = bfrac(a0, b0, x0, y0, lambda, 15.0 * eps);
        w1 = 0.5 + (0.5 - w);
        return noSwap ? [w, w1] : [w1, w];
    }

    w = BASYM(a0, b0, lambda, 100.0 * eps);
    w1 = 0.5 + (0.5 - w);
    return noSwap ? [w, w1] : [w1, w];
}

export function calculateIncompleteBetaFunction(x: number, a: number, b: number) {
    return bratio(a, b, x, 1 - x)[0];
}

export function calculateIncompleteBetaFunctionComplementary(x: number, a: number, b: number) {
    return bratio(a, b, x, 1 - x)[1];
}
