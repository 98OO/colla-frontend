import { ReactNode, PropsWithChildren } from 'react';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Text from '@components/common/Text/Text';
import * as S from './MySettingItem.styled';

export interface MySettingProps {
	title: string;
	text: string;
	children: ReactNode;
}

const MySettingItem = (props: PropsWithChildren<MySettingProps>) => {
	const { title, text, children } = props;

	return (
		<Flex direction='column'>
			<Flex
				justify='space-between'
				align='center'
				paddingTop='12'
				paddingBottom='12'
				paddingLeft='8'
				paddingRight='8'>
				<S.MySettingInfoContainer>
					<Text size='lg' weight='bold'>
						{title}
					</Text>
					<Text size='sm' weight='regular' color='secondary'>
						{text}
					</Text>
				</S.MySettingInfoContainer>
				{children}
			</Flex>
			<Divider size='sm' />
		</Flex>
	);
};

export default MySettingItem;
