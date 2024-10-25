import { useNavigate } from 'react-router-dom';
import FeedMenuItem from '@components/common/SideNavigationBar/FeedMenuItem/FeedMenuItem';
import { PATH } from '@constants/path';
import type { FeedMenuType } from '@type/feed';
import * as S from './FeedMenu.styled';

interface FeedMenuProps {
	closeMenu: () => void;
}

const MENU_ITEMS: FeedMenuType[] = ['normal', 'scheduling', 'vote', 'collect'];

const FeedMenu = ({ closeMenu }: FeedMenuProps) => {
	const navigate = useNavigate();

	const handleItemClick = (path: FeedMenuType) => {
		navigate(`${PATH.POST}?type=${path}`);
		closeMenu();
	};

	return (
		<S.FeedMenuContainer>
			{MENU_ITEMS.map((menu) => (
				<FeedMenuItem
					key={menu}
					menu={menu}
					onClick={() => handleItemClick(menu)}
				/>
			))}
		</S.FeedMenuContainer>
	);
};

export default FeedMenu;
