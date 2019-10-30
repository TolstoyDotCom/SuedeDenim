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

com.tolstoy.basic.app.retriever.StateWaitForTweetSelector = function( $, tweetSelector, maxWaitIterations, utils, logger ) {
	var stateStasuses = com.tolstoy.basic.app.retriever.StateStatus;
	var status = stateStasuses.READY;
	var iterations = 0;
	var error_code = '';
	var error_message = '';

	this.getName = function() {
		return 'StateWaitForTweetSelector';
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

	this.run = function( iterationnumber ) {
		if ( status == stateStasuses.FINISHED || status == stateStasuses.NOTFOUND || status == stateStasuses.FAILURE ) {
			return;
		}

		status = stateStasuses.RUNNING;

		iterations++;

		if ( $( tweetSelector ).length ) {
			status = stateStasuses.FINISHED;
			return;
		}

		logger.info( 'StateWaitForTweetSelector iteration number=' + iterations );
		if ( iterations > maxWaitIterations ) {
			status = stateStasuses.NOTFOUND;
			return;
		}
	};
};
