import { useState, useCallback } from "react";

const UseModalManager = ({ initialState = {} }={}) => {
  const [modalStates, setModalStates] = useState(initialState);
  const open = useCallback((id) => {
    setModalStates((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  }, []);
  

  const close = useCallback((id) => {
    setModalStates((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  }, []);

  const toggle = useCallback((id) => {
    setModalStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }, []);

  const isOpen = useCallback((id) => !!modalStates[id], [modalStates]);

  return {
    open,
    close,
    toggle,
    isOpen,
  };
};

export default UseModalManager;
