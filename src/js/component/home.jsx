import React, { useEffect, useState } from "react";

import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [newTodo, setNewTodo] = useState("");
	const [list, setList] = useState([]);
	

	useEffect(() => {
		obtenerDatosLista();
		
	}, []);

	const obtenerDatosLista = async () => {
		try{
			const respDatosUsuario = await fetch("https://playground.4geeks.com/todo/users/Oriana")
			const data2 = await respDatosUsuario.json()
			setList(data2.todos)
			
		}
		catch (error){
			console.error("Datos incompletos", error)

		}
		
	}

	const AddTodo = async () => {
		try{
			const respDatosUsuario = await fetch("https://playground.4geeks.com/todo/todos/Oriana", 
				{
					method:"POST",
					headers:{
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"label": newTodo,
						"is_done": false
					  })
				});

			const data2 = await respDatosUsuario.json()
			setList([...list, data2]);
			
		}
		catch (error){
			console.error("Tarea incompleta", error)

		}
		
	}

	const removeTodo = async (id) => {
		try{
			const respDatosUsuario = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, 
				{
					method:"DELETE"
					  })
			if(!respDatosUsuario.ok){
				return false
			}
			return true
			
		}
		catch (error){
			console.error("no se pudo eliminar tarea", error)

		}
		
	}

//Logica

	const handleClick = () => {
		console.log("New task", newTodo);
		AddTodo();
		obtenerDatosLista();
		setList([...list, newTodo]);
	}


	const deleteTodo = async (item, index) => {
		try {
			console.log("ESTE ES EL ITEM:",item)
			const result = await removeTodo(item.id)
			if(result){
				const NewListTodo = list.filter((ele, i) => i !== index);
				setList(NewListTodo);
			}
			else{
				alert("No se puedo eliminar")
			}
		} catch (e) {
			console.error("No se pudo procesar el requisito")
		}
	}


	const handleChange = (e) => {
		setNewTodo(e.target.value);

	}

	return (
		<div className="text-center ">

			<h1 className="text-center mt-5"> My TodoList </h1>

			<div className="container ">


				<div className="d-flex gap-2">
					<input type="text" className="form-control" onChange={handleChange} value={newTodo} />

					<button onClick={handleClick} className="btn btn-outline-primary" >
						Agregar tarea
					</button>
				</div>


				<p> New task: {newTodo}</p>

				<ul className="list-group d-flex justify-content-between">

					


					 {list && list.map((item, index) => {
						return (
							<li key={index} className={`list-group-item active d-flex justify-content-between alaing-items-center border border-dark ${index % 2 === 0 ? "bg-primary" : ""}`}>
								{item.label}

								<button className="btn-close btn-close-white " onClick={() => deleteTodo(item,index)}/>
							</li>
						)
					})} 
				</ul>

			</div>

		</div>
	);
};

export default Home;
