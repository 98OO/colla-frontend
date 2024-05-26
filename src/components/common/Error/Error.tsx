import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Text from '@components/common/Text/Text';
import { HTTP_STATUS_CODE, HTTP_ERROR_MESSAGE } from '@constants/api';
import { signPost } from '@assets/png';
import * as S from './Error.styled';

type ErrorCode = typeof HTTP_STATUS_CODE.NOT_FOUND;

interface ErrorProps {
	errorCode: ErrorCode;
	resetError: () => void;
}

const Error = ({
	errorCode = HTTP_STATUS_CODE.NOT_FOUND,
	resetError,
}: ErrorProps) => {
	const errorMessage = HTTP_ERROR_MESSAGE[errorCode];

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
					<Text size='lg' weight='medium' color='secondary'>
						{errorMessage.BODY.firstLine}
					</Text>
					<Text size='lg' weight='medium' color='secondary'>
						{errorMessage.BODY.secondLine}
					</Text>
					<Text size='lg' weight='medium' color='secondary'>
						{errorMessage.BODY.thridLine}
					</Text>
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
