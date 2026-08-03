import { useMemo } from 'react';
import DOMPurify from 'dompurify';

interface SanitizedHtmlProps {
	html: string | null | undefined;
}

const SanitizedHtml = ({ html }: SanitizedHtmlProps) => {
	const sanitizedHtml = useMemo(() => DOMPurify.sanitize(html ?? ''), [html]);

	// eslint-disable-next-line react/no-danger
	return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default SanitizedHtml;
