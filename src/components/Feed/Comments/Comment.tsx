import Profile from '@components/common/Profile/Profile';

interface Comment {
	author: {
		id: number;
		profileImageUrl: string | null;
		username: string;
	};
	content: string;
	createdAt: string;
}

interface CommentsProps {
	comment: Comment;
}

const Comment = ({ comment }: CommentsProps) => {
	const { author, content, createdAt } = comment;
	return (
		<Profile
			profile={author.profileImageUrl}
			initial={author.username.charAt(0)}
			avatarSize='lg'
			avatarShape='rect'
			title={author.username}
			titleSize='lg'
			titleWeight='medium'
			subTitle={createdAt}
			text={content}
			trailingIcon='Kebab'
		/>
	);
};

export default Comment;
