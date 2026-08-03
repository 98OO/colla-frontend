import styled from 'styled-components';
import theme from '@styles/theme';

export const Container = styled.div`
	display: flex;
	align-items: center;

	padding: ${theme.units.spacing.space2};
	border-radius: ${theme.units.radius.radius6};
	background-color: ${theme.color.bg.iSecondary};
`;

export const PendingIndicator = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		animation: rotate 1s linear infinite;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
`;
