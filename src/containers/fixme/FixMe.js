import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { v4 } from 'uuid';

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
  const idRef = useRef(props.element.id || v4());

  useEffect(() => {
    console.error('onMount !', props);

    return () => {
      console.error('onUnmount !');
    };
  }, []);

  return (
    <Block
      data-type="fixme"
      contentEditable={false}
      onMouseDown={(e) => {
        e.preventDefault();
        console.log('yeeeahh', props);
        if (props.onFixMeSelected) {
          props.onFixMeSelected(idRef.current);
        } else {
          console.info('I think there might be a problem...');
        }
      }}
      {...props.attributes}
    >
      {idRef.current}
      {props.children}
    </Block>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(FixMe);
