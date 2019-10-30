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

com.tolstoy.basic.app.tweetparser.html.ParsedTweetFactory = function( $, tweetFactory, utils, logger ) {
	var helpers = com.tolstoy.basic.app.tweetparser.html.helper;

	var debugHelpers = [
		helpers.Debug,
	];
	var dateHelpers = [
		helpers.Date1,
		helpers.Date2
	];
	var tweetidHelpers = [
		helpers.Tweetid1,
		helpers.Tweetid2
	];
	var permalinkHelpers = [
		helpers.Permalink1,
		helpers.Permalink2
	];
	var tweettextHelpers = [
		helpers.Tweettext1
	];
	var interactionHelpers = [
		helpers.Interaction1,
		helpers.Interaction2
	];
	var photoHelpers = [
		helpers.Photo1
	];
	var authorAvatarHelpers = [
		helpers.AuthorAvatar
	];
	var authorNameHelpers = [
		helpers.AuthorNames
	];

	this.makeTweet = function( $article ) {
		var tweet = tweetFactory.makeTweet();

		var user = tweet.getAttribute( 'user' );

		this.runImplementations( debugHelpers, [ $, $article, tweetFactory, utils, logger ], function( impl ) {
		},
		function() {
		});

		this.runImplementations( interactionHelpers, [ $, $article, tweetFactory, utils, logger ], function( impl ) {
			tweet.setAttribute( 'replycount', impl.getReplyCount() );
			tweet.setAttribute( 'retweetcount', impl.getRetweetCount() );
			tweet.setAttribute( 'favoritecount', impl.getLikesCount() );
		},
		function() {
			tweet.addError( 'cannot find interactions' );
		});

		this.runImplementations( tweettextHelpers, [ $, $article, tweetFactory, utils, logger ], function( impl ) {
			tweet.setAttribute( 'tweettext', impl.getTweettext() );
			tweet.setAttribute( 'tweethtml', impl.getTweetHTML() );
			tweet.setAttribute( 'tweetlanguage', impl.getLang() );
		},
		function() {
			tweet.addError( 'cannot find tweettext' );
		});

		this.runImplementations( photoHelpers, [ $, $article, tweetFactory, utils, logger ], function( impl ) {
			tweet.setAttribute( 'tweetphoto_link', impl.getPhotoLink() );
			tweet.setAttribute( 'tweetphoto_image', impl.getPhotoImage() );
		},
		function() {
			tweet.addError( 'cannot find photos' );
		});

		this.runImplementations( tweetidHelpers, [ $, $article, tweetFactory, utils, logger ], function( impl ) {
			tweet.setAttribute( 'tweetid', impl.getID() );
		},
		function() {
			tweet.addError( 'cannot find tweetid' );
		});

		this.runImplementations( permalinkHelpers, [ $, $article, tweetFactory, utils, logger ], function( impl ) {
			tweet.setAttribute( 'permalinkpath', impl.getPermalink() );
		},
		function() {
			tweet.addError( 'cannot find permalinkpath' );
		});

		this.runImplementations( dateHelpers, [ $, $article, tweetFactory, utils, logger ], function( impl ) {
			tweet.setAttribute( 'datestring', impl.getDateString() );
		},
		function() {
			tweet.addError( 'cannot find datestring' );
		});

		this.runImplementations( authorAvatarHelpers, [ $, $article, tweetFactory, utils, logger ], function( impl ) {
			tweet.setAttribute( 'avatarURL', impl.getImage() );
			user.setAttribute( 'avatarURL', impl.getImage() );
		},
		function() {
			user.addError( 'cannot find avatarURL' );
		});

		this.runImplementations( authorNameHelpers, [ $, $article, tweetFactory, utils, logger ], function( impl ) {
			user.setAttribute( 'handle', impl.getHandle() );
			user.setAttribute( 'displayName', impl.getDisplayName() );
		},
		function() {
			user.addError( 'cannot find screenname' );
		});

		if ( !user.getAttribute( 'handle' ) ) {
			logger.info( 'BAD HTML, no handle:' + $article.html() );
		}

		if ( !tweet.getAttribute( 'tweetid' ) ) {
			logger.info( 'BAD HTML, no tweetid:' + $article.html() );
		}

		if ( !tweet.getAttribute( 'permalinkpath' ) ) {
			logger.info( 'BAD HTML, no permalinkpath:' + $article.html() );
		}

		return tweet;
	};

	this.runImplementations = function( implementations, args, successCallback, failureCallback ) {
		var implementation;

		for ( var i = 0; i < implementations.length; i++ ) {
			implementation = this.constructObject( implementations[ i ], args );

			if ( implementation.isValid() ) {
				successCallback( implementation );
				return;
			}
		}

		failureCallback();
	};

	//	from https://stackoverflow.com/a/1608546
	this.constructObject = function( constructor, args ) {
		function F() {
			return constructor.apply( this, args );
		}

		F.prototype = constructor.prototype;

		return new F();
	};
};
