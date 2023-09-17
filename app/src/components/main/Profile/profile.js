import React, { useState } from "react";
import axios from "axios";


function countFriends(setFriends) {
	axios.get('./json/friends.json').then(json => {
		setFriends(json.data.length);
	})

}

export default function Profile(props) {
	const [friends, setFriends] = useState(0);
	const [active, setActive] = useState(true);

	if (active) {
		countFriends(setFriends);
		setActive(false);
	}
	return (
		<>
			<section id={props.id}>
				<h2>{props.value}</h2>
				<div className='profile__container'>
					<div className='profile__image' >
					</div>
					<div className='profile__info'>
						<h2>{props.user.email}</h2>
					</div>
				</div>
				<div className='friends'>
					Друзья: {friends}
				</div>
			</section>
		</>
	);
}