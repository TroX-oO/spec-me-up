import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  forwardRef
} from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../store';
import ReactDOM from 'react-dom';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './blots/FixMeBlot';

import { v4 } from 'uuid';
import FixMe from '../fixme';

const CustomButton = () => <span className="octicon octicon-star" />;

/*
 * Custom toolbar component including insertStar button and dropdowns
 */
const CustomToolbar = () => (
  <div id="toolbar">
    <select
      className="ql-header"
      defaultValue={''}
      onChange={(e) => e.persist()}
    >
      <option value="1" />
      <option value="2" />
      <option selected />
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <select className="ql-color">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="#d0d1d2" />
      <option selected />
    </select>
    <button className="ql-insertFixMe">
      <CustomButton />
    </button>
  </div>
);

/*
 * Event handler to be attached using Quill toolbar module (see line 73)
 * https://quilljs.com/docs/modules/toolbar/
 */
function insertFixMe(callback) {
  console.log(this);
  return function () {
    console.log(this);
    console.log(callback);
    console.log(this.quill);
    const selection = this.quill.getSelection();
    const cursorPosition = selection ? selection.index : null;
    const id = v4();

    if (cursorPosition === null) {
      return;
    }

    this.quill.insertEmbed(
      cursorPosition,
      'fixme',
      {
        id,
        callback
      },
      'user'
    );
    this.quill.setSelection(cursorPosition + 1);
  };
}
const QuillEditor = forwardRef((props, editor) => {
  const [value, setValue] = useState(props.saved || '');

  const formats = useMemo(
    () => [
      'header',
      'font',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
      'color',
      'fixme'
    ],
    []
  );
  const modules = useMemo(
    () => ({
      toolbar: {
        container: '#toolbar',
        handlers: {
          insertFixMe: insertFixMe(props.onFixMeSelected)
        }
      }
    }),
    []
  );

  useEffect(() => {
    console.log();
    if (editor && editor.current) {
      editor.current.getEditor().on('text-change', (a, b, c) => {
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(editor.current.getEditor().getContents());
      });
    }
  }, [editor]);

  return (
    <>
      <CustomToolbar />
      <ReactQuill
        ref={editor}
        theme="snow"
        value={value}
        onChange={setValue}
        formats={formats}
        modules={modules}
      />
    </>
  );
});

export default QuillEditor;
