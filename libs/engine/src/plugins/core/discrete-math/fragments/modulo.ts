import { addPluginAuthor, addPluginDescription, createPlugin } from '../../../../utils/plugin-builder';
import { NumberNode } from '../../../../types';
import { FunctionHeaderItem } from '../../../../types/SyntaxTreeNodes';
import createNumberNode from '../../../../create/create-number-node';
import { PluginFragment } from '../../../../utils/plugin-builder-v2';
import { euclideanDivision } from '../utils/euclidean-division';

const moduloPlugin = createPlugin('core/modulo');
addPluginDescription(moduloPlugin, 'adds modulo and integer division');
addPluginAuthor(moduloPlugin, 'core');

const twoNumberHeader: FunctionHeaderItem[] = [
    { name: 'n', type: 'number', evaluate: true },
    { name: 'm', type: 'number', evaluate: true },
];

const moduloFragment = new PluginFragment()
    .addFunction(
        'mod',
        twoNumberHeader,
        'Calculates the remainder of n/m (mathematical variant).',
        'Berechnet den Rest der Division n/m (mathematische Variante).',
        ({ getParameter, runtimeError }) => {
            const n = (<NumberNode>getParameter('n')).value;
            const m = (<NumberNode>getParameter('m')).value;

            if (m === 0) {
                throw runtimeError('Division by zero is not allowed');
            }

            return createNumberNode(((n % m) + m) % m);
        },
    )
    .addFunction(
        'idiv',
        twoNumberHeader,
        'calculates the euclidean division of n/m',
        'Berechnet die euklidische Division von n/m (ganzzahlige Division).',
        ({ getParameter, runtimeError }) => {
            const n = (<NumberNode>getParameter('n')).value;
            const m = (<NumberNode>getParameter('m')).value;

            if (m === 0) {
                throw runtimeError('Division by zero is not allowed');
            }

            return createNumberNode(euclideanDivision(n, m));
        },
    );

export default moduloFragment;