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

com.tolstoy.basic.app.tweet.TweetLink = function( $, input, utils, logger ) {
	var valid = false;
	var bBareLink = false;
	var bHashtagLink = false;
	var bStatusLink = false;
	var bPhotoLink = false;
	var bRetweetLink = false;
	var bLikeLink = false;
	var bReplyLink = false;
	var bHelpLink = false;
	var bShortenedLink = false;
	var source = '';
	var hashtag = '';
	var handle = '';
	var tweetid = '';
	var photoid = '';
	var shortcode = '';
	var extra = '';
	var error_message = '';

	var helpLinkText = 'help.twitter.com/using-twitter';
	var shortenedRegex = /https?:\/\/t.co\/(\w+)\??(\w+)?/;						//	https://t.co/123
	var hashtagRegex = /\/hashtag\/([a-zA-Z0-9_-]+)\?/;							//	/hashtag/somehashtag
	var photoRegex = /\/?([a-zA-Z0-9_]+)\/status\/([\d]+)\/photo\/([\d]+)/;		//	handle/status/12345/photo/1
	var retweetRegex = /\/?([a-zA-Z0-9_]+)\/status\/([\d]+)\/retweet/;			//	handle/status/12345/retweet
	var likeRegex = /\/?([a-zA-Z0-9_]+)\/status\/([\d]+)\/like/;				//	handle/status/12345/like
	var replyRegex = /\/?([a-zA-Z0-9_]+)\/status\/([\d]+)\/repl/;				//	handle/status/12345/repl
	var bareRegex = /^\/([a-zA-z0-9_]+)$/;										//	/handle
	var statusRegex = /\/?([a-zA-Z0-9_]+)\/status\/([\d]+)(?:\/)?(.*)?/;		//	handle/status/12345

	this.isValid = function() {
		return valid;
	};

	this.isBareLink = function() {
		return bBareLink;
	};

	this.isShortenedLink = function() {
		return bShortenedLink;
	};

	this.isHelpLink = function() {
		return bHelpLink;
	};

	this.isHashtagLink = function() {
		return bHashtagLink;
	};

	this.isStatusLink = function() {
		return bStatusLink;
	};

	this.isPhotoLink = function() {
		return bPhotoLink;
	};

	this.isRetweetLink = function() {
		return bRetweetLink;
	};

	this.isLikeLink = function() {
		return bLikeLink;
	};

	this.isReplyLink = function() {
		return bReplyLink;
	};

	this.isInteractionLink = function() {
		return bRetweetLink || bLikeLink || bReplyLink;
	};

	this.getSource = function() {
		return source;
	};

	this.getHashtag = function() {
		return hashtag;
	};

	this.getHandle = function() {
		return handle;
	};

	this.getTweetID = function() {
		return tweetid;
	};

	this.getPhotoID = function() {
		return photoid;
	};

	this.getShortcode = function() {
		return shortcode;
	};

	this.getStatusLink = function() {
		if ( !this.getHandle() || !this.getTweetID() ) {
			return '';
		}

		return '/' + this.getHandle() + '/status/' + this.getTweetID();
	};

	this.getExtra = function() {
		return extra;
	};

	this.getError = function() {
		return error_message;
	};

	if ( !input.source || !$.trim( input.source ) ) {
		return;
	}

	source = $.trim( input.source );

	var ary;

	if ( source.indexOf( helpLinkText ) > -1 ) {
		bHelpLink = true;
		valid = true;

		return;
	}

	ary = shortenedRegex.exec( source );
	if ( ary && ary.length > 1 ) {
		shortcode = ary[ 1 ];
		extra = ary.length > 2 ? ary[ 2 ] : '';

		bShortenedLink = true;
		valid = true;

		return;
	}

	ary = hashtagRegex.exec( source );
	if ( ary && ary.length > 1 ) {
		hashtag = ary[ 1 ];

		bHashtagLink = true;
		valid = true;

		return;
	}

	ary = bareRegex.exec( source );
	if ( ary && ary.length > 1 ) {
		handle = ary[ 1 ];

		bBareLink = true;
		valid = true;

		return;
	}

	ary = photoRegex.exec( source );
	if ( ary && ary.length > 1 ) {
		handle = ary[ 1 ];
		tweetid = ary[ 2 ];
		photoid = ary[ 3 ];

		bStatusLink = true;
		bPhotoLink = true;
		valid = true;

		return;
	}

	ary = retweetRegex.exec( source );
	if ( ary && ary.length > 1 ) {
		handle = ary[ 1 ];
		tweetid = ary[ 2 ];

		bStatusLink = true;
		bRetweetLink = true;
		valid = true;

		return;
	}

	ary = likeRegex.exec( source );
	if ( ary && ary.length > 1 ) {
		handle = ary[ 1 ];
		tweetid = ary[ 2 ];

		bStatusLink = true;
		bLikeLink = true;
		valid = true;

		return;
	}

	ary = replyRegex.exec( source );
	if ( ary && ary.length > 1 ) {
		handle = ary[ 1 ];
		tweetid = ary[ 2 ];

		bStatusLink = true;
		bReplyLink = true;
		valid = true;

		return;
	}

	ary = statusRegex.exec( source );
	if ( ary && ary.length > 1 ) {
		handle = ary[ 1 ];
		tweetid = ary[ 2 ];
		extra = ary.length > 3 ? ary[ 3 ] : '';

		bStatusLink = true;
		valid = true;

		return;
	}

	error_message = 'cannot parse ' + source;
};
