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

com.tolstoy.basic.app.retriever.TimelineRunner = function( $, jsParams, tweetCollection, parsedTweetFactory, scroller, finishedCallback, utils, logger ) {
	var moi = this;

	var stateObj = new com.tolstoy.basic.app.retriever.StateCheckLoggedIn( $, scroller, jsParams.checkLoggedInDelay, utils, logger );
	var scrollerStasuses = com.tolstoy.basic.app.scroller.ScrollerStatus;
	var iterationnumber = 0;
	var timer;

	var metadata = {
		url: jsParams.url,
		request_date: ( new Date() ).toUTCString(),
		last_compound: '',
		tweet_selector: '',
		show_hidden_replies: '',
		show_hidden_replies2: '',
		completed: false,
		error_code: '',
		error_message: ''
	};

	this.finished = function() {
		window.clearInterval( timer );
		timer = null;

		metadata.last_compound = stateObj ? stateObj.getName() + '.' + stateObj.getStatus() : 'stateObj was null';

		stateObj = null;

		finishedCallback( metadata );
	};

	this.iteration = function() {
		if ( !stateObj ) {
			metadata.error_code = 'TimelineRunner_called_after_being_finished';
			metadata.error_message = 'TimelineRunner: called after being finished';
			moi.finished();
			return;
		}

		if ( ++iterationnumber > 1000 ) {
			metadata.error_code = 'TimelineRunner_too_many_iterations';
			metadata.error_message = 'TimelineRunner: too many iterations';
			metadata.completed = false;
			moi.finished();
			return;
		}

		var compound = stateObj.getName() + '.' + stateObj.getStatus();

		logger.info( 'TimelineRunner: compound=' + compound );

		switch ( compound ) {
			case 'StateCheckLoggedIn.ready':
			case 'StateWaitForTweetSelector.ready':
			case 'StateFindUncensoredTweets.ready':
				stateObj.run( iterationnumber );
				break;

			case 'StateCheckLoggedIn.running':
			case 'StateWaitForTweetSelector.running':
			case 'StateFindUncensoredTweets.running':
				stateObj.run( iterationnumber );
				break;

			case 'StateCheckLoggedIn.failure':
			case 'StateWaitForTweetSelector.failure':
			case 'StateFindUncensoredTweets.failure':
				metadata.completed = false;
				$.extend( metadata, stateObj.getFailureInformation() );
				moi.finished();
				break;

			case 'StateCheckLoggedIn.finished':
				stateObj = new com.tolstoy.basic.app.retriever.StateWaitForTweetSelector( $, jsParams.tweetSelector, jsParams.maxWaitForTweetSelector, utils, logger );
				break;

			case 'StateWaitForTweetSelector.finished':
				stateObj = new com.tolstoy.basic.app.retriever.StateFindUncensoredTweets( $, jsParams.tweetSelector, parsedTweetFactory, tweetCollection, scroller, utils, logger );
				break;

			case 'StateFindUncensoredTweets.finished':
				metadata.completed = scroller.getStatus() == scrollerStasuses.FINISHED;
				moi.finished();
				break;

			case 'StateWaitForTweetSelector.notfound':
				metadata.completed = false;
				metadata.tweet_selector = 'not found';
				moi.finished();
				break;

			default:
				metadata.error_code = 'Runner_bad_compound';
				metadata.error_message = 'Runner: bad compound: ' + compound;
				moi.finished();
		}
	};

	this.start = function() {
		metadata.completed = true;
		timer = window.setInterval( this.iteration, jsParams.mainClockDelay );
	};
};
