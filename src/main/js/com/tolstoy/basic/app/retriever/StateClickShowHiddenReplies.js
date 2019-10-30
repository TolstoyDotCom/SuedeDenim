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

com.tolstoy.basic.app.retriever.StateClickShowHiddenReplies = function( $, afterClickIterations, attemptIterations, scroller, utils, logger ) {
	var stateStasuses = com.tolstoy.basic.app.retriever.StateStatus;
	var status = stateStasuses.READY;
	var error_code = '';
	var error_message = '';

	scroller.reset();

	this.getName = function() {
		return 'StateClickShowHiddenReplies';
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

	var attemptNumber = 0;

	this.run = function( iterationnumber ) {
		if ( status == stateStasuses.FINISHED || status == stateStasuses.NOTFOUND || status == stateStasuses.FAILURE ) {
			return;
		}

		attemptNumber++;

		if ( status == stateStasuses.CLICKEDBUTTON ) {
			if ( attemptNumber > afterClickIterations ) {
				status = stateStasuses.FINISHED;
			}

			return;
		}

		var $button = null;

		$( 'section > div > div > div > div > div > div[role="button"] > div > div > span' ).each( function() {
			var $t = $(this);
			if ( $.trim( $t.text() ) ) {
				var $levelsUp = $t.parent().parent().parent();
				if ( $levelsUp.length ) {
					$button = $levelsUp;
				}
			}
		});

		if ( $button ) {
			logger.info( 'StateClickShowHiddenReplies: clicking ' + $button.html() );

			$button.click();

			status = stateStasuses.CLICKEDBUTTON;
			attemptNumber = 0;

			return;
		}

		if ( attemptNumber > attemptIterations ) {
			status = stateStasuses.NOTFOUND;
			return;
		}

		scroller.step();
	};
};
