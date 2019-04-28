/*

Copyright 2019 AJ Jordan <alex@strugee.net>.

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
      querystring = require('querystring'),
      url = require('url');

module.exports.invoke = async function bugzillaProvider(opts) {
	assert(opts.username);

	const res = await http.header('User-Agent', 'strugee/count-your-issues')
	                      .get(`https://api.launchpad.net/1.0/bugs?bug_reporter=%22https%3A%2F%2Fapi.launchpad.net%2F1.0%2F%7E${opts.username}%22&ws.op=searchTasks`);

	return [res.data.total_size, 'launchpad.net'];
};
