import { useNavigate } from 'react-router-dom';
import { PATH } from '@constants/path';
import type { FeedMenuType } from '@type/feed';
import * as S from './LNB.styled';

interface LNBItemProps {
	label: string;
	active?: boolean;
	onClick: () => void;
}

interface LNBProps {
	selected: FeedMenuType;
}

type LNBItem = { label: string; type: FeedMenuType }[];

const LNB_ITEMS: LNBItem = [
	{ label: '일반 게시글', type: 'normal' },
	{ label: '일정 조율', type: 'scheduling' },
	// { label: '투표', type: 'vote' },
	{ label: '자료 수집', type: 'collect' },
];

const LNBItem = ({ label, active, onClick }: LNBItemProps) => (
	<S.LNBItemContainer active={active} onClick={onClick}>
		{label}
	</S.LNBItemContainer>
);

const LNB = ({ selected }: LNBProps) => {
	const navigate = useNavigate();

	const handleItemClick = (type: FeedMenuType) => {
		navigate(`${PATH.POST}?type=${type}`);
	};

	return (
		<S.LNBContainer>
			{LNB_ITEMS.map(({ label, type }) => (
				<LNBItem
					key={type}
					label={label}
					onClick={() => handleItemClick(type)}
					active={selected === type}
				/>
			))}
		</S.LNBContainer>
	);
};

export default LNB;
