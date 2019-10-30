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

com.tolstoy.basic.app.tweetparser.html.helper.Tweettext1 = function( $, $elem, tweetFactory, utils, logger ) {
	var valid = false, text = '', lang = '', html = '';

	this.isValid = function() {
		return valid;
	};

	this.getTweettext = function() {
		return text;
	};

	this.getTweetHTML = function() {
		return html;
	};

	this.getLang = function() {
		return lang;
	};

	$( 'div > div > span', $elem ).each( function() {
		var $t = $(this);
		var $par = $t.parent();
		lang = $par.attr( 'lang' );
		text = $par.text();
		html = $par.html();
		if ( lang && text ) {
			valid = true;
			return false;
		}
		else {
			lang = text = html = '';
		}
	});
};

