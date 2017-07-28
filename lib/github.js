/*

Copyright 2017 AJ Jordan <alex@strugee.net>.

This file is part of count-your-issues.

count-your-issues is free software: you can redistribute it and/or
modify it under the terms of the GNU General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

count-your-issues is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
General Public License for more details.

You should have received a copy of the GNU General Public License
along with count-your-issues. If not, see
<https://www.gnu.org/licenses/>.

*/

'use strict';

const assert = require('assert'),
      url = require('url'),
      // Ridiculous ES6 modules fans break CommonJS sanity
      http = require('http-promises/server').default,
      JSDOM = require('jsdom').JSDOM;

module.exports = async function githubProvider(opts) {
	assert(opts.username);

	const res = await http.header('User-Agent', 'strugee/count-your-issues')
	                      .get('https://github.com/search?utf8=%E2%9C%93&q=author%3Astrugee+is%3Aissue&type=Issues');

	const document = new JSDOM(res.data).window.document;
	debugger;
	// The .replace() strips all non-number characters
	const count = Number(document.getElementsByTagName('h3')[0].innerHTML.trim().replace(/\D/g,''));

	return count;
};
