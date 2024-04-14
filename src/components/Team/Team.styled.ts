import { styled } from 'styled-components';

export const Wrapper = styled.ul`
	padding: 8px 26px;
	border-radius: 6px;
	border: 2px solid ${(props) => props.theme.color.border.danger};
`;
