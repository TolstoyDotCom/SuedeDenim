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

com.tolstoy.basic.app.retriever.StateClickShowHiddenReplies2 = function( $, afterClickIterations, attemptIterations, scroller, utils, logger ) {
	var stateStasuses = com.tolstoy.basic.app.retriever.StateStatus;
	var status = stateStasuses.READY;
	var error_code = '';
	var error_message = '';

	scroller.reset();

	this.getName = function() {
		return 'StateClickShowHiddenReplies2';
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

		$( 'section > div > div > div > div > div > div > div > div > div[role="button"]' ).each( function() {
			var $t = $(this);
			var $gpar = $t.parent().parent();

			var t_spans = $t.find( 'div > span' ).length;
			var prev_text = $.trim( $t.prev().text() );
			var gpar_prev_div_len = $gpar.prev().find( 'div' ).length;
			var gpar_next_div_len = $gpar.next().find( 'div' ).length;
			var gpar_prev_text = $.trim( $gpar.prev().text() );
			var gpar_next_text = $.trim( $gpar.next().text() );

			if ( prev_text && t_spans && gpar_prev_div_len && gpar_next_div_len && !gpar_prev_text && !gpar_next_text ) {
				$button = $t;
			}
		});

		if ( $button ) {
			logger.info( 'StateClickShowHiddenReplies2: clicking ' + $button.html() );

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
