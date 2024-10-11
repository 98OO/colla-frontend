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

export const ChattingInputContainer = styled.div`
	height: 128px;
	border: 1px solid ${theme.color.border.secondary};
	border-radius: ${theme.units.radius.radius12};
	display: flex;
	flex-direction: column;
	padding: ${theme.units.spacing.space12};
`;

export const ChattingInputWrapper = styled.textarea`
	border: none;
	outline: none;
	flex-grow: 1;
	resize: none;
	word-wrap: break-word;
	white-space: pre-wrap;
	font-size: ${theme.typography.fontSize.body.lg};

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

	padding: ${theme.units.spacing.space4} ${theme.units.spacing.space8};
	background-color: ${theme.color.bg.tertiary};
	border: 1px solid ${theme.color.border.secondary};
	border-radius: ${theme.units.radius.radius8};
`;

export const ImgUploadWrapper = styled.input`
	display: none;
`;

export const LatestMessageContainer = styled.div`
	display: flex;
	position: absolute;
	cursor: pointer;
	height: 34px;
	left: 22px;
	opacity: 0.9;
	width: calc(100% - 44px);
	top: calc(100% - 175px);

	padding: 0 ${theme.units.spacing.space10};
	border: 1px solid ${theme.color.border.primary};
	border-radius: ${theme.units.radius.radius8};
	z-index: ${theme.elevation.zIndex.MODAL};
	background-color: ${theme.color.bg.iSecondary};

	&:hover {
		background-color: ${theme.color.bg.iSecondaryHover};

		div {
			background-color: ${theme.color.bg.iSecondaryHover};
		}
	}
`;

export const MessageEndWrapper = styled.div`
	height: 1px;
`;
