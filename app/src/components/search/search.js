import React, { useState, useReducer,useRef } from "react";
import User from "./User/user";
import UserInfo from "./User-info/user-info";

function setRequest(method, url) {
	return new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest();
		xhr.open(method, url, true);

		xhr.onreadystatechange = () => {
			try {
				if (xhr.readyState === 4 && xhr.status === 200) {
					var json = JSON.parse(xhr.responseText);
					resolve(json);
				}
			}
			catch (err) {
				console.log("Запрос не удался ", err);
			}
		};
		xhr.send();
	})

}



export default function Search() {
	//const [users, setUsers] = useState([]);
	const initial = [];
	let ret = useRef(null);
	let search = useRef(null);
	
	const [work,setWork] = useState(false)
	const [active, setActive] = useState(true);
	const [value, setValue] = useState('');
	const [user, setUser] = useState({});

	const [tasks, dispatch] = useReducer(tasksReducer,initial)

	function tasksReducer(tasks, action) {
		switch (action.type) {
			case 'added': {
				return action.users.map(elem => {
					return {
						...elem,
						show: true,
					}
				});
			}
			case 'onChange': {
				return tasks.map(elem => { return { ...elem, show: elem.email.includes(action.value) } })
			}
			case 'click': {
				if (ret.current.className === 'users-info') {
					ret.current.className = ret.current.className + ' active';
					search.current.className = search.current.className + ' active';
				} 
				setWork(true);
				return tasks;
			}
			case 'closed':{
				setWork(false);
				ret.current.className = 'users-info';
				search.current.className = 'search';
				return tasks;
			}
		}
	}

	if (active) {
		setRequest('GET', './json/users.json').then(json => {
			dispatch({
				type: 'added',
				users: json,
			})
			setActive(false);
		});
	}

	let results = tasks.filter(elem => elem.show === true).map((elem, index) => {
		return <User setUser={setUser} key={index} value={elem} dispatch={dispatch} work={!work}/>
	});


	return (
		<>
			<div ref={search} className="search" >
				<div className="search__panel">
					<a href="./main.html"><i className="ri-arrow-left-line a"></i></a>
					<input disabled={work} placeholder="Поиск"  value={value} onChange={e => {
						setValue(e.target.value);
						dispatch({
							type: 'onChange',
							value: e.target.value,
						});
					}} />
				</div>
				<div className="hr"></div>
				<h2>Пользователи</h2>
				<div className="users">
				{results}
				</div>
			</div>
			<UserInfo dispatch={dispatch} ret={ret} user={user} />
		</>
	);
}