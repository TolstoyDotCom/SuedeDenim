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

	this.parse = function( $container ) {
		var ret = [];

		$( tweetSelector, $container ).each( function( index ) {
			var tweet = self.parseTweet( index, $(this) );
			ret.push( tweet );
		});

		return ret;
	}

	this.parseTweet = function( index, $elem ) {
		var tweet = tweetFactory.createTweet();
		var functions = tweetParsers;

		tweet.set( 'index', index );

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
	}
}
