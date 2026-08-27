import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Text from '@components/common/Text/Text';
import type { ErrorMessage } from '@constants/api';
import { signPost } from '@assets/png';
import * as S from './Error.styled';

interface ErrorProps {
	errorMessage: ErrorMessage;
	resetError: () => void;
}

const Error = ({ errorMessage, resetError }: ErrorProps) => {
	return (
		<Flex gap='72' align='center'>
			<S.ImageWrapper>
				<img alt='signPost' src={signPost} />
			</S.ImageWrapper>
			<Flex direction='column' gap='30' justify='center'>
				<Heading size='lg' color='primary'>
					{errorMessage.HEADING}
				</Heading>
				<Flex direction='column' gap='16'>
					{errorMessage.BODY.map((line) => (
						<Text key={line} size='lg' weight='medium' color='secondary'>
							{line}
						</Text>
					))}
				</Flex>
				<Button
					label={errorMessage.BUTTON}
					variant='primary'
					isFull
					size='md'
					onClick={resetError}
				/>
			</Flex>
		</Flex>
	);
};

export default Error;
