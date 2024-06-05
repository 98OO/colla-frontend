import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Text from '@components/common/Text/Text';
import useDocumentQuery from '@hooks/queries/document/useDocumentQuery';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import * as S from './DocumentPage.styled';

const DocumentPage = () => {
	const { userStatus } = useUserStatusQuery();

	const { teamDocument } = useDocumentQuery(
		userStatus?.profile.lastSeenTeamspaceId
	);

	return (
		<S.DocumentContainer>
			<Heading size='sm'>자료 저장소</Heading>
			<Divider size='sm' />

			<S.DocumentListContainer>
				<Flex width='400' justify='center'>
					<Text size='lg' weight='medium'>
						파일명
					</Text>
				</Flex>
				<Flex grow='1' justify='center'>
					<Text size='lg' weight='medium'>
						용량
					</Text>
				</Flex>
				<Flex grow='1' justify='center'>
					<Text size='lg' weight='medium'>
						등록자
					</Text>
				</Flex>
				<Flex grow='1' justify='center'>
					<Text size='lg' weight='medium'>
						등록일
					</Text>
				</Flex>
			</S.DocumentListContainer>
			<Flex direction='column'>
				{teamDocument &&
					teamDocument.attachments.map((attachment) => (
						<Flex paddingTop='20' paddingBottom='20'>
							<S.DocumentWrapper
								onClick={() => window.open(attachment.fileUrl, '_blank')}>
								<Text size='lg' weight='medium'>
									{attachment.name}
								</Text>
							</S.DocumentWrapper>
							<Flex grow='1' justify='center'>
								<Text size='lg' weight='medium'>
									{attachment.size.toString()}
								</Text>
							</Flex>
							<Flex grow='1' justify='center'>
								<Text size='lg' weight='medium'>
									{attachment.author.username}
								</Text>
							</Flex>
							<Flex grow='1' justify='center'>
								<Text size='lg' weight='medium'>
									{attachment.createdAt}
								</Text>
							</Flex>
						</Flex>
					))}
			</Flex>
		</S.DocumentContainer>
	);
};

export default DocumentPage;
