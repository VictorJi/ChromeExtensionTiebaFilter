$(document).ready(function(){
	console.debug("send for settings");

	chrome.runtime.sendMessage({type: "forSettings", msg: "forSettings"}, function(response) {
  		console.log("response is " + response.settings);
  		var thisSettings = response.settings;

  		for (var i in thisSettings) {
			console.debug("i is " + i + " and ele is " + thisSettings[i]);
			manageModules(i, thisSettings[i]);
		}
	});
});

function manageModules(id, setting) {
	var module = getModule(id);

	if (setting == "true") {
    	$(module).hide();
	} else {
		$(module).show();
	}
}

function getModule(type) {
	if (type == "filterAdds") {
		return ".game_spread_thread";
	} else if (type == "filterSign") {
		return ".j_user_sign";
	} else if (type == "filterUserIcon") {
		return ".icon";
	} else if (type == "filterLZLUserIcon") {
		return ".lzl_p_p";
	} else if (type == "filterPostPicture") {
		return ".p_content img";
	} else if (type == "filterRightSection") {
		return ".right_section";
	} else if (type == "filterGameRank") {
		return "#game_rank";
	} else if (type == "filterSignMode") {
		return ".sign_mod_bright";
	} else if (type == "filterBarRank") {
		return "#balv_mod";
	} else if (type == "filterPlayedGame") {
		return ".hgame_mod_theme1";
	} else {
		return null;
	}
}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

	var data = "fail";

	if (msg.type == "forType" && msg.msg != null && $(msg.msg) != null) {
  		manageModules(msg.msg, msg.action);
    	data = "success";
	}

	sendResponse({  
	    data: data
	});
});  