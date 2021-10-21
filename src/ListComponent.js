import React from 'react';
import './styles.css';

const ListComponent = ({actualizarTodo, agregarTodo, tareaTerminada, eliminarTodo, eliminarTodoCompletadas, titulo, descripcion, todo, todos, fechaActual}) => {
    
    return (
        <>
            <div className="container principal" >
                <img src="./TrueHomeLogo.png" alt="TrueHome" width="10%" style={{marginBottom: '1em'}}/>
                <h1>To-do List</h1>
                <h2>{fechaActual}</h2>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="card shadow-sm rounded card1" >
                            <div className="card-body"> 
                                <h5 className="card-title mt-3 mb-1">Escribe las tareas pendientes</h5>
                                <form onSubmit={agregarTodo}>
                                    <label htmlFor="tituloTodo" className="form-label mt-3">Título</label>
                                    <input type="text" id="tituloTodo" className="form-control mt-2 mb-3" onChange={actualizarTodo} value={titulo} name="titulo" required></input>

                                    <label htmlFor="DescTodo" className="form-label ">Descripción</label>
                                    <input type="text" id="DescTodo" className="form-control mt-2 mb-4" onChange={actualizarTodo} value={descripcion} name="descripcion" required></input>
                                    <button type="submit" className="btn btn-success" >Agregar tarea</button> 
                                </form>
    
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="card shadow-sm rounded card2" >
                            <div className="card-body">
                                <h5 className="card-title mt-3 mb-1">Tareas</h5>
                                { todos.length ? 
                                    <>
                                    <button className="btn btn-secondary me-3" onClick={ eliminarTodoCompletadas }>
                                        <i className="fas fa-tasks me-2"></i>
                                        Eliminar tareas completadas
                                    </button>
                                    </>
                                    :
                                    <>
                                        <h6>No hay tareas añadidas</h6>
                                    </>
                                }
                                
                                {todos.map((tarea) => (
                                    
                                    <div className="row" key={tarea.id_todo} >
                                        <div className="col-sm-8">
                                            
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="tareaDone" onChange={ () => tareaTerminada(tarea.id_todo)} checked={tarea.completada}/>
                                                { !tarea.completada  ? 
                                                    <>
                                                        <h3 htmlFor="tareaDone">{tarea.titulo}</h3>
                                                        <p>{tarea.descripcion}</p>
                                                        <hr className="dashed"></hr>
                                                    </>
                                                    :
                                                    <>
                                                        <strike>
                                                            <h3 htmlFor="tareaDone">{tarea.titulo}</h3>
                                                            <p>{tarea.descripcion}</p>
                                                            <hr className="dashed"></hr>
                                                        </strike>
                                                    </>
                                                }
                                            </div>
                                        </div>

                                        <div className="col-sm-4">
                                            <button className="btn btn-danger me-3" onClick={ () => eliminarTodo(tarea.id_todo)}>
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                            
                                        
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>  
        </>
    );

}

export default ListComponent;