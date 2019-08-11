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
	'src/main/js/com/tolstoy/basic/app/utils/TextareaLogger.js',
	'src/main/js/com/tolstoy/basic/app/utils/NumericPhrase.js',
	'src/main/js/com/tolstoy/basic/app/utils/Utils.js',
	'src/main/js/com/tolstoy/basic/app/tweet/TweetAuthor.js',
	'src/main/js/com/tolstoy/basic/app/tweet/Tweet.js',
	'src/main/js/com/tolstoy/basic/app/tweet/TweetFactory.js',
	'src/main/js/com/tolstoy/basic/app/main/StandardTweetParserFunctions.js',
	'src/main/js/com/tolstoy/basic/app/main/ParseTweets.js',
	'src/main/js/com/tolstoy/basic/app/main/Main.js',
];

$buildGreaseMonkey = FALSE;
if ( !empty( $argv[ 1 ] ) && strtolower( $argv[ 1 ] ) == 'gm' ) {
	$buildGreaseMonkey = TRUE;
}

if ( $buildGreaseMonkey ) {
	catFile( 'greasemonkey.header' );
	echo "\n";
}

catFile( 'license.header', FALSE );

foreach ( $files as $file ) {
	catFile( $file );
}

if ( $buildGreaseMonkey ) {
	catFile( 'greasemonkey.footer' );
}
