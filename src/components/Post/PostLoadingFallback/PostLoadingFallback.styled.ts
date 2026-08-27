import styled from 'styled-components';
import theme from '@styles/theme';
import type { FeedMenuType } from '@type/feed';

interface ContainerProps {
	$feedType: FeedMenuType;
	$isVisible: boolean;
}

const POST_FALLBACK_HEIGHT: Record<FeedMenuType, string> = {
	normal: '565px',
	collect: '609px',
	scheduling: '580px',
};

export const Container = styled.div<ContainerProps>`
	display: flex;
	flex-direction: column;
	width: 680px;
	height: ${({ $feedType }) => POST_FALLBACK_HEIGHT[$feedType]};
	gap: ${theme.units.spacing.space32};
	visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
`;

export const EditorBlock = styled.div`
	height: 278px;
`;

export const CollectHeader = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space12};
`;

export const Actions = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: ${theme.units.spacing.space16};
`;

export const CalendarSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 508px;
	gap: ${theme.units.spacing.space28};
`;

export const CalendarContent = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.units.spacing.space12};
`;
