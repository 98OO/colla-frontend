import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Colla } from '@assets/svg/colla.svg';
import { Button } from '@components/common/Button/Button';
import { PATH } from '@constants/path';
import * as S from './LandingNavigation.styled';

const LandingNavigation = () => {
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isHeroVisible, setIsHeroVisible] = useState(true);

	useEffect(() => {
		const hero = document.getElementById('landing-hero');
		if (!hero || typeof IntersectionObserver === 'undefined') return undefined;

		const observer = new IntersectionObserver(([entry]) => setIsHeroVisible(entry.isIntersecting), {
			rootMargin: '-72px 0px 0px',
			threshold: 0,
		});

		observer.observe(hero);

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!isMenuOpen) return undefined;

		const closeMenuWithEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setIsMenuOpen(false);
		};

		window.addEventListener('keydown', closeMenuWithEscape);

		return () => window.removeEventListener('keydown', closeMenuWithEscape);
	}, [isMenuOpen]);

	const moveTo = (path: string) => {
		setIsMenuOpen(false);
		navigate(path);
	};

	const closeMenu = () => setIsMenuOpen(false);
	const supportsHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
	const openMenuOnHover = () => {
		if (supportsHover()) setIsMenuOpen(true);
	};
	const closeMenuOnHover = () => {
		if (supportsHover()) setIsMenuOpen(false);
	};

	return (
		<S.Header $isTransparent={!isHeroVisible}>
			<S.Navigation aria-label='랜딩 페이지 주요 메뉴'>
				<S.BrandLink as={Link} to={PATH.ROOT} aria-label='Colla 홈으로 이동'>
					<Colla viewBox='0 0 154 57' aria-hidden='true' focusable='false' />
				</S.BrandLink>

				<S.DesktopActions>
					<Button label='로그인' variant='text' size='md' onClick={() => moveTo(PATH.SIGNIN)} />
					<Button label='시작하기' variant='text' size='md' onClick={() => moveTo(PATH.SIGNUP)} />
				</S.DesktopActions>

				<S.MobileMenuArea
					$isOpen={isMenuOpen}
					onMouseEnter={openMenuOnHover}
					onMouseLeave={closeMenuOnHover}
					onBlur={(event) => {
						if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
					}}>
					<S.MenuButton
						type='button'
						aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
						aria-expanded={isMenuOpen}
						aria-controls='landing-mobile-menu'
						onClick={() => setIsMenuOpen((isOpen) => !isOpen)}>
						<S.MenuIcon viewBox='0 0 24 24' aria-hidden='true'>
							{isMenuOpen ? (
								<>
									<path d='M6 6L18 18' />
									<path d='M18 6L6 18' />
								</>
							) : (
								<>
									<path d='M5 7H19' />
									<path d='M5 12H19' />
									<path d='M5 17H19' />
								</>
							)}
						</S.MenuIcon>
					</S.MenuButton>

					{isMenuOpen && (
						<S.MobileMenu id='landing-mobile-menu'>
							<S.MobileActions>
								<Button
									label='로그인'
									variant='text'
									size='md'
									isFull
									onClick={() => moveTo(PATH.SIGNIN)}
								/>
								<Button
									label='시작하기'
									variant='text'
									size='md'
									isFull
									onClick={() => moveTo(PATH.SIGNUP)}
								/>
							</S.MobileActions>
						</S.MobileMenu>
					)}
				</S.MobileMenuArea>
			</S.Navigation>
		</S.Header>
	);
};

export default LandingNavigation;
