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

com.tolstoy.basic.app.tweetparser.html.helper.Tweetid2 = function( $, $elem, tweetFactory, utils, logger ) {
	var valid = false, id = '';

	this.isValid = function() {
		return valid;
	};

	this.getID = function() {
		return id;
	};

	$('div > div > a', $elem).each( function() {
		var $t = $(this);
		var link = tweetFactory.makeTweetLink( { source: $t.attr( 'href' ) } );

		if ( link.isInteractionLink() ) {
			id = link.getTweetID();
			valid = true;

			return false;
		}
	});
};
