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

com.tolstoy.basic.app.main.ParseTweets = function( tweetParsers, tweetFactory, tweetSelector, utils ) {
	var self = this;

	this.parse = function( $container, iterationnumber ) {
		var tweets = [];

		$( tweetSelector, $container ).each( function( iterationindex ) {
			var tweet = self.parseTweet( $(this) );

			tweet.set( 'iterationnumber', iterationnumber );
			tweet.set( 'iterationindex', iterationindex );

			tweets.push( tweet );
		});

		tweets = this.assignPreviousNext( tweets );

		return tweets;
	};

	this.parseTweet = function( $elem ) {
		var tweet = tweetFactory.createTweet();
		var functions = tweetParsers;

		$elem.children().each( function() {
			$(this).children().each( function() {
				var $t = $(this);
				$.each( functions, function( key, callback ) {
					callback( $t, tweet, utils );
				});

				for ( var i = 0; i < functions.length; i++ ) {
					functions[ i ]( $(this), tweet );
				}
			});
		});

		return tweet;
	};

	this.assignPreviousNext = function( tweets ) {
		var len = tweets.length;
		if ( !len ) {
			return tweets;
		}

		for ( var i = 0; i < len; i++ ) {
			var tweet = tweets[ i ];

			tweet.set( 'previoustweetid', 0 );
			tweet.set( 'nexttweetid', 0 );

			if ( i > 0 ) {
				tweet.set( 'previoustweetid', tweets[ i - 1 ].get( 'tweetid' ) );
			}

			if ( i + 1 < len ) {
				tweet.set( 'nexttweetid', tweets[ i + 1 ].get( 'tweetid' ) );
			}
		}

		return tweets;
	};
};

