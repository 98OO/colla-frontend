import signPostAvif340 from '@assets/images/signPost-340.avif';
import signPostWebp340 from '@assets/images/signPost-340.webp';
import signPostAvif478 from '@assets/images/signPost-478.avif';
import signPostWebp478 from '@assets/images/signPost-478.webp';
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
				<picture>
					<source
						type='image/avif'
						srcSet={`${signPostAvif340} 340w, ${signPostAvif478} 478w`}
						sizes='340px'
					/>
					<source
						type='image/webp'
						srcSet={`${signPostWebp340} 340w, ${signPostWebp478} 478w`}
						sizes='340px'
					/>
					<img alt='signPost' src={signPost} width={478} height={593} loading='eager' />
				</picture>
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
