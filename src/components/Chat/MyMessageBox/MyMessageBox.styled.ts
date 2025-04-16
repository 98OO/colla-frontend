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
	padding: ${(props) =>
		props.type === 'TEXT'
			? `${theme.units.spacing.space10} ${theme.units.spacing.space14}`
			: `${theme.units.spacing.space10} 0 0 0`};
	background-color: ${(props) =>
		props.type === 'TEXT' ? theme.color.bg.iPrimary : 'none'};
	border-radius: ${(props) =>
		props.state
			? `${theme.units.radius.radius20} 0 ${theme.units.radius.radius20} ${theme.units.radius.radius20}`
			: theme.units.radius.radius20};
	max-width: 564px;
	line-height: 18px;
	word-break: break-all;
	white-space: pre-wrap;
`;

export const MyMessageBoxSpacer = styled.div`
	flex-shrink: 0;
	width: 42px;
	min-width: 42px;
`;

export const TimeWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	flex-shrink: 0;
	min-width: 54px;
	flex-direction: column;
	align-items: flex-end;
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
