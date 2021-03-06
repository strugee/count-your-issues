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
      urlToDOM = require('./urltodom.js');

module.exports.invoke = async function githubProvider(opts) {
	assert(opts.username);

	const document = await urlToDOM('https://github.com/search?utf8=%E2%9C%93&q=author%3A' + opts.username + '+is%3Aissue&type=Issues');

	const el = document.getElementsByTagName('h3')[1];
	assert(el.textContent.includes('issues'));
	// The .replace() strips all non-number characters
	const count = Number(el.innerHTML.trim().replace(/\D/g,''));

	return [count, 'GitHub'];
};
