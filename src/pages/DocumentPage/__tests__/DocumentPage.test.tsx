import useDocumentQuery from '@hooks/queries/document/useDocumentQuery';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import DocumentPage from '@pages/DocumentPage/DocumentPage';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import theme from '@styles/theme';
import type { Document } from '@type/document';

vi.mock('@hooks/queries/document/useDocumentQuery');
vi.mock('@hooks/queries/useUserStatusQuery');

const mockedUseDocumentQuery = vi.mocked(useDocumentQuery);
const mockedUseUserStatusQuery = vi.mocked(useUserStatusQuery);

const createAttachment = (
	id: number,
	name: string,
	createdAt: string
): Document => ({
	id,
	name,
	type: 'pdf',
	size: 1024,
	attachType: 'DOCUMENT',
	fileUrl: `https://example.com/${id}`,
	createdAt,
	author: {
		id,
		username: `사용자${id}`,
		profileImageUrl: null,
	},
});

const mockUserStatus = () => {
	mockedUseUserStatusQuery.mockReturnValue({
		userStatus: {
			profile: {
				userId: 1,
				username: '테스트 사용자',
				profileImageUrl: null,
				email: 'test@example.com',
				emailSubscription: false,
				commentNotification: 'NONE',
				lastSeenTeamspaceId: 1,
			},
			participatedTeamspaces: [],
		},
	});
};

const mockDocumentQuery = (attachments: Document[]) => {
	mockedUseDocumentQuery.mockReturnValue({
		teamDocument: {
			totalStorageCapacity: 0,
			attachments,
		},
		isPending: false,
	});
};

const renderDocumentPage = () => {
	render(
		<ThemeProvider theme={theme}>
			<DocumentPage />
		</ThemeProvider>
	);
};

describe('DocumentPage', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockUserStatus();
	});

	test('자료가 없으면 빈 상태 문구를 보여줘야 한다', () => {
		mockDocumentQuery([]);

		renderDocumentPage();

		expect(screen.getByText('아직 저장된 자료가 없어요')).toBeInTheDocument();
		expect(
			screen.getByText(
				'현재 팀스페이스의 피드와 채팅에서 주고받은 파일이 이곳에 모여요.'
			)
		).toBeInTheDocument();
	});

	test('파일 목록은 최신순으로 보여줘야 한다', () => {
		mockDocumentQuery([
			createAttachment(1, '오래된 파일.pdf', '2026-05-01T00:00:00'),
			createAttachment(2, '최신 파일.pdf', '2026-05-02T00:00:00'),
		]);

		const { container } = render(
			<ThemeProvider theme={theme}>
				<DocumentPage />
			</ThemeProvider>
		);
		const pageText = container.textContent ?? '';

		expect(pageText.indexOf('최신 파일.pdf')).toBeLessThan(
			pageText.indexOf('오래된 파일.pdf')
		);
	});

	test('파일을 선택하면 선택 개수를 보여주고 다운로드 버튼을 활성화해야 한다', async () => {
		const user = userEvent.setup();
		mockDocumentQuery([
			createAttachment(1, '첫 번째 파일.pdf', '2026-05-01T00:00:00'),
		]);

		renderDocumentPage();

		const downloadButton = screen.getByRole('button', { name: '다운로드' });
		const [, documentCheckbox] = screen.getAllByRole('checkbox');

		expect(downloadButton).toBeDisabled();

		await user.click(documentCheckbox);

		expect(screen.getByText('1개 선택됨')).toBeInTheDocument();
		expect(downloadButton).toBeEnabled();
	});

	test('전체 선택은 현재 페이지 파일을 모두 선택하고 다시 누르면 해제해야 한다', async () => {
		const user = userEvent.setup();
		mockDocumentQuery(
			Array.from({ length: 11 }, (_, index) =>
				createAttachment(
					index + 1,
					`${index + 1}번 파일.pdf`,
					`2026-05-${String(index + 1).padStart(2, '0')}T00:00:00`
				)
			)
		);

		renderDocumentPage();

		const selectAllCheckbox =
			screen.getByLabelText('현재 페이지 자료 전체 선택');

		await user.click(selectAllCheckbox);

		expect(screen.getByText('10개 선택됨')).toBeInTheDocument();
		expect(selectAllCheckbox).toBeChecked();

		await user.click(selectAllCheckbox);

		expect(screen.queryByText('10개 선택됨')).not.toBeInTheDocument();
		expect(selectAllCheckbox).not.toBeChecked();
	});
});
