import * as S from './Badge.styled';

type badgeStatus = 'info' | 'warning' | 'success' | 'important';

export interface BadgeProps {
	type: 'dot' | 'number' | 'letter';
	status: badgeStatus;
	number?: number;
}

const Badge = (props: BadgeProps) => {
	const { type, status, number } = props;

	return (
		<S.BadgeContainer type={type} status={status}>
			{number && number >= 999 ? '999+' : number}
		</S.BadgeContainer>
	);
};

export default Badge;
