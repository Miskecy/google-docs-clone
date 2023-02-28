import * as dotenv from 'dotenv'
import io from 'socket.io';
import prisma from './services/prismaClient';

dotenv.config();

const socket = new io.Server(3001, {
	cors: {
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST'],
	}
});

socket.on('connection', (socket) => {
	socket.on('get-document', async (documentId: string) => {
		if (documentId == null) return;

		const document = await findOrCreateDocument(documentId);
		socket.join(documentId);
		socket.emit('load-document', document.data);

		socket.on('send-changes', (delta: string) => {
			socket.broadcast.to(documentId).emit('receive-changes', delta);
		});

		socket.on('save-document', async (data: string) => {
			//console.log(data)
			await prisma.document.update({
				where: {
					id: documentId
				},
				data: {
					data
				}
			});
		});
	});
});

async function findOrCreateDocument(id: string) {
	const document = await prisma.document.findFirst({
		where: {
			id
		}
	});

	if (document) return document;

	return await prisma.document.create({
		data: {
			id,
			data: ''
		}
	});
}