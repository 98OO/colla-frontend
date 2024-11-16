import { css } from 'styled-components';
import theme from '@styles/theme';

export const editorStyles = css`
	* {
		all: revert;
	}

	// horizontalRule
	p {
		margin: ${theme.units.spacing.space16} 0;
	}

	hr {
		border: none;
		border-top: 1px solid ${theme.color.border.tertiary};
		cursor: pointer;
		margin: ${theme.units.spacing.space16} 0;
	}

	// bulletList, orderedList
	ul,
	ol {
		padding: 0 1rem;
		margin: 1.25rem 1rem 1.25rem 0.4rem;

		li p {
			margin-top: 0.5em;
			margin-bottom: 0.5em;
		}
	}

	// blockquote
	blockquote {
		border-left: 3px solid ${theme.color.border.tertiary};
		margin: 1.5rem 0;
		padding-left: 1rem;
	}

	// codeblock
	pre {
		background: #2f2b28;
		border-radius: 0.5rem;
		color: white;
		font-family: 'JetBrainsMono', monospace;
		margin: 1.5rem 0;
		padding: 0.75rem 1rem;

		code {
			background: none;
			color: inherit;
			font-size: 0.8rem;
			padding: 0;
			line-height: 1.6;
		}
	}

	// image
	img {
		display: block;
		margin: 0 auto;
		max-width: 80%;
		height: auto;
	}
`;
