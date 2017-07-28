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
      http = require('http-promises/server').default,
      querystring = require('querystring');

module.exports.invoke = async function bugzillaProvider(opts) {
	assert(opts.email);
	const email = querystring.escape(opts.email);
	const instance = opts.instance || 'https://bugzilla.mozilla.org';

	// Bugzilla has a really nice API that lets us specify exactly what fields we want returned.
	// In this case: basically nothing.
	// Thanks very much, Bugzilla <3
	const res = await http.header('User-Agent', 'strugee/count-your-issues')
	                      .get(`${instance}/rest/bug?include_fields=id&email1=${email}&emailreporter1=1&emailtype1=exact`);

	return res.data.bugs.length;
};

module.exports.name = 'Bugzilla';
