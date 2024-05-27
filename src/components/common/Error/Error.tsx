import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Text from '@components/common/Text/Text';
import { HTTP_STATUS_CODE, HTTP_ERROR_MESSAGE } from '@constants/api';
import { signPost } from '@assets/png';
import * as S from './Error.styled';

interface ErrorProps {
	errorCode: number;
	resetError: () => void;
}

const Error = ({ errorCode, resetError }: ErrorProps) => {
	const errorMessage =
		errorCode === HTTP_STATUS_CODE.NOT_FOUND ||
		errorCode === HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
			? HTTP_ERROR_MESSAGE[errorCode]
			: HTTP_ERROR_MESSAGE.DEFAULT;

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
