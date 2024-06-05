import { styled } from 'styled-components';
import theme from '@styles/theme';

export const FeedContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space24};
	width: 680px;
	padding: ${theme.units.spacing.space24};
	border-radius: ${theme.units.radius.radius12};
	box-shadow: ${theme.elevation.shadow.shadow8};
	margin-bottom: ${theme.units.spacing.space32};
`;

export const DetailWrapper = styled.div`
	padding: ${theme.units.spacing.space16} 0;
	min-height: 50px;
	max-height: 200px;
	position: relative;
	overflow: hidden;

	&:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: calc(100% - 140px);
		background: linear-gradient(
			to bottom,
			transparent,
			${theme.color.bg.primary}
		);
		pointer-events: none;
	}
`;

export const CommentContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${theme.units.spacing.space12} ${theme.units.spacing.space8};
	gap: ${theme.units.spacing.space12};

	button {
		height: 20px;
		padding: 0px;
	}
`;

export const AttachmentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space12};
	padding-top: ${theme.units.spacing.space12};
`;

export const ImageGrid = styled.div<{ count: number }>`
	display: grid;
	grid-template-columns: ${(props) =>
		props.count === 1 ? '1fr' : 'repeat(2, 1fr)'};
	gap: 20px;
	max-width: 630px;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const ImgContainer = styled.div<{ count: number; index: number }>`
	position: relative;

	&:hover {
		.moreText {
			display: ${(props) =>
				props.count >= 3 && props.index === 1 ? 'block' : 'none'};
		}
	}
`;

export const ImgWrapper = styled.div<{ count: number; index: number }>`
	filter: ${(props) =>
		props.count >= 3 && props.index === 1 ? 'brightness(0.5)' : 'none'};
`;

export const MoreButton = styled.button`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: transparent;
	border: none;
	font-size: 16px;
	color: ${theme.color.text.subtle};
`;

export const FeedDetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space24};
	width: 100%;
	max-height: 80vh;
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
