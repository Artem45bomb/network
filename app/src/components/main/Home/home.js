import React from "react";
import Post from "./Post/post";

export default function Home(props) {
	return (
			<section id={props.id}>
				<h2>{props.value}</h2>
				<div className='home__find'>
					<div className='home__profile'></div>
					<div className='home__panel'>
						<a href='#' className='add'>+</a>
						<a href='./search.html'><i className="ri-find-replace-line"></i></a>
						<a href='#'><i className="ri-message-3-fill"></i></a>
					</div>
				</div>
				<div className='posts'>
					<Post/>
				</div>
			</section>
	)
}