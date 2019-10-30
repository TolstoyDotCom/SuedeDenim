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

com.tolstoy.basic.app.tweetparser.json.ParsedJSONFactory = function( $, tweetFactory, utils, logger ) {
	var helpers = com.tolstoy.basic.app.tweetparser.json.helper;

	var tweetHelper = new helpers.TweetHelper( $, tweetFactory, utils, logger );
	var userHelper = new helpers.UserHelper( $, tweetFactory, utils, logger );
	var addEntriesHelper = new helpers.InstructionAddEntriesHelper( $, tweetFactory, utils, logger );
	var terminateTimelineHelper = new helpers.InstructionTerminateTimelineHelper( $, tweetFactory, utils, logger );

	this.parseJSON = function( json ) {
		var ret = {
			tweets: [],
			users: [],
			instructions: [],
			errors: []
		};

		function addError( msg ) {
			ret.errors.push( msg );
		}

		if ( json.JSON ) {
			json = json.JSON;
		}

		if ( json.globalObjects && json.globalObjects.tweets ) {
			$.each( json.globalObjects.tweets, function() {
				ret.tweets.push( tweetHelper.makeTweet( this, addError ) );
			});
		}

		if ( json.globalObjects && json.globalObjects.users ) {
			$.each( json.globalObjects.users, function() {
				ret.users.push( userHelper.makeUser( this, addError ) );
			});
		}

		if ( json.timeline && json.timeline.instructions ) {
			$.each( json.timeline.instructions, function() {
				if ( this.addEntries ) {
					ret.instructions.push( addEntriesHelper.makeInstructionAddEntries( this.addEntries, addError ) );
				}
				else if ( this.terminateTimeline ) {
					ret.instructions.push( terminateTimelineHelper.makeInstructionTerminateTimeline( this.terminateTimeline, addError ) );
				}
				else if ( this.clearEntriesUnreadState ) {
					//	ignore
				}
				else if ( this.markEntriesUnreadGreaterThanSortIndex ) {
					//	ignore
				}
				else {
					addError( 'ParsedJSONFactory: unknown instruction' );
				}
			});
		}

		return ret;
	};
};
