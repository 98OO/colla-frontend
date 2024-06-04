import styled from 'styled-components';
import theme from '@styles/theme';

export const OtherMessageBoxContainer = styled.div`
	display: flex;
	width: 100%;
	padding: ${theme.units.spacing.space2} 0;
	gap: ${theme.units.spacing.space8};
`;

export const OtherMessageBoxWrapper = styled.div<{ state: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${theme.units.spacing.space12} ${theme.units.spacing.space16};
	background-color: ${theme.color.bg.secondary};
	border-radius: ${(props) =>
		props.state
			? `0 ${theme.units.radius.radius20} ${theme.units.radius.radius20} ${theme.units.radius.radius20}`
			: theme.units.radius.radius20};
`;
