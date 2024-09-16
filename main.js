function changeActiveTabSpeed(speed) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currTab = tabs[0];
        if (currTab) {
            chrome.scripting
                .executeScript({
                    target: { tabId: currTab.id },
                    files: ["content.js"],
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