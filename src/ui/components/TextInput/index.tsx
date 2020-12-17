import React, { useState } from "react";
import { Box, Text } from "ink";
import Spinner from "ink-spinner";
import InkTextInput from "ink-text-input";

interface ITextInputProps {
  onChange: (string) => string;
  submit: (string) => void;
  label: string;
}

const TextInput: React.FunctionComponent<ITextInputProps> = props => {
  const [query, setQuery] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleChange = (q: string) => {
    setQuery(props.onChange(q));
  };
  const handleSubmit = () => {
    setSubmitted(true);
    props.submit(query);
  };

  if (submitted) {
    return null;
  }

  return (
    <>
      <Box>
        <Box marginRight={2}>
          <Spinner type="dots12" />
        </Box>
        <Box marginRight={1}>
          <Text>{props.label}</Text>
        </Box>

        <InkTextInput
          value={query}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Box>
    </>
  );
};

export default TextInput;
