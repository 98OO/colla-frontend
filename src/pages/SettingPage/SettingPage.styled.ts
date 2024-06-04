import { styled } from 'styled-components';
import theme from '@styles/theme';

export const Container = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
`;

export const SettingContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 920px;
	gap: ${theme.units.spacing.space10};
	padding: ${theme.units.spacing.space20} ${theme.units.spacing.space10};

	@media (max-width: 1440px) {
		width: 680px;
	}
`;

export const ImgUploadWrapper = styled.input`
	display: none;
`;

export const TeamMemeberHeader = styled.div`
	display: flex;
	height: 48px;
	align-items: center;
	border-bottom: 1px solid ${theme.color.border.secondary};
`;

export const TeamMemberContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 220px;
	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 4px;
		height: 4px;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 20px;
		background: ${theme.color.border.secondary};
	}
`;
