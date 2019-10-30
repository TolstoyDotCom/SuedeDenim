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

com.tolstoy.basic.app.retriever.StateCheckLoggedIn = function( $, scroller, checkLoggedInDelay, utils, logger ) {
	checkLoggedInDelay = checkLoggedInDelay || 5;

	var stateStasuses = com.tolstoy.basic.app.retriever.StateStatus;
	var status = stateStasuses.READY;
	var error_code = '';
	var error_message = '';

	scroller.reset();

	this.getName = function() {
		return 'StateCheckLoggedIn';
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
		if ( status == stateStasuses.FINISHED || status == stateStasuses.FAILURE ) {
			return;
		}

		status = stateStasuses.RUNNING;

		if ( ++attemptNumber > checkLoggedInDelay ) {
			if ( $( '#signin-link' ).length ) {
				error_code = 'StateCheckLoggedIn_found_login_link';
				error_message = 'StateCheckLoggedIn: found login link';
				status = stateStasuses.FAILURE;
			}
			else {
				status = stateStasuses.FINISHED;
			}
		}
	};
};
