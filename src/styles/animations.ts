import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate3D(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: translate3D(0, 0, 0);
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translate3D(0, 0, 0);
  }
  to {
    opacity: 0;
    transform: translate3D(0, 100%, 0);
  }
`;
