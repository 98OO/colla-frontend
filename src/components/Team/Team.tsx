import { useEffect, useState } from 'react';
import { UserInfo } from '@type/team';
import axios from 'axios';
import * as S from './Team.styled';

const Team = () => {
	const [memberName, setMemberName] = useState<UserInfo[]>([]);

	const getMember = async () => {
		const res = await axios.get('/getMember');
		if (res.data) {
			setMemberName(res.data);
		}
	};

	useEffect(() => {
		getMember();
	}, []);

	return (
		<S.Wrapper>
			{memberName.map((member, idx) => (
				<li key={member.id}>
					{idx + 1}번째 멤버 : {member.name}
				</li>
			))}
		</S.Wrapper>
	);
};

export default Team;
