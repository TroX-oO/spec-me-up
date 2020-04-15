import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
        map(props.specs, (s, id) => (
          <Row key={s.name}>
            <Link to={`/spec/${id}`}>{s.name}</Link>
          </Row>
        ))
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
