import * as React from "react";
import {convertMin} from "./Convert"
import * as Duration from "../TimerDuration";

interface timer{
    timeId: number;
    time: number;
}

export class TimerWrapper extends React.Component<{},timer>{
    constructor(props:{}){
        super(props) 
        //чтобы контролировать вводимые значения
        this.state= {
            time: 0, 
            timeId: 0
        }
    }

    public startTimer(interval:number):void {
        clearInterval(this.state.timeId);
        let timeLeft=convertMin(interval);
        console.log(interval);
        this.setState({time: timeLeft});
        let timerId= window.setInterval(()=>{
            timeLeft=this.state.time-1;
            if (timeLeft == 0) {
                clearInterval(timerId);
            }
        this.setState({timeId: timerId});
        this.setState({time: timeLeft});
      }, 1000)
    }

    public stopTimer():void {
        this.setState({time: null});
        clearInterval(this.state.timeId);
    }

    public renderTime(): JSX.Element{
        if (this.state.time===0){
            alert("Смена обстановки!");
        }
         if (this.state.time===0){
             return <div className="time">0:0</div>
         }
         return <div className="time"> {Math.floor(this.state.time/60)} : {this.state.time %60} </div>
    }

    public render(): JSX.Element {
         return (
            <div >
            <h2>Timer</h2>
            <section className="timer_place">
                        <div className="time"> Time: {this.renderTime() }</div>
                </section>  
                <div>
                <button onClick={()=>this.startTimer(Duration.SHORT)}>Short</button>
                <button onClick={()=>this.startTimer(Duration.WORK)}>Work</button>
                <button onClick={()=>this.startTimer(Duration.LONG)}>Long</button>
                <button onClick={()=>this.stopTimer()}>Stop</button>
            </div>
            </div>
        );
    }

   }
   