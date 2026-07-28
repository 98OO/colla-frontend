import React from 'react';
import ReactDOM from 'react-dom/client';
import { worker } from '@mocks/browser';
import App from './App';
import './index.css';

if (process.env.NODE_ENV === 'development') {
	worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
