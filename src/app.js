const React = require('react');
const ReactDOM = require('react-dom');
const Redux = require('redux');
const ReduxRoot = require('./reduxroot');

// dev/debug only
const debug = true;

// TODO conditionally load this?
const { devTools, persistState } = require('redux-devtools');
const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
const SliderMonitor = require('redux-slider-monitor');


// react components
const Count = (props) => <h1>{props.count}</h1>;
const Button = (props) => <button onClick={() => props.dispatch({type: props.actionType})}>{props.text}</button>;

// redux store reducer
const counter = (state = {count: 0}, action) => {
	switch(action.type){
		case 'INCREMENT':
			return {count: state.count + 1};
		case 'DECREMENT':
			return {count: state.count - 1};
		default:
			return state;
	}
}

const finalCreateStore = debug 
	? Redux.compose(devTools())(Redux.createStore) 
	: Redux.createStore;

let store = finalCreateStore(counter);

ReactDOM.render(
	<div>
		<ReduxRoot store={store}>
			<Count />
			<Button text='-' actionType='DECREMENT' />
			<Button text='+' actionType='INCREMENT' />
		</ReduxRoot>
		{
			debug ? 
			<DebugPanel left right bottom>
				<DevTools store={store} monitor={SliderMonitor} />
			</DebugPanel>
			: null
		}
	</div>,
	document.body
);