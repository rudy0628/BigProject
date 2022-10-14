import React, { useEffect, useReducer, useCallback } from 'react';

const initialInputState = {
	value: '',
	isTouched: false,
};

const inputStateReducer = (state: any, action: any) => {
	if (action.type === 'INPUT') {
		return { value: action.value, isTouched: state.isTouched };
	}

	if (action.type === 'BLUR') {
		return { value: state.value, isTouched: true };
	}

	if (action.type === 'RESET') {
		return { value: '', isTouched: false };
	}
};

const useInput = (
	validateValue: (value: any) => boolean,
	initialValue: any
) => {
	const [inputState, dispatch] = useReducer(
		inputStateReducer,
		initialInputState
	);

	const valueIsValid = validateValue(inputState!.value);
	const hasError = !valueIsValid && inputState?.isTouched;

	useEffect(() => {
		dispatch({ type: 'INPUT', value: initialValue });
	}, [initialValue]);

	const valueChangeHandler = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			dispatch({ type: 'INPUT', value: e.target.value });
		},
		[]
	);

	const inputBlurHandler = useCallback(() => {
		dispatch({ type: 'BLUR' });
	}, []);

	const reset = useCallback(() => {
		dispatch({ type: 'RESET' });
	}, []);

	return {
		value: inputState?.value,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		reset,
	};
};

export default useInput;
