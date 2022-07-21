import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';
import { FunctionHeaderItem, NumberNode } from '../../../types/SyntaxTreeNodes';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import createNumberNode from '../../../create/create-number-node';

const fibPlugin = createPlugin('core/fib');

addPluginAuthor(fibPlugin, 'core');
addPluginDescription(fibPlugin, 'Provides a funtion to calculate the nth fibonacci number.');

const fibHeader: FunctionHeaderItem[] = [{ name: 'n', type: 'number', evaluate: true }];

addPluginFunction(
    fibPlugin,
    createPluginFunction(
        'fib',
        fibHeader,
        'calculates the nth fibonacci number',
        'Berechnet die nte Fibonacci Zahl.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame('fib', parameters, fibHeader, context);
            const n = (<NumberNode>parameterStackFrame['n']).value;

            if (n % 1 !== 0) {
                throw 'RuntimeError: fib: only integers are allowed';
            }

            if (n <= 0) {
                throw 'RuntimeError: fib: number has to 1 or greater';
            }

            return createNumberNode(fib(n));
        },
    ),
);

export default fibPlugin;
