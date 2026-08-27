import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type {
	AvailabilityFlag,
	SchedulingFeed as SchedulingFeedData,
	SchedulingResponse,
	TotalAvailability,
	UserAvailability,
} from '@type/feed';
import type { UserInformation } from '@type/user';
import SchedulingFeed from './SchedulingFeed';

const SEGMENTS = 48;
const VIEW_MIN_SEG = 18; // 9:00
const VIEW_MAX_SEG = 34; // 17:00

const MOCK_USER_ID = 1;

const mockUser: UserInformation = {
	profile: {
		userId: MOCK_USER_ID,
		username: '강민재',
		profileImageUrl: null,
		email: 'user@test.com',
		emailSubscription: false,
		commentNotification: 'ALL',
		lastSeenTeamspaceId: 1,
	},
	participatedTeamspaces: [],
};

const pad = (n: number) => String(n).padStart(2, '0');

const makeDates = () =>
	Array.from({ length: 7 }, (_, i) => {
		const date = new Date();
		date.setDate(date.getDate() + 1 + i);

		return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
	});

const futureDueAt = () => {
	const date = new Date();
	date.setDate(date.getDate() + 30);

	return date.toISOString();
};

const isAvailableAt = (dayIndex: number, segment: number, participantIndex: number) => {
	const mid = (VIEW_MIN_SEG + VIEW_MAX_SEG) / 2;
	const spread = (VIEW_MAX_SEG - VIEW_MIN_SEG) / 2;
	const centrality = 1 - Math.abs(segment - mid) / spread;
	const threshold = 0.12 + centrality * 0.5;

	const seed =
		Math.sin((dayIndex + 1) * 12.9898 + (segment + 1) * 4.1414 + (participantIndex + 1) * 7.13) *
		43758.5453;

	return seed - Math.floor(seed) < threshold;
};

const PLACEHOLDER_RESPONSE_CREATED_AT = '2026-07-02T09:00:00';

type Participant = SchedulingResponse['user'];

const PARTICIPANTS: Participant[] = [
	{ id: MOCK_USER_ID, username: '강민재', profileImageUrl: '' },
	{ id: 2, username: '이서연', profileImageUrl: '' },
	{ id: 3, username: '김도윤', profileImageUrl: '' },
	{ id: 4, username: '박지우', profileImageUrl: '' },
	{ id: 5, username: '최하은', profileImageUrl: '' },
];

const buildMultiParticipantFeed = (): SchedulingFeedData => {
	const dates = makeDates();
	const totalAvailability: TotalAvailability = {};
	dates.forEach((date) => {
		totalAvailability[date] = Array(SEGMENTS).fill(0);
	});

	const responses: SchedulingResponse[] = PARTICIPANTS.map((user, participantIndex) => {
		const availabilities: UserAvailability = {};

		dates.forEach((date, dayIndex) => {
			const row = Array<AvailabilityFlag>(SEGMENTS).fill(0);

			for (let segment = VIEW_MIN_SEG; segment < VIEW_MAX_SEG; segment += 1) {
				if (isAvailableAt(dayIndex, segment, participantIndex)) {
					row[segment] = 1;
					totalAvailability[date][segment] += 1;
				}
			}

			availabilities[date] = row;
		});

		return { availabilities, createdAt: PLACEHOLDER_RESPONSE_CREATED_AT, user };
	});

	return {
		feedId: 1,
		feedType: 'SCHEDULING',
		author: { id: 10, profileImageUrl: null, username: '이서연', tag: null },
		title: '4월 스프린트 회고 미팅',
		createdAt: '2026-07-01T10:24:00',
		comments: [],
		images: [],
		attachments: [],
		details: {
			dueAt: futureDueAt(),
			isClosed: false,
			minTimeSegment: VIEW_MIN_SEG,
			maxTimeSegment: VIEW_MAX_SEG,
			numOfParticipants: PARTICIPANTS.length,
			totalAvailability,
			responses,
		},
	};
};

const withProviders = (Story: () => JSX.Element) => {
	const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	queryClient.setQueryData(['userStatus'], mockUser);

	return (
		<QueryClientProvider client={queryClient}>
			<ErrorBoundary fallbackRender={({ error }) => <div>렌더 오류: {String(error)}</div>}>
				<Story />
			</ErrorBoundary>
		</QueryClientProvider>
	);
};

const meta = {
	title: 'Components/Feed/SchedulingFeed',
	component: SchedulingFeed,
	parameters: {
		layout: 'fullscreen',
		chromatic: { disableSnapshot: true },
		docs: {
			description: {
				component:
					'여러 참여자의 가능한 시간을 모아 시간대별 가능 인원을 시각적으로 나타내는 일정 조율 피드입니다. ' +
					'조회 모드에서는 슬롯에 마우스를 올려 해당 시간에 가능한 인원을 확인하고, ' +
					'편집 모드에서는 드래그로 자신의 가능 시간을 등록·수정합니다. 마감된 경우 편집할 수 없습니다.',
			},
		},
	},
	decorators: [(Story) => withProviders(Story)],
} satisfies Meta<typeof SchedulingFeed>;

export default meta;
type Story = StoryObj<typeof SchedulingFeed>;

export const MultiParticipants: Story = {
	name: '조회 · 가능 인원 표시',
	render: () => <SchedulingFeed feedData={buildMultiParticipantFeed()} />,
};
