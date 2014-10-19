var BGSettings;

function createSettings() {
	var mySetting = localStorage.getItem("settings");
	console.debug("BG mySetting is " + mySetting);

	if (mySetting == null) {
		var settings = {
			"filterAdds" : "false",
			"filterSign" : "false",
			"filterUserIcon" : "false",
			"filterLZLUserIcon" : "false",
			"filterPostPicture" : "false",
			"filterRightSection" : "false",
			"filterGameRank" : "false",
			"filterSignMode" : "false",
			"filterBarRank" : "false",
			"filterPlayedGame" : "false"
		};

		BGSettings = settings;

		var json = $.toJSON(settings);

		localStorage.setItem("settings", json);

		console.debug("BG now mySetting is " + localStorage.getItem("settings"));
	} else {
		BGSettings = $.parseJSON(mySetting);
		console.debug("aaa is " + mySetting);
	}

	return BGSettings;
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (tab.url.indexOf("tieba.baidu.com/p/") > 0) {
		chrome.pageAction.show(tab.id);
	} else {
		chrome.pageAction.hide(tab.id);
	}
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	console.debug("msg is " + msg.type);

	if (msg.type == "forSettings") {
		console.debug("BGSettings is " + BGSettings);

		if (BGSettings == null) {
			var set = createSettings();
		}

		sendResponse({
			settings: BGSettings
		});
	}
});