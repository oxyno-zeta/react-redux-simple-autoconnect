/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 31/08/17
 * Licence: See Readme
 */

/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import * as redux from 'redux';
import * as reactRedux from 'react-redux';

chai.use(sinonChai);

/* ************************************* */
/* ********        TESTS        ******** */
/* ************************************* */

class TestClass {
    constructor(props) {
        this.props = props;
    }
}

describe('index', () => {
    let lib;
    const connectStub = sinon.stub(reactRedux, 'connect');
    const bindActionCreatorsStub = sinon.stub(redux, 'bindActionCreators');

    function connectStubFnBuilder(dispatch, state, ownProps) {
        return (mapStateToProps, mapDispatchToProps, mergeProps) => (Component) => {
            const props1 = mapStateToProps ? mapStateToProps(state, ownProps) : {};
            const props2 = mapDispatchToProps ? mapDispatchToProps(dispatch, ownProps) : {};
            let mergePropsFn = (ownProps, stateProps, dispatchProps) => (Object.assign({}, ownProps, stateProps, dispatchProps));
            if (mergeProps) {
                mergePropsFn = mergeProps;
            }
            const props = mergePropsFn(ownProps, props1, props2);
            return new Component(props);
        }
    }
    before(() => {
        // eslint-disable-next-line global-require
        lib = require('./index').default;
    });

    after(() => {
        lib = null;
    });

    afterEach(() => {
        TestClass.propTypes = undefined;
    });

    it('should send no props with no states and no actions', () => {
        const state = { count: 1 };
        const ownProps = { value1: 'test' };
        const dispatch = sinon.spy();
        connectStub.callsFake(connectStubFnBuilder(dispatch, state, ownProps));
        bindActionCreatorsStub.callsFake(props => props);

        TestClass.propTypes = {
            count: 'int',
        };
        const result = lib(() => [], () => [])(TestClass);
        expect(result.props).to.deep.equal(ownProps);
    });

    it('should send no props with no propTypes declared', () => {
        const state = { count: 1 };
        const ownProps = { value1: 'test' };
        const dispatch = sinon.spy();
        connectStub.callsFake(connectStubFnBuilder(dispatch, state, ownProps));
        bindActionCreatorsStub.callsFake(props => props);
        const result = lib(() => [state], () => [])(TestClass);
        expect(result.props).to.deep.equal(ownProps);
    });

    it('should send props with propTypes declared with state and actions', () => {
        const state = { count: 1 };
        const actions = { action1: () => {} };
        const ownProps = { value1: 'test' };
        const dispatch = sinon.spy();
        connectStub.callsFake(connectStubFnBuilder(dispatch, state, ownProps));
        bindActionCreatorsStub.callsFake(props => props);

        TestClass.propTypes = {
            count: 'int',
            action1: 'func',
        };
        const result = lib(() => [state], () => [actions])(TestClass);
        expect(result.props).to.deep.equal({
            value1: 'test',
            count: 1,
            action1: actions.action1,
        });
    });

    it('should send props with propTypes declared with state', () => {
        const state = { count: 1 };
        const ownProps = { value1: 'test' };
        const dispatch = sinon.spy();
        connectStub.callsFake(connectStubFnBuilder(dispatch, state, ownProps));
        bindActionCreatorsStub.callsFake(props => props);

        TestClass.propTypes = {
            count: 'int',
            action1: 'func',
        };
        const result = lib(() => [state], null, (ownProps, stateProps, dispatchProps) => (Object.assign({}, ownProps, stateProps, dispatchProps)), {})(TestClass);
        expect(result.props).to.deep.equal({
            value1: 'test',
            count: 1,
        });
    });

    it('should send props with propTypes declared with actions', () => {
        const state = { count: 1 };
        const actions = { action1: () => {} };
        const ownProps = { value1: 'test' };
        const dispatch = sinon.spy();
        connectStub.callsFake(connectStubFnBuilder(dispatch, state, ownProps));
        bindActionCreatorsStub.callsFake(props => props);

        TestClass.propTypes = {
            count: 'int',
            action1: 'func',
        };
        const result = lib(null, () => [actions], (ownProps, stateProps, dispatchProps) => (Object.assign({}, ownProps, stateProps, dispatchProps)), {})(TestClass);
        expect(result.props).to.deep.equal({
            value1: 'test',
            action1: actions.action1,
        });
    });
});
