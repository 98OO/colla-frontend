import * as m from 'motion/react-m';
import styled from 'styled-components';
import { FEED_CARD_WIDTH } from '@styles/layout';

export const Container = styled.div`
	position: relative;
	width: ${FEED_CARD_WIDTH}px;
`;

export const PreviewLayer = styled(m.div)`
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	pointer-events: none;
`;
