export const makeSlotId = (date: string, index: number, offset = 0) => `${date}:${index + offset}`;

export const parseSlotId = (slotId: string): { date: string; segment: number } => {
	const [date, segment] = slotId.split(':');

	return { date, segment: Number(segment) };
};
