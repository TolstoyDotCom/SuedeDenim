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

com.tolstoy.basic.app.jsonparser.InterchangeHelper = function( input, utils, logger ) {
	var results = [];

	function addSupposedQualities() {
		var tweetidToSupposedQualities = {
			map_type: 'tweetid_to_supposed_qualities'
		};

		if ( input.instructions ) {
			for ( var i = 0; i < input.instructions.length; i++ ) {
				var instruction = input.instructions[ i ];

				if ( instruction.type == 'AddEntries' && instruction.timelineItems ) {
					for ( var j = 0; j < instruction.timelineItems.length; j++ ) {
						var timelineItem = instruction.timelineItems[ j ];

						if ( timelineItem.tweetID && timelineItem.conversationSection ) {
							tweetidToSupposedQualities[ '' + timelineItem.tweetID ] = '' + timelineItem.conversationSection;
						}
					}
				}
			}
		}

		results.push( tweetidToSupposedQualities );
	}

	function addTweets() {
		if ( input.tweets ) {
			for ( var i = 0; i < input.tweets.length; i++ ) {
				var map = input.tweets[ i ].export();
				logger.info( 'InterchangeHelper: exporting tweet ' + input.tweets[ i ].toDebugString( '' ) );
				map = utils.ensureMapIsStringString( map );
				map[ 'map_type' ] = 'tweet';
				results.push( map );
			}
		}
	}

	function addUsers() {
		if ( input.users ) {
			for ( var i = 0; i < input.users.length; i++ ) {
				var map = input.users[ i ].export();
				logger.info( 'InterchangeHelper: exporting user ' + input.users[ i ].toDebugString( '' ) );
				map = utils.ensureMapIsStringString( map );
				map[ 'map_type' ] = 'user';
				results.push( map );
			}
		}
	}

	addSupposedQualities();
	addTweets();
	addUsers();

	this.getResults = function() {
		return results;
	};
};
