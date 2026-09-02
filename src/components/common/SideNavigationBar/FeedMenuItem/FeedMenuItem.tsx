import { ReactComponent as CollectPostIcon } from '@assets/svg/collect.svg';
import { ReactComponent as NormalPostIcon } from '@assets/svg/normal.svg';
import { ReactComponent as SchedulingPostIcon } from '@assets/svg/scheduling.svg';
import Icon from '@components/common/Icon/Icon';
import Text from '@components/common/Text/Text';
import type { FeedMenuType } from '@type/feed';
import type { IconComponent } from '@type/icon';
import * as S from './FeedMenuItem.styled';

type MenuMap = Record<FeedMenuType, [IconComponent, string]>;

const MENU_MAP: MenuMap = {
	normal: [NormalPostIcon, '일반 게시글'],
	scheduling: [SchedulingPostIcon, '일정 조율'],
	// vote: ['Vote', '투표'],
	collect: [CollectPostIcon, '자료 수집'],
};

interface FeedMenuItemProps {
	menu: FeedMenuType;
	onClick: () => void;
}

const FeedMenuItem = ({ menu, onClick }: FeedMenuItemProps) => {
	return (
		<S.FeedMenuItemContainer onClick={onClick}>
			<Icon icon={MENU_MAP[menu][0]} color='iSecondary' />
			<Text size='md' weight='medium'>
				{MENU_MAP[menu][1]}
			</Text>
		</S.FeedMenuItemContainer>
	);
};

export default FeedMenuItem;
