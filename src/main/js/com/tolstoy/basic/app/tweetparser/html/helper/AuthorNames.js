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

com.tolstoy.basic.app.tweetparser.html.helper.AuthorNames = function( $, $elem, tweetFactory, utils, logger ) {
	var valid = false, displayName = '', handle = '';

	this.isValid = function() {
		return valid;
	};

	this.getDisplayName = function() {
		return displayName;
	};

	this.getHandle = function() {
		return handle;
	};

	var texts = [];
	$( 'div > div > a > div > div > div > span', $elem ).each( function() {
		var text = $(this).text();
		if ( text && text.trim() ) {
			texts.push( text.trim() );
		}
	});

	texts.filter( function(x) {
		return x.trim();
	});

	//[ "Massimo", "@Rainmaker1973" ]
	if ( texts.length > 1 && texts[ 1 ].indexOf( '@' ) === 0 ) {
		displayName = texts[ 0 ];
		handle = texts[ 1 ];
		valid = true;
	}
};
