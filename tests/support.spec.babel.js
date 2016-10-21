import { expect, assert } from 'chai';
import AbstractClass from '../src/Support/AbstractClass';

describe('An absctact class', () => {
  it('forces its children to implement methods', () => {
    assert.throws(() => {
      new FailingChild;
    }, TypeError, /someMethod/);
  });

  it('recognizes when the required method was implemented', () => {
    expect(new ValidChild).to.be.ok;
  });

  it('cannot be instantiated directly', () => {
    assert.throws(() => {
      new Parent;
    }, TypeError, 'This class is abstract and should not ne instantiated directly');
  });
});

class Parent extends AbstractClass {
  constructor() {
    super();

    this.require('someMethod')
      .shouldNotBeInstantiated('Parent')
      .check();
  }
}

class FailingChild extends Parent {

}

class ValidChild extends Parent {
  someMethod() {

  }
}
