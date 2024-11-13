import { useRef, useState } from 'react';
import type { Editor } from '@tiptap/react';

const usePostEditor = () => {
	const [imageFiles, setImageFiles] = useState<File[]>([]);
	const editorRef = useRef<Editor>(null);

	const appendImageFile = (file: File) => {
		setImageFiles((prevFiles) => [...prevFiles, file]);
	};

	const handleSubmit = async () => {};

	return { editorRef, imageFiles, appendImageFile, handleSubmit };
};

export default usePostEditor;
