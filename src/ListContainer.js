import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import ListComponent from './ListComponent';



const ListContainer = () => {

    const fechaTrans = Date.now();
    let fechaActual = new Date(fechaTrans);
    fechaActual = fechaActual.toLocaleDateString(); // Crear una variable con la fecha actuañ
    const [todos, setTodos] = useState([]); //Crea un array para guardar todas las tareas
    const [todo, setTodo] = useState({
       id_todo: '',
       titulo: '',
       descripcion: '',
       completada: false,
       editando: false

    }); //Crea un objeto con los valores de cada tarea

    // Saca las tareas de localStorage
    useEffect(() => {
        const mis_tareas = localStorage.getItem("llave");
        const todosCargados = JSON.parse(mis_tareas);

        if(todosCargados){
            setTodos(todosCargados);
        }
    }, []);
    
    // Guarda las tareas en localStorage
    useEffect(() => {
        const mis_tareas = JSON.stringify(todos);
        localStorage.setItem("llave", mis_tareas);

    }, [todos]);

    const { titulo, descripcion } = todo;


    // Actualiza el valor de los inputs 
    const actualizarTodo = e => {
            setTodo({
                ...todo,
                [e.target.name]: e.target.value
            });
        }

    // Función que agrega una tarea a mi arreglo de Tareas
    const agregarTodo = e => {
        e.preventDefault();
        todo.id_todo = uuidv4();

        //Agregar los arreglos de las tareas a una arreglo general
        setTodos([...todos, todo]);

        //Resetea los valores por defecto, y así inicializar los inputs
        setTodo({
            id_todo: '',
            titulo: '',
            descripcion: '',
            completada: false,
            editando: false
        });     
    }

    //Función que cambia el estado de completada
    const tareaTerminada = ( id ) => {
        const todosActualizados = todos.map( (todo) => {
            if( todo.id_todo === id) todo.completada = !todo.completada;
            return todo;

        });
        setTodos(todosActualizados);
    }

    // Elimina la tarea recibiendo el id
    const eliminarTodo = ( id ) => {
        const todosActualizados = todos.filter( (todo) => todo.id_todo !== id);
        setTodos(todosActualizados);
    }

    //Edita la tarea seleccionada

    const eliminarTodoCompletadas = e => {
        e.preventDefault();
        const todosActualizados = todos.filter((todo) => !todo.completada);
        setTodos(todosActualizados);

    }
   
    return (
        <>
           <ListComponent {...{actualizarTodo, agregarTodo, tareaTerminada, eliminarTodo, eliminarTodoCompletadas, titulo, descripcion, todo, todos, fechaActual}}/>
        </>
    );

}

export default ListContainer;