import styled, { css } from 'styled-components';
import theme from '@styles/theme';

const reveal = (isVisible: boolean, delay = 0) => css`
	opacity: ${isVisible ? 1 : 0};
	transform: translateY(${isVisible ? '0' : '20px'});
	filter: blur(${isVisible ? '0' : '5px'});
	transition:
		opacity 620ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
		transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
		filter 520ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms;
	will-change: ${isVisible ? 'auto' : 'opacity, transform, filter'};

	@media (prefers-reduced-motion: reduce) {
		opacity: 1;
		transform: none;
		filter: none;
		transition: none;
		will-change: auto;
	}
`;

export const FlowSection = styled.section`
	display: flex;
	justify-content: center;
	padding: 128px ${theme.units.spacing.space24};
	background-color: ${theme.color.bg.primary};
	scroll-margin-top: 88px;

	@media (max-width: 640px) {
		padding: ${theme.units.spacing.space80} ${theme.units.spacing.space20}
			${theme.units.spacing.space96};
	}
`;

export const FlowInner = styled.div`
	width: min(100%, 760px);
`;

export const FlowHeader = styled.header<{ $isVisible: boolean }>`
	${({ $isVisible }) => reveal($isVisible)}
`;

export const FlowTitle = styled.h2`
	color: ${theme.color.text.primary};
	font-size: clamp(30px, 3vw, 36px);
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: 1.15;
	letter-spacing: -0.04em;
	word-break: keep-all;

	@media (max-width: 640px) {
		font-size: 32px;
	}
`;

export const FlowList = styled.ol`
	display: flex;
	flex-direction: column;
	gap: 104px;
	margin: 88px 0 0;
	padding: 0;
	list-style: none;

	@media (max-width: 640px) {
		gap: ${theme.units.spacing.space80};
		margin-top: ${theme.units.spacing.space72};
	}
`;

export const FlowItem = styled.li`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space32};
`;

export const StepCopy = styled.div<{ $isVisible: boolean }>`
	display: flex;
	max-width: 680px;
	flex-direction: column;
	${({ $isVisible }) => reveal($isVisible)}
`;

export const StepTitle = styled.h3`
	color: ${theme.color.text.primary};
	font-size: clamp(19px, 1.6vw, 21px);
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: 1.3;
	letter-spacing: -0.035em;
	word-break: keep-all;
`;

export const StepDescription = styled.p`
	max-width: 680px;
	margin-top: ${theme.units.spacing.space12};
	color: ${theme.color.text.secondary};
	font-size: 15px;
	line-height: 1.65;
	word-break: keep-all;
`;

type ScreenLayout = 'team' | 'split' | 'chat' | 'feed' | 'collection' | 'wide';

const hasSeparateFrames = (layout: ScreenLayout) => layout === 'team' || layout === 'collection';

export const ScreenFrame = styled.div<{ $layout: ScreenLayout; $isVisible: boolean }>`
	position: relative;
	display: grid;
	grid-template-columns: ${({ $layout }) => {
		switch ($layout) {
			case 'team':
				return 'minmax(0, 0.84fr) minmax(0, 1.16fr)';
			case 'chat':
			case 'feed':
				return 'minmax(0, 1fr)';
			case 'collection':
				return 'repeat(2, minmax(0, 1fr))';
			case 'wide':
				return '1fr';
			default:
				return 'repeat(2, minmax(0, 1fr))';
		}
	}};
	grid-template-rows: ${({ $layout }) => {
		if ($layout === 'team') return 'auto auto';
		if ($layout === 'collection' || $layout === 'wide') return 'auto';
		return '1fr';
	}};
	gap: ${theme.units.spacing.space12};
	min-width: 0;
	aspect-ratio: ${({ $layout }) => {
		if ($layout === 'team') return 'auto';
		if ($layout === 'chat') return '1782 / 1008';
		if ($layout === 'feed') return '1600 / 1014';
		if ($layout === 'split') return '1241 / 737';
		if ($layout === 'collection' || $layout === 'wide') return 'auto';
		return '1.72';
	}};
	overflow: hidden;
	padding: ${({ $layout }) => {
		if (hasSeparateFrames($layout)) return '0';
		return theme.units.spacing.space12;
	}};
	border-radius: ${({ $layout }) =>
		hasSeparateFrames($layout) ? '0' : theme.units.radius.radius16};
	background-color: ${({ $layout }) => {
		if (hasSeparateFrames($layout)) return 'transparent';
		return '#f2f3f5';
	}};
	opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
	transform: translateY(${({ $isVisible }) => ($isVisible ? '0' : '28px')})
		scale(${({ $isVisible }) => ($isVisible ? '1' : '0.985')});
	clip-path: inset(
		0 0 ${({ $isVisible }) => ($isVisible ? '0' : '7%')} 0 round ${theme.units.radius.radius16}
	);
	filter: blur(${({ $isVisible }) => ($isVisible ? '0' : '6px')});
	transition:
		opacity 640ms cubic-bezier(0.16, 1, 0.3, 1) 80ms,
		transform 760ms cubic-bezier(0.16, 1, 0.3, 1) 80ms,
		clip-path 760ms cubic-bezier(0.16, 1, 0.3, 1) 80ms,
		filter 560ms cubic-bezier(0.16, 1, 0.3, 1) 80ms;
	will-change: ${({ $isVisible }) =>
		$isVisible ? 'auto' : 'opacity, transform, clip-path, filter'};

	> span > img {
		transform: scale(${({ $isVisible }) => ($isVisible ? '1' : '1.025')});
		transition: transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 110ms;
	}

	> span:nth-child(2) > img {
		transition-delay: 160ms;
	}

	> span:nth-child(3) > img {
		transition-delay: 210ms;
	}

	@media (prefers-reduced-motion: reduce) {
		opacity: 1;
		transform: none;
		clip-path: none;
		filter: none;
		transition: opacity 180ms ease;
		will-change: auto;

		> span > img {
			transform: none;
			transition: none;
		}
	}

	${({ $layout }) =>
		hasSeparateFrames($layout) &&
		css`
			> span {
				padding: ${theme.units.spacing.space12};
				border-radius: ${theme.units.radius.radius16};
				background-color: #f2f3f5;
			}
		`}

	${({ $layout }) =>
		$layout === 'split' &&
		css`
			> span {
				background-color: ${theme.color.bg.primary};
			}
		`}

	${({ $layout }) =>
		($layout === 'chat' || $layout === 'feed') &&
		css`
			> span {
				background-color: ${theme.color.bg.primary};
			}
		`}

	${({ $layout }) =>
		$layout === 'collection' &&
		css`
			> span {
				aspect-ratio: 772 / 918;
			}

			> span > img {
				height: 100%;
				background-color: ${theme.color.bg.primary};
				object-position: center top;
			}
		`}

	${({ $layout }) =>
		$layout === 'team' &&
		css`
			> span:first-child {
				grid-column: 1 / -1;

				> img {
					aspect-ratio: 1151 / 670;
					height: auto;
					object-fit: cover;
					object-position: right top;
				}
			}

			> span:nth-child(2) {
				aspect-ratio: 307 / 369;
			}

			> span:nth-child(3) {
				aspect-ratio: 716 / 624;
			}
		`}

	${({ $layout }) =>
		$layout === 'wide' &&
		css`
			grid-template-columns: 1fr;

			> span {
				width: 100%;
				aspect-ratio: 9 / 4;
				justify-self: center;
				background-color: ${theme.color.bg.primary};
			}

			> span > img {
				height: 100%;
				object-fit: cover;
				object-position: center top;
			}
		`}

	@media (max-width: 640px) {
		grid-template-columns: ${({ $layout }) =>
			$layout === 'wide' || $layout === 'collection' ? '1fr' : '1fr 1fr'};
		grid-template-rows: ${({ $layout }) => {
			if ($layout === 'team') return 'auto auto';
			if ($layout === 'collection' || $layout === 'wide') return 'auto';
			return '1fr';
		}};
		aspect-ratio: ${({ $layout }) => {
			switch ($layout) {
				case 'team':
					return 'auto';
				case 'chat':
					return '1774 / 1000';
				case 'feed':
					return '1592 / 1006';
				case 'split':
					return '1233 / 729';
				case 'collection':
				case 'wide':
					return 'auto';
				default:
					return '1.35';
			}
		}};
		padding: ${({ $layout }) => {
			if (hasSeparateFrames($layout)) return '0';
			return theme.units.spacing.space8;
		}};

		${({ $layout }) =>
			hasSeparateFrames($layout) &&
			css`
				> span {
					padding: ${theme.units.spacing.space8};
				}
			`}

		> span:first-child {
			${({ $layout }) =>
				$layout === 'team' &&
				css`
					grid-row: auto;
					grid-column: 1 / -1;
				`}
		}

		${({ $layout }) =>
			$layout === 'team' &&
			css`
				grid-template-columns: minmax(0, 0.84fr) minmax(0, 1.16fr);

				> span:nth-child(2) {
					aspect-ratio: 299 / 361;
				}

				> span:nth-child(3) {
					aspect-ratio: 708 / 616;
				}
			`}
	}
`;

export const ScreenPlaceholder = styled.span`
	display: block;
	min-width: 0;
	min-height: 0;
	overflow: hidden;
	border-radius: ${theme.units.radius.radius16};
	background-color: #e4e6ea;
`;

export const ScreenImage = styled.img`
	display: block;
	width: 100%;
	height: 100%;
	border-radius: ${theme.units.radius.radius16};
	clip-path: inset(0 round ${theme.units.radius.radius16});
	object-fit: contain;
	object-position: center top;
`;

export const FinalAction = styled.div<{ $isVisible: boolean }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${theme.units.spacing.space40};
	margin-top: 144px;
	padding: ${theme.units.spacing.space48};
	border-radius: ${theme.units.radius.radius16};
	background-color: ${theme.color.text.primary};
	${({ $isVisible }) => reveal($isVisible, 80)}

	button {
		flex: 0 0 auto;
		min-width: 164px;
		transition: filter 160ms ease;
	}

	button:hover {
		background-color: ${theme.color.bg.iPrimary};
		filter: brightness(1.08);
	}

	button:focus-visible {
		outline: 2px solid ${theme.color.border.focusRing};
		outline-offset: 3px;
	}

	@media (max-width: 640px) {
		align-items: flex-start;
		flex-direction: column;
		margin-top: ${theme.units.spacing.space96};
		padding: ${theme.units.spacing.space32} ${theme.units.spacing.space24};

		button {
			width: 100%;
		}
	}
`;

export const FinalActionCopy = styled.div`
	max-width: 440px;
`;

export const FinalActionTitle = styled.h3`
	color: ${theme.color.text.iInverse};
	font-size: clamp(24px, 3vw, 32px);
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: 1.35;
	letter-spacing: -0.03em;
	word-break: keep-all;
`;

export const FinalActionDescription = styled.p`
	margin-top: ${theme.units.spacing.space12};
	color: rgba(255, 255, 255, 0.7);
	font-size: ${theme.typography.fontSize.body.lg};
	line-height: 1.65;
	word-break: keep-all;
`;
