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

com.tolstoy.basic.app.tweetparser.html.helper.Photo1 = function( $, $elem, tweetFactory, utils, logger ) {
	var valid = false, photoLink = '', photoImage = '';

	this.isValid = function() {
		return valid;
	};

	this.getPhotoLink = function() {
		return photoLink;
	};

	this.getPhotoImage = function() {
		return photoImage;
	};

	$( 'div > div > a', $elem ).each( function() {
		var $t = $(this);
		var $par = $t.parent();
		var link = tweetFactory.makeTweetLink( { source: $t.attr( 'href' ) } );

		if ( link && link.isPhotoLink() ) {
			$( 'div > div > div > div > img', $par ).each( function () {
				var style = $(this).prev().attr( 'style' );
				var src = $(this).attr( 'src' );
				if ( src && style && style.indexOf( 'background-image' ) > -1 ) {
					photoLink = link.getSource();
					photoImage = src;
					valid = true;
					return false;
				}
			});
		}

		if ( valid ) {
			return false;
		}
	});
};
