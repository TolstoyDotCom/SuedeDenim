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

com.tolstoy.basic.app.tweet.TweetCollection = function( $, input, utils, logger ) {
	this.tweets = [];

	this.addTweets = function( ary ) {
		var count = 0;

		for ( var i = 0; i < ary.length; i++ ) {
			if ( this.addTweet( ary[ i ] ) ) {
				count++;
			}
		}

		return count;
	};

	this.exportAll = function() {
		var ary = [];

		for ( var i = 0; i < this.tweets.length; i++ ) {
			ary.push( this.tweets[ i ].export() );
		}

		return ary;
	};

	/**
	 * @return 0 if not added, 1 if appended, 2 if replaced.
	 */
	this.addTweet = function( newTweet ) {
		if ( !newTweet || !newTweet.getAttribute( 'tweetid' ) ) {
			return 0;
		}

		var existing = this.findTweetByID( newTweet.getAttribute( 'tweetid' ) );
		if ( !existing ) {
			this.tweets.push( newTweet );

			return 1;
		}

		var previoustweetid = existing.getAttribute( 'previoustweetid' ) || newTweet.getAttribute( 'previoustweetid' );
		var nexttweetid = existing.getAttribute( 'nexttweetid' ) || newTweet.getAttribute( 'nexttweetid' );

		existing.setAttribute( 'previoustweetid', previoustweetid );
		existing.setAttribute( 'nexttweetid', nexttweetid );

		return 2;
	};

	this.findTweetByID = function( id ) {
		if ( !id ) {
			return null;
		}

		for ( var i = 0; i < this.tweets.length; i++ ) {
			if ( this.tweets[ i ].getAttribute( 'tweetid' ) == id ) {
				return this.tweets[ i ];
			}
		}

		return null;
	};

	this.toDebugString = function( indent ) {
		if ( !this.tweets || !this.tweets.length ) {
			return 'no items';
		}

		var ary = [];

		for ( var i = 0; i < this.tweets.length; i++ ) {
			ary.push( indent + '  ' + this.tweets[ i ].toDebugString( '' ) );
		}

		return indent + ary.join( "\n" );
	};
};
