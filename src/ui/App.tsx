import React from "react";

import { Box } from "ink";
import Header from "@app/ui/components/Header";

import Interrogator from "@app/ui/containers/Interrogator/index";

const App = () => {
  return (
    <>
      <Header />
      <Box flexDirection="column">
        <Interrogator />
      </Box>
    </>
  );
};

export default App;
