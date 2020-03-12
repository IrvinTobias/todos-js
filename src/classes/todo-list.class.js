import { Todo } from './todo.class'

export class TodoList {

    constructor() {

        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id) {

        // Sobreescribiendo los valor del arreglo
        this.todos = this.todos.filter(todo => todo.id != id); // filter regresa un nuevo arreglo con los elementos que cumplen la condición
        this.guardarLocalStorage();

    }

    marcarCompletado(id) {

        for (const todo of this.todos) {

            console.log(id, todo.id);
            if (todo.id == id) {

                todo.completado = !todo.completado;
                this.guardarLocalStorage();

                break;
            }
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado); // Regresa un arreglo de las tareas que no esten completadas
        this.guardarLocalStorage();
    }
    guardarLocalStorage() {
        localStorage.setItem('todo', JSON.stringify( this.todos ) ); // Guardando las tareas en el localStorage
    }

    cargarLocalStorage() {
        
      this.todos =  ( localStorage.getItem('todo') ) ? 
                    this.todos =  JSON.parse( localStorage.getItem('todo') ) : // Pasando el JSON a un objeto
                    [];
        
      this.todos = this.todos.map( obj => Todo.fromJson( obj ) ); // Pasando los objetos tareas a instancias de la Clase Todo
    }

    
}