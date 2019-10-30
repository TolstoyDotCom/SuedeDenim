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

com.tolstoy.basic.app.tweet.TweetUser = function( $, input, utils, logger ) {
	input = input || {};

	var descriptors = [
		{ targetKey: 'id', sourceKey: 'id', defaultValue: '0' },
		{ targetKey: 'handle', sourceKey: 'handle', defaultValue: 'placeholder_handle' },
		{ targetKey: 'displayName', sourceKey: 'displayName', defaultValue: '' },
		{ targetKey: 'verifiedStatus', sourceKey: 'verifiedStatus', defaultValue: 'UNKNOWN' },
		{ targetKey: 'avatarURL', sourceKey: 'avatarURL', defaultValue: '' },
		{ targetKey: 'numTotalTweets', sourceKey: 'numTotalTweets', defaultValue: '0' },
		{ targetKey: 'numFollowers', sourceKey: 'numFollowers', defaultValue: '0' },
		{ targetKey: 'numFollowing', sourceKey: 'numFollowing', defaultValue: '0' },
		{
			targetKey: 'errors',
			defaultValue: '',
			importer: function( target, source ) {
				if ( !source.errors ) {
					target.errors = [];
				}
				else if ( typeof source.errors === 'string' ) {
					target.errors = source.errors.split( ' ;;; ' );
				}
				else if ( typeof source.getErrors === 'function' ) {
					target.errors = source.getErrors();
				}
				else if ( Array.isArray( source.errors ) ) {
					target.errors = source.errors;
				}
				else {
					target.errors = [];
				}
			},
			exporter: function( target, source ) {
				target.errors = source.getErrors && source.getErrors() ? source.getErrors().join( ' ;;; ' ) : '';
			}
		}
	];

	this.setAttribute = function( which, value ) {
		this[ which ] = value;
	};

	this.getAttribute = function( which ) {
		return this[ which ];
	};

	this.getErrors = function() {
		return this.errors;
	};

	this.addError = function( message ) {
		this.errors.push( message );
	};

	this.export = function() {
		var ret = {};

		utils.exportDataUsingDescriptorsSameKeys( ret, this, descriptors );

		return ret;
	};

	this.toDebugString = function( indent ) {
		var ary = [];

		ary.push( this.getAttribute( 'id' ) ? 'id=' + this.getAttribute( 'id' ) : 'NO_ID' );

		if ( !this.getAttribute( 'handle' ) ) {
			ary.push( 'NO_H' );
		}
		else if ( this.getAttribute( 'handle' ) == 'placeholder_handle' ) {
			ary.push( 'DEF_H' );
		}
		else {
			ary.push( 'h=' + this.getAttribute( 'handle' ) );
		}

		ary.push( 'disp=' + utils.simplifyText( this.getAttribute( "displayName" ) ) );

		ary.push( this.getAttribute( 'verifiedStatus' ) ? 'vs=' + this.getAttribute( 'verifiedStatus' ) : 'NO_VS' );

		return indent + ary.join( ', ' );
	};

	utils.importDataUsingDescriptors( this, input, descriptors );
};
