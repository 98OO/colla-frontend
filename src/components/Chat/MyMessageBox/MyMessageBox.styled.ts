import styled from 'styled-components';
import theme from '@styles/theme';

export const MyMessageBoxContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-end;
	padding: ${theme.units.spacing.space2} 0;
	gap: ${theme.units.spacing.space8};
`;

export const MyMessageBoxWrapper = styled.div<{ state: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;

	padding: ${theme.units.spacing.space12} ${theme.units.spacing.space16};
	background-color: ${theme.color.bg.iPrimary};
	border-radius: ${(props) =>
		props.state
			? `${theme.units.radius.radius20} 0 ${theme.units.radius.radius20} ${theme.units.radius.radius20}`
			: theme.units.radius.radius20};

	max-width: 250px;
	line-height: 18px;
`;
