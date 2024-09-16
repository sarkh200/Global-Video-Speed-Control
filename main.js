function changeActiveTabSpeed(speed) {
	let filters = {};

	if (allTabs == false) {
		filters.active = true;
	}
	if (allWindows == false) {
		filters.currentWindow = true;
	}

	chrome.tabs.query(filters, function (tabs) {
		tabs.forEach(tab => {
			console.log(tab.url);
			var activeTab = tab;
			var activeTabId = activeTab.id;
			if (!activeTab.url?.startsWith("chrome://")) {
				chrome.storage.local.set({
					videoSpeed: speed
				}, function () {
					chrome.scripting.executeScript({
						target: { tabId: activeTabId },
						files: ["content.js"],
					});
				});
			}
		});
	});
}

let videoSpeed = 1;
let allTabs = false;
let allWindows = false;

window.onload = function () {
	document.getElementById("applyButton").onclick = function () {
		changeActiveTabSpeed(videoSpeed);
	};
	document.getElementById("resetButton").onclick = function () {
		let _allTabs = allTabs;
		let _allWindows = allWindows;
		changeActiveTabSpeed(1);
		allTabs = _allTabs;
		allWindows = _allWindows;
	};
	document.getElementById("speedInput").onchange = function () {
		let speed = document.getElementById("speedInput").value;
		videoSpeed = speed;
	};
	document.getElementById("allTabs").onchange = function () {
		allTabs = !allTabs;
	}
	document.getElementById("allWindows").onchange = function () {
		allWindows = !allWindows;
	}
}