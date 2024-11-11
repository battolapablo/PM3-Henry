import { useState } from "react";

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = (value) => {
    setState(typeof value === "boolean" ? value : !state);
  };

  return [state, toggle];
};

export default useToggle;
