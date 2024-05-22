import Badge from '@components/common/Badge/Badge';
import Icon from '@components/common/Icon/Icon';
import Text from '@components/common/Text/Text';
import type { iconName } from '@type/tokens';
import * as S from './MenuItem.styled';

export interface MenuItemProps {
	leadingIcon: iconName;
	title?: string;
	selected: boolean;
	number?: number;
	type: 'default' | 'iconOnly';
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const MenuItem = (props: MenuItemProps) => {
	const { leadingIcon, title, selected, number, type, onClick } = props;

	return (
		<S.MenuItemContainer type={type} selected={selected} onClick={onClick}>
			<Icon name={leadingIcon} color={selected ? 'brand' : 'primary'} />
			{type === 'default' && title && (
				<S.MenuItemTextWrapper>
					<Text
						size='md'
						weight='semiBold'
						color={selected ? 'info' : 'primary'}>
						{title}
					</Text>
				</S.MenuItemTextWrapper>
			)}
			{type === 'default' && number != null ? (
				<Badge type='number' status='info' number={number} />
			) : (
				type === 'iconOnly' && <Badge type='dot' status='info' />
			)}
		</S.MenuItemContainer>
	);
};

export default MenuItem;
