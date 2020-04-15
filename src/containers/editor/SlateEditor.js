import React, {
  useState,
  forwardRef,
  useMemo,
  useCallback,
  useRef,
  useEffect
} from 'react';

import { createEditor, Transforms, Editor, Range } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { v4 } from 'uuid';
import FixMe from '../fixme';

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
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph. ' }]
  },
  {
    type: 'fixme',
    id: v4(),
    children: [{ text: '' }]
  }
];
const SlateEditor = forwardRef((props, ref) => {
  console.error('re-render Slate editor');
  const editor = useMemo(
    () => withFixMe(withHistory(withReact(createEditor()), [])),
    []
  );
  const [value, setValue] = useState(props.saved || DEFAULT);
  console.log(props);
  const editorRef = useRef(null);

  const callback = props.onFixMeSelected;
  const renderElement = useCallback(
    (props) => <Element {...props} onFixMeSelected={callback} />,
    []
  );

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          Transforms.insertNodes(editor, {
            type: 'fixme',
            id: v4(),
            children: [{ text: '' }]
          });
          Transforms.move(editor);
        }}
      >
        fixme
      </div>
      <Editable
        renderElement={renderElement}
        onBlur={(e, f, g) => {
          console.log(e);
          console.log(f);
          console.log(g);
        }}
      />
    </Slate>
  );
});

export default SlateEditor;
