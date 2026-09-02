import Badge from '@components/common/Badge/Badge';
import Icon from '@components/common/Icon/Icon';
import Text from '@components/common/Text/Text';
import type { IconComponent } from '@type/icon';
import * as S from './MenuItem.styled';

export interface MenuItemProps {
	leadingIcon: IconComponent;
	title?: string;
	selected: boolean;
	number?: number;
	type?: 'default' | 'iconOnly';
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const MenuItem = (props: MenuItemProps) => {
	const { leadingIcon, title, selected, number, type = 'default', onClick } = props;

	return (
		<S.MenuItemContainer type={type} selected={selected} onClick={onClick}>
			<Icon icon={leadingIcon} color={selected ? 'brand' : 'primary'} />
			{type === 'default' && title && (
				<S.MenuItemTextWrapper>
					<Text size='md' weight='semiBold' color={selected ? 'info' : 'primary'}>
						{title}
					</Text>
				</S.MenuItemTextWrapper>
			)}
			{number != null &&
				number !== 0 &&
				(type === 'default' ? (
					<Badge type='number' status='info' number={number} />
				) : (
					type === 'iconOnly' && <Badge type='dot' status='info' />
				))}
		</S.MenuItemContainer>
	);
};

export default MenuItem;
