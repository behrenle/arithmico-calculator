import createFunctionCall from '../../../create/create-function-call';
import createVector from '../../../create/create-vector';
import evaluate from '../../../eval';
import { FunctionHeaderItem, FunctionNode, SyntaxTreeNode, Vector } from '../../../types';
import { mapParametersToStackFrame } from '../../../utils/parameter-utils';
import {
    addPluginAuthor,
    addPluginDescription,
    addPluginFunction,
    createPlugin,
    createPluginFunction,
} from '../../../utils/plugin-builder';

const listmodPlugin = createPlugin('listmod');
addPluginAuthor(listmodPlugin, 'core');
addPluginDescription(listmodPlugin, 'modify lists');

const functionAndListHeader: FunctionHeaderItem[] = [
    { name: 'f', type: 'function', evaluate: true },
    { name: 'l', type: 'vector', evaluate: true },
];

addPluginFunction(
    listmodPlugin,
    createPluginFunction(
        'list:filter',
        functionAndListHeader,
        'Filter a list l with a filter function f',
        'Filter eine Liste l mit einer Filterfunktion f',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame(
                'list:filter',
                parameters,
                functionAndListHeader,
                context,
            );
            const filterFunction = <FunctionNode>parameterStackFrame['f'];
            const list = <Vector>parameterStackFrame['l'];
            const resultValues: SyntaxTreeNode[] = [];

            if (filterFunction.header.length !== 1) {
                throw 'TypeError: list:filter: Invalid filter function signature';
            }

            list.values.forEach((value) => {
                const filterResult = evaluate(createFunctionCall(filterFunction, [value]), context);
                if (filterResult.type !== 'boolean') {
                    throw `TypeError: list:filter: Invalid filter function return type. Expected "boolean" got "${filterResult.type}"`;
                }

                if (filterResult.value) {
                    resultValues.push(value);
                }
            });

            return createVector(resultValues);
        },
    ),
);

addPluginFunction(
    listmodPlugin,
    createPluginFunction(
        'list:map',
        functionAndListHeader,
        'Maps each element x of list l to f(x).',
        'Bildet jedes Element x der List l auf f(x) ab.',
        (parameters, context) => {
            const parameterStackFrame = mapParametersToStackFrame(
                'list:map',
                parameters,
                functionAndListHeader,
                context,
            );
            const mapFunction = <FunctionNode>parameterStackFrame['f'];
            const list = <Vector>parameterStackFrame['l'];
            const resultValues: SyntaxTreeNode[] = [];

            if (mapFunction.header.length !== 1) {
                throw 'TypeError: list:map: Invalid map function signature';
            }

            list.values.forEach((value) => {
                const mapResult = evaluate(createFunctionCall(mapFunction, [value]), context);
                resultValues.push(mapResult);
            });

            return createVector(resultValues);
        },
    ),
);

export default listmodPlugin;
