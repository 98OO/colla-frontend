import { getDayAndDate } from '@utils/schedulingUtils';
import * as S from './SchedulingFeed.styled';

interface TableHeaderProps {
	columnData: [string, number[]][];
}

const TableHeader = ({ columnData }: TableHeaderProps) => {
	return (
		<S.HeaderContainer>
			<S.TimeHeader />
			<S.HeaderWrapper>
				{columnData.map(([date]) => {
					const { dayOfWeek, dayOfMonth } = getDayAndDate(date);

					return (
						<S.Header key={`header-${date}`}>
							<S.DayOfWeek>{dayOfWeek}</S.DayOfWeek>
							<S.DayOfMonth>{dayOfMonth}</S.DayOfMonth>
						</S.Header>
					);
				})}
			</S.HeaderWrapper>
		</S.HeaderContainer>
	);
};

export default TableHeader;
