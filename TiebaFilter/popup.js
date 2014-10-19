var BG = chrome.extension.getBackgroundPage();

var PGSettings;

var tiebaTabs = new Array();

var queryActive = new Object();

$(document).ready(function() {

	PGSettings = BG.createSettings();

	console.debug("PGSettings is " + PGSettings);

	for (var i in PGSettings) {
		console.debug("i is " + i + " and ele is " + PGSettings[i]);
		setFilterLabel(i, PGSettings[i]);
	}

	getTiebaTabs();

	$(".taskItem").bind("click", filterClick);
});

function filterClick(e) {

	var buttonId = $(e.currentTarget).attr("id");

	var act = hideOrShow(buttonId);

	changeFilterLabel(buttonId);

	if (tiebaTabs.length > 0) {
		for (var i in tiebaTabs) {
			chrome.tabs.sendMessage(tiebaTabs[i].id, {type: "forType", msg: buttonId, action: act}, function(response) {
				if (response.data == "success") {
					console.log("屏蔽成功");	
				} else {
					console.log("屏蔽失败");
				}
		    });
		}
	}
}

function changeFilterLabel(msg) {
	var nowStatus;
	if (PGSettings[msg] == "false") {
		nowStatus = "true";
	} else {
		nowStatus = "false";
	}

	PGSettings[msg] = nowStatus;

	setFilterLabel(msg, PGSettings[msg]);

	var json = $.toJSON(PGSettings);
	localStorage.setItem("settings", json);
	BG.createSettings();
}

function hideOrShow(msg) {
	var re;
	if (PGSettings[msg] == "false") {
		re = "true";
	} else {
		re = "false";
	}
	return re;
}

function setFilterLabel(id, setting) {
	if (setting == "true") {
    	$("#" + id).attr("style","color:red;");
    	$("label", $("#" + id)).attr("class", "on");
	} else {
		$("#" + id).attr("style","color:black;");
		$("label", $("#" + id)).attr("class", "off");
	}
}

function getTiebaTabs() {
	chrome.tabs.query(queryActive, function(tabs) {
		console.log("here " + tabs.length);
		if (tabs.length > 0) {
			for (var index in tabs) {
				if(tabs[index].url.indexOf("tieba.baidu.com/p/") > 0) {
					tiebaTabs.push(tabs[index]);
					console.log(index + " id is " + tabs[index].id);
				}
			}

			console.debug("到这里了");
		}
	});
}






