import Icon from '@components/common/Icon/Icon';
import type { iconName } from '@type/tokens';
import * as S from './EditorMenuButton.styled';

export interface ButtonProps {
	icon: iconName;
	command: () => void;
	isActive: () => boolean;
}

const EditorMenuButton = ({ icon, command, isActive }: ButtonProps) => {
	return (
		<S.EditorMenuButton type='button' onClick={command}>
			<Icon name={icon} size='md' color={isActive() ? 'iPrimary' : 'primary'} />
		</S.EditorMenuButton>
	);
};

export default EditorMenuButton;
