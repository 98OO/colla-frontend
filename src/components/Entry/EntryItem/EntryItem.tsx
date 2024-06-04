import { useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Input from '@components/common/Input/Input';
import Text from '@components/common/Text/Text';
import useCreateTeamSpaceMutation from '@hooks/queries/useCreateTeamSpaceMutation';
import useParticipateTeamSpaceMutation from '@hooks/queries/useParticipateTeamSpaceMutation';
import useForm from '@hooks/user/useForm';
import * as S from './EntryItem.styled';

interface EntryItemProps {
	type: 'teamName' | 'teamCode';
	title: string;
	subTitle: string;
	image: string;
	inputLabel: string;
	buttonLabel: string;
}

const EntryItem = (props: EntryItemProps) => {
	const { type, title, subTitle, image, inputLabel, buttonLabel } = props;
	const [codeError, setCodeError] = useState(false);
	const { mutatePostCreateTeamSpace } = useCreateTeamSpaceMutation();
	const { mutateParticipateTeamSpace } = useParticipateTeamSpaceMutation();

	const handleParticipateTeamSpace = async (teamCode: string) => {
		try {
			await mutateParticipateTeamSpace(teamCode);
		} catch (error) {
			setCodeError(true);
		}
	};

	const { formData, submitting, errors, register, handleSubmit } = useForm({
		onSubmit: async () => {
			if (type === 'teamName') {
				mutatePostCreateTeamSpace(formData.teamName);
			} else {
				handleParticipateTeamSpace(formData.teamCode);
			}
		},
	});

	const validationRules = {
		teamName: {
			required: '팀스페이스 이름을 입력해주세요.',
			length: {
				min: 2,
				message: '팀스페이스 이름은 2글자 이상입니다.',
			},
		},
		teamCode: {
			required: '초대코드를 입력해주세요',
			validate: {
				validateFn: () => codeError === false,
				message: '유효하지 않거나 만료된 초대코드입니다.',
			},
		},
	};

	return (
		<S.FormContainer onSubmit={handleSubmit}>
			<Flex direction='column' gap='4' align='center'>
				<Heading size='lg'>{title}</Heading>
				<Text size='md' weight='medium' color='secondary'>
					{subTitle}
				</Text>
			</Flex>
			<S.ImageWrapper>
				<img alt='teamCreation' src={image} />
			</S.ImageWrapper>
			<S.InputWrapper>
				<Text size='md' weight='medium'>
					{inputLabel}
				</Text>
				<Input
					size='lg'
					placeholder={`${inputLabel} 입력`}
					isError={errors?.[type]?.isError}
					maxLength={20}
					{...register(`${type}`, validationRules[type], false)}
				/>
				<Flex height='14' align='center'>
					{errors?.[type]?.isError && (
						<Text size='sm' weight='regular' color='danger'>
							{errors[type].message}
						</Text>
					)}
				</Flex>
			</S.InputWrapper>
			<Flex direction='column'>
				<Button
					type='submit'
					label={buttonLabel}
					variant='primary'
					size='lg'
					disabled={submitting}
				/>
			</Flex>
		</S.FormContainer>
	);
};

export default EntryItem;
