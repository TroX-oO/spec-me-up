import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { isEmpty, map } from 'lodash';

const Page = styled.div`
  position: absolute;
  background: #eee;
  width: 100%;
  height: 100%;
`;

const Row = styled.div`
  color: #333;
  margin-left: 10px;
`;

const SpecListContainer = (props) => {
  return <Page>
    {isEmpty(props.specs) ? <div>Aucune specs</div> : map(props.specs, s => <Row key={s.name}>{s.name}</Row>)}
  </Page>;
}

const mapStateToProps = (state) => {
  return {
    specs: state.specs
  };
}

export default connect(mapStateToProps)(SpecListContainer);
