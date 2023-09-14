
import React from 'react';

export default class Error extends React.Component {
	constructor() {
		super();
		this.state = {
			error: '',
			show: true
		};
	}




	sendRequest() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', './json/error.json', true);

		xhr.onreadystatechange = () => {
			try {
				if (xhr.readyState === 4 && xhr.status === 200) {
					var json = JSON.parse(xhr.responseText);
					this.setState({ show: false });
					this.setState({ error: json })
				}

			}
			catch (err) {
				console.log("Запрос не удался ", err);
			}
		};
		xhr.send();
	}

	render() {
		if (this.state.show) {
			this.sendRequest();
		}


		return (
			<>
				<div className={'container'}>
					<h1>{this.state.error}</h1>
					{true ? <div className={'a'}><a href='http://127.0.0.1:8080/test/danter.html' className='a'>Don't have a account Register</a></div> : ''}
				</div>

			</>
		);
	}

}