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

com.tolstoy.basic.app.utils.TextareaLogger = function() {
	this.init = function() {
		var textarea = $( '<textarea/>' )
		.attr({
			rows: 5,
			cols: 120,
			id:'suededenim_output'
		});

		var div = $( '<div/>' )
		.css({
			width: '100%',
			height: '5rem',
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: 1000
		})
		.attr({
			id: 'suededenim'
		});

		div.append( textarea );

		$( 'body' ).prepend( div );
	};

	this.log = function( output ) {
		if ( !$( '#suededenim_output' ).length ) {
			this.init();
		}

		$( '#suededenim_output' ).text( '' + output );
	};
};
