import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import theme from '@styles/theme';

export const ChattingContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	gap: ${theme.units.spacing.space10};
	padding: ${theme.units.spacing.space10};
	max-height: calc(100vh - 64px);
	position: relative;
`;

export const ChattingListContainer = styled.div`
	flex-grow: 1;
	gap: ${theme.units.spacing.space4};
	padding: 0 ${theme.units.spacing.space12};
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	overflow-x: hidden;

	&::-webkit-scrollbar {
		width: 4px;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: ${theme.units.radius.radius20};
		background: ${theme.color.border.secondary};
	}
`;

export const InfiniteScrollContainer = styled(InfiniteScroll)`
	display: flex;
	flex-direction: column-reverse;
`;

export const ChattingInputContainer = styled.div`
	min-height: 130px;
	border: 1px solid ${theme.color.border.primary};
	border-radius: ${theme.units.radius.radius12};
	display: flex;
	flex-direction: column;
	padding: ${theme.units.spacing.space12} ${theme.units.spacing.space4}
		${theme.units.spacing.space4} ${theme.units.spacing.space4};
`;

export const ChattingInputWrapper = styled.textarea`
	border: none;
	outline: none;
	flex-grow: 1;
	resize: none;
	word-wrap: break-word;
	white-space: pre-wrap;
	color: ${theme.color.text.secondary};
	font-size: ${theme.typography.fontSize.body.lg};
	padding: 0 ${theme.units.spacing.space10};

	&::-webkit-scrollbar {
		width: 4px;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: ${theme.units.radius.radius20};
		background: ${theme.color.border.secondary};
	}
`;

export const ChattingDateWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	padding: ${theme.units.spacing.space4} ${theme.units.spacing.space12};
	border: 1px solid ${theme.color.border.primary};
	border-radius: ${theme.units.radius.radius16};
`;

export const ImgUploadWrapper = styled.input`
	display: none;
`;

export const MessageEndWrapper = styled.div`
	height: 1px;
`;
