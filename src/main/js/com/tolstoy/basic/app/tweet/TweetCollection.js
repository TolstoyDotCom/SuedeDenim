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

com.tolstoy.basic.app.tweet.TweetCollection = function( params ) {
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

	this.addTweet = function( newTweet ) {
		if ( !newTweet || !newTweet.get( 'tweetid' ) ) {
			return false;
		}

		var existing = this.findTweetByID( newTweet.get( 'tweetid' ) );
		if ( !existing ) {
			this.tweets.push( newTweet );

			return true;
		}

		var previoustweetid = existing.get( 'previoustweetid' ) || newTweet.get( 'previoustweetid' );
		var nexttweetid = existing.get( 'nexttweetid' ) || newTweet.get( 'nexttweetid' );

		existing.set( 'previoustweetid', previoustweetid );
		existing.set( 'nexttweetid', nexttweetid );

		return true;
	};

	this.findTweetByID = function( id ) {
		if ( !id ) {
			return null;
		}

		for ( var i = 0; i < this.tweets.length; i++ ) {
			if ( this.tweets[ i ].get( 'tweetid' ) == id ) {
				return this.tweets[ i ];
			}
		}

		return null;
	};
};
