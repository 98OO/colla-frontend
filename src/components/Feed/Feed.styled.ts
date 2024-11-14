import { styled } from 'styled-components';
import { editorStyles } from '@styles/editorStyles';
import theme from '@styles/theme';

export const FeedContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space24};
	width: 680px;
	padding: ${theme.units.spacing.space24};
	border-radius: ${theme.units.radius.radius12};
	box-shadow: ${theme.elevation.shadow.shadow4};
	margin-bottom: ${theme.units.spacing.space32};
`;

export const DetailWrapper = styled.div`
	${editorStyles}

	padding: ${theme.units.spacing.space16} 0;
	min-height: 50px;
	max-height: 400px;
	position: relative;
	overflow: hidden;

	&:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: calc(20%);
		background: linear-gradient(
			to bottom,
			transparent,
			${theme.color.bg.primary}
		);
		pointer-events: none;
	}
`;

export const SectionHeader = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	button {
		height: 20px;
		padding: 0px;
	}
`;

export const SectionContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${theme.units.spacing.space6} 0;
	gap: ${theme.units.spacing.space8};
`;

export const AttachmentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space12};
	padding-top: ${theme.units.spacing.space12};
`;
