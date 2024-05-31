import styled from 'styled-components';
import theme from '@styles/theme';
import type { SelectContainerProps } from './Select';

const selectSizeMap = {
	lg: '48px',
	md: '40px',
	sm: '32px',
};

export const SelectContainer = styled.div<SelectContainerProps>`
	width: 100%;
	position: relative;
	height: ${(props) => selectSizeMap[props.size]};
	border-radius: ${theme.units.radius.radius4};
	background-color: ${theme.color.bg.primary};
	border: 1px solid ${theme.color.border.primary};
`;

export const ButtonWrapper = styled.button`
	width: 100%;
	height: 100%;
	border: none;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: transparent;
	border-radius: ${theme.units.radius.radius4};
	padding: ${theme.units.spacing.space8};
`;

export const SelectOptionContainer = styled.ul`
	width: 100%;
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 110%;
	z-index: ${theme.elevation.zIndex.MENU};
	gap: ${theme.units.spacing.space4};
	border: 1px solid ${theme.color.border.tertiary};
	background-color: ${theme.color.bg.primary};
	border-radius: ${theme.units.radius.radius4};
	padding: ${theme.units.spacing.space8} ${theme.units.spacing.space2};
	box-shadow: ${theme.elevation.shadow.shadow4};
`;

export const SelectOptionWrapper = styled.li`
	display: flex;
	align-items: center;
	height: 28px;
	justify-content: space-between;
	border-radius: ${theme.units.radius.radius4};
	font-size: ${theme.typography.fontSize.body.md};
	font-weight: ${theme.typography.fontWeight.medium};
	color: ${theme.color.text.primary};
	padding: 0 ${theme.units.spacing.space12};

	&:hover {
		background-color: ${theme.color.bg.iSecondaryHover};
	}
`;
