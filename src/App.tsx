import { queryClient } from '@hooks/queries/common/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@styles/GlobalStyle';
import theme from '@styles/theme';
import AppRouter from './AppRouter';

const App = () => (
	<ThemeProvider theme={theme}>
		<QueryClientProvider client={queryClient}>
			<GlobalStyle />
			<AppRouter />
			<ReactQueryDevtools />
		</QueryClientProvider>
	</ThemeProvider>
);

export default App;
