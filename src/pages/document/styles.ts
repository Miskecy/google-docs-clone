import styled from 'styled-components';

export const Container = styled.div`

  	/* width */
	&::-webkit-scrollbar {
		width: 10PX;
	}

	/* Track */
	&::-webkit-scrollbar-track {
	background: #f1f1f1;
	}

	/* Handle */
	&::-webkit-scrollbar-thumb {
	background: #888;
	}

	/* Handle on hover */
	&::-webkit-scrollbar-thumb:hover {
	background: #555;
	}
`;
