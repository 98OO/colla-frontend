const adjustBrightness = (colorValue: number, ratio: number) => {
	return Math.min(255, Math.max(0, colorValue + (255 - colorValue) * (1 - ratio)));
};

export const getSlotColor = (totalParticipants: number, availability: number): string => {
	const baseColor = { r: 84, g: 151, b: 255 };

	const ratio = availability / totalParticipants;

	const adjustedR = adjustBrightness(baseColor.r, ratio);
	const adjustedG = adjustBrightness(baseColor.g, ratio);
	const adjustedB = adjustBrightness(baseColor.b, ratio);

	return `rgb(${adjustedR}, ${adjustedG}, ${adjustedB})`;
};
