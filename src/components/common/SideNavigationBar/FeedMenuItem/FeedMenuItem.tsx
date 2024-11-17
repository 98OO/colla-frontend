import Icon from '@components/common/Icon/Icon';
import Text from '@components/common/Text/Text';
import type { FeedMenuType } from '@type/feed';
import type { iconName } from '@type/tokens';
import * as S from './FeedMenuItem.styled';

type MenuMap = Record<FeedMenuType, [iconName, string]>;

const MENU_MAP: MenuMap = {
	normal: ['Normal', '일반 게시글'],
	scheduling: ['Scheduling', '일정 조율'],
	// vote: ['Vote', '투표'],
	collect: ['Collect', '자료 수집'],
};

interface FeedMenuItemProps {
	menu: FeedMenuType;
	onClick: () => void;
}

const FeedMenuItem = ({ menu, onClick }: FeedMenuItemProps) => {
	return (
		<S.FeedMenuItemContainer onClick={onClick}>
			<Icon name={MENU_MAP[menu][0]} color='iSecondary' />
			<Text size='md' weight='medium'>
				{MENU_MAP[menu][1]}
			</Text>
		</S.FeedMenuItemContainer>
	);
};

export default FeedMenuItem;
