import { WEEKDAYS } from '@constants/calendar';
import * as S from './SchedulingFeed.styled';

interface GridHeaderProps {
	dates: string[];
}

const GridHeader = ({ dates }: GridHeaderProps) => {
	return (
		<S.HeaderContainer>
			<S.TimeHeader />
			<S.HeaderWrapper>
				{dates.map((dateString) => {
					const date = new Date(dateString);

					return (
						<S.Header key={dateString}>
							<S.Day>{WEEKDAYS[date.getDay()]}</S.Day>
							<S.Date>{`${date.getMonth() + 1}.${date.getDate()}`}</S.Date>
						</S.Header>
					);
				})}
			</S.HeaderWrapper>
		</S.HeaderContainer>
	);
};

export default GridHeader;
