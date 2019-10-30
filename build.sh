#!/usr/bin/php
<?php

function catFile( $name, $skipFirstComment = TRUE ) {
	$fp = @fopen( $name, 'r' );
	if ( !$fp ) {
		throw new Exception( 'Bad file: ' . $name );
	}

	$beginOutput = FALSE;

	while ( !feof( $fp ) ) {
		$line = fgets( $fp );

		if ( $skipFirstComment && !$beginOutput && strpos( $line, '*/' ) !== FALSE ) {
			$beginOutput = TRUE;
			continue;
		}

		if ( !$skipFirstComment || $beginOutput ) {
			echo $line;
		}
	}

	fclose( $fp );
}

$files = [
	'src/main/js/com/tolstoy/basic/app/starter.js',
	'src/main/js/com/tolstoy/basic/app/utils/DebugLevel.js',
	'src/main/js/com/tolstoy/basic/app/utils/ConsoleLogger.js',
	'src/main/js/com/tolstoy/basic/app/utils/TextareaLogger.js',
	'src/main/js/com/tolstoy/basic/app/utils/NumericPhrase.js',
	'src/main/js/com/tolstoy/basic/app/utils/Utils.js',
	'src/main/js/com/tolstoy/basic/app/tweet/TweetSupposedQuality.js',
	'src/main/js/com/tolstoy/basic/app/tweet/TweetLink.js',
	'src/main/js/com/tolstoy/basic/app/tweet/TweetUser.js',
	'src/main/js/com/tolstoy/basic/app/tweet/Tweet.js',
	'src/main/js/com/tolstoy/basic/app/tweet/TweetCollection.js',
	'src/main/js/com/tolstoy/basic/app/tweet/TweetFactory.js',
	'src/main/js/com/tolstoy/basic/app/scroller/ScrollerStatus.js',
	'src/main/js/com/tolstoy/basic/app/scroller/IntervalScroller.js',
	'src/main/js/com/tolstoy/basic/app/scroller/StepScroller.js',
	'src/main/js/com/tolstoy/basic/app/scroller/ScrollerFactory.js',
	'src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Debug.js',
	'src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/AuthorAvatar.js',
	'src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/AuthorNames.js',
	'src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Date1.js',
	'src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Date2.js',
	'src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Tweetid1.js',
	'src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Tweetid2.js',
	'src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Tweettext1.js',
	'src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Interaction1.js',
	'src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Interaction2.js',
	'src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Permalink1.js',
	'src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Permalink2.js',
	'src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Photo1.js',
	'src/main/js/com/tolstoy/basic/app/tweetparser/html/ParsedTweetFactory.js',
	'src/main/js/com/tolstoy/basic/app/tweetparser/json/helper/InstructionAddEntriesHelper.js',
	'src/main/js/com/tolstoy/basic/app/tweetparser/json/helper/InstructionTerminateTimelineHelper.js',
	'src/main/js/com/tolstoy/basic/app/tweetparser/json/helper/TweetHelper.js',
	'src/main/js/com/tolstoy/basic/app/tweetparser/json/helper/UserHelper.js',
	'src/main/js/com/tolstoy/basic/app/tweetparser/json/ParsedJSONFactory.js',
	'src/main/js/com/tolstoy/basic/app/retriever/StateStatus.js',
	'src/main/js/com/tolstoy/basic/app/retriever/StateCheckLoggedIn.js',
	'src/main/js/com/tolstoy/basic/app/retriever/StateWaitForTweetSelector.js',
	'src/main/js/com/tolstoy/basic/app/retriever/StateFindUncensoredTweets.js',
	'src/main/js/com/tolstoy/basic/app/retriever/StateClickShowHiddenReplies.js',
	'src/main/js/com/tolstoy/basic/app/retriever/StateFindCensoredTweets.js',
	'src/main/js/com/tolstoy/basic/app/retriever/StateClickShowHiddenReplies2.js',
	'src/main/js/com/tolstoy/basic/app/retriever/StateFindCensoredTweets2.js',
	'src/main/js/com/tolstoy/basic/app/retriever/TimelineRunner.js',
	'src/main/js/com/tolstoy/basic/app/retriever/ReplyPageRunner.js',
	'src/main/js/com/tolstoy/basic/app/retriever/Starter.js',
	'src/main/js/com/tolstoy/basic/app/jsonparser/InterchangeHelper.js',
	'src/main/js/com/tolstoy/basic/app/jsonparser/Starter.js',
];

$style = '';
if ( !empty( $argv[ 1 ] ) && strtolower( $argv[ 1 ] ) == 'gm' ) {
	$style = 'gm';
}

if ( $style == 'gm' ) {
	catFile( 'greasemonkey.header' );
	echo "\n";
}

catFile( 'license.header', FALSE );

foreach ( $files as $file ) {
	catFile( $file );
}

if ( $style == 'gm' ) {
	catFile( 'greasemonkey.footer' );
}
