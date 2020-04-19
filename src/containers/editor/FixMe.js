import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { find } from 'lodash';

import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const Block = styled.span`
  border: 1px dashed black;
  border-radius: 5px;
  cursor: pointer;
  padding: 2px 5px;
  margin-right: 1px;

  &:hover {
    border-style: solid;
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
  }
  ${(props) =>
    props.validated &&
    `
    border: 1px solid transparent;
    background-color: #78ff78;
  `}
`;

const FixMeContent = (props) => {
  const { fixme } = props;

  return <Typography>{fixme.title}</Typography>;
};

const FixMe = (props) => {
  console.log(props);
  const { fixme, validated } = props;
  const isAvailable = !!fixme;

  return (
    <Tooltip
      arrow
      interactive
      placement="top"
      title={
        isAvailable ? (
          <FixMeContent {...props} />
        ) : (
          <Typography>FixMe has been removed</Typography>
        )
      }
    >
      <Block
        data-type="fixme"
        contentEditable={false}
        isAvailable={isAvailable}
        validated={!!validated}
        onMouseDown={(e) => {
          e.preventDefault();

          if (isAvailable && props.onFixMeSelected) {
            props.onFixMeSelected(props.element.id);
          }
        }}
        {...props.attributes}
      >
        {isAvailable
          ? validated
            ? validated.message
            : 'fixme'
          : 'unavailable'}
        {props.children}
      </Block>
    </Tooltip>
  );
};

const mapStateToProps = (state, props) => {
  const fixme = find(state.fixmes, (f) => f.id === props.element.id);
  const validated =
    fixme &&
    find(
      fixme.comments,
      (cId) => state.comments[cId] && state.comments[cId].validated
    );
  return {
    fixme,
    validated: validated ? state.comments[validated] : null
  };
};

export default connect(mapStateToProps)(FixMe);
