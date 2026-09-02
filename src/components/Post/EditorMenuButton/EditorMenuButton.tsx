import { ReactComponent as ImageIcon } from '@assets/svg/image.svg';
import Icon from '@components/common/Icon/Icon';
import type { IconComponent } from '@type/icon';
import * as S from './EditorMenuButton.styled';

export interface EditorMenuButtonProps {
	icon: IconComponent;
	command: () => void;
	isActive: () => boolean;
}

export interface EditorMenuButtonConfig extends EditorMenuButtonProps {
	id: string;
}

interface ImageButtonProps {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EditorMenuButton = ({ icon, command, isActive }: EditorMenuButtonProps) => {
	return (
		<S.EditorMenuButton type='button' onClick={command}>
			<Icon icon={icon} size='md' color={isActive() ? 'iPrimary' : 'primary'} />
		</S.EditorMenuButton>
	);
};

export const EditorMenuImageButton = ({ onChange }: ImageButtonProps) => (
	<S.EditorImageButton>
		<input type='file' accept='image/*' onChange={onChange} />
		<Icon icon={ImageIcon} size='md' />
	</S.EditorImageButton>
);
