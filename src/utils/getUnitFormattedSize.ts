export const getUnitFormattedSize = (size: number) => {
	const units = ['B', 'KB', 'MB', 'GB'];
	let formattedSize = size;
	let unitIndex = 0;

	while (formattedSize >= 1024 && unitIndex < units.length - 1) {
		formattedSize /= 1024;
		unitIndex += 1;
	}

	return `${formattedSize.toFixed(2)} ${units[unitIndex]}`;
};
