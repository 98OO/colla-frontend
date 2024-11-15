import Icon from '@components/common/Icon/Icon';
import type { iconName } from '@type/tokens';
import * as S from './EditorMenuButton.styled';

export interface ButtonProps {
	icon: iconName;
	command: () => void;
	isActive: () => boolean;
}

interface ImageButtonProps {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EditorMenuButton = ({ icon, command, isActive }: ButtonProps) => {
	return (
		<S.EditorMenuButton type='button' onClick={command}>
			<Icon name={icon} size='md' color={isActive() ? 'iPrimary' : 'primary'} />
		</S.EditorMenuButton>
	);
};

export const EditorMenuImageButton = ({ onChange }: ImageButtonProps) => (
	<S.EditorImageButton>
		<input type='file' accept='image/*' onChange={onChange} />
		<Icon name='Image' size='md' />
	</S.EditorImageButton>
);
