import { createGlobalStyle } from 'styled-components';
import 'quill/dist/quill.snow.css';

export default createGlobalStyle`
	*, *::before, *::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		background-color: #f3f3f3;
		font-family: 'Roboto', sans-serif;
	}
`;
