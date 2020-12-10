import React, { useState, useEffect } from "react";
import { render, Box, Text, useFocus } from "ink";
import LogSymbols from "log-symbols";
import TextInput from "ink-text-input";
import MultiSelect from "ink-multi-select";

const MultiQuery = props => {
  const handleSubmit = items => {
    console.log(items);
    // props.submit();
  };

  const items = [
    {
      label: "First",
      value: "first",
    },
    {
      label: "Second",
      value: "second",
    },
    {
      label: "Third",
      value: "third",
    },
  ];

  return <MultiSelect items={items} onSubmit={handleSubmit} />;
};

class CustomRender {
  renderRef;

  constructor(Component) {
    this.renderRef = render(<Component />);
  }
  RenderMeta() {
    return this.renderRef;
  }
}

const SearchQuery = props => {
  const [query, setQuery] = useState("");
  return (
    <Box>
      <Box marginRight={1}>
        <Text>Enter your query:</Text>
      </Box>

      <TextInput
        value={query}
        onChange={q => {
          setQuery(props.validation(q));
        }}
        onSubmit={() => {
          console.log(LogSymbols.success + " Age:", query + " (months)");
          props.submit();
        }}
      />
    </Box>
  );
};

const Question = [
  {
    type: "input",
    value_type: "number",
    question: "How old node_modules you wanna delete? (months)",
  },
  {
    type: "multi",
    value_type: "number",
    question: "Enter a number:",
  },
];
const Cont = () => {
  const [qno, setQno] = useState(0);

  const handleNext = () => {
    setQno(qno + 1);
  };

  if (qno == Question.length) return null;

  let validationFunc;
  switch (Question[qno].value_type) {
    case "number":
      validationFunc = ValNumber;
      break;
  }

  switch (Question[qno].type) {
    case "input":
      return <SearchQuery submit={handleNext} validation={validationFunc} />;
    case "multi":
      return <MultiQuery submit={handleNext} validation={validationFunc} />;
  }
};

function ValNumber(input: string) {
  return input.replace(/\D/g, "");
}

export const SearchQuery2 = props => {
  const [query, setQuery] = useState("");
  return (
    <Box>
      <Box marginRight={1}>
        <Text>Enter your query:</Text>
      </Box>

      <TextInput
        value={query}
        onChange={q => {
          setQuery(props.onChange(q));
        }}
        onSubmit={() => {
          props.submit(query);
        }}
      />
    </Box>
  );
};
