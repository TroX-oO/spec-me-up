import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { find } from 'lodash';

import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const Block = styled.span`
  border: 1px solid black;
  cursor: pointer;
  padding: 2px 5px;
  margin-right: 1px;

  &:hover {
    border: 1px solid red;
  }
  ${(props) =>
    !props.isAvailable &&
    `
    cursor: default;
    opacity: 0.7;
    border: 1px solid lightgray;
    &:hover {
      border: 1px solid lightgray;
    }
  `}
`;

const FixMeContent = (props) => {
  return <Typography>{props.fixme.title}</Typography>;
};

const FixMe = (props) => {
  console.log(props);
  const isAvailable = !!props.fixme;

  return (
    <Tooltip
      arrow
      interactive
      placement="top"
      title={
        isAvailable ? (
          <FixMeContent fixme={props.fixme} />
        ) : (
          <Typography>FixMe has been removed</Typography>
        )
      }
    >
      <Block
        data-type="fixme"
        contentEditable={false}
        isAvailable={isAvailable}
        onMouseDown={(e) => {
          e.preventDefault();

          if (isAvailable && props.onFixMeSelected) {
            props.onFixMeSelected(props.element.id);
          }
        }}
        {...props.attributes}
      >
        {isAvailable ? props.fixme.title : 'Not Found'}
        {props.children}
      </Block>
    </Tooltip>
  );
};

const mapStateToProps = (state, props) => {
  return {
    fixme: find(state.fixmes, (f) => f.id === props.element.id)
  };
};

export default connect(mapStateToProps)(FixMe);
