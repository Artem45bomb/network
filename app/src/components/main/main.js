import React from 'react';
import Home from './Home/home';
import Profile from './Profile/profile.js';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: ['home','profile', 'message', 'mail', 'settings'],
			value: ['Home', 'Profile', 'Message', 'Mail', 'Settings'],
			src: ["ri-home-5-line", "ri-user-line", "ri-chat-3-line", "ri-mail-open-line", "ri-settings-line"],
			isActive: [true, false, false, false, false],
			show: true,
			user: {
				email: ''
			}
		}
	}

	setActive(id) {
		this.setState({
			isActive: this.state.isActive.map((elem, index) => {
				if (id === index) {
					return true
				}
				return false
			})
		})
	}

	setRequest(method, url) {
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


	render() {
		if (this.state.show) {
			this.setRequest("GET", "./json/user.json").then(json => {
				this.setState({ show: false });
				this.setState({
					user: {
						email: json.email,
					}
				});
			});
		}


		return (
			<>
				<nav className={"nav"}>
					<ul className={"nav__list"}>
						{
							this.state.id.map((elem, index) => {
								return (<a key={index} href={'#' + elem} className={this.state.isActive[index] ? "nav__link active-link" : "nav__link "} onClick={() => this.setActive(index)}>
									<i className={this.state.src[index]}></i>
									<span className={"nav__name"}>
										{this.state.value[index]}
									</span>
								</a>)


							})
						}

						<svg className={"indicator"} width="94" height="56" xmlns="http://www.w3.org/2000/svg">
							<ellipse cx="47" cy="28" rx="24" ry="28" />
							<path d="M24 20C24 20 28 55.9999 48 56L0 55.9997C18 55.9998 24 20 24 20Z" />
							<path d="M70 20C70 20 66 55.9999 46 56L94 55.9997C76 55.9998 70 20 70 20Z" />
						</svg>
					</ul>
				</nav>


				<div className={"container"}>
					<Home value={this.state.value[0]} id={this.state.id[0]} />
					<Profile id={this.state.id[1]} value={this.state.value[1]} email={this.state.user.email} />
					<section id={this.state.id[2]}>
						<h2>{this.state.value[2]}</h2>
					</section>
					<section id={this.state.id[3]}>
						<h2>{this.state.value[3]}</h2>
					</section>
					<section id={this.state.id[4]}>
						<h2>{this.state.value[4]}</h2>
					</section>
				</div>

			</>
		);
	}
}
