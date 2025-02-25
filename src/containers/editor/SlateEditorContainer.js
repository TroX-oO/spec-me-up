import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Slate, Editable } from 'slate-react';

import Paper from '@material-ui/core/Paper';

import { createFixMe } from '../../actions/fixme';
import { setSpecContent } from '../../actions/spec';
import FixMe from './FixMe';
import Toolbar from '../../components/editor/Toolbar';

const EditorContainerPaper = styled(Paper)`
  &.MuiPaper-root {
    padding: 5px;
    background-color: #eaeaea;
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 10px;
  }
`;

const EditorPaper = styled.div`
  flex: 1;
  overflow-y: auto;
  height: 100%;
`;

const TextEditorContainer = styled(Paper)`
  &.MuiPaper-root {
    width: 900px;
    padding: 20px;
    margin: auto;

    line-height: 1.9;
    height: calc(100% - 40px);
    overflow-y: auto;
  }
`;

const Element = (props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'fixme':
      return <FixMe {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const DEFAULT = [
  {
    children: [{ text: '' }]
  }
];
const SlateEditorContainer = (props) => {
  const [value, setValue] = useState(props.content || DEFAULT);

  const renderElement = useCallback(
    (p) => <Element {...p} onFixMeSelected={props.onFixMeSelected} />,
    [props.onFixMeSelected]
  );

  const handleChange = (value) => {
    setValue(value);
    props.setSpecContent(value);
  };

  return (
    <EditorContainerPaper square>
      <Slate editor={props.editor} value={value} onChange={handleChange}>
        <Toolbar createFixMe={props.createFixMe} />
        <EditorPaper square>
          <TextEditorContainer square>
            <Editable renderElement={renderElement} />
          </TextEditorContainer>
        </EditorPaper>
      </Slate>
    </EditorContainerPaper>
  );
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    createFixMe: (title) => {
      const createFixMeAction = createFixMe(props.specId, title);

      dispatch(createFixMeAction);
      return createFixMeAction.fixMeId;
    },
    setSpecContent: (content) => {
      dispatch(setSpecContent(props.specId, content));
    }
  };
};

export default connect(null, mapDispatchToProps)(SlateEditorContainer);
