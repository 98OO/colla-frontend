import styled from 'styled-components';
import theme from '@styles/theme';

export const OtherMessageBoxContainer = styled.div`
	display: flex;
	width: 100%;
	padding-top: ${theme.units.spacing.space4};
	gap: ${theme.units.spacing.space8};
`;

export const OtherMessageBoxWrapper = styled.div<{
	state: boolean;
	type: string;
}>`
	display: flex;
	align-items: center;
	justify-content: center;

	padding: ${theme.units.spacing.space12} ${theme.units.spacing.space16};
	background-color: ${(props) =>
		props.type === 'TEXT' ? theme.color.bg.secondary : 'none'};
	border-radius: ${(props) =>
		props.state
			? `0 ${theme.units.radius.radius20} ${theme.units.radius.radius20} ${theme.units.radius.radius20}`
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
