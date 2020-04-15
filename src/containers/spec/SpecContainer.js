import React, { useState, useCallback, useRef, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createEditor, Transforms, Editor, Range } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

import SpecListContainer from '../speclist/SpecListContainer';
import SlateEditor from '../../components/editor/SlateEditor';

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
const SpecContainer = (props) => {
  const [selectedFixMe, setSelectedFixMe] = useState(null);
  const editor = useMemo(
    () => withFixMe(withHistory(withReact(createEditor()), [])),
    []
  );
  const onFixMeSelected = useCallback((id) => {
    setSelectedFixMe(id);
  }, []);

  return (
    <>
      <h1>{props.spec.name}</h1>
      <h4>{props.match.params.specId}</h4>
      <SlateEditor editor={editor} onFixMeSelected={onFixMeSelected} />
      <div>Selected FixMe: {selectedFixMe}</div>
    </>
  );
};

const mapStateToProps = (state, props) => {
  return {
    spec: state.specs[props.match.params.specId]
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createSpecProject: () => dispatch((d) => d({ type: 'ADD_SPEC_PROJECT' }))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SpecContainer)
);
