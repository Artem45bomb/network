
import React from 'react';

export default class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: [false,false],
			value: props.value,
			input: ['',''],
			show: props.show,
			src: props.src,
			name: props.name
		};
	}

	setClassName(id, name) {
		this.setState({
			isActive: this.state.isActive.map((elem,index) => {
			if (index === id ) {
				return true;
			}
			return elem;
		})});
	}

	setClassNameNot(id, name) {
		this.setState({
			isActive: this.state.isActive.map((elem, index) => {
				if (index === id && this.state.input[index] ==='') {
					return false;
				}
				return elem;
			})
		});
	}

	setInputValue(input, id) {
		this.setState({
			input: this.state.input.map((elem, index) => {
				if (index === id) {
					return input.target.value;
				}
				return elem;
			})
		})
	}

	setUpperWorld(string) {
		let world = '';
		for (let i = 0; i < string.length; i++){
			if (i === 0) {
				world += string[i].toUpperCase();
			}
			else {
				world += string[i];
			}
		}
		return world
	}

	render() {
		const results = this.state.value.map((elem, index) => {
			return (
				<div className={'field' } key={index}
					onMouseLeave={() => this.setClassNameNot(index, this.state.isActive[index])}
					onMouseEnter={() => this.setClassName(index, this.state.isActive[index])}
				>
					<label className={this.state.isActive[index] ? 'active' : ''}>{ this.setUpperWorld(this.state.value[index])}</label>
					<input	name={this.state.value[index]} type='text' value={this.state.input[index]}	onChange={(elem) => this.setInputValue(elem,index)} />
				</div>
			);
		});
		
		let checkValue = true;
		for (let i = 0; i <= this.state.input.length-1; i++){
			if (this.state.input[i] !== '') {
				checkValue = false;
			}
			else {
				checkValue = true;
			}
		}

		return (
			<>
				<div className={'container'}>
					<h1>{this.state.name}</h1>
					<form action={this.state.src} method='post' >
						{results}
						{!checkValue ? '' : <h2>Fill in the panel</h2>}
						<input type='submit' value={'Log in'} disabled={checkValue}></input>
					</form>
					{this.state.show? <div className={'a'}><a href='http://127.0.0.1:8080/test/danter.html' className='a'>Don't have a account Register</a></div>: ''}
				</div>
				
			</>
		);
	}
	
}