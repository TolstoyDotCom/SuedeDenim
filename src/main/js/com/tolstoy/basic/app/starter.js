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

(function ensureOurNamespace() {
	if (typeof window.com === 'undefined') {
		window.com = {};
	}

	if (typeof window.com.tolstoy === 'undefined') {
		window.com.tolstoy = {};
	}

	if (typeof window.com.tolstoy.external === 'undefined') {
		window.com.tolstoy.external = {};
	}

	if (typeof window.com.tolstoy.basic === 'undefined') {
		window.com.tolstoy.basic = {};
	}

	if (typeof window.com.tolstoy.basic.app === 'undefined') {
		window.com.tolstoy.basic.app = {};
	}

	if (typeof window.com.tolstoy.basic.app.main === 'undefined') {
		window.com.tolstoy.basic.app.main = {};
	}

	if (typeof window.com.tolstoy.basic.app.tweet === 'undefined') {
		window.com.tolstoy.basic.app.tweet = {};
	}

	if (typeof window.com.tolstoy.basic.app.utils === 'undefined') {
		window.com.tolstoy.basic.app.utils = {};
	}

	if (typeof window.com.tolstoy.basic.app.retriever === 'undefined') {
		window.com.tolstoy.basic.app.retriever = {};
	}

	if (typeof window.com.tolstoy.basic.app.scroller === 'undefined') {
		window.com.tolstoy.basic.app.scroller = {};
	}

	if (typeof window.com.tolstoy.basic.app.jsonparser === 'undefined') {
		window.com.tolstoy.basic.app.jsonparser = {};
	}

	if (typeof window.com.tolstoy.basic.app.tweetparser === 'undefined') {
		window.com.tolstoy.basic.app.tweetparser = {};
	}

	if (typeof window.com.tolstoy.basic.app.tweetparser.html === 'undefined') {
		window.com.tolstoy.basic.app.tweetparser.html = {};
	}

	if (typeof window.com.tolstoy.basic.app.tweetparser.json === 'undefined') {
		window.com.tolstoy.basic.app.tweetparser.json = {};
	}

	if (typeof window.com.tolstoy.basic.app.tweetparser.html.helper === 'undefined') {
		window.com.tolstoy.basic.app.tweetparser.html.helper = {};
	}

	if (typeof window.com.tolstoy.basic.app.tweetparser.json.helper === 'undefined') {
		window.com.tolstoy.basic.app.tweetparser.json.helper = {};
	}
})();
