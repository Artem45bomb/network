import React from "react";

export default function Post() {
	return (
		<>
			<div className='post'>
				<div className='post__image'>
					<img href='#'></img>
				</div>
				<div className='post__info'>
					<div className='post__like'>
						<i className="ri-heart-fill"></i>
						<h2>24</h2>
					</div>
					<div className='post__user'>
						<div className='post__name'>Artem</div>
						<div className='post__profile'></div>
					</div>
				</div>
			</div>
		</>
	);
}