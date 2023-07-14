import React from "react";
import { Form } from './components/Form';
import { Message } from './components/Message';
import { Table } from "./components/Table";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <div className="container">
        <Form />
        <Message />
        <Table />
      </div>
    </GlobalProvider>
  )
}


export default App;