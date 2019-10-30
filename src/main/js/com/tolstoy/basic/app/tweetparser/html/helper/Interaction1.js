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

com.tolstoy.basic.app.tweetparser.html.helper.Interaction1 = function( $, $elem, tweetFactory, utils, logger ) {
	var valid = false, replyCount = '', retweetCount = '', likesCount = '', regex = /(\d+) .*, (\d+) .*, (\d+) /g;

	this.isValid = function() {
		return valid;
	};

	this.getReplyCount = function() {
		return replyCount;
	};

	this.getRetweetCount = function() {
		return retweetCount;
	};

	this.getLikesCount = function() {
		return likesCount;
	};

	$( 'div[aria-label]', $elem ).each( function() {
		var ary = regex.exec( $(this).attr( 'aria-label' ) );
		if ( ary && ary.length > 2 ) {
			replyCount = ary[ 1 ].trim();
			retweetCount = ary[ 2 ].trim();
			likesCount = ary[ 3 ].trim();

			valid = true;

			return false;
		}
		else {
			replyCount = retweetCount = likesCount = '';
		}
	});
};
