function changeActiveTabSpeed(speed) {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		var activeTab = tabs[0];
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
}

let videoSpeed = 1;

window.onload = function () {
	document.getElementById("applyButton").onclick = function () {
		console.log("Apply");
		changeActiveTabSpeed(videoSpeed);
	};
	document.getElementById("speedInput").onchange = function () {
		let speed = document.getElementById("speedInput").value;
		videoSpeed = speed;
		console.log(speed);
		console.log(videoSpeed);
	};
}