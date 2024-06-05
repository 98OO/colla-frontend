import styled, { css } from 'styled-components';
import theme from '@styles/theme';
import type { MenuItemProps } from './MenuItem';

export const MenuItemContainer = styled.button<
	Omit<MenuItemProps, 'leadingIcon' | 'title'>
>`
	display: flex;
	height: 40px;
	align-items: center;
	border: none;
	background-color: transparent;
	border-radius: ${theme.units.radius.radius4};
	gap: ${theme.units.spacing.space8};

	${({ type }) =>
		type === 'default'
			? css({
					width: '208px',
					padding: `0 ${theme.units.spacing.space12}`,
				})
			: css({
					width: '40px',
					padding: `0 ${theme.units.spacing.space8}`,
					position: 'relative',

					'& > div': {
						position: 'absolute',
						top: '8px',
						right: '8px',
					},
				})};

	&:hover {
		background-color: ${theme.color.bg.iSecondaryHover};
		cursor: pointer;
	}
`;

export const MenuItemTextWrapper = styled.div`
	display: flex;
	flex: 1;
`;
