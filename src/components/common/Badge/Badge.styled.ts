import styled, { css } from 'styled-components';
import theme from '@styles/theme';
import type { BadgeProps } from './Badge';

const badgeBackGroundColor = {
	info: `${theme.color.bg.info}`,
	warning: `${theme.color.bg.warning}`,
	success: `${theme.color.bg.success}`,
	important: `${theme.color.bg.danger}`,
};

const badgeFontColor = {
	info: `${theme.color.text.infoBold}`,
	warning: `${theme.color.text.warningBold}`,
	success: `${theme.color.text.successBold}`,
	important: `${theme.color.text.dangerBold}`,
};

export const BadgeContainer = styled.div.withConfig({
	shouldForwardProp: (prop) => !['status'].includes(prop),
})<BadgeProps>`
	border-radius: ${theme.units.radius.full};
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: ${theme.typography.fontSize.body.sm};
	font-weight: ${theme.typography.fontWeight.regular};

	${({ type, status }) =>
		type === 'dot' || type === 'number'
			? css`
					background-color: ${badgeBackGroundColor[status]};
					color: ${theme.color.text.iInverse};
				`
			: css`
					color: ${badgeFontColor[status]};
				`}

	${({ type }) =>
		type === 'dot'
			? css({
					width: '4px',
					height: '4px',
				})
			: css({
					width: '38px',
					height: '18px',
					padding: `${theme.units.spacing.space2} ${theme.units.spacing.space4}`,
				})};
`;
