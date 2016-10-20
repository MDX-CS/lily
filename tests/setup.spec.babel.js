import { expect } from 'chai';
require('dotenv').config();

describe('On setup it', () => {
	it('should load environment file', () => {
		expect(process.env.APP_NAME).to.equal('Lily');
    expect(process.env.SLACK_API_TOKEN).to.exist;
	});
});
