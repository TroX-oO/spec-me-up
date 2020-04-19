import React, { useRef, useState } from 'react';
import { useEditor } from 'slate-react';
import { Transforms } from 'slate';
import styled from 'styled-components';

import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FormatBold from '@material-ui/icons/FormatBold';

const ToolbarContainer = styled.div`
  background-color: #fff;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  margin: 0 0 10px -5px;
  width: calc(100% + 10px);
`;

const ToolbarIcon = styled(IconButton)`
  margin-left: 10px;
  margin-right: 10px;
  color: #ccc;
  font-size: 12px;

  &.MuiIconButton-root {
    height: 100%;
    padding: 5px;
    border-radius: 0;
    color: ${(props) => (props.active ? '#232323' : '#878787')};
  }
`;

const FixMeToolbarButton = styled(Button)`
  position: relative;
`;

const AddFixMeForm = styled.form`
  display: flex;
  width: 800px;
  padding: 10px 20px 20px 20px;
`;

const AskFixMeTitleContainer = styled(Popover)``;

const BoldButton = () => {
  const editor = useEditor();

  return (
    <ToolbarIcon
      onMouseDown={(event) => {
        event.preventDefault();
        console.log(editor);
      }}
    >
      <FormatBold />
    </ToolbarIcon>
  );
};

const FixMeButton = ({ action }) => {
  const editor = useEditor();
  const fixMeTitleInputRef = useRef();
  const [showPanel, setShowPanel] = useState(false);

  const handleFixMeTitleSubmit = (e) => {
    e.preventDefault();

    const id = action(fixMeTitleInputRef.current.value);
    Transforms.insertNodes(editor, {
      type: 'fixme',
      id,
      children: [{ text: '' }]
    });
    Transforms.move(editor);
    fixMeTitleInputRef.current.value = '';
    setShowPanel(false);
  };
  const btnRef = useRef(null);

  return (
    <>
      <FixMeToolbarButton
        ref={btnRef}
        onMouseDown={(event) => {
          event.preventDefault();
          setShowPanel((prev) => !prev);
        }}
      >
        Fixme
      </FixMeToolbarButton>

      <AskFixMeTitleContainer
        open={showPanel}
        onClose={() => setShowPanel((prev) => !prev)}
        anchorEl={btnRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <AddFixMeForm onSubmit={handleFixMeTitleSubmit}>
          <TextField
            inputRef={fixMeTitleInputRef}
            style={{ flex: 1, marginRight: 5 }}
            label="What do you want to fix ?"
          />
          <Button
            style={{ alignSelf: 'flex-end' }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Create
          </Button>
        </AddFixMeForm>
      </AskFixMeTitleContainer>
    </>
  );
};

const Toolbar = (props) => {
  return (
    <ToolbarContainer>
      <BoldButton />
      <FixMeButton action={props.createFixMe} />
    </ToolbarContainer>
  );
};

export default Toolbar;
