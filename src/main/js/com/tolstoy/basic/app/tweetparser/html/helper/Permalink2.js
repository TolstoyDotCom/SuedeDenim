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

com.tolstoy.basic.app.tweetparser.html.helper.Permalink2 = function( $, $elem, tweetFactory, utils, logger ) {
	var valid = false, permalink = '';

	this.isValid = function() {
		return valid;
	};

	this.getPermalink = function() {
		return permalink;
	};

	$( 'div > div > a[role="link"]', $elem ).each( function() {
		var $t = $(this);
		var link = tweetFactory.makeTweetLink( { source: $t.attr( 'href' ) } );

		if ( link.isStatusLink() || link.isRetweetLink() || link.isLikeLink() || link.isReplyLink() ) {
			permalink = link.getStatusLink();
			return false;
		}
	});

	valid = !!permalink;
};
