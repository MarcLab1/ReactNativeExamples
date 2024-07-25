
export class Todo {
    id: number;
    value: string;
    date : string;
    completed: number;

    constructor(id: number, value: string, date : string, completed : number = 0) {
      this.id = id;
      this.value = value;
      this.date = date;
      this.completed = completed;
    }

    updateCompleted(){
      this.completed = this.completed == 0 ? 1 : 0
    }

  }
    export default Todo;
    




