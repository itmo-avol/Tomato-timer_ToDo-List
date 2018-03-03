import * as React from "react";
import {Todo} from "./ToDo";
import {TimerWrapper} from "./TimeWrapper"

export class App extends React.Component<{}, any>  {
    render() {
      return (
        <div className="app">
          <div className="app_header">
           <TimerWrapper />
          </div >
          <Todo />
        </div>
      );
    }
  }