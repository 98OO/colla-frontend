import { styled } from 'styled-components';
import { editorStyles } from '@styles/editorStyles';
import theme from '@styles/theme';

export const FeedContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space24};
	height: calc(100% - 64px); // 64 : menu height
	overflow: auto;
	padding: ${theme.units.spacing.space24} ${theme.units.spacing.space32};

	&::-webkit-scrollbar {
		width: 4px;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: ${theme.units.radius.radius20};
		background: ${theme.color.border.secondary};
	}
`;

export const DetailWrapper = styled.div`
	${editorStyles}
`;

export const AttachmentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space12};
	padding-top: ${theme.units.spacing.space12};
`;

export const ImageGrid = styled.div`
	display: flex;
	justify-content: center;
	max-width: 630px;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const CommentContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${theme.units.spacing.space12} ${theme.units.spacing.space8};
	gap: ${theme.units.spacing.space24};
`;

export const FeedDetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space24};
	width: 680px;
	height: 100%;
	padding: ${theme.units.spacing.space24};
	border-radius: ${theme.units.radius.radius8};
	overflow-y: scroll;

	&::-webkit-scrollbar {
		width: 4px;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: ${theme.units.radius.radius20};
		background: ${theme.color.border.secondary};
	}
`;
