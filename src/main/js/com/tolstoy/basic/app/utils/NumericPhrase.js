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

com.tolstoy.basic.app.utils.NumericPhrase = function( text ) {
	var self = this;

	this.text = text || '';
	this.components = text.split( /\s+/ );
	this.numbers = [];
	this.words = [];

	for ( var i = 0; i < this.components.length; i++ ) {
		var item = this.components[ i ];
		item = item.trim();
		if ( !item ) {
			continue;
		}

		var num = parseInt( item );

		if ( !isNaN( num ) ) {
			this.numbers.push( '' + num );
		}
		else {
			this.words.push( item.toLowerCase() );
		}
	}

	this.countWords = function() {
		return this.words.length;
	}

	this.countNumbers = function() {
		return this.numbers.length;
	}

	this.getWord = function( which ) {
		return this.words[ which ];
	}

	this.getNumber = function( which ) {
		return this.numbers[ which ];
	}

	this.containsWord = function( word ) {
		if ( !word || !this.countWords() ) {
			return false;
		}

		var wordLC = word.toLowerCase();

		for ( var i = 0; i < this.words.length; i++ ) {
			if ( this.words[ i ].indexOf( word ) > -1 ) {
				return true;
			}
		}

		return false;
	}
}
