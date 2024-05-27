import { useState, useEffect, useRef } from 'react';
import Icon from '@components/common/Icon/Icon';
import Text from '@components/common/Text/Text';
import { selectSize } from '@type/size';
import * as S from './Select.styled';

export interface SelectContainerProps {
	size: selectSize;
}

interface SelectProps extends SelectContainerProps {
	options?: string[] | null;
	select: string;
	setSelect: (value: string) => void;
}

const Select = (props: SelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);
	const { size, select, setSelect, options } = props;

	const handleClickOutside = (event: MouseEvent) => {
		if (
			selectRef.current &&
			!selectRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	const handleSelectOpen = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	const handleSelect = (value: string) => {
		setSelect(value);
		setIsOpen(false);
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<S.SelectContainer size={size} ref={selectRef}>
			<S.ButtonWrapper onClick={handleSelectOpen}>
				<Text size={size} weight='medium'>
					{select || 'select'}
				</Text>
				{isOpen ? <Icon name='Up' /> : <Icon name='Down' />}
			</S.ButtonWrapper>
			{isOpen && options && (
				<S.SelectOptionContainer>
					{options?.map((option) => (
						<S.SelectOptionWrapper
							key={option}
							onClick={() => handleSelect(option)}>
							<Text size='md' weight='medium'>
								{option}
							</Text>
							{select === option && <Icon name='Check' />}
						</S.SelectOptionWrapper>
					))}
				</S.SelectOptionContainer>
			)}
		</S.SelectContainer>
	);
};

export default Select;
