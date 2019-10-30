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

com.tolstoy.basic.app.tweetparser.json.helper.UserHelper = function( $, tweetFactory, utils, logger ) {
	var descriptors = [
		{ targetKey: 'id', sourceKey: 'id_str', defaultValue: '' },
		{ targetKey: 'handle', sourceKey: 'screen_name', defaultValue: '' },
		{ targetKey: 'displayName', sourceKey: 'name', defaultValue: '' },
		{ targetKey: 'avatarURL', sourceKey: 'profile_image_url_https', defaultValue: '' },
		{ targetKey: 'verifiedStatus', sourceKey: 'verified', defaultValue: '' },
		{ targetKey: 'numTotalTweets', sourceKey: 'statuses_count', defaultValue: '' },
		{ targetKey: 'numFollowers', sourceKey: 'followers_count', defaultValue: '' },
		{ targetKey: 'numFollowing', sourceKey: 'friends_count', defaultValue: '' }
	];

	this.makeUser = function( json, errorCallback ) {
		var input = {};

		utils.importDataUsingDescriptors( input, json, descriptors );

		input.verifiedStatus = input.verifiedStatus ? 'VERIFIED' : 'UNKNOWN';

		var user = tweetFactory.makeUser( input );

		return user;
	};
};
