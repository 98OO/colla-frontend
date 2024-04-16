import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';
import { worker } from '@mocks/browser';
import GlobalStyle from '@styles/GlobalStyle.ts';
import theme from '@styles/theme.ts';
import AppRouter from './AppRouter';
import './index.css';

if (process.env.NODE_ENV === 'development') {
	worker.start();
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<GlobalStyle />
				<AppRouter />
				<ReactQueryDevtools />
			</QueryClientProvider>
		</ThemeProvider>
	</React.StrictMode>
);
