import React from 'react';

//? Components
import TextEditor from '../../components/textEditor';

import * as s from './styles';

const Document: React.FC = () => {
    return (
        <s.Container>
            <TextEditor />
        </s.Container>
    );
};

export default Document;
