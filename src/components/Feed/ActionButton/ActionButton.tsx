import Flex from '@components/common/Flex/Flex';
import IconButton from '@components/common/IconButton/IconButton';
import Text from '@components/common/Text/Text';

interface ActionButtonProps {
	icon: 'Comment' | 'Attachment';
	count: number;
	onClick: () => void;
	ariaLabel: string;
}

const ActionButton = ({
	icon,
	count,
	onClick,
	ariaLabel,
}: ActionButtonProps) => {
	return (
		<Flex align='center'>
			<IconButton
				icon={icon}
				size='md'
				color='secondary'
				ariaLabel={ariaLabel}
				onClick={onClick}
			/>
			<Text color='secondary' size='md' weight='medium'>
				{count === 0 ? '0' : String(count)}
			</Text>
		</Flex>
	);
};

export default ActionButton;
