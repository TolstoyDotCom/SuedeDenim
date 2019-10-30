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

com.tolstoy.basic.app.tweetparser.json.helper.InstructionAddEntriesHelper = function( $, tweetFactory, utils, logger ) {
	this.makeInstructionAddEntries = function( json, errorCallback ) {
		var ret = {
			type: 'AddEntries',
			timelineItems: [],
			otherItems: []
		};

		if ( !json.entries ) {
			errorCallback( 'InstructionAddEntries: no json.entries' );
			return ret;
		}

		$.each( json.entries, function() {
			if ( !this.content ) {
				errorCallback( 'InstructionAddEntries: no content' );
				return true;
			}

			if ( this.content && this.content.operation && this.content.operation.cursor ) {
				errorCallback( 'InstructionAddEntries: CURSOR' );
				return true;
			}

			if ( !this.content.timelineModule || !this.content.timelineModule.items ) {
				errorCallback( 'InstructionAddEntries: no content.timelineModule.items' );
				return true;
			}

			$.each( this.content.timelineModule.items, function() {
				if ( !this.item ) {
					errorCallback( 'InstructionAddEntries: no item', this );
					return true;
				}

				if ( this.item.content && this.item.content.tweet && this.item.content.tweet.id ) {
					ret.timelineItems.push({
						tweetID: this.item.content.tweet.id,
						displayType: this.item.content.tweet.displayType,
						conversationSection: this.item.clientEventInfo.details.conversationDetails.conversationSection
					});
				}
				else if ( this.item.clientEventInfo &&
						this.item.clientEventInfo.details &&
						this.item.clientEventInfo.details.conversationDetails &&
						this.item.clientEventInfo.details.conversationDetails.conversationSection ) {
					ret.otherItems.push({
						section: this.item.clientEventInfo.details.conversationDetails.conversationSection
					});
				}
				else {
					errorCallback( 'InstructionAddEntries: not found', this );
					return true;
				}

			});
		});

		return ret;
	};
};
