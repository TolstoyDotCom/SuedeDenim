SuedeDenim parses tweets from "New Twitter" aka "NewTwitter", the version that was released in mid-2019.

This code, after refinements, will be rolled into the
[More Speech anti-censorship application](https://github.com/TolstoyDotCom/more-speech).
(See [this issue](https://github.com/TolstoyDotCom/more-speech/issues/2)).

Greasemonkey Usage
------
Download the latest greasemonkey release, install it into Firefox, and visit someone's timeline
while logged in. A textarea should appear at the top with the tweets that were found. To see
more tweets, slowly scroll down the page.

Note: you have to be logged-in for this to work; logged-out users see the previous HTML with
many more semantic clues.

Raw Usage
------
Log in to Twitter and visit someone's profile page. Go into dev tools/Firebug or similar and copy
the whole, processed HTML into a file. In that file, comment out all the Javascript includes (to prevent the page
attempting to redirect). At the end of the file, put this:

```javascript
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/starter.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/utils/DebugLevel.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/utils/ConsoleLogger.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/utils/TextareaLogger.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/utils/NumericPhrase.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/utils/Utils.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweet/TweetSupposedQuality.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweet/TweetLink.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweet/TweetUser.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweet/Tweet.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweet/TweetCollection.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweet/TweetFactory.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/scroller/ScrollerStatus.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/scroller/IntervalScroller.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/scroller/StepScroller.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/scroller/ScrollerFactory.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Debug.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/AuthorAvatar.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/AuthorNames.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Date1.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Date2.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Tweetid1.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Tweetid2.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Tweettext1.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Interaction1.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Interaction2.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Permalink1.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Permalink2.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweetparser/html/helper/Photo1.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweetparser/html/ParsedTweetFactory.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweetparser/json/helper/InstructionAddEntriesHelper.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweetparser/json/helper/InstructionTerminateTimelineHelper.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweetparser/json/helper/TweetHelper.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweetparser/json/helper/UserHelper.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweetparser/json/ParsedJSONFactory.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/retriever/StateStatus.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/retriever/StateCheckLoggedIn.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/retriever/StateWaitForTweetSelector.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/retriever/StateFindUncensoredTweets.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/retriever/StateClickShowHiddenReplies.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/retriever/StateFindCensoredTweets.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/retriever/StateClickShowHiddenReplies2.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/retriever/StateFindCensoredTweets2.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/retriever/TimelineRunner.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/retriever/ReplyPageRunner.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/retriever/Starter.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/jsonparser/InterchangeHelper.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/jsonparser/Starter.js"></script>

<script>
	$(document).ready(function() {
		var jsParams = {
			url: 'url',
			pageType: 'timeline',
			debugLevel: 2,

			mainClockDelay: '1500',

			tweetSelector: 'main article',

			scrollerNumTimesToScroll: '100',
			scrollerHeightMultiplier: '0.25',

			checkLoggedInDelay: '5',

			maxWaitForTweetSelector: '30',

			hiddenRepliesAfterClickIterations: '2',
			hiddenRepliesAttemptIterations: '10'
		};

		new com.tolstoy.basic.app.retriever.Starter( jsParams, function( data ) {
			console.log( data );
		});
	});
</script>
```

If you load that page in the browser, you should see a list of tweets in the browser console.


Building
------
To build the Greasemonkey version, open a terminal in the root of the project and:

```bash
mkdir dist
./build.sh gm > dist/suededenim.user.js
```
To build a non-Greasemonkey all-in-one file, omit 'gm'.
