import React from "react";
import { render, Box, Text } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";

const Header: React.FunctionComponent = () => {
  return (
    <Box justifyContent="center">
      <Gradient name="retro">
        <BigText text="Autarky" font="block" />
      </Gradient>
    </Box>
  );
};

export default Header;
