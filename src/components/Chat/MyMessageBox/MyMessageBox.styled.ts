import styled from 'styled-components';
import theme from '@styles/theme';

export const MyMessageBoxContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-end;
	padding-top: ${theme.units.spacing.space6};
	gap: ${theme.units.spacing.space8};
`;

export const MyMessageBoxWrapper = styled.div<{ state: boolean; type: string }>`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${theme.units.spacing.space10} ${theme.units.spacing.space14};
	background-color: ${(props) =>
		props.type === 'TEXT' ? theme.color.bg.iPrimary : 'none'};
	border-radius: ${(props) =>
		props.state
			? `${theme.units.radius.radius20} 0 ${theme.units.radius.radius20} ${theme.units.radius.radius20}`
			: theme.units.radius.radius20};
	max-width: 250px;
	line-height: 18px;
	word-break: break-all;
	white-space: pre-line;
`;

export const ImageWrapper = styled.div`
	display: flex;
	gap: ${theme.units.spacing.space10};

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;
