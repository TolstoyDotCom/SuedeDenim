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

com.tolstoy.basic.app.tweet.TweetFactory = function( $, utils, logger ) {
	this.makeUser = function( input ) {
		input = input || {};

		return new com.tolstoy.basic.app.tweet.TweetUser( $, input, utils, logger );
	};

	this.makeTweet = function( input ) {
		input = input || {};

		if ( !input.user ) {
			input.user = this.makeUser();
		}

		return new com.tolstoy.basic.app.tweet.Tweet( $, input, utils, logger );
	};

	this.makeTweetCollection = function( input ) {
		return new com.tolstoy.basic.app.tweet.TweetCollection( $, input, utils, logger );
	};

	this.makeTweetLink = function( input ) {
		var link = new com.tolstoy.basic.app.tweet.TweetLink( $, input, utils, logger );
		if ( !link.isValid() && logger.getDebugLevel().isDebug() ) {
			logger.info( 'TweetFactory::makeTweetLink error: ' + link.getError() );
		}

		return link;
	};
};
