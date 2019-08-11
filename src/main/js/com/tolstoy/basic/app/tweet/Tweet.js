/*
 * Copyright 2019 Chris Kelly
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
*/

com.tolstoy.basic.app.tweet.Tweet = function(params) {
	params = params || {};

	this.fields = [
		'index',
		'tweettext',
		'tweetlanguage',
		'tweetid',
		'time',
		'datestring',
		'tweethtml',
		'repliedtohandle',
		'videothumburl',
		'retweetcount',
		'replycount',
		'favoritecount',
		'is_pinned',
	];

	this.index = params.index || '';
	this.tweettext = params.tweettext || '';
	this.tweetlanguage = params.tweetlanguage || '';
	this.tweetid = params.tweetid || '';
	this.time = params.time || 0;
	this.datestring = params.datestring || 0;
	this.tweethtml = params.tweethtml || '';
	this.repliedtohandle = params.repliedtohandle || '';
	this.videothumburl = params.videothumburl || '';
	this.retweetcount = params.retweetcount || '0';
	this.replycount = params.replycount || '0';
	this.favoritecount = params.favoritecount || '0';
	this.author = params.author || {};
	this.is_pinned = params.is_pinned || false;

	this.set = function( which, value ) {
		this[ which ] = value;
	};

	this.get = function( which ) {
		return this[ which ];
	};

	this.export = function() {
		var ret = {};

		for ( var i = 0; i < this.fields.length; i++ ) {
			var f = this.fields[ i ];
			ret[ f ] = this.get( f );
		}

		ret.author = this.get( 'author' ) ? this.get( 'author' ).export() : {};

		return ret;
	};
};
