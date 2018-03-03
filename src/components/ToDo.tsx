// Создание массива с задачами
import * as React from "react";

export class Todo extends React.Component<{}, IState> {
    constructor(props:{}){
        super(props) 
        this.state= {
            currentTask:"",
            task:[],
            selected:0
        }
    }
    
    public handleSubmit(e:React.FormEvent<HTMLFormElement>):void {
        e.preventDefault();
        this.setState({
            currentTask:"",
            selected:0,
            task:[
                ...this.state.task,
                {
                    id: this._timeInMilliseconds(),
                    value:this.state.currentTask,
                    complited: false,
                    isSelected:false
                }
            ]
        });
    }
  
  
    public renderTasks(): JSX.Element[]{
        return this.state.task.map((target:ITask, index: number)=> (
            <div key={index} className="td_task">
            <span className={(target.complited? "is_comp": "") + (target.isSelected? "is_selected": "")}>
             {target.value}
             </span>
            <button onClick={()=>this.deleteTask(target.id)}> Delete </button>
            <button onClick={()=>this.doneTask(index)}>{target.complited? "Undo": "Done"}</button>
            <button className="work" onClick={()=>this.selectRow(target.id)} >{target.isSelected? "wait": "work"}</button>
            </div>
             )
        );
    }
   
        public deleteTask(id:number): void{
        const task: Array <ITask> = this.state.task.filter(
            (target: ITask) => target.id!== id);
        this.setState({task});
    }

    public doneTask(index:number): void{
        let task:ITask[]=this.state.task.splice(index, 1);
        task[0].complited=! task[0].complited;
        const currentTask:ITask[]=[...this.state.task, ...task];
        this.setState({task: currentTask});
    }

    public selectRow(id:number) {
        let target = this.state.task;
        target.forEach(r =>
            {
             r.isSelected = false;
             if ((r.id == id) && (r.complited!=true)) {
                 r.isSelected = true;
             }
            }
        )
        console.log(id);
        this.setState({task: target, selected: id});
}

//отображение спика задач
    public render(): JSX.Element {
        return(
            <div> 
                <h2>ToDo List</h2> 
                <form onSubmit={e => this.handleSubmit(e)}> 
                    <input type="text" 
                    className="td_input"
                    placeholder="Add the task" 
                    value={this.state.currentTask}
                    onChange={e => this.setState({currentTask: e.target.value})}/> 
                    <button type="submit">Add task</button>
                </form> 
                <section>
                    {this.renderTasks() }
                </section>
            </div>);
    }
 
  private _timeInMilliseconds():number{
    const date: Date= new Date();
    return date.getTime();
  }
}

interface IState{
    currentTask:string;
    task:Array <ITask>;
    selected:number;
}

interface ITask{
    id:number;
    value:string;
    complited: boolean;
    isSelected:boolean;
}