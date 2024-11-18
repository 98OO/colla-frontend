import * as S from './ProgressChip.styled';

type progressType =
	| 'DEFALUT'
	| 'REQUEST'
	| 'PENDING'
	| 'FEEDBACK'
	| 'COMPLETED';

export interface progressChipProps {
	type: progressType;
	status: boolean;
}

const getProgressText = (type: progressType) => {
	switch (type) {
		case 'REQUEST':
			return '요청';
		case 'PENDING':
			return '진행';
		case 'FEEDBACK':
			return '피드백';
		case 'COMPLETED':
			return '완료';
		default:
			return '';
	}
};

const ProgressChip = (props: progressChipProps) => {
	const { type, status } = props;

	return (
		<S.ProgressChipContainer type={type} status={status}>
			{getProgressText(type)}
		</S.ProgressChipContainer>
	);
};

export default ProgressChip;
