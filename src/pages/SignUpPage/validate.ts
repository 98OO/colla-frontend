export interface ValidationErrors {
	[key: string]: string;
}

interface FormData {
	username: string;
	email: string;
	password: string;
	verifyCode: string;
	verified: boolean;
	confirmPassword: string;
}

export const validate = ({
	username,
	email,
	password,
	verifyCode,
	verified,
	confirmPassword,
}: FormData): ValidationErrors => {
	const errors: ValidationErrors = {};

	if (!username.trim()) {
		errors.username = '닉네임을 입력하세요.';
	}

	if (!email.trim()) {
		errors.email = '이메일을 입력하세요.';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
		errors.email = '유효한 이메일을 입력하세요.';
	}

	if (!verifyCode.trim()) {
		errors.verfiyCode = '인증번호를 입력하세요.';
	} else if (!verified) {
		errors.verfiyCode = '인증번호를 확인해주세요.';
	}

	if (!password.trim()) {
		errors.password = '비밀번호를 입력하세요.';
	} else if (password.length < 8) {
		errors.password = '비밀번호는 8자 이상이어야 합니다.';
	} else if (!/^(?=.*[A-Za-z])(?=.*\d).*$/.test(password)) {
		errors.password = '비밀번호는 영문자와 숫자를 포함해야 합니다.';
	}

	if (!confirmPassword.trim()) {
		errors.confirmPassword = '비밀번호 확인을 입력하세요.';
	} else if (confirmPassword !== password) {
		errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
	}

	return errors;
};
