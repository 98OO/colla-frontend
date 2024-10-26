import { useEffect, useState } from 'react';

interface FormOption {
	subscribe?: { fieldName: string; value: string | boolean }[];
	onSubmit: () => void;
}

interface FormData {
	[fieldName: string]: string;
}

interface ValidationOptions {
	required?: string;
	length?: { min?: number; max?: number; message: string };
	pattern?: { regExp: RegExp; message: string };
	validate?: {
		validateFn: (value: string) => boolean;
		message: string;
	};
}

interface FieldValidations {
	[fieldName: string]: ValidationOptions;
}

interface FieldError {
	[fieldName: string]: {
		isError: boolean;
		message: string;
	};
}

interface EventHandlers {
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
const fieldValidations: FieldValidations = {};

function useForm(options: FormOption) {
	const [formData, setFormData] = useState<FormData>({});
	const [errors, setErrors] = useState<FieldError>({});
	const [submitting, setSubmitting] = useState(false);

	const { subscribe, onSubmit } = options;
	const subscribeValues = subscribe
		? subscribe.map((item) => item.value).join(',')
		: null;

	const setFieldError = (
		fieldName: string,
		isError: boolean,
		message: string
	) => {
		setErrors((prevErrors) => ({
			...prevErrors,
			[fieldName]: { isError, message },
		}));
	};

	const validateField = (fieldName: string) => {
		const value = formData[fieldName];
		const validationOptions = fieldValidations[fieldName];

		if (validationOptions) {
			const { required, length, pattern, validate } = validationOptions;
			if (required && !value) setFieldError(fieldName, true, required);
			else if (
				length &&
				((length.min && value.length < length.min) ||
					(length.max && value.length > length.max))
			) {
				setFieldError(fieldName, true, length.message);
			} else if (pattern && !pattern.regExp.test(value)) {
				setFieldError(fieldName, true, pattern.message);
			} else if (validate && !validate.validateFn(value)) {
				setFieldError(fieldName, true, validate.message);
			} else setFieldError(fieldName, false, '');
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		validateField(e.target.name);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitting(true);

		let hasError = false;
		Object.keys(fieldValidations).forEach((fieldName) => {
			validateField(fieldName); // validateField가 값을 리턴하도록 하여 검사
			if (errors[fieldName]?.isError) hasError = true;
		});

		if (!hasError) onSubmit();
	};

	const register = (
		name: string,
		validationOptions: ValidationOptions = {},
		enableBlur: boolean = true
	) => {
		fieldValidations[name] = validationOptions;
		const value = formData[name] || '';
		const eventHandlers: EventHandlers = {
			name,
			value,
			onChange: handleChange,
		};

		if (enableBlur) eventHandlers.onBlur = handleBlur;

		return eventHandlers;
	};

	const watch = (name: string) => {
		return formData[name];
	};

	useEffect(() => {
		if (submitting) {
			if (Object.keys(errors).length === 0) {
				onSubmit();
			}
			setSubmitting(false);
		}
	}, [errors]);

	useEffect(() => {
		if (Object.keys(errors).length > 0 && options.subscribe) {
			options.subscribe.forEach(({ fieldName }) => {
				validateField(fieldName);
			});
		}
	}, [subscribeValues]);

	return {
		formData,
		submitting,
		errors,
		register,
		handleSubmit,
		watch,
	};
}

export default useForm;
