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

com.tolstoy.basic.app.tweetparser.html.helper.Interaction2 = function( $, $elem, tweetFactory, utils, logger ) {
	var valid = false, replyCount = '', retweetCount = '', likesCount = '';
	var repliesRegex = /(\d+) reply/gi;
	var retweetsRegex = /(\d+) retweet/gi;
	var likesRegex = /(\d+) like/gi;

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
		var label = $(this).attr( 'aria-label' );
		var ary;

		ary = repliesRegex.exec( label );
		if ( ary && ary.length > 1 ) {
			replyCount = ary[ 1 ].trim();
			valid = true;
		}

		ary = retweetsRegex.exec( label );
		if ( ary && ary.length > 1 ) {
			retweetCount = ary[ 1 ].trim();
			valid = true;
		}

		ary = likesRegex.exec( label );
		if ( ary && ary.length > 1 ) {
			likesCount = ary[ 1 ].trim();
			valid = true;
		}

		if ( valid ) {
			return false;
		}
		else {
			replyCount = retweetCount = likesCount = '';
		}
	});
};
