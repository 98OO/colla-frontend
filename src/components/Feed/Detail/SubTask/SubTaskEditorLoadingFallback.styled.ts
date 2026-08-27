import styled from 'styled-components';
import theme from '@styles/theme';

export const Container = styled.div<{ $isVisible: boolean }>`
	display: flex;
	flex-direction: column;
	width: 680px;
	height: 413px;
	gap: ${theme.units.spacing.space32};
	visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
`;

export const Actions = styled.div`
	display: flex;
	justify-content: flex-end;
`;
