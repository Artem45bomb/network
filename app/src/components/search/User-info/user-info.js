
import React, { useState, useReducer } from "react";
import axios from 'axios';





async function taskReducer(tasks, action) {
	switch (action.type) {
		case 'added': {
			//работает только смена запрос посылается но php не видит данные
			axios.get('./json/user.json').then(json => {
				axios.post('./api/addFriend.php', { 'user': json.data,'friend':action.user });
			})
			action.setAdd(!action.state);
			return tasks;
		}
		case 'delete': {
			axios.get('./json/user.json').then(json => {
				axios.post('./api/deleteFriend.php', { 'user': json.data, 'friend': action.user });
			})
			action.setAdd(!action.state);
			return tasks;
		}
	}
}

function addFriend(dispatch, isAdd, setAdd, user) {
	dispatch(
		{
			type : 'added',
			state : isAdd,
			setAdd : setAdd,
			user : user,
		}
	);
}

function deleteFriend(dispatch,isAdd,setAdd,user) {
	dispatch(
		{
			type: 'delete',
			state: isAdd,
			setAdd: setAdd,
			user: user,
		}
	);
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

				<button className="add" onClick={() => { isAdd ? addFriend(dispatch, isAdd, setAdd, props.user) : deleteFriend(dispatch, isAdd, setAdd, props.user) }}>
					{isAdd ? 'Добавить' : 'Удалить'}
				</button>
			</div>
		</div>

	</div>);
}