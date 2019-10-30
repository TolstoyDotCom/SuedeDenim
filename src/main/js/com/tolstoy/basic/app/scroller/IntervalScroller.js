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

com.tolstoy.basic.app.scroller.IntervalScroller = function( $, pageType, url, heightMultiplier, numTimesToScroll, delay, scrollCallback, finishedCallback, utils, logger ) {
	var scrollerStasuses = com.tolstoy.basic.app.scroller.ScrollerStatus;

	heightMultiplier = heightMultiplier || 1;
	numTimesToScroll = numTimesToScroll || 20;
	delay = delay || 1000;

	var scrollDistance = heightMultiplier * document.documentElement.clientHeight;
	var count = 0;
	var status = scrollerStasuses.READY;

	this.validate = function() {
		if ( !numTimesToScroll || numTimesToScroll < 1 ) {
			throw new Error( 'bad numTimesToScroll' );
		}

		if ( !heightMultiplier || heightMultiplier < 0.01 ) {
			throw new Error( 'bad heightMultiplier' );
		}

		if ( !delay || delay < 1 ) {
			throw new Error( 'bad delay' );
		}

		if ( typeof scrollCallback !== 'function' ) {
			throw new Error( 'bad scrollCallback' );
		}

		if ( typeof finishedCallback !== 'function' ) {
			throw new Error( 'bad finishedCallback' );
		}
	};

	this.validate();

	this.getStatus = function() {
		return status;
	};

	this.start = function() {
		var scroller = window.setInterval( function() {
			if ( status == scrollerStasuses.FINISHED ) {
				return;
			}

			status = scrollerStasuses.RUNNING;

			window.scrollBy( { top: scrollDistance, left: 0, behavior: 'smooth' } );
			scrollCallback();
			count++;

			var total = document.documentElement.clientHeight + document.documentElement.scrollTop;

			if ( count >= numTimesToScroll || total >= document.body.offsetHeight ) {
				status = scrollerStasuses.FINISHED;
				window.clearInterval( scroller );
				finishedCallback();
			}
		}, delay );
	};
};
