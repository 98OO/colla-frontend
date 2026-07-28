import { DateManager } from '@utils/common/DateManager';
import { MINUTES_PER_SEGMENT } from './segment';
import { parseSlotId } from './slotId';

export const isPastSlot = (date: string, segment: number, base = new Date()): boolean => {
	const [year, month, day] = date.split('-').map(Number);
	const slotDate = new Date(year, month - 1, day);

	if (DateManager.isPastDate(slotDate, base)) return true;
	if (!DateManager.isToday(slotDate, base)) return false;

	const baseMinutes = base.getHours() * 60 + base.getMinutes();

	return segment * MINUTES_PER_SEGMENT <= baseMinutes;
};

export const excludePastSlots = (selectedSlots: Set<string>, base = new Date()): Set<string> => {
	const validSlots = new Set<string>();

	selectedSlots.forEach((slotId) => {
		const { date, segment } = parseSlotId(slotId);
		if (!isPastSlot(date, segment, base)) validSlots.add(slotId);
	});

	return validSlots;
};

export const isDuePassed = (dueAt: string, base = new Date()): boolean =>
	new Date(dueAt).getTime() <= base.getTime();
