import styled from 'styled-components';
import theme from '@styles/theme';

export const OtherMessageBoxContainer = styled.div<{
	state: boolean;
}>`
	display: flex;
	width: 100%;
	padding-top: ${(props) =>
		props.state
			? `${theme.units.spacing.space16}`
			: `${theme.units.spacing.space6}`};
	gap: ${theme.units.spacing.space8};
`;

export const OtherMessageBoxWrapper = styled.div<{
	state: boolean;
	type: string;
}>`
	display: flex;
	align-items: center;
	justify-content: center;

	padding: ${(props) =>
		props.type === 'TEXT'
			? `${theme.units.spacing.space10} ${theme.units.spacing.space14}`
			: `${theme.units.spacing.space10} 0 0 0`};
	background-color: ${(props) =>
		props.type === 'TEXT' ? theme.color.bg.secondary : 'none'};
	border-radius: ${(props) =>
		props.state
			? `0 ${theme.units.radius.radius20} ${theme.units.radius.radius20} ${theme.units.radius.radius20}`
			: theme.units.radius.radius20};

	max-width: 564px;
	line-height: 18px;
	word-break: break-all;
	white-space: pre-line;
`;

export const OtherMessageBoxSpacer = styled.div`
	flex-shrink: 0;
	width: 42px;
	min-width: 42px;
`;

export const TimeWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	flex-shrink: 0;
	width: 54px;
	min-width: 54px;
	flex-direction: column;
	align-items: flex-start;
`;

export const AvatarSpacer = styled.div`
	flex-shrink: 0;
	width: 32px;
	min-width: 32px;
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
