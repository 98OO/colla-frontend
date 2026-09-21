import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import chatImage from '@assets/images/landing/chat.webp';
import feedImage from '@assets/images/landing/feed.webp';
import generalPostImage from '@assets/images/landing/general-post.webp';
import materialRequestImage from '@assets/images/landing/material-request.webp';
import repositoryImage from '@assets/images/landing/repository.webp';
import scheduleInputImage from '@assets/images/landing/schedule-input.webp';
import scheduleResultImage from '@assets/images/landing/schedule-result.webp';
import teamspaceCreateJoinImage from '@assets/images/landing/teamspace-create-join.webp';
import teamspaceMembersImage from '@assets/images/landing/teamspace-members.webp';
import teamspaceSettingsImage from '@assets/images/landing/teamspace-settings.webp';
import { Button } from '@components/common/Button/Button';
import { PATH } from '@constants/path';
import * as S from './LandingFlow.styled';
import LandingFooter from './LandingFooter';

type ScreenLayout = 'team' | 'split' | 'chat' | 'feed' | 'collection' | 'wide';

interface FlowStep {
	title: string;
	description: string;
	layout: ScreenLayout;
	placeholderLabel: string;
	images?: readonly {
		src: string;
		alt: string;
		width: number;
		height: number;
	}[];
}

const COLLA_FLOW: readonly FlowStep[] = [
	{
		title: '팀을 만들고 초대해, 바로 협업을 시작해요.',
		description: '초대 코드로 팀원을 모으고 역할과 권한까지 한곳에서 관리할 수 있어요.',
		layout: 'team',
		placeholderLabel: '팀스페이스 생성과 참가, 팀원 및 역할 관리 화면',
		images: [
			{
				src: teamspaceCreateJoinImage,
				alt: '팀스페이스를 새로 만들거나 초대 코드로 참가하는 화면',
				width: 1175,
				height: 670,
			},
			{
				src: teamspaceMembersImage,
				alt: '팀원을 초대하고 참여 중인 구성원을 확인하는 화면',
				width: 283,
				height: 345,
			},
			{
				src: teamspaceSettingsImage,
				alt: '팀원의 권한과 역할을 관리하는 팀스페이스 설정 화면',
				width: 692,
				height: 592,
			},
		],
	},
	{
		title: '공지부터 일정 조율, 자료 요청까지 피드에서 시작해요.',
		description:
			'필요한 활동을 게시글로 나누어 진행하고, 팀의 최신 상황을 한눈에 확인할 수 있어요.',
		layout: 'feed',
		placeholderLabel: '피드 목록과 중간 발표 리허설 회의록 상세 화면',
		images: [
			{
				src: feedImage,
				alt: '중간 발표 리허설 회의록에서 수정 사항과 강의실 사진을 함께 확인하는 피드 화면',
				width: 1577,
				height: 990,
			},
		],
	},
	{
		title: '회의 내용부터 자료 수집까지, 목적에 맞게 남겨요.',
		description:
			'일반 게시글로 내용을 자유롭게 공유하고, 자료 수집 게시글로 담당 항목과 진행 상황을 함께 관리할 수 있어요.',
		layout: 'collection',
		placeholderLabel: '일반 게시글 작성과 중간 발표 수정 자료 수집 화면',
		images: [
			{
				src: generalPostImage,
				alt: '단편영화 촬영 장소 답사 회의록에서 중앙도서관 복도 사진과 촬영 조건을 확인하는 일반 게시글 화면',
				width: 772,
				height: 918,
			},
			{
				src: materialRequestImage,
				alt: '중간 발표 수정 자료의 제출 기한과 담당 항목, 담당자별 하위업무 진행 상태를 확인하는 화면',
				width: 665,
				height: 743,
			},
		],
	},
	{
		title: '가능한 시간을 겹쳐, 모두가 되는 일정을 정해요.',
		description:
			'각자 가능한 시간을 표시하면, 겹치는 시간대를 한눈에 확인하고 바로 일정을 정할 수 있어요.',
		layout: 'split',
		placeholderLabel: '팀원의 가능한 시간 입력과 공통 일정 확인 화면',
		images: [
			{
				src: scheduleInputImage,
				alt: '팀원이 가능한 시간을 30분 단위로 표시하는 일정 입력 화면',
				width: 602,
				height: 713,
			},
			{
				src: scheduleResultImage,
				alt: '팀원 네 명이 함께 가능한 시간을 확인하고 일정을 정한 화면',
				width: 603,
				height: 711,
			},
		],
	},
	{
		title: '빠르게 나눌 이야기는 채팅에서 바로 이어가요.',
		description:
			'팀원과 실시간으로 대화하고, 필요한 파일도 대화의 흐름 안에서 바로 주고받을 수 있어요.',
		layout: 'chat',
		placeholderLabel: '팀 프로젝트 채팅 목록과 대화 화면',
		images: [
			{
				src: chatImage,
				alt: '팀원이 발표 대본 파일을 공유하고 최종 리허설 시간과 장소를 정하는 채팅 화면',
				width: 1758,
				height: 984,
			},
		],
	},
	{
		title: '주고받은 파일은 한곳에 모여 다시 찾기 쉬워요.',
		description:
			'피드와 채팅에서 공유한 파일이 자동으로 모여, 필요한 자료를 다시 헤맬 필요가 없어요.',
		layout: 'wide',
		placeholderLabel: '팀 프로젝트 파일을 최신순으로 확인하고 선택해 다운로드하는 자료 저장소 화면',
		images: [
			{
				src: repositoryImage,
				alt: '파일명과 용량, 등록자, 등록일을 확인하고 여러 파일을 선택해 다운로드하는 자료 저장소 화면',
				width: 946,
				height: 892,
			},
		],
	},
] as const;

const SLOT_COUNT: Record<ScreenLayout, number> = {
	team: 3,
	split: 2,
	chat: 1,
	feed: 1,
	collection: 2,
	wide: 1,
};

const FlowStepItem = ({ step }: { step: FlowStep }) => {
	const { ref, inView } = useInView({
		threshold: 0.14,
		rootMargin: '0px 0px -8% 0px',
		triggerOnce: true,
	});

	return (
		<S.FlowItem ref={ref}>
			<S.StepCopy $isVisible={inView}>
				<S.StepTitle>{step.title}</S.StepTitle>
				<S.StepDescription>{step.description}</S.StepDescription>
			</S.StepCopy>
			<S.ScreenFrame
				$layout={step.layout}
				$isVisible={inView}
				role='group'
				aria-label={step.placeholderLabel}>
				{Array.from({ length: SLOT_COUNT[step.layout] }, (_, slotIndex) => {
					const image = step.images?.[slotIndex];

					return (
						<S.ScreenPlaceholder key={image?.src ?? slotIndex} aria-hidden={!image}>
							{image && (
								<S.ScreenImage
									src={image.src}
									alt={image.alt}
									width={image.width}
									height={image.height}
									loading='lazy'
									decoding='async'
									fetchPriority='low'
								/>
							)}
						</S.ScreenPlaceholder>
					);
				})}
			</S.ScreenFrame>
		</S.FlowItem>
	);
};

const LandingFlow = () => {
	const navigate = useNavigate();
	const { ref: headerRef, inView: isHeaderVisible } = useInView({
		threshold: 0.4,
		triggerOnce: true,
	});
	const { ref: finalActionRef, inView: isFinalActionVisible } = useInView({
		threshold: 0.25,
		triggerOnce: true,
	});

	return (
		<>
			<S.FlowSection id='features' aria-labelledby='landing-flow-title'>
				<S.FlowInner>
					<S.FlowHeader ref={headerRef} $isVisible={isHeaderVisible}>
						<S.FlowTitle id='landing-flow-title'>
							팀플의 시작부터 마무리까지,
							<br />
							한곳에서 이어집니다.
						</S.FlowTitle>
					</S.FlowHeader>

					<S.FlowList>
						{COLLA_FLOW.map((step) => (
							<FlowStepItem key={step.title} step={step} />
						))}
					</S.FlowList>

					<S.FinalAction ref={finalActionRef} $isVisible={isFinalActionVisible}>
						<S.FinalActionCopy>
							<S.FinalActionTitle>다음 팀플은 흩어지지 않게 시작하세요.</S.FinalActionTitle>
							<S.FinalActionDescription>
								팀스페이스를 만들고, 팀의 모든 흐름을 한곳에 모아보세요.
							</S.FinalActionDescription>
						</S.FinalActionCopy>
						<Button
							label='Colla 시작하기'
							variant='primary'
							size='lg'
							onClick={() => navigate(PATH.SIGNUP)}
						/>
					</S.FinalAction>
				</S.FlowInner>
			</S.FlowSection>
			<LandingFooter />
		</>
	);
};

export default LandingFlow;
