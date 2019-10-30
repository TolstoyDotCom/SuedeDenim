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

com.tolstoy.basic.app.retriever.Starter = function( jsParams, dataCallback ) {
	if ( !window.jQuery ) {
		var elem = document.createElement( 'script' );
		document.head.append( elem );
		elem.type = 'text/javascript';
		elem.src = 'https://code.jquery.com/jquery-1.12.0.js';
	}

	var waitForJQueryCount = 0;

	var waitForJQueryTimer = window.setInterval( function() {
		if ( ++waitForJQueryCount > 500 ) {
			window.clearInterval( waitForJQueryTimer );

			var jqueryNotLoading = {
				map_type: 'metadata',
				error_code: 'Starter_cannot_load_jquery',
				error_message: 'Starter: cannot load jquery'
			};

			dataCallback( [ jqueryNotLoading ] );
		}

		if ( window.jQuery ) {
			window.clearInterval( waitForJQueryTimer );

			var $ = jQuery.noConflict( true );

			var debugLevel = new com.tolstoy.basic.app.utils.DebugLevel( jsParams.debugLevel );
			var logger = new com.tolstoy.basic.app.utils.ConsoleLogger( $, debugLevel );
			var utils = new com.tolstoy.basic.app.utils.Utils( $ );
			var tweetFactory = new com.tolstoy.basic.app.tweet.TweetFactory( $, utils, logger );
			var tweetCollection = tweetFactory.makeTweetCollection( [] );
			var scrollerFactory = new com.tolstoy.basic.app.scroller.ScrollerFactory( $, utils, logger );
			var parsedTweetFactory = new com.tolstoy.basic.app.tweetparser.html.ParsedTweetFactory( $, tweetFactory, utils, logger );

			function finishedCallback( data ) {
				var ary = tweetCollection.exportAll();
				$.each( ary, function( index, map ) {
					ary[ index ] = utils.ensureMapIsStringString( map );
					ary[ index ][ 'map_type' ] = 'tweet';
				});

				data = utils.ensureMapIsStringString( data );
				data[ 'map_type' ] = 'metadata';
				ary.push( data );

				dataCallback( ary );
			}

			var scroller = scrollerFactory.makeStepScroller( jsParams.pageType, jsParams.url, jsParams.scrollerHeightMultiplier, jsParams.scrollerNumTimesToScroll );

			$(document).ready( function() {
				var runner;

				if ( jsParams.pageType == 'replypage' ) {
					runner = new com.tolstoy.basic.app.retriever.ReplyPageRunner( $, jsParams, tweetCollection, parsedTweetFactory, scroller, finishedCallback, utils, logger );
				}
				else {
					runner = new com.tolstoy.basic.app.retriever.TimelineRunner( $, jsParams, tweetCollection, parsedTweetFactory, scroller, finishedCallback, utils, logger );
				}

				runner.start();
			});
		}
	}, 100 );
};
