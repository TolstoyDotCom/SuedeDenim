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

com.tolstoy.basic.app.retriever.StateFindCensoredTweets2 = function( $, tweetSelector, parsedTweetFactory, tweetCollection, scroller, utils, logger ) {
	var moi = this;

	var stateStasuses = com.tolstoy.basic.app.retriever.StateStatus;
	var scrollerStasuses = com.tolstoy.basic.app.scroller.ScrollerStatus;
	var status = stateStasuses.READY;
	var error_code = '';
	var error_message = '';

	scroller.reset();

	this.getName = function() {
		return 'StateFindCensoredTweets2';
	};

	this.getSupposedQuality = function() {
		return com.tolstoy.basic.app.tweet.TweetSupposedQuality.ABUSIVE;
	};

	this.getStatus = function() {
		return status;
	};

	this.getFailureInformation = function() {
		var ret = {};

		if ( status == stateStasuses.FAILURE ) {
			ret[ 'error_code' ] = error_code ? error_code : this.getName() + '_unknown';
			ret[ 'error_message' ] = error_message ? error_message : 'Unknown error in ' + this.getName();
		}

		return ret;
	};

	this.assignPreviousNext = function( tweets ) {
		var len = tweets.length;
		if ( !len ) {
			return tweets;
		}

		for ( var i = 0; i < len; i++ ) {
			var tweet = tweets[ i ];

			tweet.setAttribute( 'previoustweetid', 0 );
			tweet.setAttribute( 'nexttweetid', 0 );

			if ( i > 0 ) {
				tweet.setAttribute( 'previoustweetid', tweets[ i - 1 ].getAttribute( 'tweetid' ) );
			}

			if ( i + 1 < len ) {
				tweet.setAttribute( 'nexttweetid', tweets[ i + 1 ].getAttribute( 'tweetid' ) );
			}
		}

		return tweets;
	};

	this.run = function( iterationnumber ) {
		if ( status == stateStasuses.FINISHED || status == stateStasuses.FAILURE ) {
			return;
		}

		var tweets = [];

		status = stateStasuses.RUNNING;

		logger.info( 'StateFindCensoredTweets2: number of censored2 tweets=' + $( tweetSelector ).length );
		$( tweetSelector ).each( function( iterationindex ) {
			var tweet = parsedTweetFactory.makeTweet( $(this) );

			tweet.setAttribute( 'iterationnumber', iterationnumber );
			tweet.setAttribute( 'iterationindex', iterationindex );
			tweet.setAttribute( 'quality', moi.getSupposedQuality() );

			tweets.push( tweet );
		});

		tweets = this.assignPreviousNext( tweets );

		tweetCollection.addTweets( tweets );

		scroller.step();

		if ( scroller.getStatus() == scrollerStasuses.FINISHED || scroller.getStatus() == scrollerStasuses.EXCEEDEDLIMIT ) {
			status = stateStasuses.FINISHED;
		}
	};
};
