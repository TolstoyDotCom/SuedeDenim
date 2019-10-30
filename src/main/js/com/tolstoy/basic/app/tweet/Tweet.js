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

com.tolstoy.basic.app.tweet.Tweet = function( $, input, utils, logger ) {
	input = input || {};

	var TWEETTEXT_EMPTY_MARKER = '[empty]';

	var descriptors = [
		{ targetKey: 'avatarURL', sourceKey: 'avatarURL', defaultValue: '' },
		{ targetKey: 'componentcontext', sourceKey: 'componentcontext', defaultValue: '' },
		{ targetKey: 'conversationid', sourceKey: 'conversationid', defaultValue: '0' },
		{ targetKey: 'datestring', sourceKey: 'datestring', defaultValue: '' },
		{ targetKey: 'disclosuretype', sourceKey: 'disclosuretype', defaultValue: '' },
		{ targetKey: 'favoritecount', sourceKey: 'favoritecount', defaultValue: '0' },
		{ targetKey: 'followsyou', sourceKey: 'followsyou', defaultValue: '' },
		{ targetKey: 'fullname', sourceKey: 'fullname', defaultValue: '' },
		{ targetKey: 'hascards', sourceKey: 'hascards', defaultValue: '' },
		{ targetKey: 'hasparenttweet', sourceKey: 'hasparenttweet', defaultValue: '' },
		{ targetKey: 'innertweetid', sourceKey: 'innertweetid', defaultValue: '' },
		{ targetKey: 'innertweetrawhref', sourceKey: 'innertweetrawhref', defaultValue: '' },
		{ targetKey: 'is_pinned', sourceKey: 'is_pinned', defaultValue: '' },
		{ targetKey: 'is_toptweet', sourceKey: 'is_toptweet', defaultValue: '' },
		{ targetKey: 'isreplyto', sourceKey: 'isreplyto', defaultValue: '' },
		{ targetKey: 'itemid', sourceKey: 'itemid', defaultValue: '' },
		{ targetKey: 'iterationindex', sourceKey: 'iterationindex', defaultValue: '0' },
		{ targetKey: 'iterationnumber', sourceKey: 'iterationnumber', defaultValue: '0' },
		{ targetKey: 'name', sourceKey: 'name', defaultValue: '' },
		{ targetKey: 'nexttweetid', sourceKey: 'nexttweetid', defaultValue: '0' },
		{ targetKey: 'permalinkpath', sourceKey: 'permalinkpath', defaultValue: '' },
		{ targetKey: 'photourl', sourceKey: 'photourl', defaultValue: '' },
		{ targetKey: 'previoustweetid', sourceKey: 'previoustweetid', defaultValue: '0' },
		{ targetKey: 'quality', sourceKey: 'quality', defaultValue: 'unknown_quality' },
		{ targetKey: 'repliedtohandle', sourceKey: 'repliedtohandle', defaultValue: '' },
		{ targetKey: 'repliedtouserid', sourceKey: 'repliedtouserid', defaultValue: '0' },
		{ targetKey: 'replycount', sourceKey: 'replycount', defaultValue: '0' },
		{ targetKey: 'replytousersjson', sourceKey: 'replytousersjson', defaultValue: '' },
		{ targetKey: 'retweetcount', sourceKey: 'retweetcount', defaultValue: '0' },
		{ targetKey: 'retweetid', sourceKey: 'retweetid', defaultValue: '0' },
		{ targetKey: 'screenname', sourceKey: 'screenname', defaultValue: '' },
		{ targetKey: 'suggestionjson', sourceKey: 'suggestionjson', defaultValue: '' },
		{ targetKey: 'time', sourceKey: 'time', defaultValue: '0' },
		{ targetKey: 'tweetclasses', sourceKey: 'tweetclasses', defaultValue: '' },
		{ targetKey: 'tweethtml', sourceKey: 'tweethtml', defaultValue: '' },
		{ targetKey: 'tweetid', sourceKey: 'tweetid', defaultValue: '0' },
		{ targetKey: 'tweetlanguage', sourceKey: 'tweetlanguage', defaultValue: '' },
		{ targetKey: 'tweetmentions', sourceKey: 'tweetmentions', defaultValue: '' },
		{ targetKey: 'tweetnonce', sourceKey: 'tweetnonce', defaultValue: '' },
		{ targetKey: 'tweetphoto_image', sourceKey: 'tweetphoto_image', defaultValue: '' },
		{ targetKey: 'tweetphoto_link', sourceKey: 'tweetphoto_link', defaultValue: '' },
		{ targetKey: 'tweetstatinitialized', sourceKey: 'tweetstatinitialized', defaultValue: '' },
		{ targetKey: 'tweettext', sourceKey: 'tweettext', defaultValue: '' },
		{ targetKey: 'userid', sourceKey: 'userid', defaultValue: '0' },
		{ targetKey: 'username', sourceKey: 'username', defaultValue: '' },
		{ targetKey: 'verifiedText', sourceKey: 'verifiedText', defaultValue: '' },
		{ targetKey: 'videothumburl', sourceKey: 'videothumburl', defaultValue: '' },
		{ targetKey: 'youblock', sourceKey: 'youblock', defaultValue: '' },
		{ targetKey: 'youfollow', sourceKey: 'youfollow', defaultValue: '' },
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

	var debugStringPrevNextMessages = [
		'NO_PN',
		'NO_P',
		'NO_N',
		'has_pn'
	];

	this.setAttribute = function( which, value ) {
		this[ which ] = value;
	};

	this.getAttribute = function( which ) {
		return this[ which ];
	};

	this.getAttributeErrors = function() {
		return this.errors;
	};

	this.addError = function( message ) {
		this.errors.push( message );
	};

	this.export = function() {
		var ret = {};

		utils.exportDataUsingDescriptorsSameKeys( ret, this, descriptors );

		var exportedUser = this.getAttribute( 'user' ) ? this.getAttribute( 'user' ).export() : {};
		$.each( exportedUser, function( key, value ) {
			ret[ 'user__' + key ] = value;
		});

		return ret;
	};

	this.toDebugString = function( indent ) {
		var ary = [];

		ary.push( this.getAttribute( 'tweetid' ) ? 'id=' + this.getAttribute( 'tweetid' ) : 'NO_ID' );
		ary.push( 'txt=' + utils.simplifyText( this.getAttribute( "tweettext" ) ) );
		ary.push( this.getAttribute( 'userid' ) ? 'uid=' + this.getAttribute( 'userid' ) : 'NO_UID' );
		ary.push( this.getAttribute( 'username' ) ? 'unm=' + this.getAttribute( 'username' ) : 'NO_UNM' );
		ary.push( this.getAttribute( 'verifiedText' ) ? 'ver=' + this.getAttribute( 'verifiedText' ) : 'NO_VER' );
		ary.push( this.getAttribute( 'quality' ) ? 'q=' + this.getAttribute( 'quality' ) : 'NO_QUAL' );

		ary.push( 'favs=' + this.getAttribute( 'favoritecount' ) );
		ary.push( 'repls=' + this.getAttribute( 'replycount' ) );
		ary.push( 'rts=' + this.getAttribute( 'retweetcount' ) );

		if ( this.getAttribute( 'permalinkpath' ) ) {
			if ( this.getAttribute( 'permalinkpath' ).indexOf( '/' ) > -1 ) {
				ary.push( 'has_prmlk' );
			}
			else {
				ary.push( 'BAD_PRMLK=' + this.getAttribute( 'permalinkpath' ) );
			}
		}
		else {
			ary.push( 'NO_PRMLK' );
		}

		ary.push( debugStringPrevNextMessages[ ( 2 * ( this.getAttribute( 'previoustweetid' ) ? 1 : 0 ) ) + ( this.getAttribute( 'nexttweetid' ) ? 1 : 0 ) ] );

		ary.push( this.user ? 'user=[' + this.user.toDebugString( '' ) + ']' : 'NO_USER' );

		return indent + ary.join( ', ' );
	};

	utils.importDataUsingDescriptors( this, input, descriptors );

	if ( input.user ) {
		for ( var key in input ) {
			if ( key.indexOf( 'user__' ) === 0 && input.hasOwnProperty( key ) ) {
				input.user.setAttribute( key.replace( 'user__', '' ), input.key );
			}
		}
	}

	this.setAttribute( 'user', input.user );
};
