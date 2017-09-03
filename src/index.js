/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 26/06/17
 * Licence: See Readme
 */

/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
export default autoConnect;

/* ************************************* */
/* ********       CLASSES       ******** */
/* ************************************* */

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */

/**
 * Bind items to object.
 * @param array
 * @param propTypes
 * @returns {{}}
 */
function bindItems(array, propTypes) {
    const result = {};
    if (propTypes) {
        const keys = Object.keys(propTypes);
        keys.forEach((key) => {
            array.forEach((item) => {
                if (Object.prototype.hasOwnProperty.call(item, key)) {
                    result[key] = item[key];
                }
            });
        });
    }
    return result;
}

/**
 * Map state to props generator.
 * @param getStatesFunction
 * @param propTypes
 * @returns {function(*=, *=)}
 */
function mapStateToPropsGenerator(getStatesFunction, propTypes) {
    return (state, ownProps) => {
        const stateArray = getStatesFunction(state, ownProps);
        return Object.assign(ownProps, bindItems(stateArray, propTypes));
    };
}

/**
 * Map dispatch to props generator.
 * @param getActionsFunction
 * @param propTypes
 * @returns {function(*=, *=)}
 */
function mapDispatchToPropsGenerator(getActionsFunction, propTypes) {
    return (dispatch, ownProps) => {
        const actionsArray = getActionsFunction(ownProps);
        const result = bindItems(actionsArray, propTypes);
        return bindActionCreators(result, dispatch);
    };
}

/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

/**
 * Auto connect.
 * @param getStatesFunction
 * @param getActionsFunction
 * @returns {function(*=)}
 */
function autoConnect(getStatesFunction, getActionsFunction) {
    return (Component) => {
        const propTypes = Component.propTypes;
        const mapStateToProps = mapStateToPropsGenerator(getStatesFunction, propTypes);
        const mapDispatchToProps = mapDispatchToPropsGenerator(getActionsFunction, propTypes);
        return connect(mapStateToProps, mapDispatchToProps)(Component);
    };
}
