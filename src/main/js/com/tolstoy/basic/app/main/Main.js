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

com.tolstoy.basic.app.main.Main = function() {
	var logger = new com.tolstoy.basic.app.utils.TextareaLogger();
	var utils = com.tolstoy.basic.app.utils.Utils;
	var tweetFactory = new com.tolstoy.basic.app.tweet.TweetFactory();
	var functions = com.tolstoy.basic.app.main.StandardTweetParserFunctions.getFunctions();
	var parseTweets = new com.tolstoy.basic.app.main.ParseTweets( functions, tweetFactory, 'article', utils );

	var tweets = {};

	var timeout = setInterval( function() {
		var foundTweets = parseTweets.parse( $('main') );
		$.each( foundTweets, function( index, obj ) {
			var tweetid = obj.get( 'tweetid' );
			if ( tweetid && !tweets[ tweetid ] ) {
				tweets[ tweetid ] = obj;
			}
		});

		var ary = [];
		$.each( tweets, function( index, obj ) {
			ary.push( obj.export() );
		});
		logger.log( JSON.stringify( ary, null, "\t" ) );
	}, 1000 );
};
