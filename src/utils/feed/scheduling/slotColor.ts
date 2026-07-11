const SLOT_BASE_COLOR = { r: 84, g: 151, b: 255 };
const MIN_COLOR_RATIO = 0.15;
const EMPTY_SLOT_COLOR = 'rgb(255, 255, 255)';

const adjustBrightness = (colorValue: number, ratio: number) =>
	Math.min(255, Math.max(0, colorValue + (255 - colorValue) * (1 - ratio)));

export const getSlotColor = (numOfParticipants: number, availableCount: number): string => {
	if (numOfParticipants === 0 || availableCount === 0) return EMPTY_SLOT_COLOR;

	const ratio = Math.max(availableCount / numOfParticipants, MIN_COLOR_RATIO);

	const r = adjustBrightness(SLOT_BASE_COLOR.r, ratio);
	const g = adjustBrightness(SLOT_BASE_COLOR.g, ratio);
	const b = adjustBrightness(SLOT_BASE_COLOR.b, ratio);

	return `rgb(${r}, ${g}, ${b})`;
};
