import React from "react";

export default function User({value,dispatch,work,setUser}) {
	return (
		<>
			<div className="user" onClick={() => {
				if (work) {
					dispatch({
						type: 'click',
					});
					setUser(value);
				}
			}}>
				<div className="profile" ></div>
				<div className="name">{value.email}</div>
			</div>
		</>
	);
}