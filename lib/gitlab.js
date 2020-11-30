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
      http = require('http-promises/server').default;

module.exports.invoke = async function gitlabProvider(opts) {
	assert(opts.username);
	assert(opts.cookie);
	const instance = opts.instance || 'https://gitlab.com';
	const bareInstance = url.parse(instance).host;

	const count = await http.header('User-Agent', 'strugee/count-your-issues')
	                        .header('Cookie', opts.cookie)
	                        .get(`${instance}/api/v4/issues_statistics?author_username=${opts.username}`)
	                        .then(res => res.data.statistics.counts.all);

	assert(Number.isInteger(count));

	return [count, bareInstance];
};
