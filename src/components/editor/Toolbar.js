import React from 'react';
import { useEditor } from 'slate-react';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
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
    padding: 5px;
    border-radius: 0;
    color: ${(props) => (props.active ? '#232323' : '#878787')};
  }
`;

const BoldButton = () => {
  const editor = useEditor();
  return (
    <ToolbarIcon
      onMouseDown={(event) => {
        event.preventDefault();
        console.error('toggle bolda');
        console.log(editor);
      }}
    >
      <FormatBold />
    </ToolbarIcon>
  );
};

const Toolbar = (props) => {
  return (
    <ToolbarContainer>
      <BoldButton />
    </ToolbarContainer>
  );
};

export default Toolbar;
