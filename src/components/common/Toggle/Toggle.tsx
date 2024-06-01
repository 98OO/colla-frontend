import * as S from './Toggle.styled';

interface ToggleProps {
	state: boolean;
	onToggle: (state: boolean) => void;
}

const Toggle = ({ state, onToggle }: ToggleProps) => {
	const handleClick = () => {
		onToggle(!state);
	};

	return (
		<S.ToggleWrapper state={state} onClick={handleClick}>
			<S.ToggleCircle state={state} />
		</S.ToggleWrapper>
	);
};

export default Toggle;
