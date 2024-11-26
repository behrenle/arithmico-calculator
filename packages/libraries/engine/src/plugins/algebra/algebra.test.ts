import { integrationTest, integrationTestThrow } from '../../utils/integration-test-utils';

// lsolve
integrationTest('lsolve(2*x+3*y=-6, -3*x-4*y=7)', '[x = 3, y = -4]');
integrationTest('lsolve(x=2, x=3-y)', '[x = 2, y = 1]');
integrationTest(
    'lsolve(a = 1, a + b = 2, a + b + c = 3, a + b + c + d = 4, a + b + c + d + e_ = 5)',
    '[a = 1, b = 1, c = 1, d = 1, e_ = 1]',
);
integrationTestThrow('lsolve(x + y = 3; 2 * x + 2*y = 4)'); // no solution
integrationTestThrow('lsolve(-6*x + 4*y = 2; 3*x - 2*y = -1)'); // infinite solutions
integrationTestThrow('lsolve(1 = 100 * 0.87^x)'); // not linear

// length
integrationTest('length([1,2,2])', '3');

// <vector>.length
integrationTest('[1,2,2].length()', '3');

// cross
integrationTest('cross([1,2,3],[-7,8,9])', '[-6, -30, 22]');
integrationTest('cross([1,0,0],[0,1,0])', '[0, 0, 1]');

// matrix:inverse
integrationTest('matrix:inverse([[2, 1, 0], [1, 2, -2], [0, -1, 1]])', '[[0, 1, 2], [1, -2, -4], [1, -2, -3]]');
integrationTestThrow('matrix:inverse([[1, 2],[4, 3],[3, 4]])');
integrationTestThrow('matrix:inverse([[1, 2],[4, 3, -3],[3, 4]])');
integrationTestThrow('matrix:inverse([[1, a],[3, 4]]');
integrationTestThrow('matrix:inverse([[2, 1, 0], [1, 2, -2], [4, 2, 0]])');

// matrix:adj
integrationTest('matrix:adj([[4, 3], [5, 7]])', '[[7, -3], [-5, 4]]');
integrationTestThrow('matrix:adj([[1, a],[3, 4]]');
integrationTestThrow('matrix:adj([[2, 1, 0], [1, 2], [4, 2, 0]])');
integrationTestThrow('matrix:adj([1])');

// matrix:cof
integrationTest('matrix:cof([[4, 3], [5, 7]])', '[[7, -5], [-3, 4]]');
integrationTestThrow('matrix:cof([[1, a],[3, 4]]');
integrationTestThrow('matrix:cof([[2, 1, 0], [1, 2], [4, 2, 0]])');
integrationTestThrow('matrix:cof([1])');

// matrix:transpose
integrationTest('matrix:transpose([[1, 2],[4, 3],[3, 4]])', '[[1, 4, 3], [2, 3, 4]]');
integrationTestThrow('matrix:transpose([1])');

// matirx:det
integrationTest('matrix:det([[1]])', '1');
integrationTest('matrix:det([[1, 0], [0, 1]])', '1');
integrationTest('matrix:det([[1, 2],[3, 4]])', '-2');
integrationTestThrow('matrix:det([[1, 2],[4, 3],[3, 4]])');
integrationTestThrow('matrix:det([[1, 2],[4,3,-3],[3, 4]])');
integrationTestThrow('matrix:det([[1, a],[3, 4]]');

// matrix:id
integrationTest('matrix:id(1)', '[[1]]');
integrationTest('matrix:id(3)', '[[1, 0, 0], [0, 1, 0], [0, 0, 1]]');
integrationTestThrow('matrix:id(3.5)');
integrationTestThrow('matrix:id(-3)');
integrationTestThrow('matrix:id(0)');

// matrix:zero
integrationTest('matrix:zero(1, 1)', '[[0]]');
integrationTest('matrix:zero(3, 3)', '[[0, 0, 0], [0, 0, 0], [0, 0, 0]]');
integrationTest('matrix:zero(2, 3)', '[[0, 0, 0], [0, 0, 0]]');
integrationTestThrow('matrix:zero(3.5, 2)');
integrationTestThrow('matrix:zero(-3, 2)');
integrationTestThrow('matrix:id(0, 2)');
integrationTestThrow('matrix:zero(2, 3.5)');
integrationTestThrow('matrix:zero(2, -3)');
integrationTestThrow('matrix:id(2, 0)');

// polynomial:deg
integrationTest('polynomial:deg(2*x^2 + x + 4)', '2');
integrationTest('polynomial:deg(x)', '1');
integrationTest('polynomial:deg(1)', '0');
integrationTestThrow('polynomial:deg(x^-1)');
integrationTestThrow('polynomial:deg(x^5 + y^4)');

// polynomial:add
integrationTest('polynomial:add(2*x^2, 3*x^2)', '5 * x^2');
integrationTest('polynomial:add(1, 2)', '3');
integrationTest('polynomial:add(2*x^2 + x + 4, 5*x + 3)', '2 * x^2 + 6 * x + 7');
integrationTest('polynomial:add(5*x + 3, 2*x^2 + x + 4)', '2 * x^2 + 6 * x + 7');
integrationTest('polynomial:add(x,y)', 'x + y');
integrationTest('polynomial:add(2*x + y, -2*y + 3*x)', '5 * x - y');
integrationTest('polynomial:add(x^2 + 2*x + y -3, -2*y + 3*x)', 'x^2 + 5 * x - y - 3');

// polynomial:sub
integrationTest('polynomial:sub(2*x^2, 3*x^2)', '-x^2');
integrationTest('polynomial:sub(2*x^2, 2*x^2)', '0');
integrationTest('polynomial:sub(1, 2)', '-1');
integrationTest('polynomial:sub(2*x^2 + x + 4, 5*x + 3)', '2 * x^2 - 4 * x + 1');
integrationTest('polynomial:sub(5*x + 3, 2*x^2 + x + 4)', '(-2 * x^2) + 4 * x - 1');
integrationTest('polynomial:sub(x,y)', 'x - y');
integrationTest('polynomial:sub(2*x + y, -2*y + 3*x)', '(-x) + 3 * y');
integrationTest('polynomial:sub(-2*y + 3*x, 2*x + y)', 'x - 3 * y');
integrationTest('polynomial:sub(x^2 + 2*x + y -3, -2*y + 3*x)', 'x^2 - x + 3 * y - 3');
integrationTest('polynomial:sub(x^7 - x^6 - x^5 - x^4 - x^3 - x, 0)', 'x^7 - x^6 - x^5 - x^4 - x^3 - x');

// polynomial:mul
integrationTest('polynomial:mul(2*x^2 + x + 4, 5*x + 3)', '10 * x^3 + 11 * x^2 + 23 * x + 12');
integrationTest('polynomial:mul(5*x + 3, 2*x^2 + x + 4)', '10 * x^3 + 11 * x^2 + 23 * x + 12');
integrationTestThrow('polynomial:mul(x, y)');
integrationTestThrow('polynomial:mul(2*x + y, -2*y + 3*x)');
integrationTestThrow('polynomial:mul(-2*y + 3*x, 2*x + y)');
integrationTestThrow('polynomial:mul(x^2 + 2*x + y -3, -2*y + 3*x)');

// polynomial:div
integrationTest('polynomial:div(5*x^2 + 3*x - 12, x - 4)', '[5 * x + 23, 80]');
integrationTest('polynomial:div(x^3 + 4 * x^2 - 9*x - 36, x - 3)', '[x^2 + 7 * x + 12, 0]');
integrationTest('polynomial:div(x^4 + x^2 - 2*x + 1, x^2 - 1)', '[x^2 + 2, (-2 * x) + 3]');
integrationTest('polynomial:div(x^3 - x^2 + 2*x - 5, x^2 - 3)', '[x - 1, 5 * x - 8]');
integrationTest('polynomial:div(4*x^4 - 5*x^2 - 4*x -4, x-2)', '[4 * x^3 + 8 * x^2 + 11 * x + 18, 32]');
integrationTestThrow('polynomial:div(x,y)');
integrationTestThrow('polynomial:div(2*x + y, -2*y + 3*x)');
integrationTestThrow('polynomial:div(-2*y + 3*x, 2*x + y)');
integrationTestThrow('polynomial:div(x^2 + 2*x + y -3, -2*x^3 + 3*x)');
integrationTestThrow('polynomial:div(x^2 + 2*x + y -3, 0)');

// tensor:rank
integrationTest('tensor:rank([])', '1');
integrationTest('tensor:rank([1])', '1');
integrationTest('tensor:rank([1, 2])', '1');
integrationTest('tensor:rank([[1,2],[3,4]])', '2');
integrationTestThrow('tensor:rank([1,[2,3]])');

// tensor:dims
integrationTest('tensor:dims([])', '[0]');
integrationTest('tensor:dims([1])', '[1]');
integrationTest('tensor:dims([1, 2])', '[2]');
integrationTest('tensor:dims([[1,2],[3,4]])', '[2, 2]');
integrationTestThrow('tensor:dims([1,[2,3]])');
