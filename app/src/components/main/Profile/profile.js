import React from "react";

export default function Profile(props) {
	return (
		<>
			<section id={props.id}>
				<h2>{props.value}</h2>
				<div className='profile__container'>
					<div className='profile__image' >
					</div>
					<div className='profile__info'>
						<h2>{props.email}</h2>
					</div>
				</div>
				<div className='friends'>
					Друзья: 15
				</div>
			</section>
		</>
	);
}