import { getSlotColor } from '@utils/feed/scheduling/slotColor';

interface AvailabilityRange {
	startIndex: number;
	endIndex: number;
	availableCount: number;
}

const mergeConsecutiveSegmentsByAvailableCount = (segments: number[]): AvailabilityRange[] =>
	segments.reduce<AvailabilityRange[]>((ranges, availableCount, index) => {
		const previousRange = ranges[ranges.length - 1];

		if (previousRange?.availableCount === availableCount) {
			previousRange.endIndex = index + 1;
			return ranges;
		}

		ranges.push({ startIndex: index, endIndex: index + 1, availableCount });
		return ranges;
	}, []);

export const toAvailabilityGradient = (
	segments: number[],
	numOfParticipants: number,
	slotHeight: number
): string | undefined => {
	if (segments.length === 0) return undefined;

	const availabilityRanges = mergeConsecutiveSegmentsByAvailableCount(segments);

	const gradientColorRanges = availabilityRanges.map(({ startIndex, endIndex, availableCount }) => {
		const color = getSlotColor(numOfParticipants, availableCount);
		return `${color} ${startIndex * slotHeight}px ${endIndex * slotHeight}px`;
	});

	return `linear-gradient(to bottom, ${gradientColorRanges.join(', ')})`;
};
