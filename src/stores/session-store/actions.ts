import evaluate, { getDefaultContext } from '@behrenle/number-cruncher';
import { Options } from '@behrenle/number-cruncher/lib/types';
import { createOptions } from '@behrenle/number-cruncher/lib/utils/context-utils';
import { MathItem, SessionState } from './types';

function getDecimalSeparator(language: string, numberFormat: string) {
  if (numberFormat === 'default') {
    if (language === 'de') {
      return ',';
    }
    return '.';
  } else {
    if (numberFormat === 'de') {
      return ',';
    }
    return '.';
  }
}

export function evaluateInput(state: SessionState): SessionState {
  if (state.input === '') {
    return { ...state };
  }

  const newIndex = state.protocol.filter((item) => item.type === 'math').length;

  try {
    const result = evaluate(state.input, {
      stack: state.stack,
      options: createOptions({
        decimalSeparator: getDecimalSeparator(state.language, state.numberFormat),
        magnitudeThresholdForScientificNotation: state.decimalPlaces,
        decimalPlaces: state.decimalPlaces,
        angleUnit: state.angleUnit as Options['angleUnit']
      })
    });
    return {
      ...state,
      historyIndex: newIndex,
      outputResetted: false,
      protocol: [
        ...state.protocol,
        {
          type: 'math',
          error: false,
          input: state.input,
          output: result.result
        }
      ],
      stack: result.context.stack
    };
  } catch (error) {
    return {
      ...state,
      historyIndex: newIndex,
      outputResetted: false,
      protocol: [
        ...state.protocol,
        {
          type: 'math',
          error: true,
          input: state.input,
          output: error as string
        }
      ]
    };
  }
}

export function resetDefinitions(state: SessionState): SessionState {
  return {
    ...state,
    stack: getDefaultContext().stack,
    protocol: [...state.protocol, { type: 'info', info: 'reset definitions' }]
  };
}

export function goBackInInputHistory(state: SessionState): SessionState {
  const mathItems = <MathItem[]>state.protocol.filter((item) => item.type === 'math');
  const newIndex = state.historyIndex - 1;
  if (newIndex < 0) {
    return state;
  }

  return {
    ...state,
    historyIndex: newIndex,
    input: mathItems[newIndex].input
  };
}

export function goForwardInInputHistory(state: SessionState): SessionState {
  const mathItems = <MathItem[]>state.protocol.filter((item) => item.type === 'math');
  const newIndex = state.historyIndex + 1;
  if (newIndex > mathItems.length) {
    return state;
  }

  return {
    ...state,
    historyIndex: newIndex,
    input: newIndex === mathItems.length ? '' : mathItems[newIndex].input
  };
}
