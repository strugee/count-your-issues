#!/usr/bin/env node

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
      path = require('path'),
      pReduce = require('p-reduce');

assert(process.argv[2], 'no config provided');

const config = require(path.resolve(process.argv[2]));

assert(Array.isArray(config), 'configuration isn\'t a single array');

const jobs = config.map(async function execDirective(directive) {
	assert(directive.type, 'directive has no type');

	// It's okay to do this in a loop because require() caches paths
	// It's also okay to blindly require() user input because they wrote the config
	const provider = require(`./lib/${directive.type}`);

	const [result, name] = await provider.invoke(directive);
	console.log(name + ': ' + result);

	return result;
});

pReduce(jobs, (a, b) => a + b, 0)
.then(total => console.log('Total: ' + total));

