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

com.tolstoy.basic.app.utils.Utils = {
	numberOnlyRegex: new RegExp( '^\\d+$' ),

	makeNumericPhrase: function( input ) {
		return new com.tolstoy.basic.app.utils.NumericPhrase( input );
	},

	findInteraction: function( which, testid, numericPhrases ) {
		var ret = 0;

		if ( testid && testid.indexOf( which ) > -1 ) {
			$.each( numericPhrases, function ( index, numericPhrase ) {
				if ( numericPhrase.countNumbers() ) {
					ret = numericPhrase.getNumber( 0 );
					return false;
				}
			});
		}

		if ( ret ) {
			return ret;
		}
	},

	getTextContent: function($container, raw) {
		var first = $container.get( 0 );
		if ( !first ) {
			return '';
		}

		var text = first.textContent;
		if ( !text ) {
			return '';
		}

		if ( !raw ) {
			text = text.trim();
		}

		return text;
	},

	extractTweetIDFromURL: function( urlString ) {
		if ( !urlString || urlString.indexOf( 'status' ) < 0 ) {
			return null;
		}

		var ary = urlString.split( '/' );
		if ( !ary || ary.length < 1 ) {
			return null;
		}

		for ( var i = 0; i < ary.length; i++ ) {
			if ( ary[ i ] == 'status' && ( i + 1 ) < ary.length && ary[ i + 1 ].match( this.numberOnlyRegex ) ) {
				return ary[ i + 1 ];
			}
		}

		return null;
	},

	extractTwitterHandle: function( text ) {
		if (!text) {
			return null;
		}

		var ary = text.split( '/' );
		if (!ary || ary.length < 1) {
			return null;
		}

		for (var i = ary.length - 1; i >= 0; i--) {
			if (ary[i] && ary[i].trim()) {
				return ary[i].trim();
			}
		}

		return null;
	}
};
