import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Text } from "ink";

interface ILogMessageProps {
  logSymbol: string;
  label: string;
  value: string;
}

const LogMessage: React.FunctionComponent<ILogMessageProps> = props => {
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
