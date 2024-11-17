import { useEffect, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import IconButton from '@components/common/IconButton/IconButton';
import Text from '@components/common/Text/Text';
import DocumentItem from '@components/Document/DocumentItem/DocumentItem';
import { queryClient } from '@hooks/queries/common/queryClient';
import useDocumentQuery from '@hooks/queries/document/useDocumentQuery';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import * as S from './DocumentPage.styled';

const DocumentPage = () => {
	const { userStatus } = useUserStatusQuery();
	const { teamDocument } = useDocumentQuery(
		userStatus?.profile.lastSeenTeamspaceId
	);
	const [selectedDocument, setSelectedDocument] = useState<string[]>([]);
	const [selectedNumber, setSelectedNumber] = useState(1);

	useEffect(() => {
		return () => {
			queryClient.invalidateQueries({
				queryKey: ['teamDocument', userStatus?.profile.lastSeenTeamspaceId],
			});
		};
	});

	const handleDownloadClick = () => {
		selectedDocument.forEach((fileUrl) => {
			window.open(fileUrl, '_blank');
		});

		setSelectedDocument([]);
	};

	const handleNumberClick = (number: number) => {
		if (number !== selectedNumber) setSelectedNumber(number);
	};

	const handleArrowClick = (direction: string, jump: boolean = false) => {
		if (direction === 'left' && selectedNumber > 1) {
			setSelectedNumber((prev) =>
				jump
					? Math.max((Math.floor((prev - 1) / 10) - 1) * 10 + 1, 1)
					: prev - 1
			);
		} else if (
			direction === 'right' &&
			teamDocument &&
			selectedNumber < Math.ceil(teamDocument.attachments.length / 5)
		) {
			setSelectedNumber((prev) =>
				jump
					? Math.min(
							Math.ceil(prev / 10) * 10 + 1,
							Math.ceil(teamDocument.attachments.length / 5)
						)
					: prev + 1
			);
		}
	};

	const handleDocumentClick = (fileUrl: string) => {
		setSelectedDocument((prevSelected) => {
			if (prevSelected.includes(fileUrl))
				return prevSelected.filter((url) => url !== fileUrl);

			return [...prevSelected, fileUrl];
		});
	};

	return (
		<S.DocumentContainer>
			<Flex direction='column' gap='10'>
				<Heading size='xs'>자료 저장소</Heading>
				<Divider size='sm' padding={4} />
			</Flex>
			<Flex gap='16'>
				<Button
					label='다운로드'
					variant='secondary'
					size='sm'
					disabled={selectedDocument.length === 0}
					leadingIcon='Download'
					onClick={handleDownloadClick}
				/>
			</Flex>
			<S.DocumentTitleContainer>
				<S.DocumentTitleWrapper width='45%'>
					<Text size='lg' weight='medium'>
						파일명
					</Text>
				</S.DocumentTitleWrapper>
				<S.DocumentTitleWrapper width='15%'>
					<Text size='lg' weight='medium'>
						용량
					</Text>
				</S.DocumentTitleWrapper>
				<S.DocumentTitleWrapper width='15%'>
					<Text size='lg' weight='medium'>
						등록자
					</Text>
				</S.DocumentTitleWrapper>
				<S.DocumentTitleWrapper width='25%'>
					<Text size='lg' weight='medium'>
						등록일
					</Text>
				</S.DocumentTitleWrapper>
			</S.DocumentTitleContainer>
			<Flex direction='column' gap='16' height='350'>
				{teamDocument &&
					teamDocument.attachments
						.slice(
							Math.floor(selectedNumber - 1) * 5,
							Math.floor(selectedNumber - 1) * 5 + 5
						)
						.map((attachment) => (
							<DocumentItem
								attachment={attachment}
								handleDocumentClick={handleDocumentClick}
								selectedDocument={selectedDocument}
							/>
						))}
			</Flex>
			{teamDocument && teamDocument.attachments.length > 0 && (
				<Flex justify='center'>
					<IconButton
						icon='ChevronsLeft'
						ariaLabel='ChevronsLeft'
						color='iSecondary'
						onClick={() => handleArrowClick('left', true)}
					/>
					<IconButton
						icon='ChevronLeft'
						ariaLabel='ChevronLeft'
						color='iSecondary'
						onClick={() => handleArrowClick('left')}
					/>
					{teamDocument &&
						Array.from(
							{ length: Math.ceil(teamDocument.attachments.length / 5) },
							(_, index) => index + 1
						)
							.slice(
								Math.floor((selectedNumber - 1) / 10) * 10,
								Math.floor((selectedNumber - 1) / 10) * 10 + 10
							)
							.map((number) => (
								<S.NumberButtonWrapper
									active={selectedNumber === number}
									key={number}>
									<Button
										label={number.toString()}
										variant='text'
										size='md'
										onClick={() => handleNumberClick(number)}
									/>
								</S.NumberButtonWrapper>
							))}
					<IconButton
						icon='ChevronRight'
						ariaLabel='ChevronRight'
						color='iSecondary'
						onClick={() => handleArrowClick('right')}
					/>
					<IconButton
						icon='ChevronsRight'
						ariaLabel='ChevronsRight'
						color='iSecondary'
						onClick={() => handleArrowClick('right', true)}
					/>
				</Flex>
			)}
		</S.DocumentContainer>
	);
};

export default DocumentPage;
