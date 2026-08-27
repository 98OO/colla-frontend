import * as S from './SchedulingFeedPreview.styled';

interface SchedulingFeedPreviewProps {
	height: number;
}

const SchedulingFeedPreview = ({ height }: SchedulingFeedPreviewProps) => {
	return (
		<S.Preview $height={height} aria-hidden>
			<S.Header />
			<S.ScheduleGrid />
			<S.Footer />
		</S.Preview>
	);
};

export default SchedulingFeedPreview;
