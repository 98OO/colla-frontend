import { useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import IconButton from '@components/common/IconButton/IconButton';
import Text from '@components/common/Text/Text';
import DocumentItem from '@components/Document/DocumentItem/DocumentItem';
import useDocumentQuery from '@hooks/queries/document/useDocumentQuery';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import * as S from './DocumentPage.styled';

type PageDirection = 'prev' | 'next';

const DocumentPage = () => {
	const { userStatus } = useUserStatusQuery();
	const { teamDocument } = useDocumentQuery(
		userStatus?.profile.lastSeenTeamspaceId
	);
	const [selectedDocument, setSelectedDocument] = useState<Set<string>>(
		new Set()
	);
	const [selectedNumber, setSelectedNumber] = useState(1);

	const handleDownloadClick = () => {
		selectedDocument.forEach((fileUrl) => {
			window.open(fileUrl, '_blank');
		});

		setSelectedDocument(new Set());
	};

	const handleNumberClick = (number: number) => {
		if (number !== selectedNumber) setSelectedNumber(number);
	};

	const handlePageClick = (direction: PageDirection) => {
		setSelectedNumber((prev) => (direction === 'prev' ? prev - 1 : prev + 1));
	};

	const handlePageGroupClick = (direction: PageDirection) => {
		if (!teamDocument) return;

		const lastPageNumber = Math.ceil(teamDocument.attachments.length / 5);

		setSelectedNumber((prev) =>
			direction === 'prev'
				? Math.max((Math.floor((prev - 1) / 10) - 1) * 10 + 1, 1)
				: Math.min(Math.ceil(prev / 10) * 10 + 1, lastPageNumber)
		);
	};

	const handleDocumentClick = (fileUrl: string) => {
		setSelectedDocument((prevSelected) => {
			const nextSelected = new Set(prevSelected);

			if (nextSelected.has(fileUrl)) nextSelected.delete(fileUrl);
			else nextSelected.add(fileUrl);

			return nextSelected;
		});
	};

	return (
		<S.DocumentContainer>
			<Flex direction='column'>
				<S.DocumentHeader>
					<Heading size='xs' color='primary'>
						자료 저장소
					</Heading>
					<Button
						label='다운로드'
						variant='secondary'
						size='sm'
						disabled={selectedDocument.size === 0}
						leadingIcon='Download'
						onClick={handleDownloadClick}
					/>
				</S.DocumentHeader>
				<Divider size='sm' />
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
						onClick={() => handlePageGroupClick('prev')}
						disabled={selectedNumber === 1}
					/>
					<IconButton
						icon='ChevronLeft'
						ariaLabel='ChevronLeft'
						color='iSecondary'
						onClick={() => handlePageClick('prev')}
						disabled={selectedNumber === 1}
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
						onClick={() => handlePageClick('next')}
						disabled={
							selectedNumber === Math.ceil(teamDocument.attachments.length / 5)
						}
					/>
					<IconButton
						icon='ChevronsRight'
						ariaLabel='ChevronsRight'
						color='iSecondary'
						onClick={() => handlePageGroupClick('next')}
						disabled={
							selectedNumber === Math.ceil(teamDocument.attachments.length / 5)
						}
					/>
				</Flex>
			)}
		</S.DocumentContainer>
	);
};

export default DocumentPage;
