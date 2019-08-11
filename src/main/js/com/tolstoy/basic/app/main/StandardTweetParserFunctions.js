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

com.tolstoy.basic.app.main.StandardTweetParserFunctions = {
	findPinnedTweet: function( $container, tweet, utils ) {
		var text = utils.getTextContent( $container );

		if ( text == 'Pinned Tweet' ) {
			tweet.set( 'is_pinned', true );
		}
	},

	findHandle: function( $container, tweet, utils ) {
		var link = $container.find( '> a' );
		if ( link.length ) {
			var role = link.attr( 'role' );
			var href = link.attr( 'href' );
			var name = utils.extractTwitterHandle( href );
			if ( name && role == 'link' ) {
				tweet.get( 'author' ).set( 'name', name );
			}
		}
	},

	findHandle2: function( $container, tweet, utils ) {
		var link = $container.find( 'a' );
		if ( link.length ) {
			var role = link.attr( 'role' );
			var href = link.attr( 'href' );
			var name = utils.extractTwitterHandle( href );
			if ( !tweet.get( 'author' ).get( 'name' ) && name && href && href.charAt(0) == '/' && role == 'link' ) {
				tweet.get( 'author' ).set( 'name', name );
			}
		}
	},

	findProfileImage: function( $container, tweet, utils ) {
		$container.find( 'img' ).each( function() {
			var src = $(this).attr( 'src' );
			if ( src && src.indexOf( 'twimg' ) > -1 ) {
				tweet.get( 'author' ).set( 'avatarURL', src );
			}
		});
	},

	findDateLine: function( $container, tweet, utils ) {
		$container.find( 'a' ).each( function() {
			var $t = $(this);
			var $datetime = $t.find( 'time' );
			if ( $datetime.length > 0 ) {
				var datestring = $datetime.attr( 'datetime' );
				if ( datestring ) {
					var date = new Date( datestring );
					if ( !isNaN( date ) ) {
						tweet.set( 'datestring', datestring );
						tweet.set( 'time', date.getTime() );
					}
				}
			}

			var href = $t.attr( 'href' );
			var tweetid = utils.extractTweetIDFromURL( href );
			if ( tweetid ) {
				tweet.set( 'tweetid', tweetid );
			}
		});
	},

	findTweetText: function( $container, tweet, utils ) {
		if ( !tweet.get( 'tweettext' ) ) {
			$container.find( 'div > span' ).each( function() {
				var $t = $(this);
				var $par = $t.parent();
				var tweetlanguage = $par.attr( 'lang' );
				var tweettext = utils.getTextContent( $par );

				if ( tweetlanguage && tweettext ) {
					tweet.set( 'tweetlanguage', tweetlanguage );
					tweet.set( 'tweettext', tweettext );
				}
			});
		}
	},

	findInteractions: function( $container, tweet, utils ) {
		$container.find( '[role="button"]' ).each( function() {
			var $t = $(this);
			var testid = $t.attr( 'data-testid' );
			var aria = $t.attr( 'aria-label' );

			var numericPhrases = [];
			numericPhrases.push( utils.makeNumericPhrase( aria ) );
			numericPhrases.push( utils.makeNumericPhrase( $t.find( 'div div span span' ).text() ) );
			numericPhrases.push( utils.makeNumericPhrase( utils.getTextContent( $t ) ) );

			var favoritecount = utils.findInteraction( 'like', testid, numericPhrases );
			if ( favoritecount ) {
				tweet.set( 'favoritecount', favoritecount );
			}

			var retweetcount = utils.findInteraction( 'retweet', testid, numericPhrases );
			if ( retweetcount ) {
				tweet.set( 'retweetcount', retweetcount );
			}

			var replycount = utils.findInteraction( 'reply', testid, numericPhrases );
			if ( replycount ) {
				tweet.set( 'replycount', replycount );
			}
		});
	},

	getFunctions: function() {
		return {
			'findPinnedTweet': this.findPinnedTweet,
			'findHandle': this.findHandle,
			'findHandle2': this.findHandle2,
			'findProfileImage': this.findProfileImage,
			'findDateLine': this.findDateLine,
			'findTweetText': this.findTweetText,
			'findInteractions': this.findInteractions
		};
	}
};

