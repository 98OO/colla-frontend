import * as S from './SchedulingFeedPreview.styled';

interface SchedulingFeedPreviewProps {
	height: number;
}

const SchedulingFeedPreview = ({ height }: SchedulingFeedPreviewProps) => {
	return (
		<S.Preview $height={height} aria-hidden>
			<S.Author>
				<S.Avatar />
				<S.AuthorLines />
			</S.Author>
			<S.Title />
			<S.ScheduleHeader />
			<S.ScheduleGrid />
		</S.Preview>
	);
};

export default SchedulingFeedPreview;
