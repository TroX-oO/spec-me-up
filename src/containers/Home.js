import React, { useState, useCallback, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createEditor, Transforms, Editor, Range } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

import { createSpecProject } from '../actions/spec';
import SpecListContainer from './speclist/SpecListContainer';
import SlateEditor from '../components/editor/SlateEditor';

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
    <>
      <button onClick={() => props.createSpecProject(Date.now())}>
        Create project
      </button>
      <SpecListContainer />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createSpecProject: (name) => dispatch(createSpecProject(name))
  };
};

export default connect(null, mapDispatchToProps)(Home);
