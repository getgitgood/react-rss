import '@testing-library/jest-dom';
import { vi } from 'vitest';
import * as utils from '../utils/helpers';

const testingMocks = {
  removeTags: {
    input1:
      '<p>As a young boy, <b>Link<b/> is tricked by Ganondorf, the King of the Gerudo Thieves. The evil human uses Link to gain access to the Sacred Realm, where he places his tainted hands on Triforce and <span>transforms</span> the beautiful Hyrulean landscape into a barren wasteland. Link is determined to fix the problems he helped to create, so with the help of <div class="colored">Rauru</div> he travels through time gathering the powers of the Seven Sages.</p>',
    output1:
      'As a young boy, Link is tricked by Ganondorf, the King of the Gerudo Thieves. The evil human uses Link to gain access to the Sacred Realm, where he places his tainted hands on Triforce and transforms the beautiful Hyrulean landscape into a barren wasteland. Link is determined to fix the problems he helped to create, so with the help of Rauru he travels through time gathering the powers of the Seven Sages.',
    input2: '',
    output2: false
  },
  sliceTrailingSlash: {
    input1: 'thisisa/test/string/',
    output1: 'thisisa/test/string',
    input2: '',
    output2: false
  }
};

describe('Essential Utils', () => {
  it('Test if removeTags properly removes html tags from actual text.', () => {
    vi.spyOn(utils, 'removeTags');
    const output = utils.removeTags(testingMocks.removeTags.input1);
    expect(output).toBe(testingMocks.removeTags.output1);
  });

  it('Test if removeTags returns "false" on empty string.', () => {
    vi.spyOn(utils, 'removeTags');
    const output = utils.removeTags(testingMocks.removeTags.input2);
    expect(output).toBe(testingMocks.removeTags.output2);
  });

  it('Test if sliceTrailingSlash properly removes trailing slashes from url.', () => {
    vi.spyOn(utils, 'sliceTrailingSlash');
    const output = utils.sliceTrailingSlash(
      testingMocks.sliceTrailingSlash.input1
    );
    expect(output).toBe(testingMocks.sliceTrailingSlash.output1);
  });

  it('Test if sliceTrailingSlash returns "false" on empty string.', () => {
    vi.spyOn(utils, 'sliceTrailingSlash');
    const output = utils.sliceTrailingSlash(
      testingMocks.sliceTrailingSlash.input2
    );
    expect(output).toBe(testingMocks.sliceTrailingSlash.output2);
  });
});
