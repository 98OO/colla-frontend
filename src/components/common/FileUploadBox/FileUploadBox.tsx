import { useRef } from 'react';
import IconButton from '@components/common/IconButton/IconButton';
import * as S from './FileUploadBox.styled';

interface FileUploadBoxProps {
	files: File[];
	handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
	handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
	handleFilesAdd: (file: File) => void;
	handleFileDelete: (fileName: string) => void;
}

interface FileItemProps {
	file: File;
	onDelete: () => void;
}

const FileItem = ({ file, onDelete }: FileItemProps) => {
	const handleDeleteClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		onDelete();
	};

	return (
		<S.FileItemWrapper>
			<IconButton
				ariaLabel='delete'
				icon='X'
				size='sm'
				onClick={handleDeleteClick}
			/>
			<span>{file.name}</span>
		</S.FileItemWrapper>
	);
};

const FileUploadBox = (fileUploadBoxProps: FileUploadBoxProps) => {
	const {
		files,
		handleDrop,
		handleDragOver,
		handleFilesAdd,
		handleFileDelete,
	} = fileUploadBoxProps;
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			handleFilesAdd(event.target.files[0]);
		}
	};

	const fileUploadBoxContent = () => {
		return files.length === 0 ? (
			<p>여기에 파일을 끌어다 놓거나 클릭하세요</p>
		) : (
			<S.FileItemContainer>
				{files.map((file) => (
					<FileItem
						key={file.name}
						file={file}
						onDelete={() => handleFileDelete(file.name)}
					/>
				))}
			</S.FileItemContainer>
		);
	};

	return (
		<S.FileUploadBoxContainer
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			onClick={handleClick}>
			<input
				type='file'
				ref={fileInputRef}
				onChange={handleFileChange}
				style={{ display: 'none' }}
			/>
			{fileUploadBoxContent()}
		</S.FileUploadBoxContainer>
	);
};

export default FileUploadBox;
