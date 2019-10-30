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

com.tolstoy.basic.app.scroller.StepScroller = function( $, pageType, url, heightMultiplier, numTimesToScroll, utils, logger ) {
	var scrollerStasuses = com.tolstoy.basic.app.scroller.ScrollerStatus;

	heightMultiplier = heightMultiplier || 1;
	numTimesToScroll = numTimesToScroll || 20;

	var count = 0;
	var status = scrollerStasuses.READY;

	this.validate = function() {
		if ( !numTimesToScroll || numTimesToScroll < 1 ) {
			throw new Error( 'bad numTimesToScroll' );
		}

		if ( !heightMultiplier || heightMultiplier < 0.01 ) {
			throw new Error( 'bad heightMultiplier' );
		}
	};

	this.validate();

	/***
	 * FINISHED = reached the bottom of the page
	 * EXCEEDEDLIMIT = didn't reach the bottom of the page but did meet or exceed numTimesToScroll
	 */
	this.getStatus = function() {
		return status;
	};

	this.setStatus = function( newStatus ) {
		status = newStatus;
	};

	this.reset = function() {
		count = 0;
		status = scrollerStasuses.READY;
	};

	this.step = function() {
		logger.info( 'StepScroller status=' + status );

		if ( status == scrollerStasuses.FINISHED || status == scrollerStasuses.EXCEEDEDLIMIT || status == scrollerStasuses.STOPPED ) {
			logger.info( 'StepScroller returning due to status=' + status + ', count=' + count );
			return;
		}

		status = scrollerStasuses.RUNNING;
		count++;

		var scrollDistance = heightMultiplier * document.documentElement.clientHeight;

		window.scrollBy( { top: scrollDistance, left: 0, behavior: 'smooth' } );

		//var total = document.documentElement.clientHeight + document.documentElement.scrollTop;
		//var height = document.body.offsetHeight;

		var total = window.innerHeight + window.pageYOffset;
		var height = document.body.scrollHeight;

		if ( total >= height ) {
			logger.info( 'StepScroller returning because offsetHeight ' + total + ' > ' + height );
			status = scrollerStasuses.FINISHED;
			return;
		}

		if ( count >= numTimesToScroll ) {
			logger.info( 'StepScroller returning because count ' + count + ' > ' + numTimesToScroll );
			status = scrollerStasuses.EXCEEDEDLIMIT;
			return;
		}
	};
};
