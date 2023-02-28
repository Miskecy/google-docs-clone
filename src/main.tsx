import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//? Pages
import Document from './pages/document';

//? Styles
import GlobalStyles from './styles/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Navigate to={`/document/${crypto.randomUUID()}`} />
                    }
                />
                <Route path="/document/:id" element={<Document />} />
            </Routes>
        </BrowserRouter>

        <GlobalStyles />
    </React.StrictMode>
);
