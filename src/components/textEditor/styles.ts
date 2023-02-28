import styled from 'styled-components';

export const DocumentInfo = styled.div`
	height: 8vh;
	background-color: #4285F4;

	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	padding: 0 24px;

	div {
		display: flex;
		align-items: center;
		gap: 10px;
		font-weight: 300;
		font-size: 14px;
		color: #fff;
	}
`;

export const IconDocument = styled.img`
	width: 50px;
	height: 50px;
`;

export const Title = styled.span`
	color: #F5F6FB;
	font-size: 16px;
	font-weight: 600;
`;

export const Id = styled.div`
	color: white;
	font-size: 14px;
`;


export const EditorContainer = styled.div`

	.ql-container.ql-snow {
		border: none;
		display: flex;
		justify-content: center;	
	}

	.ql-toolbar.ql-snow {
		display: flex;
		justify-content: center;
		position: sticky;
		top: 0;
		z-index: 1;
		background-color: #f3f3f3;		
		border: none;
		box-shadow: 0 0 0.2in -0.1in rgba(0, 0, 0, 0.75);	
	}

	.ql-editor {
		width: 8.5in;
		height: 11in;
		padding: 1in;
		margin-top: 2rem;
		box-shadow: 0 0 0.2in -0.1in rgba(0, 0, 0, 0.75);
		background-color: white;

		/* width */
		&::-webkit-scrollbar {
			width: 0;
		}		
	}	

	@page {
		//size: A4;
		margin: 1in;

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
			border-radius: 10px;
		}

		/* Handle on hover */
		&::-webkit-scrollbar-thumb:hover {
			background: #555;
		}
	}
	
	@media print {
		body {
			background: none;
		}

		.ql-editor {
			width: 6.5in;
			height: 9in;
			padding: 0;
			margin: 0;
			box-shadow: none;
			align-self: flex-start;
		
		}

		.ql-toolbar.ql-snow {
			display: none;
		}
	}
`;
