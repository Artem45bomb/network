
import React, { useState, useReducer } from "react";
import axios from 'axios';





async function taskReducer(tasks, action) {
	switch (action.type) {
		case 'added': {
			axios.get('./json/user.json').then(json => {
				axios.post('./api/addFriend.php', { 'user': json.data,'friend':action.user });
			})
			action.setActive(true);
			action.setAdd(!action.state);
			return tasks;
		}
		case 'delete': {
			axios.get('./json/user.json').then(json => {
				axios.post('./api/deleteFriend.php', { 'user': json.data, 'friend': action.user });
			})
			action.setActive(true);
			action.setAdd(!action.state);
			return tasks;
		}
	}
}

function addFriend(dispatch, isAdd, setAdd, user,setActive) {
	dispatch(
		{
			type : 'added',
			state : isAdd,
			setAdd : setAdd,
			user: user,
			setActive,
		}
	);
}

function deleteFriend(dispatch,isAdd,setAdd,user,setActive) {
	dispatch(
		{
			type: 'delete',
			state: isAdd,
			setAdd: setAdd,
			user: user,
			setActive,
		}
	);


}

function isFriend(user) {
	axios.get('./json/friends.json').then(json => {
		for (const friend of json.data) {
			if (friend.userId2 === user.id) {

				return false
			}
		}
	});
	return true;
}



export default function UserInfo(props) {
	const [score, setScore] = useState(0);
	const [isAdd, setAdd] = useState(true);
	const initial = [];
	const [active, setActive] = useState(true);
	const [tasks, dispatch] = useReducer(taskReducer, initial);
	
	if (active) {
		//не работает узнать про сетевые запросы документация и react + книги по соцсети
		/*axios.get('./json/friends.json').then(json => {
			for (const friend of json.data) {
				if (friend.userId2 === props.user.id) {
					
					setAdd(false);
					continue;
					console.log(isAdd);
				}
			}
		});*/
	}
	
	return (<div ref={props.ret} className="users-info">
		<div className="fon">
			<i className="ri-arrow-left-line " onClick={() => {
				props.dispatch({
					type: 'closed',
				})

			}}></i>
			<div className="profile"></div>
			<div className="panel-users">
				<h2>{props.user.email}</h2>

				<button className="add" onClick={() => { isAdd ? addFriend(dispatch, isAdd, setAdd, props.user,setActive) : deleteFriend(dispatch, isAdd, setAdd, props.user,setActive) }}>
					{isAdd ? 'Добавить' : 'Удалить'}
				</button>
			</div>
		</div>

	</div>);
}