react-redux-simple-autoconnect
==============================
[![Build Status](https://travis-ci.org/oxyno-zeta/react-redux-simple-autoconnect.svg?branch=master)](https://travis-ci.org/oxyno-zeta/react-redux-simple-autoconnect)[![Coverage Status](https://coveralls.io/repos/github/oxyno-zeta/react-redux-simple-autoconnect/badge.svg?branch=master)](https://coveralls.io/github/oxyno-zeta/react-redux-simple-autoconnect?branch=master)

# Features
- Use propTypes definition to auto connect actions/data to component
- Use mergeProps/options of the real connect function

# How it works ?
The library use propTypes declared in the Component to link state properties or actions (dispatch is automatically 
added) to Component. 

The library will bind properties by listing state and actions object keys.  

# API
## autoConnect([getStatesFunction], [getActionsFunction], [mergeProps], [options])(ComponentClass)
autoConnect is the default function of the library.

This function is built on top of connect from [react-redux](https://github.com/reactjs/react-redux/). 

### Arguments
* `getStatesFunction(state, ownProps) : Array[state]`: This function must return an array of states. If function is not provided, 
`null` will be given to `connect` in the `mapStateToProps` place.

Parameters:

| Name | Description |
|--------|-------|
| state | Redux store state like in `connect` in the `mapStateToProps` |
| ownProps | The props passed to the connected component |

* `getActionsFunction(ownProps) : Array[actions]`: This function must return an array of actions objects. If function
 is not provided, `null` will be given to `connect` in the `mapDispatchToProps` place.
 
 Parameters:
 
 | Name | Description |
 |--------|-------|
 | ownProps | The props passed to the connected component |
 
* `mergeProps()` : Same function as in the `connect` [official API](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options).

* `options` : Same object as in the `connect` [official API](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options).

* `ComponentClass` : Component class to connect with state and actions.

# Examples
## Simple state
```jsx
import autoConnect from 'react-redux-simple-autoconnect';
import TodoComponent from './Todo';
import actions from './actions';

const Todo = autoConnect((state) => [state], () => [actions])(TodoComponent);

export default Todo;
```

## Multiple state (substate)
```jsx
import autoConnect from 'react-redux-simple-autoconnect';
import TodoComponent from './Todo';
import actions from './actions';
import actions2 from './actions2';

const Todo = autoConnect((state) => [state.generalState, state.subState1], () => [actions, action2])(TodoComponent);

export default Todo;
```

# Thanks
* My wife BH to support me doing this

# Author
* Oxyno-zeta (Havrileck Alexandre)
