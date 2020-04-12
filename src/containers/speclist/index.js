import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { isEmpty, map } from 'lodash';

const Row = styled.div`
  color: #333;
  margin-left: 10px;
`;

const SpecListContainer = (props) => {
  return (
    <>
      {isEmpty(props.specs) ? (
        <div>Aucune specs</div>
      ) : (
        map(props.specs, (s) => <Row key={s.name}>{s.name}</Row>)
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    specs: state.specs
  };
};

export default connect(mapStateToProps)(SpecListContainer);
