import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { find } from 'lodash';

const Block = styled.span`
  border: 1px solid black;
  cursor: pointer;
  padding: 2px 5px;
  margin-right: 1px;

  &:hover {
    border: 1px solid red;
  }
`;

const FixMe = (props) => {
  console.log(props);
  return (
    <Block
      data-type="fixme"
      contentEditable={false}
      onMouseDown={(e) => {
        e.preventDefault();

        if (props.onFixMeSelected) {
          props.onFixMeSelected(props.element.id);
        } else {
          console.info('I think there might be a problem...');
        }
      }}
      {...props.attributes}
    >
      {props.fixme.title}
      {props.children}
    </Block>
  );
};

const mapStateToProps = (state, props) => {
  return {
    fixme: find(state.fixmes, (f) => f.id === props.element.id)
  };
};

export default connect(mapStateToProps)(FixMe);
