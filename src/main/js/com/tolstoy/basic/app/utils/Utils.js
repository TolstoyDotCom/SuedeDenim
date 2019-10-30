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

com.tolstoy.basic.app.utils.Utils = function( $ ) {
	var numberOnlyRegex = new RegExp( '^\\d+$' );
	var newlinesRegex = new RegExp( '/\r?\n|\r/g' );

	this.simplifyText = function( text, maxLen, defaultValue ) {
		maxLen = maxLen || 20;
		defaultValue = defaultValue || '[EMPTY]';

		if ( this.isEmpty( text ) ) {
			return defaultValue;
		}

		text = this.removeNewlines( this.removeEmojis( text ) );

		text = text ? text.trim() : defaultValue;

		return text.substring( 0, maxLen );
	};

	this.removeEmojis = function( input ) {
		//	https://stackoverflow.com/a/41543705
		return input.replace( /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '' );
	};

	this.removeNewlines = function( input ) {
		if ( !input || input.length < 1 ) {
			return input;
		}

		return input.replace( newlinesRegex, '' );
	};

	this.isEmpty = function( input ) {
		return !input || input.length < 1;
	};

	this.prettyPrint = function( input, indent ) {
		var ary = [];

		$.each( input, function( key, value ) {
			ary.push( indent + key + ': ' + value );
		});

		return ary.join( "\n" );
	};

	this.makeNumericPhrase = function( input ) {
		return new com.tolstoy.basic.app.utils.NumericPhrase( input );
	};

	this.ensureMapIsStringString = function( ary ) {
		var ret = {};

		if ( !ary ) {
			return ret;
		}

		$.each( ary, function( key, value ) {
			key = '' + key;
			value = '' + value;

			ret[ key ] = value;
		});

		return ret;
	};

	//	if testid goes away, 'which' won't work for various languages.
	//	parsing "88651 Μου αρέσει", "88651 отметка «Нравится»" probably
	//	isn't an option so add "lang=en" to the URL.
	this.findInteraction = function( which, testid, numericPhrases ) {
		var phrases = [];

		$.each( numericPhrases, function ( index, numericPhrase ) {
			if ( numericPhrase.countNumbers() ) {
				phrases.push( numericPhrase );
			}
		});

		if ( !phrases.length ) {
			return false;
		}

		phrases.sort( function( a, b ) {
			return b.getNumber( 0 ) - a.getNumber( 0 );
		});

		if ( testid && testid.indexOf( which ) > -1 ) {
			return phrases.shift().getNumber( 0 );
		}

		var ret = null;

		$.each( phrases, function ( index, phrase ) {
			if ( phrase.containsWord( which ) ) {
				ret = phrase;
				return false;
			}
		});

		return ret ? ret.getNumber( 0 ) : null;
	};

	this.importDataUsingDescriptors = function( target, source, descriptors ) {
		$.each( descriptors, function() {
			var sourceKey = this.sourceKey;
			var targetKey = this.targetKey;
			var defaultValue = this.defaultValue;
			var importer = this.importer;

			if ( importer ) {
				importer( target, source );
			}
			else if ( source.hasOwnProperty( sourceKey ) ) {
				target[ targetKey ] = source[ sourceKey ];
			}
			else {
				target[ targetKey ] = defaultValue;
			}
		});
	};

	this.exportDataUsingDescriptors = function( target, source, descriptors ) {
		$.each( descriptors, function() {
			var sourceKey = this.targetKey;
			var targetKey = this.sourceKey;
			var defaultValue = this.defaultValue;
			var exporter = this.exporter;

			if ( exporter ) {
				exporter( target, source );
			}
			else if ( source.hasOwnProperty( sourceKey ) ) {
				target[ targetKey ] = source[ sourceKey ];
			}
			else {
				target[ targetKey ] = defaultValue;
			}
		});
	};

	this.exportDataUsingDescriptorsSameKeys = function( target, source, descriptors ) {
		$.each( descriptors, function() {
			var sourceKey = this.targetKey;
			var targetKey = this.targetKey;
			var defaultValue = this.defaultValue;
			var exporter = this.exporter;

			if ( exporter ) {
				exporter( target, source );
			}
			else if ( source.hasOwnProperty( sourceKey ) ) {
				target[ targetKey ] = source[ sourceKey ];
			}
			else {
				target[ targetKey ] = defaultValue;
			}
		});
	};

	this.getTextContent = function( $container, raw ) {
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
	};

	//	deprecated
	this.extractTweetIDFromURL = function( urlString ) {
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
	};

	//	deprecated
	this.extractTwitterHandle = function( text ) {
		if ( !text ) {
			return null;
		}

		var ary = text.split( '/' );
		if ( !ary || ary.length < 1 ) {
			return null;
		}

		for ( var i = ary.length - 1; i >= 0; i-- ) {
			if ( ary[ i ] && ary[ i ].trim() ) {
				return ary[ i ].trim();
			}
		}

		return null;
	};

	//	deprecated
	this.isPhotoURL = function( url ) {
		return url && url.indexOf( 'photo' ) > -1;
	};
};
