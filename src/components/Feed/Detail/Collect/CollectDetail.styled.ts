import { styled } from 'styled-components';
import { editorStyles } from '@styles/editorStyles';
import theme from '@styles/theme';

export const FeedContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space24};
	height: calc(100% - 64px);
	overflow: auto;
	padding: ${theme.units.spacing.space12} ${theme.units.spacing.space32};
	padding-bottom: 0;
	overflow-x: hidden;

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

export const SectionContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${theme.units.spacing.space12} 0;
	gap: ${theme.units.spacing.space12};
`;
