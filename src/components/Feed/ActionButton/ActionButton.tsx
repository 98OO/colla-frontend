import Flex from '@components/common/Flex/Flex';
import IconButton from '@components/common/IconButton/IconButton';
import Text from '@components/common/Text/Text';
import type { IconComponent } from '@type/icon';

interface ActionButtonProps {
	icon: IconComponent;
	count: number;
	onClick: () => void;
	ariaLabel: string;
}

const ActionButton = ({ icon, count, onClick, ariaLabel }: ActionButtonProps) => {
	return (
		<Flex align='center'>
			<IconButton icon={icon} size='md' color='secondary' ariaLabel={ariaLabel} onClick={onClick} />
			<Text color='secondary' size='md' weight='medium'>
				{count === 0 ? '0' : String(count)}
			</Text>
		</Flex>
	);
};

export default ActionButton;
