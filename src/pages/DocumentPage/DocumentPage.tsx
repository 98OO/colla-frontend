import { useMemo, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Icon from '@components/common/Icon/Icon';
import IconButton from '@components/common/IconButton/IconButton';
import Text from '@components/common/Text/Text';
import DocumentItem from '@components/Document/DocumentItem/DocumentItem';
import useDocumentQuery from '@hooks/queries/document/useDocumentQuery';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { getUnitFormattedSize } from '@utils/getUnitFormattedSize';
import * as S from './DocumentPage.styled';

const ITEMS_PER_PAGE = 10;
const PAGE_GROUP_SIZE = 10;
const DOWNLOAD_INTERVAL_MS = 300;
const TOTAL_STORAGE_CAPACITY = 300 * 1024 * 1024 * 1024;

type PageDirection = 'prev' | 'next';

const DocumentPage = () => {
	const { userStatus } = useUserStatusQuery();
	const { teamDocument, isPending } = useDocumentQuery(
		userStatus?.profile.lastSeenTeamspaceId
	);
	const [selectedDocument, setSelectedDocument] = useState<Set<string>>(
		new Set()
	);
	const [selectedNumber, setSelectedNumber] = useState(1);

	const attachments = useMemo(
		() => [...(teamDocument?.attachments ?? [])].reverse(),
		[teamDocument]
	);
	const usedStorageCapacity = teamDocument?.totalStorageCapacity ?? 0;
	const visibleAttachments = useMemo(
		() =>
			attachments.slice(
				(selectedNumber - 1) * ITEMS_PER_PAGE,
				selectedNumber * ITEMS_PER_PAGE
			),
		[attachments, selectedNumber]
	);
	const lastPageNumber = Math.ceil(attachments.length / ITEMS_PER_PAGE);
	const selectedVisibleCount = visibleAttachments.filter((attachment) =>
		selectedDocument.has(attachment.fileUrl)
	).length;
	const isAllVisibleSelected =
		visibleAttachments.length > 0 &&
		selectedVisibleCount === visibleAttachments.length;

	const handleDownloadClick = () => {
		Array.from(selectedDocument).forEach((fileUrl, index) => {
			window.setTimeout(() => {
				const link = document.createElement('a');

				link.href = fileUrl;
				link.download = '';

				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}, index * DOWNLOAD_INTERVAL_MS);
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
		if (attachments.length === 0) return;

		setSelectedNumber((prev) =>
			direction === 'prev'
				? Math.max(
						(Math.floor((prev - 1) / PAGE_GROUP_SIZE) - 1) * PAGE_GROUP_SIZE +
							1,
						1
					)
				: Math.min(
						Math.ceil(prev / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1,
						lastPageNumber
					)
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

	const handleSelectAllClick = () => {
		setSelectedDocument((prevSelected) => {
			const nextSelected = new Set(prevSelected);

			if (isAllVisibleSelected) {
				visibleAttachments.forEach((attachment) =>
					nextSelected.delete(attachment.fileUrl)
				);
			} else {
				visibleAttachments.forEach((attachment) =>
					nextSelected.add(attachment.fileUrl)
				);
			}

			return nextSelected;
		});
	};

	return (
		<S.DocumentContainer>
			<Flex direction='column'>
				<S.DocumentHeader>
					<Flex direction='column' gap='8'>
						<Heading size='xs' color='primary'>
							자료 저장소
						</Heading>
						<Text size='sm' weight='regular' color='secondary'>
							{`총 ${attachments.length}개 자료 · ${getUnitFormattedSize(
								usedStorageCapacity
							)} / ${getUnitFormattedSize(TOTAL_STORAGE_CAPACITY)} 사용 중`}
						</Text>
					</Flex>
					<S.DocumentHeaderActions>
						{selectedDocument.size > 0 && (
							<Text size='sm' weight='medium' color='primary'>
								{`${selectedDocument.size}개 선택됨`}
							</Text>
						)}
						<Button
							label='다운로드'
							variant='secondary'
							size='sm'
							disabled={selectedDocument.size === 0}
							leadingIcon='Download'
							onClick={handleDownloadClick}
						/>
					</S.DocumentHeaderActions>
				</S.DocumentHeader>
				<Divider size='sm' />
			</Flex>
			<S.DocumentTitleContainer>
				<S.DocumentTitleWrapper width='45%'>
					<S.DocumentTitleName>
						<S.DocumentCheckbox
							aria-label='현재 페이지 자료 전체 선택'
							checked={isAllVisibleSelected}
							disabled={visibleAttachments.length === 0}
							onChange={handleSelectAllClick}
						/>
						<Text size='lg' weight='medium'>
							파일명
						</Text>
					</S.DocumentTitleName>
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
			<S.DocumentListContainer>
				{!isPending && attachments.length === 0 && (
					<S.DocumentStateContainer>
						<Icon name='Folder' color='tertiary' size='lg' />
						<Flex direction='column' align='center' gap='8'>
							<Heading size='xs' color='primary'>
								아직 저장된 자료가 없어요
							</Heading>
							<Text size='md' weight='regular' color='secondary'>
								현재 팀스페이스의 피드와 채팅에서 주고받은 파일이 이곳에 모여요.
							</Text>
						</Flex>
					</S.DocumentStateContainer>
				)}
				{!isPending &&
					visibleAttachments.map((attachment) => (
						<DocumentItem
							key={attachment.id}
							attachment={attachment}
							handleDocumentClick={handleDocumentClick}
							selectedDocument={selectedDocument}
						/>
					))}
			</S.DocumentListContainer>
			{attachments.length > 0 && (
				<S.PaginationContainer>
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
					{Array.from({ length: lastPageNumber }, (_, index) => index + 1)
						.slice(
							Math.floor((selectedNumber - 1) / PAGE_GROUP_SIZE) *
								PAGE_GROUP_SIZE,
							Math.floor((selectedNumber - 1) / PAGE_GROUP_SIZE) *
								PAGE_GROUP_SIZE +
								PAGE_GROUP_SIZE
						)
						.map((number) => (
							<S.NumberButtonWrapper
								$active={selectedNumber === number}
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
						disabled={selectedNumber === lastPageNumber}
					/>
					<IconButton
						icon='ChevronsRight'
						ariaLabel='ChevronsRight'
						color='iSecondary'
						onClick={() => handlePageGroupClick('next')}
						disabled={selectedNumber === lastPageNumber}
					/>
				</S.PaginationContainer>
			)}
		</S.DocumentContainer>
	);
};

export default DocumentPage;
