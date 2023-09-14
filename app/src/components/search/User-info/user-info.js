
import React, { useState, useReducer } from "react";
import axios from 'axios';





function taskReducer(tasks, action) {
	switch (action.type) {
		case 'added': {
			//работает только смена запрос посылается но php не видит данные
			
			axios
				.post('./api/addFriend.php', action.user);
			action.setAdd(!action.state);
			return tasks;
		}
	}
}

export default function UserInfo(props) {
	const [isAdd, setAdd] = useState(true);
	const initial = [];

	const [tasks, dispatch] = useReducer(taskReducer, initial);


	return (<div ref={props.ret} className="users-info">
		<div className="fon">
			<i className="ri-arrow-left-line " onClick={() => props.dispatch({
				type: 'closed'
			})}></i>
			<div className="profile"></div>
			<div className="panel-users">
				<h2>{props.user.email}</h2>

				<button className="add" onClick={() => dispatch(
					{
						type: 'added',
						state: isAdd,
						setAdd: setAdd,
						user: props.user
					}
				)}>
					{isAdd ? 'Добавить' : 'Удалить'}
				</button>
			</div>
		</div>

	</div>);
}