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
<script src="src/main/js/com/tolstoy/basic/app/utils/TextareaLogger.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/utils/NumericPhrase.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/utils/Utils.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweet/TweetAuthor.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweet/Tweet.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/tweet/TweetFactory.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/main/StandardTweetParserFunctions.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/main/ParseTweets.js"></script>
<script src="src/main/js/com/tolstoy/basic/app/main/Main.js"></script>

<script>
	$(document).ready(function() {
		new com.tolstoy.basic.app.main.Main();
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
