import { Todo } from "../classes";
import { todoList } from "../index";


// Referencias al html

const divTodoList   = document.querySelector('.todo-list'); // Referencia al elemento <ul></ul>
const textInput     = document.querySelector('.new-todo');   // Referencia a la caja de texto
const btnBorrar     = document.querySelector('.clear-completed'); // Referencia al botón Borrar completados
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros     = document.querySelectorAll('.filtro');


export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
            <label>${ todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

}

// Eventos

textInput.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && textInput.value.length > 0) {
        const nuevoTodo = new Todo(textInput.value); // Creando una nueva tarea
        todoList.nuevoTodo( nuevoTodo );            // Agreagando la tarea al arreglo de tareas

        crearTodoHtml( nuevoTodo );                // Agregando la tarea en el html
        textInput.value = '';                      // Limpiando la caja de texto
    }


})

divTodoList.addEventListener('click', ( event ) => {

    console.log('click');
    const nombreElemento = event.target.localName; // label, input o button
    const todoElemento   = event.target.parentElement.parentElement; // Referencia al <li></li>
    const todoId         = todoElemento.getAttribute('data-id');     // Obteniendo el valor del atributo data-id


    if ( nombreElemento.includes( 'input' ) ) { // Hizo click en el checkbox
        todoList.marcarCompletado( todoId );   // Marcando la tarea como completada
        todoElemento.classList.toggle('completed'); // Agregando o quitando la clase completed (si existe la quita, caso contrario la agrega)     
    } else if ( nombreElemento.includes('button') ) {
        
        todoList.eliminarTodo( todoId ); // Eliminando la tarea en el arreglo de tareas
        divTodoList.removeChild( todoElemento ); // Eliminando del html la lista que contiene la tarea seleccionada
        
    }

})

btnBorrar.addEventListener('click', () =>{

    todoList.eliminarCompletados();

    for ( let i = divTodoList.children.length -1; i>=0; i-- ) {

        const elemento = divTodoList.children[i]; // Recuperando la tarea que se encuentra en la posicion i
        
        if ( elemento.classList.contains('completed') ) { // Si la tarea tiene la clase completed 
            
            divTodoList.removeChild(elemento); // Eliminando la tarea del HTML
        }
    }
})

ulFiltros.addEventListener('click', ( event ) => {
    

    const filtro = event.target.text;
    if( !filtro ) { return; } // para la ejecucion del evento si no hay nada en la constante filtro

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));

    event.target.classList.add('selected');

    for ( const elemento of divTodoList.children ) {
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ) {

            case 'Pendientes':
                if ( completado ) {
                    elemento.classList.add('hidden');
                }

            break;

            case 'Completado':
                if ( !completado ) {
                    elemento.classList.add('hidden');
                }

            break;
        }
    }

})