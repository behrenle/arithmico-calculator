import { integrationTest, integrationTestThrow } from '../../utils/integration-test-utils';

// normal
integrationTest('normal(0.23)', '0.388529');
integrationTest('normal(-0.23)', '0.388529');
integrationTest('normal(3, 2, 5)', '0.078209');
integrationTestThrow('normal(3, 2, -5)');

// cnormal
integrationTest('cnormal(0.23)', '0.590954');
integrationTest('cnormal(-0.23)', '0.409046');
integrationTest('cnormal(3, 2, 5)', '0.57926');
integrationTestThrow('cnormal(3, 2, -5)');

// qnormal
integrationTest('qnormal(0.23)', '-0.738847');
integrationTest('qnormal(0.78, 2, 5)', '5.860966');
integrationTest('qnormal(0.94, 2, 5)', '9.773868');
integrationTest('qnormal(0.9999, 2, 5)', '20.595082');
integrationTest('qnormal(10^(-9))', '-5.997807');
integrationTestThrow('qnormal(1.78, 2, 5)');
integrationTestThrow('qnormal(-0.78, 2, 5)');
integrationTestThrow('qnormal(0.78, 2, -5)');

// binom
integrationTest('binom(10, 0.87, 9)', '0.371207');
integrationTestThrow('binom(-10, 0.87, 9)');
integrationTestThrow('binom(10, 0.87, -9)');
integrationTestThrow('binom(10.5, 0.87, 9)');
integrationTestThrow('binom(10, 0.87, 9.5)');
integrationTestThrow('binom(10, 1.87, 9)');
integrationTestThrow('binom(10, -0.87, 9)');

// cbinom
integrationTest('cbinom(0, 0.7, 0)', '1');
integrationTest('cbinom(10, 0.87, 9)', '0.751577');
integrationTest('cbinom(5000, 0.2, 999)', '0.494358');
integrationTestThrow('cbinom(-10, 0.87, 9)');
integrationTestThrow('cbinom(10, 0.87, -9)');
integrationTestThrow('cbinom(10.5, 0.87, 9)');
integrationTestThrow('cbinom(10, 0.87, 9.5)');
integrationTestThrow('cbinom(10, 1.87, 9)');
integrationTestThrow('cbinom(10, -0.87, 9)');

// qbinom
integrationTest('qbinom(0.25, 10, 1/3)', '2');
integrationTest('qbinom(0.4, 23, 0.99)', '23');
integrationTest('qbinom(0.4, 23, 0.01)', '0');
integrationTestThrow('qbinom(1.87, 10, 1/3)');
integrationTestThrow('qbinom(-1.87, 10, 1/3)');
integrationTestThrow('qbinom(0.25, -10, 1/3)');
integrationTestThrow('qbinom(0.25, 10.5, 1/3)');
integrationTestThrow('qbinom(0.25, 10, 1.87)');
integrationTestThrow('qbinom(0.25, 10, -1.87)');

// avg
integrationTest('avg(10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5)', '9');

// var
integrationTest('var(10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5)', '10');

// unbiased:var
integrationTest('unbiased:var(10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5)', '11');

// sd
integrationTest('sd(10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5)', '3.162278');

// unbiased:sd
integrationTest('unbiased:sd(10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5)', '3.316625');

// median
integrationTest('median(3, 13, 7, 5, 21, 23, 39, 23, 40, 23, 14, 12, 56, 23, 29)', '23');
integrationTest('median(2, 3, 4, 5)', '3.5');
integrationTestThrow('median(2)');
integrationTestThrow('median(1, 3, a)');

// quantile
integrationTest('quantile(0.25, [6, 1, 3, 8, 4, 5, 2, 7, 9])', '2.5');
integrationTest('quantile(0.75, [1, 2, 2, 3, 5, 8, 9, 12, 12, 13])', '12');
integrationTestThrow('quantile(0.8, [2])');
integrationTestThrow('quantile(0.8, [2, a, 4, 5])');
integrationTestThrow('quantile(-0.8, [2, 3, 4, 5])');

// cov
integrationTest('cov([18, 2, 42, 14, 22, 35, 45, 8], [22, 10, 53, 30, 25, 36, 45, 13])', '222.928571');
integrationTestThrow('cov([18, 42, 14, 22, 35, 45, 8], [22, 10, 53, 30, 25, 36, 45, 13])');
integrationTestThrow('cov([18, a, 42, 14, 22, 35, 45, 8], [22, 10, 53, 30, 25, 36, 45, 13])');
integrationTestThrow('cov([18, 2, 42, 14, 22, 35, 45, 8], [22, b, 53, 30, 25, 36, 45, 13])');

// corr
integrationTest(
    'corr([10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5], [8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68])',
    '0.816421',
);
integrationTestThrow('corr([18, 42, 14, 22, 35, 45, 8], [22, 10, 53, 30, 25, 36, 45, 13])');
integrationTestThrow('corr([18, a, 42, 14, 22, 35, 45, 8], [22, 10, 53, 30, 25, 36, 45, 13])');
integrationTestThrow('corr([18, 2, 42, 14, 22, 35, 45, 8], [22, b, 53, 30, 25, 36, 45, 13])');

// erf
integrationTest('erf(1)', '0.842701');
integrationTest('erf(-1)', '-0.842701');

// erfinv
integrationTest('erfinv(0.3)', '0.272463');
integrationTest('erfinv(-0.3)', '-0.272463');
integrationTest('erfinv(0.9999)', '2.751064');
integrationTestThrow('erfinv(1.1)');
integrationTestThrow('erfinv(-1.1)');

// regressions:polynomial
integrationTest('regressions:polynomial([-2, -1, 3, 4, 6], [0, 0.5, 2, 2, 5])', 'y = 0.532609 * x + 0.834783');
integrationTest(
    'regressions:polynomial([6, 9, 12, 14, 30, 35, 40, 47, 51, 55, 60], [14, 28, 50, 70, 89, 94, 90, 75, 59, 44, 27], 2)',
    'y = (-0.1012 * x^2) + 6.744358 * x - 18.25364',
);
integrationTestThrow('regressions:polynomial([-2, -1, 3, 4, 6], [0, 0.5, 2, 2, 5], 1.3)');
integrationTestThrow('regressions:polynomial([-2, -1, 3, 4, 6], [0, 0.5, 2, 2, 5], -2)');
integrationTestThrow('regressions:polynomial([a, -1, 3, 4, 6], [0, 0.5, 2, 2, 5])');
integrationTestThrow('regressions:polynomial([-2, -1, 3, 4, 6], [a, 0.5, 2, 2, 5])');
integrationTestThrow('regressions:polynomial([-2, -1, 3, 4], [0, 0.5, 2, 2, 5])');

// regressions:exponential
integrationTest(
    'regressions:exponential([1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], [1, 3, 5, 7, 9, 12, 15, 19, 23, 28, 33, 38, 44, 50, 56, 64, 73, 84, 97, 113])',
    'y = e^(0.2041 * x + 0.981658)',
);
integrationTestThrow('regressions:exponential([a, -1, 3, 4, 6], [0, 0.5, 2, 2, 5])');
integrationTestThrow('regressions:exponential([-2, -1, 3, 4, 6], [a, 0.5, 2, 2, 5])');
integrationTestThrow('regressions:exponential([ -1, 3, 4, 6], [0, 0.5, 2, 2, 5])');

//regressions:logistic
integrationTest(
    'regressions:logistic([0.50, 0.75, 1.00, 1.25, 1.50, 1.75, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00, 3.25, 3.50, 4.00, 4.25, 4.50, 4.75, 5.00, 5.50], [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1])',
    'y = 1 / (1 + e^(-(1.504645 * x - 4.077712)))',
);
integrationTestThrow(
    'regressions:logistic([a, 0.75, 1.00, 1.25, 1.50, 1.75, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00, 3.25, 3.50, 4.00, 4.25, 4.50, 4.75, 5.00, 5.50], [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1])',
);
integrationTestThrow(
    'regressions:logistic([0.50, 0.75, 1.00, 1.25, 1.50, 1.75, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00, 3.25, 3.50, 4.00, 4.25, 4.50, 4.75, 5.00, 5.50], [a, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1])',
);
integrationTestThrow(
    'regressions:logistic([0.75, 1.00, 1.25, 1.50, 1.75, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00, 3.25, 3.50, 4.00, 4.25, 4.50, 4.75, 5.00, 5.50], [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1])',
);
integrationTestThrow(
    'regressions:logistic([0.50, 0.75, 1.00, 1.25, 1.50, 1.75, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00, 3.25, 3.50, 4.00, 4.25, 4.50, 4.75, 5.00, 5.50], [2, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1])',
);
