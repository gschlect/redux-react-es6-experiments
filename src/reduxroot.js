const React = require('react');

class ReduxRoot extends React.Component {
	constructor(props){
		super(props);

		const generateState = () => {
			let state = props.store.getState();
			state.dispatch = props.store.dispatch;
			return state;
		}

		props.store.subscribe(() => {
			this.setState(generateState());
		});

		this.state = generateState();
	}
	render(){
		let children = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, this.state);
		});

		return <div>{children}</div>;
	}
}

module.exports = ReduxRoot;