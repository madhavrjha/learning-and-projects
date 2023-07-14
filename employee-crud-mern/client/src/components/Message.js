import React, { useContext } from 'react';
import { GlobalContext } from "../context/GlobalState";

export const Message = () => {
  const { message } = useContext(GlobalContext);

  return (
    !message.text ? null : <p className={`message ${message.type}`}>{message.text}</p>
  )
}
