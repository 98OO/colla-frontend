import { useInView } from 'react-intersection-observer';
import * as S from './LandingProblem.styled';

const PROJECT_FRICTIONS = [
	{
		label: '일정',
		description: '가능한 시간을 묻고, 응답을 다시 모읍니다.',
		tools: ['단체 채팅', '설문 링크'],
	},
	{
		label: '의견',
		description: '결정된 내용을 찾으려고 대화를 다시 훑습니다.',
		tools: ['채팅 기록', '회의 메모'],
	},
	{
		label: '자료',
		description: '필요한 파일과 링크가 어디 있는지 다시 묻습니다.',
		tools: ['클라우드', '메신저'],
	},
	{
		label: '진행',
		description: '담당자와 마감일을 매번 다시 확인합니다.',
		tools: ['할 일 앱', '공지 메시지'],
	},
] as const;

const LandingProblem = () => {
	const { ref, inView } = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});

	return (
		<S.ProblemSection id='service-overview' ref={ref} aria-labelledby='landing-problem-title'>
			<S.ProblemInner>
				<S.ProblemHeading $isVisible={inView}>
					<S.ProblemTitle id='landing-problem-title'>
						팀플을 어렵게 만드는 건,
						<br />
						해야 할 일만이 아닙니다.
					</S.ProblemTitle>
					<S.ProblemDescription>
						일정과 의견, 자료와 진행 상황이 흩어지면 같은 내용을 찾고 묻는 일이 반복됩니다.
					</S.ProblemDescription>
				</S.ProblemHeading>

				<S.FrictionList aria-label='팀 프로젝트에서 반복되는 불편'>
					{PROJECT_FRICTIONS.map((friction, index) => (
						<S.FrictionItem key={friction.label} $isVisible={inView} $delay={100 + index * 90}>
							<S.FrictionLabel>{friction.label}</S.FrictionLabel>
							<S.FrictionDescription>{friction.description}</S.FrictionDescription>
							<S.ToolTrail aria-label={`${friction.tools.join('과 ')}에 흩어짐`}>
								{friction.tools.map((tool) => (
									<S.ToolName key={tool}>{tool}</S.ToolName>
								))}
							</S.ToolTrail>
						</S.FrictionItem>
					))}
				</S.FrictionList>

				<S.Conclusion $isVisible={inView} $delay={520}>
					<S.ConclusionText>
						<S.ConclusionLead>
							도구를 오갈 때마다 지난 결정과 다음 할 일을 다시 확인해야 합니다.
						</S.ConclusionLead>
						<S.Highlight>Colla는 이 모든 흐름을 하나로 연결합니다.</S.Highlight>
					</S.ConclusionText>
				</S.Conclusion>
			</S.ProblemInner>
		</S.ProblemSection>
	);
};

export default LandingProblem;
