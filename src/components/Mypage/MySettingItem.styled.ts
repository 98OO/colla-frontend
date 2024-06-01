import { styled } from 'styled-components';
import theme from '@styles/theme';

export const MySettingInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 650px;

	gap: ${theme.units.spacing.space10};

	@media (max-width: 1440px) {
		width: 530px;
	}
`;
