const assertNever = (_value: never, message: string): never => {
	throw new Error(message);
};

export default assertNever;
