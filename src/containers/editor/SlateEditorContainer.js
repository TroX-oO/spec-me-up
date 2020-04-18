import React, {
  useState,
  forwardRef,
  useMemo,
  useCallback,
  useRef,
  useEffect
} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createEditor, Transforms, Editor, Range } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { v4 } from 'uuid';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import { createFixMe } from '../../actions/fixme';
import FixMe from '../fixme/FixMe';
import Toolbar from '../../components/editor/Toolbar';

const EditorPaper = styled(Paper)`
  &.MuiPaper-root {
    padding: 5px;
    background-color: #eaeaea;
  }
`;

const TextEditorContainer = styled(Paper)`
  &.MuiPaper-root {
    width: 900px;
    padding: 20px;
    margin: auto;
  }
`;

const Element = (props) => {
  const { attributes, children, element } = props;
  console.error('render ! ', props);
  switch (element.type) {
    case 'fixme':
      return <FixMe {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const DEFAULT = [
  {
    children: [{ text: 'A line of text in a paragraph. ' }]
  }
];
const SlateEditorContainer = forwardRef((props, ref) => {
  const [value, setValue] = useState(DEFAULT);
  console.log(props);

  const callback = props.onFixMeSelected;
  const renderElement = useCallback(
    (props) => <Element {...props} onFixMeSelected={callback} />,
    []
  );

  return (
    <EditorPaper square>
      <Slate
        editor={props.editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            const id = props.createFixMe('Random title');
            Transforms.insertNodes(props.editor, {
              type: 'fixme',
              id,
              children: [{ text: '' }]
            });
            Transforms.move(props.editor);
          }}
        >
          fixme
        </div>
        <Toolbar />
        <TextEditorContainer square>
          <Editable
            renderElement={renderElement}
            onBlur={(e, f, g) => {
              console.log(e);
              console.log(f);
              console.log(g);
            }}
          />
        </TextEditorContainer>
      </Slate>
    </EditorPaper>
  );
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    createFixMe: (title) => {
      const createFixMeAction = createFixMe(title, props.specId);

      dispatch(createFixMeAction);
      return createFixMeAction.fixMeId;
    }
  };
};

export default connect(null, mapDispatchToProps)(SlateEditorContainer);
