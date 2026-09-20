import styled, { css } from 'styled-components';
import theme from '@styles/theme';

const reveal = (isVisible: boolean, delay = 0) => css`
	opacity: ${isVisible ? 1 : 0};
	transform: translateY(${isVisible ? '0' : '28px'});
	transition:
		opacity 720ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
		transform 720ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms;

	@media (prefers-reduced-motion: reduce) {
		opacity: 1;
		transform: none;
		transition: none;
	}
`;

export const ProblemSection = styled.section`
	display: flex;
	justify-content: center;
	padding: 112px ${theme.units.spacing.space24} 96px;
	background-color: ${theme.color.text.primary};

	@media (max-width: 640px) {
		padding: 88px ${theme.units.spacing.space20} ${theme.units.spacing.space80};
	}
`;

export const ProblemInner = styled.div`
	display: flex;
	flex-direction: column;
	width: min(100%, 960px);
`;

export const ProblemHeading = styled.div<{ $isVisible: boolean }>`
	width: 100%;
	${({ $isVisible }) => reveal($isVisible)}
`;

export const ProblemTitle = styled.h2`
	max-width: 820px;
	color: ${theme.color.text.iInverse};
	font-size: clamp(40px, 4.6vw, 64px);
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: 1.12;
	letter-spacing: -0.04em;
	word-break: keep-all;
`;

export const ProblemDescription = styled.p`
	max-width: 860px;
	margin-top: ${theme.units.spacing.space32};
	color: rgba(255, 255, 255, 0.7);
	font-size: 18px;
	line-height: 1.78;
	word-break: keep-all;

	@media (max-width: 640px) {
		margin-top: ${theme.units.spacing.space24};
		font-size: ${theme.typography.fontSize.body.lg};
		line-height: 1.7;
	}
`;

export const FrictionList = styled.ul`
	margin: ${theme.units.spacing.space72} 0 0;
	padding: 0;
	border-top: 1px solid rgba(255, 255, 255, 0.2);
	list-style: none;

	@media (max-width: 640px) {
		margin-top: ${theme.units.spacing.space48};
	}
`;

export const FrictionItem = styled.li<{ $isVisible: boolean; $delay: number }>`
	display: grid;
	grid-template-columns: 72px minmax(0, 1fr) 220px;
	align-items: center;
	gap: ${theme.units.spacing.space20};
	min-height: 96px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	${({ $isVisible, $delay }) => reveal($isVisible, $delay)}

	@media (max-width: 640px) {
		grid-template-columns: 44px minmax(0, 1fr);
		gap: ${theme.units.spacing.space10} ${theme.units.spacing.space12};
		min-height: 0;
		padding: ${theme.units.spacing.space24} 0;
	}
`;

export const FrictionLabel = styled.span`
	color: rgba(255, 255, 255, 0.52);
	font-size: ${theme.typography.fontSize.body.md};
	font-weight: ${theme.typography.fontWeight.semiBold};
`;

export const FrictionDescription = styled.span`
	color: ${theme.color.text.iInverse};
	font-size: 20px;
	font-weight: ${theme.typography.fontWeight.semiBold};
	line-height: 1.5;
	word-break: keep-all;

	@media (max-width: 640px) {
		font-size: ${theme.typography.fontSize.body.lg};
	}
`;

export const ToolTrail = styled.span`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: ${theme.units.spacing.space6};
	width: 220px;

	&::before {
		content: '';
		width: 24px;
		height: 1px;
		margin-right: ${theme.units.spacing.space4};
		background-color: rgba(255, 255, 255, 0.36);
	}

	@media (max-width: 640px) {
		grid-column: 2;
		flex-wrap: wrap;
		justify-content: flex-start;
		width: 100%;

		&::before {
			display: none;
		}
	}
`;

export const ToolName = styled.span`
	box-sizing: border-box;
	width: 88px;
	padding: ${theme.units.spacing.space6} ${theme.units.spacing.space10};
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: ${theme.units.radius.full};
	background-color: rgba(255, 255, 255, 0.06);
	color: rgba(255, 255, 255, 0.72);
	font-size: ${theme.typography.fontSize.body.sm};
	font-weight: ${theme.typography.fontWeight.medium};
	text-align: center;
	white-space: nowrap;
`;

export const Conclusion = styled.div<{ $isVisible: boolean; $delay: number }>`
	max-width: 820px;
	margin-top: ${theme.units.spacing.space52};
	${({ $isVisible, $delay }) => reveal($isVisible, $delay)}

	@media (max-width: 860px) {
		margin-top: ${theme.units.spacing.space48};
	}
`;

export const ConclusionText = styled.p`
	word-break: keep-all;
`;

export const ConclusionLead = styled.span`
	display: block;
	color: rgba(255, 255, 255, 0.66);
	font-size: clamp(16px, 1.8vw, 24px);
	font-weight: ${theme.typography.fontWeight.semiBold};
	line-height: 1.6;
	letter-spacing: -0.02em;
`;

export const Highlight = styled.span`
	display: block;
	margin-top: ${theme.units.spacing.space12};
	color: ${theme.color.text.iInverse};
	font-size: clamp(32px, 3.2vw, 48px);
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: 1.35;
	letter-spacing: -0.03em;
	text-wrap: balance;
`;
