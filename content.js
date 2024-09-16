chrome.storage.local.get('videoSpeed', function (items) {
	updateVideoSpeed(items.videoSpeed);
	chrome.storage.local.remove('videoSpeed');
});
function updateVideoSpeed(speed) {
	if (document.querySelector('video') != null) {
		document.querySelector('video').playbackRate = speed;
	}
}