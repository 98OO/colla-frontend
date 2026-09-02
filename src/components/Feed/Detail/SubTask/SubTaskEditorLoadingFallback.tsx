import Skeleton from '@components/common/Skeleton/Skeleton';
import useDelayedVisibility from '@hooks/common/useDelayedVisibility';
import * as S from './SubTaskEditorLoadingFallback.styled';

const FALLBACK_DELAY_MS = 200;

const SubTaskEditorLoadingFallback = () => {
	const isVisible = useDelayedVisibility(FALLBACK_DELAY_MS);

	return (
		<S.Container
			$isVisible={isVisible}
			role={isVisible ? 'status' : undefined}
			aria-label={isVisible ? '하위 업무 편집기를 불러오는 중' : undefined}
			aria-hidden={!isVisible}>
			{isVisible && (
				<>
					<Skeleton width='60%' height={30} radius={10} />
					<Skeleton height={278} radius={12} />
					<S.Actions>
						<Skeleton width={64} height={40} radius={6} />
					</S.Actions>
				</>
			)}
		</S.Container>
	);
};

export default SubTaskEditorLoadingFallback;
