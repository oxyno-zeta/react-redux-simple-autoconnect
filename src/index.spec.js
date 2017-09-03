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
        connectStub.callsFake((mapStateToProps, mapDispatchToProps) => (Component) => {
            const props1 = mapStateToProps(state, ownProps);
            const props2 = mapDispatchToProps(dispatch, ownProps);
            const props = Object.assign(props1, props2);
            return new Component(props);
        });
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
        connectStub.callsFake((mapStateToProps, mapDispatchToProps) => (Component) => {
            const props1 = mapStateToProps(state, ownProps);
            const props2 = mapDispatchToProps(dispatch, ownProps);
            const props = Object.assign(props1, props2);
            return new Component(props);
        });
        bindActionCreatorsStub.callsFake(props => props);
        const result = lib(() => [state], () => [])(TestClass);
        expect(result.props).to.deep.equal(ownProps);
    });

    it('should send props with propTypes declared', () => {
        const state = { count: 1 };
        const actions = { action1: () => {} };
        const ownProps = { value1: 'test' };
        const dispatch = sinon.spy();
        connectStub.callsFake((mapStateToProps, mapDispatchToProps) => (Component) => {
            const props1 = mapStateToProps(state, ownProps);
            const props2 = mapDispatchToProps(dispatch, ownProps);
            const props = Object.assign(props1, props2);
            return new Component(props);
        });
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
});
