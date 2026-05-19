import Text from '@components/common/Text/Text';
import { getFormattedDate } from '@utils/getFormattedDate';
import { getUnitFormattedSize } from '@utils/getUnitFormattedSize';
import type { Document } from '@type/document';
import * as S from './DocumentItem.styled';

interface DocumentItemProps {
	attachment: Document;
	selectedDocument: string[];
	handleDocumentClick: (fileUrl: string) => void;
}

const DocumentItem = (props: DocumentItemProps) => {
	const { attachment, selectedDocument, handleDocumentClick } = props;

	return (
		<S.DocumentItemContainer>
			<S.DocumentNameContainer>
				<S.DocumentCheckbox
					checked={selectedDocument.includes(attachment.fileUrl)}
					onChange={() => handleDocumentClick(attachment.fileUrl)}
				/>
				<S.DocumentNameWrapper>
					<Text size='lg' weight='regular'>
						{attachment.name}
					</Text>
				</S.DocumentNameWrapper>
			</S.DocumentNameContainer>
			<S.DocumentItemWrapper width='15%'>
				<Text size='lg' weight='regular'>
					{getUnitFormattedSize(attachment.size)}
				</Text>
			</S.DocumentItemWrapper>
			<S.DocumentItemWrapper width='15%'>
				<Text size='lg' weight='regular'>
					{attachment.author.username}
				</Text>
			</S.DocumentItemWrapper>
			<S.DocumentItemWrapper width='25%'>
				<Text size='lg' weight='regular'>
					{getFormattedDate(attachment.createdAt, 'documentDate')}
				</Text>
			</S.DocumentItemWrapper>
		</S.DocumentItemContainer>
	);
};

export default DocumentItem;
