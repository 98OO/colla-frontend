import { useMemo, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import Icon from '@components/common/Icon/Icon';
import IconButton from '@components/common/IconButton/IconButton';
import Select from '@components/common/Select/Select';
import Text from '@components/common/Text/Text';
import DocumentItem from '@components/Document/DocumentItem/DocumentItem';
import useDocumentDownload from '@hooks/document/useDocumentDownload';
import useDocumentPagination from '@hooks/document/useDocumentPagination';
import useDocumentSelection from '@hooks/document/useDocumentSelection';
import useDocumentQuery from '@hooks/queries/document/useDocumentQuery';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import {
	type DocumentSortOrder,
	getDocumentsBySortOrder,
} from '@utils/document/getDocumentsBySortOrder';
import { getUnitFormattedSize } from '@utils/getUnitFormattedSize';
import * as S from './DocumentPage.styled';

const ITEMS_PER_PAGE = 10;
const PAGE_GROUP_SIZE = 10;
const DOWNLOAD_INTERVAL_MS = 300;
const TOTAL_STORAGE_CAPACITY = 300 * 1024 * 1024 * 1024;
const DOCUMENT_SORT_ORDER_MAP: Record<string, DocumentSortOrder> = {
	최신순: 'latest',
	오래된순: 'oldest',
};

const DocumentPage = () => {
	const [selectedSortOption, setSelectedSortOption] = useState('최신순');
	const { userStatus } = useUserStatusQuery();
	const { teamDocument, isPending } = useDocumentQuery(
		userStatus?.profile.lastSeenTeamspaceId
	);
	const attachments = useMemo(
		() =>
			getDocumentsBySortOrder(
				teamDocument?.attachments ?? [],
				DOCUMENT_SORT_ORDER_MAP[selectedSortOption]
			),
		[teamDocument, selectedSortOption]
	);
	const usedStorageCapacity = teamDocument?.totalStorageCapacity ?? 0;
	const {
		selectedNumber,
		visibleAttachments,
		lastPageNumber,
		pageNumbers,
		handleNumberClick,
		handlePageClick,
		handlePageGroupClick,
	} = useDocumentPagination({
		attachments,
		itemsPerPage: ITEMS_PER_PAGE,
		pageGroupSize: PAGE_GROUP_SIZE,
	});
	const {
		selectedDocument,
		isAllVisibleSelected,
		handleDocumentClick,
		handleSelectAllClick,
		clearSelectedDocument,
	} = useDocumentSelection({ visibleAttachments });
	const { handleDownloadClick } = useDocumentDownload({
		selectedDocument,
		downloadIntervalMs: DOWNLOAD_INTERVAL_MS,
		onAfterDownload: clearSelectedDocument,
	});

	const handleSortSelect = (index: number) => {
		setSelectedSortOption(
			Object.keys(DOCUMENT_SORT_ORDER_MAP)[index - 1] ??
				Object.keys(DOCUMENT_SORT_ORDER_MAP)[0]
		);
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
						<S.SelectWrapper>
							<Select
								size='sm'
								options={Object.keys(DOCUMENT_SORT_ORDER_MAP)}
								select={selectedSortOption}
								setSelect={handleSortSelect}
							/>
						</S.SelectWrapper>
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
					{pageNumbers.map((number) => (
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
