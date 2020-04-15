import React, { useState, useCallback, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createEditor, Transforms, Editor, Range } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

import SpecListContainer from './speclist';
import SlateEditor from './editor/SlateEditor';

const Page = styled.div`
  position: absolute;
  background: #eee;
  width: 100%;
  height: 100%;
`;

const Header = styled.h1`
  color: #333;
  text-align: center;
`;

const SubHeader = styled.span`
  color: #333;
  font-size: 40%;
  margin-left: 10px;
`;

const withFixMe = (editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === 'fixme' ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === 'fixme' ? true : isVoid(element);
  };

  return editor;
};
const Home = (props) => {
  const editorRef = useRef();
  const editorSlateRef = useRef();
  const [selectedFixMe, setSelectedFixMe] = useState(null);
  const [selectedFixMe2, setSelectedFixMe2] = useState(null);
  const [saved, setSaved] = useState(null);
  const onFixMeSelected = useCallback((id) => {
    setSelectedFixMe(id);
  }, []);
  const onFixMeSelected2 = useCallback((id) => {
    setSelectedFixMe2(id);
  }, []);
  const editor = useMemo(
    () => withFixMe(withHistory(withReact(createEditor()), [])),
    []
  );
  const editor2 = useMemo(
    () => withFixMe(withHistory(withReact(createEditor()), [])),
    []
  );

  console.log('render home !', props);
  return (
    <Page>
      <Header>
        Spec Me Up<SubHeader>Before you no go</SubHeader>
      </Header>
      <button onClick={() => props.createSpecProject()}>Create project</button>
      <button
        onClick={() => {
          setSaved(editor.children);
        }}
      >
        Export/import
      </button>
      <SpecListContainer />
      {!saved && (
        <SlateEditor editor={editor} onFixMeSelected={onFixMeSelected} />
      )}
      {saved && (
        <SlateEditor
          editor={editor2}
          onFixMeSelected={onFixMeSelected2}
          saved={saved}
        />
      )}
      <div>Selected FixMe: {selectedFixMe}</div>
      <div>Selected FixMe: {selectedFixMe2}</div>
    </Page>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createSpecProject: () => dispatch((d) => d({ type: 'ADD_SPEC_PROJECT' }))
  };
};

export default connect(null, mapDispatchToProps)(Home);
