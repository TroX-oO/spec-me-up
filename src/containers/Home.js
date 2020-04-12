import React, { useState, useCallback, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import SpecListContainer from './speclist';
import QuillEditor from './editor/QuillEditor';

const Page = styled.div`
  position: absolute;
  background: #eee;
  width: 100%;
  height: 100%;
`;

const Header = styled.h1`
  color: #333;
  text-align: center;
`;

const SubHeader = styled.span`
  color: #333;
  font-size: 40%;
  margin-left: 10px;
`;

const Home = (props) => {
  const [selectedFixMe, setSelectedFixMe] = useState(null);
  const onFixMeSelected = useCallback((id) => {
    setSelectedFixMe(id);
  }, []);

  console.log('render home !', props);
  return (
    <Page>
      <Header>
        Spec Me Up<SubHeader>Before you no go</SubHeader>
      </Header>
      <button onClick={() => props.createSpecProject()}>Create project</button>
      <SpecListContainer />
      <QuillEditor onFixMeSelected={onFixMeSelected} />
      <div>Selected FixMe: {selectedFixMe}</div>
    </Page>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createSpecProject: () => dispatch((d) => d({ type: 'ADD_SPEC_PROJECT' }))
  };
};

export default connect(null, mapDispatchToProps)(Home);
