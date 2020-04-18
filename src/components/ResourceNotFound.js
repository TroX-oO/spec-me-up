import React from 'react';
import styled from 'styled-components';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Warning from '@material-ui/icons/Warning';

const ResourceNotFoundContainer = styled(Container)`
  text-align: center;
  padding-top: 50px;
`;

const ResourceNotFound = () => {
  return (
    <ResourceNotFoundContainer>
      <Warning style={{ fontSize: 140, marginBottom: 20 }} color="primary" />
      <Typography>Sorry, there is nothing here</Typography>
    </ResourceNotFoundContainer>
  );
};

export default ResourceNotFound;
