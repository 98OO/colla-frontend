import { memo } from 'react';
import SchedulingFeed from '@components/Feed/SchedulingFeed/SchedulingFeed';
import SchedulingFeedPreview from '@components/Feed/SchedulingFeedPreview/SchedulingFeedPreview';
import { AnimatePresence } from 'motion/react';
import type { SchedulingFeed as SchedulingFeedData } from '@type/feed';
import * as S from './SchedulingFeedTransition.styled';
import usePreviewTransition from './usePreviewTransition';

const PREVIEW_FADE_DURATION = 0.12;

interface SchedulingFeedTransitionProps {
	feedData: SchedulingFeedData;
	height: number;
	shouldRenderPreview: boolean;
	onEditChange?: (feedId: number, isEditing: boolean) => void;
}

const SchedulingFeedTransition = memo(
	({ feedData, height, shouldRenderPreview, onEditChange }: SchedulingFeedTransitionProps) => {
		const { shouldKeepPreview, shouldRenderFeed } = usePreviewTransition(shouldRenderPreview);

		return (
			<S.Container style={shouldKeepPreview ? { minHeight: height } : undefined}>
				{!shouldRenderPreview && shouldRenderFeed && (
					<SchedulingFeed feedData={feedData} onEditChange={onEditChange} />
				)}
				<AnimatePresence initial={false}>
					{shouldKeepPreview && (
						<S.PreviewLayer
							key='scheduling-preview'
							initial={{ opacity: 1 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: PREVIEW_FADE_DURATION }}>
							<SchedulingFeedPreview height={height} />
						</S.PreviewLayer>
					)}
				</AnimatePresence>
			</S.Container>
		);
	}
);

SchedulingFeedTransition.displayName = 'SchedulingFeedTransition';

export default SchedulingFeedTransition;
