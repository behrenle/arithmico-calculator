import {
    calculateIncompleteBetaFunction,
    calculateIncompleteBetaFunctionComplementary,
} from './incomplete-beta-function';

function incompleteBetaFunctionThrowTest(x: number, a: number, b: number, errorMessage: string) {
    test('', () => {
        expect(() => {
            calculateIncompleteBetaFunction(x, a, b);
        }).toThrow(errorMessage);
    });
}

function incompleteBetaFunctionTest(name: string, x: number, a: number, b: number, expectedValue: number) {
    test(name, () => {
        expect(calculateIncompleteBetaFunction(x, a, b)).toStrictEqual(expectedValue);
    });
}

function incompleteBetaFunctionComplementaryTest(name: string, x: number, a: number, b: number, expectedValue: number) {
    test(name, () => {
        expect(calculateIncompleteBetaFunctionComplementary(x, a, b)).toStrictEqual(expectedValue);
    });
}

describe('tests for incomplete beta function', () => {
    // incomplete beta function throw tests
    incompleteBetaFunctionThrowTest(0.2, -3, 2, 'bratio: A OR B IS NEGATIVE');
    incompleteBetaFunctionThrowTest(0.2, 3, -2, 'bratio: A OR B IS NEGATIVE');
    incompleteBetaFunctionThrowTest(0.2, 0, 0, 'bratio: A = B = 0');
    incompleteBetaFunctionThrowTest(-0.2, 3, 2, 'bratio: X < 0 OR X > 1');
    incompleteBetaFunctionThrowTest(1.2, 3, 2, 'bratio: X < 0 OR X > 1');
    incompleteBetaFunctionThrowTest(0, 0, 2, 'bratio: X = A = 0');
    incompleteBetaFunctionThrowTest(1, 3, 0, 'bratio: Y = B = 0');

    // incomplete beta function trivial cases
    incompleteBetaFunctionTest('I_{0}(3, 2)', 0, 3, 2, 0); //sagemath: 0.0
    incompleteBetaFunctionComplementaryTest('1 - I_{0}(3, 2)', 0, 3, 2, 1.0); //sagemath: 1.0

    incompleteBetaFunctionTest('I_{1}(3, 2)', 1, 3, 2, 1); //sagemath: 1.0
    incompleteBetaFunctionComplementaryTest('1 - I_{1}(3, 2)', 1, 3, 2, 0.0); //sagemath: 0.0

    incompleteBetaFunctionTest('I_{0.2}(3, 0)', 0.2, 3, 0, 0); //sagemath: NaN
    incompleteBetaFunctionComplementaryTest('1 - 0I_{0.2}(3, 0)', 0.2, 3, 0, 1.0); //sagemath: NaN

    incompleteBetaFunctionTest('I_{0.2}(0, 2)', 0.2, 0, 2, 1); //sagemath: NaN
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(0, 2)', 0.2, 0, 2, 0); //sagemath: NaN

    incompleteBetaFunctionTest('I_{0.2}(1e-20, 1e-21)', 0.2, 1e-20, 1e-21, 0.0909090909090909); //sagemath: 0.09090909090909065
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(1e-20, 1e-21)', 0.2, 1e-20, 1e-21, 0.9090909090909091); //sagemath: 0.909090909090909

    // bratio test cases
    incompleteBetaFunctionTest('I_{0.2}(3, 1e-17)', 0.2, 3, 1e-17, 3.143551314209757e-20); //sagemath: 3.143551314209749e-20
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(3, 1e-17)', 0.2, 3, 1e-17, 1); //sagemath: 1.00000000000000

    incompleteBetaFunctionTest('I_{0.2}(1e-19, 0.0003)', 0.2, 1e-19, 0.0003, 0.9999999999999997); //sagemath: 0.9999999999999991
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(1e-19, 0.0003)', 0.2, 1e-19, 0.0003, 3.334719205091276e-16); //sagemath: 8.88178419700125e-16

    incompleteBetaFunctionTest('I_{0.2}(8.7, 0.6)', 0.2, 8.7, 0.6, 2.5040478259250786e-7); //sagemath: 2.50404782592508e-07
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(8.7, 0.6)', 0.2, 8.7, 0.6, 0.9999997495952174); //sagemath: 0.999999749595217

    incompleteBetaFunctionTest('I_{0.2}(1.7, 0.6)', 0.2, 1.7, 0.6, 0.034729557265054514); //sagemath: 0.03472955726505452
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(1.7, 0.6)', 0.2, 1.7, 0.6, 0.9652704427349454); //sagemath: 0.965270442734945

    incompleteBetaFunctionTest('I_{0.2}(3.7, 0.6)', 0.2, 3.7, 0.6, 0.001070573575819432); //sagemath: 0.00107057357581943
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(3.7, 0.6)', 0.2, 3.7, 0.6, 0.9989294264241806); //sagemath: 0.998929426424181

    incompleteBetaFunctionTest('I_{0.3}(0.9, 1.7)', 0.3, 0.9, 1.7, 0.49669572816874397); //sagemath: 0.4966957281687434
    incompleteBetaFunctionComplementaryTest('1 - I_{0.3}(0.9, 1.7)', 0.3, 0.9, 1.7, 0.503304271831256); //sagemath: 0.503304271831257

    incompleteBetaFunctionTest('I_{0.01}(0.9, 1.7)', 0.01, 0.9, 1.7, 0.025841490768663027); //sagemath: 0.025841490768663006
    incompleteBetaFunctionComplementaryTest('1 - I_{0.01}(0.9, 1.7)', 0.01, 0.9, 1.7, 0.974158509231337); //sagemath: 0.9741585092313370

    incompleteBetaFunctionTest('I_{0.2}(0.9, 15.5)', 0.2, 0.9, 15.5, 0.974298915074856); //sagemath: 0.974298915074856
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(0.9, 15.5)', 0.2, 0.9, 15.5, 0.02570108492514396); //sagemath: 0.0257010849251440

    incompleteBetaFunctionTest('I_{0.2}(0.5, 15.5)', 0.2, 0.5, 15.5, 0.9909293561788433); //sagemath: 0.9909293561788434
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(0.5, 15.5)', 0.2, 0.5, 15.5, 0.00907064382115669); //sagemath: 0.00907064382115658

    incompleteBetaFunctionTest('I_{0.2}(0.9, 8.7)', 0.2, 0.9, 8.7, 0.8774785948777811); //sagemath: 0.8774785948777811
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(0.9, 8.7)', 0.2, 0.9, 8.7, 0.1225214051222189); //sagemath: 0.122521405122219

    incompleteBetaFunctionTest('I_{0.2}(0.9, 7)', 0.2, 0.9, 7, 0.8181890351695966); //sagemath: 0.818189035169597
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(0.9, 7)', 0.2, 0.9, 7, 0.18181096483040338); //sagemath: 0.181810964830403

    incompleteBetaFunctionTest('I_{0.2}(0.9, 6.9)', 0.2, 0.9, 6.9, 0.8139029530611517); //sagemath: 0.813902953061152
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(0.9, 6.9)', 0.2, 0.9, 6.9, 0.18609704693884838); //sagemath: 0.186097046938848

    incompleteBetaFunctionTest('I_{0.2}(0.9, 0.4)', 0.2, 0.9, 0.4, 0.10512446812879857); //sagemath: 0.10512446812879858
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(0.9, 0.4)', 0.2, 0.9, 0.4, 0.8948755318712014); //sagemath: 0.8948755318712014

    incompleteBetaFunctionTest('I_{0.2}(0.1, 0.7)', 0.2, 0.1, 0.7, 0.8073274503338682); //sagemath: 0.8073274503338692
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(0.1, 0.7)', 0.2, 0.1, 0.7, 0.1926725496661318); //sagemath: 0.1926725496661318

    incompleteBetaFunctionTest('I_{0.35}(0.1, 0.7)', 0.35, 0.1, 0.7, 0.8581064018974903); //sagemath: 0.8581064018974913
    incompleteBetaFunctionComplementaryTest('1 - I_{0.35}(0.1, 0.7)', 0.35, 0.1, 0.7, 0.14189359810250968); //sagemath: 0.141893598102509

    incompleteBetaFunctionTest('I_{0.2}(0.01, 0.999)', 0.2, 0.01, 0.999, 0.9840204187494235); //sagemath: 0.9840204187494239
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(0.01, 0.999)', 0.2, 0.01, 0.999, 0.015979581250576497); //sagemath: 0.0159795812505761

    incompleteBetaFunctionTest('I_{0.2}(0.01, 0.7)', 0.2, 0.01, 0.7, 0.978410014890881); //sagemath: 0.9784100148908809
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(0.01, 0.7)', 0.2, 0.01, 0.7, 0.021589985109119084); //sagemath: 0.0215899851091191

    incompleteBetaFunctionTest('I_{0.01}(0.01, 0.7)', 0.01, 0.01, 0.7, 0.9489575726627992); //sagemath: 0.9489575726627996
    incompleteBetaFunctionComplementaryTest('1 - I_{0.01}(0.01, 0.7)', 0.01, 0.01, 0.7, 0.05104242733720081); //sagemath: 0.0510424273372004

    incompleteBetaFunctionTest('I_{0.02}(30, 20)', 0.02, 30, 20, 1.3963885552371685e-38); //sagemath: 1.3963885552371275e-38
    incompleteBetaFunctionComplementaryTest('1 - I_{0.02}(30, 20)', 0.02, 30, 20, 1.0); //sagemath: 1.000000000000000

    incompleteBetaFunctionTest('I_{0.2}(1.7, 2)', 0.2, 1.7, 2, 0.15298998272779685); //sagemath: 0.152989982727797
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(1.7, 2)', 0.2, 1.7, 2, 0.8470100172722032); //sagemath: 0.847010017272203

    incompleteBetaFunctionTest('I_{0.02}(1.7, 6)', 0.02, 1.7, 6, 0.01814584484038807); //sagemath: 0.018145844840388045
    incompleteBetaFunctionComplementaryTest('1 - I_{0.02}(1.7, 6)', 0.02, 1.7, 6, 0.9818541551596119); //sagemath: 0.9818541551596120

    incompleteBetaFunctionTest('I_{0.2}(30, 20)', 0.2, 30, 20, 3.436158271932094e-10); //sagemath: 3.4361582719319687e-10
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(30, 20)', 0.2, 30, 20, 0.9999999996563842); //sagemath: 0.9999999996563842

    incompleteBetaFunctionTest('I_{0.75}(14, 4)', 0.75, 14, 4, 0.3530180950183418); //sagemath: 0.353018095018344
    incompleteBetaFunctionComplementaryTest('1 - I_{0.75}(14, 4)', 0.75, 14, 4, 0.6469819049816582); //sagemath: 0.646981904981656

    incompleteBetaFunctionTest('I_{0.75}(35, 10)', 0.75, 35, 10, 0.30862539084006774); //sagemath: 0.30862539084006324
    incompleteBetaFunctionComplementaryTest('1 - I_{0.75}(35, 10)', 0.75, 35, 10, 0.6913746091599322); //sagemath: 0.6913746091599368

    incompleteBetaFunctionTest('I_{0.6}(50, 45)', 0.6, 50, 45, 0.9259884904645385); //sagemath: 0.925988490464538
    incompleteBetaFunctionComplementaryTest('1 - I_{0.6}(50, 45)', 0.6, 50, 45, 0.07401150953546151); //sagemath: 0.0740115095354620

    incompleteBetaFunctionTest('I_{0.99}(41, 7)', 0.99, 41, 7, 0.9999995570577934); //sagemath: 0.9999995570577934
    incompleteBetaFunctionComplementaryTest('1 - I_{0.99}(41, 45)', 0.99, 41, 7, 4.4294220655994265e-7); //sagemath: 4.42942206579922e-7

    incompleteBetaFunctionTest('I_{0.2}(105, 130)', 0.2, 105, 130, 7.720561154039472e-18); //sagemath: 7.720561154039562e-18
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(105, 130)', 0.2, 105, 130, 1.0); //sagemath: 1.00000000000000

    incompleteBetaFunctionTest('I_{0.2}(50, 45)', 0.2, 50, 45, 1.0479945433367563e-12); //sagemath: 1.0479945433367593e-12
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(50, 45)', 0.2, 50, 45, 0.999999999998952); //sagemath: 0.9999999999989520

    incompleteBetaFunctionTest('I_{0.6}(105, 130)', 0.6, 105, 130, 0.9999988878041558); //sagemath: 0.9999988878041558
    incompleteBetaFunctionComplementaryTest('1 - I_{0.6}(105, 130)', 0.6, 105, 130, 1.1121958441800528e-6); //sagemath: 1.11219584419953e-6

    incompleteBetaFunctionTest('I_{0.2}(1000, 4001)', 0.2, 1000, 4001, 0.505641740641465); //sagemath: 0.5056417406424282
    incompleteBetaFunctionComplementaryTest('1 - I_{0.2}(1000, 4001)', 0.2, 1000, 4001, 0.4943582593585349); //sagemath: 0.494358259357572

    incompleteBetaFunctionTest('I_{0.4}(247.6, 368.9)', 0.4, 247.6, 368.9, 0.46940376969197334); //sagemath: 0.46940376969211417
    incompleteBetaFunctionComplementaryTest('1 - I_{0.4}(247.6, 368.9)', 0.4, 247.6, 368.9, 0.5305962303080267); //sagemath: 0.5305962303078858

    incompleteBetaFunctionTest('I_{0.4}(24704.6, 36889.9)', 0.4, 24704.6, 36889.9, 0.29157571565188733); //sagemath: 0.29157571564818835
    incompleteBetaFunctionComplementaryTest('1 - I_{0.4}(24704.6, 36889.9)', 0.4, 24704.6, 36889.9, 0.7084242843481127); //sagemath: 0.7084242843518117

    incompleteBetaFunctionTest('I_{0.87}(10, 1)', 0.87, 10, 1, 0.2484234141914357); //sagemath: 0.2484234141914352
    incompleteBetaFunctionComplementaryTest('1 - I_{0.87}(10, 1)', 0.87, 10, 1, 0.7515765858085643); //sagemath: 0.751576585808565

    incompleteBetaFunctionTest('I_{0.7}(4, 8)', 0.7, 4, 8, 0.9957091060000001); //sagemath: 0.9957091060000001
    incompleteBetaFunctionComplementaryTest('1 - I_{0.7}(4, 8)', 0.7, 4, 8, 0.004290894000000006); //sagemath: 0.00429089399999988
});
