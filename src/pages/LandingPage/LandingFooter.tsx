import { Link } from 'react-router-dom';
import { ReactComponent as Colla } from '@assets/svg/colla.svg';
import { PATH } from '@constants/path';
import * as S from './LandingFooter.styled';

const LandingFooter = () => (
	<S.Footer>
		<S.FooterInner>
			<S.FooterMain>
				<S.BrandGroup>
					<S.BrandLink as={Link} to={PATH.ROOT} aria-label='Colla 홈으로 이동'>
						<Colla viewBox='0 0 154 57' aria-hidden='true' focusable='false' />
					</S.BrandLink>
					<S.Tagline>팀플의 모든 흐름을 한곳에서.</S.Tagline>
				</S.BrandGroup>
			</S.FooterMain>

			<S.Copyright>© 2026 Colla</S.Copyright>
		</S.FooterInner>
	</S.Footer>
);

export default LandingFooter;
