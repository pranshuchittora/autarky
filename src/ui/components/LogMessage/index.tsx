import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Text } from "ink";

const LogMessage = props => {
  return (
    <>
      <Box>
        <Box marginRight={1}>
          <Text>{props.logSymbol}</Text>
        </Box>
        <Box>
          <Text>{`${props.label} ${
            props.value ? ": " + props.value : ""
          }`}</Text>
        </Box>
      </Box>
    </>
  );
};

export default LogMessage;
