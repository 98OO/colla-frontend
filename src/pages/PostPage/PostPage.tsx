import { useLocation } from 'react-router-dom';

const PostPage = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const feedType = queryParams.get('type');

	return <div>{feedType}</div>;
};
export default PostPage;
