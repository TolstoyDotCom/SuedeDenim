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

com.tolstoy.basic.app.tweetparser.json.helper.TweetHelper = function( $, tweetFactory, utils, logger ) {
	var descriptors = [
		{ targetKey: 'tweetid', sourceKey: 'id_str', defaultValue: '0' },
		{ targetKey: 'userid', sourceKey: 'user_id_str', defaultValue: '0' },

		{ targetKey: 'datestring', sourceKey: 'created_at', defaultValue: '' },
		{ targetKey: 'tweettext', sourceKey: 'full_text', defaultValue: '' },
		{ targetKey: 'tweetlanguage', sourceKey: 'lang', defaultValue: 'en' },

		{ targetKey: 'isreplyto', sourceKey: 'in_reply_to_status_id_str', defaultValue: '' },
		{ targetKey: 'repliedtohandle', sourceKey: 'in_reply_to_screen_name', defaultValue: '' },
		{ targetKey: 'repliedtouserid', sourceKey: 'in_reply_to_user_id_str', defaultValue: '' },

		{ targetKey: 'favoritecount', sourceKey: 'favorite_count', defaultValue: '0' },
		{ targetKey: 'replycount', sourceKey: 'reply_count', defaultValue: '0' },
		{ targetKey: 'retweetcount', sourceKey: 'retweet_count', defaultValue: '0' },

		{ targetKey: 'conversationid', sourceKey: 'conversation_id_str', defaultValue: '' },

		{
			targetKey: 'tweetmentions',
			sourceKey: 'tweetmentions',
			defaultValue: '',
			importer: function( target, source ) {
				var mentions = [];
				if ( source.entities && source.entities.user_mentions ) {
					$.each( source.entities && source.entities.user_mentions, function() {
						if ( this.screen_name ) {
							mentions.push( this.screen_name );
						}
					});
				}
				target[ 'tweetmentions' ] = mentions.join( ',' );
			}
		},
		{
			targetKey: 'tweetphoto_link',
			sourceKey: 'tweetphoto_link',
			defaultValue: '',
			importer: function( target, source ) {
				if ( source.entities && source.entities.media && source.entities.media.expanded_url ) {
					target[ 'tweetphoto_link' ] = source.entities.media.expanded_url;
				}
				else {
					target[ 'tweetphoto_link' ] = '';
				}
			}
		},
		{
			targetKey: 'tweetphoto_image',
			sourceKey: 'tweetphoto_image',
			defaultValue: '',
			importer: function( target, source ) {
				if ( source.entities && source.entities.media && ( source.entities.media.media_url_https || source.entities.media.media_url ) ) {
					target[ 'tweetphoto_image' ] = source.entities.media.media_url_https || source.entities.media.media_url;
				}
				else {
					target[ 'tweetphoto_image' ] = '';
				}
			}
		},
		{
			targetKey: 'videothumburl',
			sourceKey: 'videothumburl',
			defaultValue: '',
			importer: function( target, source ) {
				if ( source.extended_entities &&
						source.extended_entities.media &&
						( source.extended_entities.media.media_url_https || source.extended_entities.media.media_url ) &&
						source.extended_entities.media.video_info  ) {
					target[ 'videothumburl' ] = source.extended_entities.media.media_url_https || source.extended_entities.media.media_url;
				}
				else {
					target[ 'videothumburl' ] = '';
				}
			}
		},
		{
			targetKey: 'time',
			sourceKey: 'time',
			defaultValue: '0',
			importer: function( target, source ) {
				target[ 'time' ] = source.created_at ? Date.parse( source.created_at ) : 0;
				if ( isNaN( target[ 'time' ] ) ) {
					target[ 'time' ] = 0;
				}

				target[ 'time' ] /= 1000;	//	'time' is in seconds since Unix epoch
			}
		},
		{
			targetKey: 'hascards',
			sourceKey: 'hascards',
			defaultValue: '0',
			importer: function( target, source ) {
				target[ 'hascards' ] = source.card ? '1' : '0';
			}
		}
	];

/*	NOT AVAILABLE AT THIS STAGE:
		{ targetKey: 'avatarURL', sourceKey: 'avatarURL', defaultValue: '' },
		{ targetKey: 'componentcontext', sourceKey: 'componentcontext', defaultValue: '' },
		{ targetKey: 'disclosuretype', sourceKey: 'disclosuretype', defaultValue: '' },
		{ targetKey: 'followsyou', sourceKey: 'followsyou', defaultValue: '' },
		{ targetKey: 'fullname', sourceKey: 'fullname', defaultValue: '' },
		{ targetKey: 'hasparenttweet', sourceKey: 'hasparenttweet', defaultValue: '' },
		{ targetKey: 'innertweetid', sourceKey: 'innertweetid', defaultValue: '' },
		{ targetKey: 'innertweetrawhref', sourceKey: 'innertweetrawhref', defaultValue: '' },
		{ targetKey: 'is_pinned', sourceKey: 'is_pinned', defaultValue: '' },
		{ targetKey: 'is_toptweet', sourceKey: 'is_toptweet', defaultValue: '' },
		{ targetKey: 'itemid', sourceKey: 'itemid', defaultValue: '' },
		{ targetKey: 'name', sourceKey: 'name', defaultValue: '' },
		{ targetKey: 'permalinkpath', sourceKey: 'permalinkpath', defaultValue: '' },
		{ targetKey: 'photourl', sourceKey: 'photourl', defaultValue: '' },
		{ targetKey: 'quality', sourceKey: 'quality', defaultValue: 'unknown_quality' },
		{ targetKey: 'replytousersjson', sourceKey: 'replytousersjson', defaultValue: '' },
		{ targetKey: 'retweetid', sourceKey: 'retweetid', defaultValue: '0' },
		{ targetKey: 'screenname', sourceKey: 'screenname', defaultValue: '' },
		{ targetKey: 'suggestionjson', sourceKey: 'suggestionjson', defaultValue: '' },
		{ targetKey: 'tweetclasses', sourceKey: 'tweetclasses', defaultValue: '' },
		{ targetKey: 'tweethtml', sourceKey: 'tweethtml', defaultValue: '' },
		{ targetKey: 'tweetnonce', sourceKey: 'tweetnonce', defaultValue: '' },
		{ targetKey: 'tweetstatinitialized', sourceKey: 'tweetstatinitialized', defaultValue: '' },
		{ targetKey: 'username', sourceKey: 'username', defaultValue: '' },
		{ targetKey: 'verifiedText', sourceKey: 'verifiedText', defaultValue: '' },
		{ targetKey: 'youblock', sourceKey: 'youblock', defaultValue: '' },
		{ targetKey: 'youfollow', sourceKey: 'youfollow', defaultValue: '' },
*/

	this.makeTweet = function( json, errorCallback ) {
		var input = {};

		utils.importDataUsingDescriptors( input, json, descriptors );

		return tweetFactory.makeTweet( input );
	};
};
