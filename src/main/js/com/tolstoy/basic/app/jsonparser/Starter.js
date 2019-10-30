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

com.tolstoy.basic.app.jsonparser.Starter = function( jsParams, jsonStrings, dataCallback ) {
	if ( !window.jQuery ) {
		var elem = document.createElement( 'script' );
		document.head.append( elem );
		elem.type = 'text/javascript';
		elem.src = 'https://code.jquery.com/jquery-1.12.0.js';
	}

	var waitForJQueryCount = 0;
	var i = 0;

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
			var parsedJSONFactory = new com.tolstoy.basic.app.tweetparser.json.ParsedJSONFactory( $, tweetFactory, utils, logger );

			var combined = {
				tweets: [],
				users: [],
				instructions: [],
				errors: []
			};

			for ( i = 0; i < jsonStrings.length; i++ ) {
				try {
					var json = JSON.parse( jsonStrings[ i ] );

					if ( !json ) {
						combined.errors.push( 'Cannot parse string at position ' + i );
						continue;
					}

					var parsed = parsedJSONFactory.parseJSON( json );

					combined.tweets = combined.tweets.concat( parsed.tweets );
					combined.users = combined.users.concat( parsed.users );
					combined.instructions = combined.instructions.concat( parsed.instructions );
					combined.errors = combined.errors.concat( parsed.errors );
				}
				catch ( error ) {
					combined.errors.push( 'Cannot parse string at position ' + i + ( error && error.message ? error.message : 'unknown exception' ) );
				}
			}

			if ( combined.tweets ) {
				logger.info( 'jsonparser.Starter tweets:' );
				for ( i = 0; i < combined.tweets.length; i++ ) {
					logger.info( '  ' + combined.tweets[ i ].toDebugString( '  ' ) );
				}
			}
			else {
				logger.info( 'jsonparser.Starter NO TWEETS' );
			}

			if ( combined.users ) {
				logger.info( 'jsonparser.Starter users:' );
				for ( i = 0; i < combined.users.length; i++ ) {
					logger.info( '  ' + combined.users[ i ].toDebugString( '  ' ) );
				}
			}
			else {
				logger.info( 'jsonparser.Starter NO USERS' );
			}

			logger.info( 'jsonparser.Starter instructions:', combined.instructions );
			logger.info( 'jsonparser.Starter errors:', combined.errors );

			var interchangeHelper = new com.tolstoy.basic.app.jsonparser.InterchangeHelper( combined, utils, logger );
			var results = interchangeHelper.getResults();

			logger.info( 'jsonparser.Starter BEGIN RESULTS' );
			for ( i = 0; i < results.length; i++ ) {
				logger.info( '  record:\n' + utils.prettyPrint( results[ i ], '    ' ) );
			}
			logger.info( 'jsonparser.Starter END RESULTS' );

			dataCallback( results );
		}
	}, 100 );
};
