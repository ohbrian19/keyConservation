import React from "react";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #007a78;
`;

const Text = styled.Text``;

const Matches = ({ route }) => {
  return (
    <Container>
      <Text>Past Matches: {route.params.pastMatches}</Text>
    </Container>
  );
};

export default Matches;
