import { getDayAndDate } from '@utils/schedulingUtils';
import * as S from './SchedulingFeed.styled';

interface GridHeaderProps {
	columnData: [string, number[]][];
}

const GridHeader = ({ columnData }: GridHeaderProps) => {
	return (
		<S.HeaderContainer>
			<S.TimeHeader />
			<S.HeaderWrapper>
				{columnData.map(([date]) => {
					const { dayOfWeek, dayOfMonth } = getDayAndDate(date);

					return (
						<S.Header key={`header-${date}`}>
							<S.Day>{dayOfWeek}</S.Day>
							<S.Date>{dayOfMonth}</S.Date>
						</S.Header>
					);
				})}
			</S.HeaderWrapper>
		</S.HeaderContainer>
	);
};

export default GridHeader;
