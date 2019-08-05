SuedeDenim parses tweets from "New Twitter" aka "NewTwitter", the version that was released in mid-2019.

This code, after refinements, will be rolled into the
[More Speech anti-censorship application](https://github.com/TolstoyDotCom/more-speech).
(See [this issue](https://github.com/TolstoyDotCom/more-speech/issues/2)).

Usage
------
To test this out, log in to Twitter and visit someone's profile page. Go into dev tools/Firebug or similar and copy
the whole, processed HTML into a file. In that file, comment out all the Javascript includes (to prevent the page
attempting to redirect). At the end of the file, put this:

`
<script src="src/main/js/com/tolstoy/basic/app/starter.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/utils/NumericPhrase.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/utils/Utils.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweet/TweetAuthor.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweet/Tweet.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweet/TweetFactory.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/main/StandardTweetParserFunctions.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/main/ParseTweets.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/main/Main.js"></script>

<script>
	new com.tolstoy.basic.app.main.Main();
</script>
`

If you load that page in the browser, you should see a list of tweets in the browser console.

A Greasemonkey script will be released shortly.
