import { expect } from 'chai';
import MessageBox from '../src/Messaging/MessageBox';
import ModuleProvider from '../src/Modules/ModuleProvider';

describe('When providing a module it', () => {
  it('ignores non-relevant messages', () => {
    let message = { text: 'Test <@lily> unrelated test message' }
    let box = new MessageBox(message);
    let module = new BasicModuleProvider(box, null);

    expect(module.suitable(box)).to.be.false;
  });

  it('determines suitable messages by literal strings', () => {
    let message = { text: 'Test <@lily> some test message' }
    let box = new MessageBox(message);
    let module = new BasicModuleProvider(box, null);

    expect(module.suitable(box)).to.be.true;
  });

  it('determines suitable messages by a regular expression', () => {
    let message = { text: 'Test <@lily> I want my timetable' }
    let box = new MessageBox(message);
    let module = new RegexModuleProvider(box, null);

    expect(module.suitable(box)).to.be.ok;
  });
});

class BasicModuleProvider extends ModuleProvider {
  commands() {
    return ['some'];
  }

  register() {
    //
  }
}

class RegexModuleProvider extends ModuleProvider {
  commands() {
    return {
      pattern: /.* timetable ?.*/
    };
  }

  register() {
    //
  }
}
