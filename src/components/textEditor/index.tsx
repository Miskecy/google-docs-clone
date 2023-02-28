import React from 'react';
import Quill, { TextChangeHandler } from 'quill';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client/build/esm/socket';

//? Assets
import docslogo from '../../assets/docs.svg';

//? Hooks
import { useParams } from 'react-router-dom';

//? Styles
import * as s from './styles';

const TextEditor: React.FC = () => {
    const [socket, setSocket] = React.useState<Socket>();
    const [quill, setQuill] = React.useState<Quill>();

    const { id: documentId } = useParams<{ id: string }>();

    //? Connect to the server and set the socket
    React.useEffect(() => {
        const s = io('http://localhost:3001');
        setSocket(s);

        return () => {
            s.disconnect();
        };
    }, []);

    //? On Text Change, send the changes to the server
    React.useEffect(() => {
        if (socket === undefined || quill === undefined) return;

        const handlerTextChange: TextChangeHandler = (
            delta,
            oldDelta,
            source
        ) => {
            if (source !== 'user') return;

            socket.emit('send-changes', delta);
        };

        quill.on('text-change', handlerTextChange);

        return () => {
            quill.off('text-change', handlerTextChange);
        };
    }, [socket, quill]);

    //? On receive-changes, update the editor
    React.useEffect(() => {
        if (socket === undefined || quill === undefined) return;

        const handlerGetChanges: TextChangeHandler = delta => {
            quill.updateContents(delta);
        };

        socket.on('receive-changes', handlerGetChanges);

        return () => {
            socket.off('receive-changes', handlerGetChanges);
        };
    }, [socket, quill]);

    //? Load and Set the Content of the Document by ID
    React.useEffect(() => {
        if (socket === undefined || quill === undefined) return;

        socket.once('load-document', document => {
            quill.setContents(document);
            quill.enable();
        });

        socket.emit('get-document', documentId);
    }, [socket, quill, documentId]);

    const SAVE_INTERVAL_MS = 2000;

    //? Save the document every 2 seconds
    React.useEffect(() => {
        if (socket === undefined || quill === undefined) return;

        const interval = setInterval(() => {
            socket.emit('save-document', quill.getContents());
        }, SAVE_INTERVAL_MS);

        return () => {
            clearInterval(interval);
        };
    }, [socket, quill]);

    const toolbarOptions = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ script: 'sub' }, { script: 'super' }],
        [
            { align: '' },
            { align: 'center' },
            { align: 'right' },
            { align: 'justify' },
        ],
        ['image', 'blockquote', 'code-block'],
        ['clean'],
    ];

    //? Create the editor by reference and set the quill
    const wrapperRef = React.useCallback((wrapper: HTMLDivElement) => {
        if (wrapper === null) return;

        wrapper.innerHTML = '';
        const editor = document.createElement('div');
        wrapper.append(editor);

        const q = new Quill(editor, {
            modules: { toolbar: toolbarOptions },
            theme: 'snow',
        });
        q.disable();
        q.setText('Loading...');
        setQuill(q);
    }, []);

    return (
        <>
            <s.DocumentInfo>
                <div>
                    <s.IconDocument src={docslogo} />
                    <h1>Google Docs Clone</h1>
                </div>
                <div>
                    <s.Title>Document:</s.Title>
                    <s.Id>{documentId}</s.Id>
                </div>
            </s.DocumentInfo>
            <s.EditorContainer ref={wrapperRef} />
        </>
    );
};

export default TextEditor;
