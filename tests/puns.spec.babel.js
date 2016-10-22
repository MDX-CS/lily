import { expect } from 'chai';
import PunsModuleProvider from '../src/Modules/Puns/PunsModuleProvider';

describe('Puns module', () => {
  it('can choose a random pun', () => {
    let module = new PunsModuleProvider;

    expect(module.pun()).to.not.be.empty;
  });
});
