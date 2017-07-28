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
      http = require('https'),
      stp = require('stream-to-promise');

module.exports = async function githubProvider(opts) {
	assert(opts.username);

	const query = `{
		user(login: "${opts.username}") {
			issues {
				totalCount
			}
		}
	}`;

	const httpOpts = Object.assign({
		method: 'POST'
	}, url.parse('https://api.github.com/graphql'));

	let req = http.request(httpOpts).on('end', (res) => {
		console.log(res.statusCode);
		debugger;
		assert(2 === Math.floor(res.statusCode / 100));
	});

	req.write(query);
	req.end();

	req.on('end', () => console.log('ended'));

	req = stp(req);
	const res = JSON.parse(await req);

	console.log('returning');

	return res.data.user.issues.totalCount;
};
