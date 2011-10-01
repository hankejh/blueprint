
/*!
 *
 *
 * Logger
 *
 *
 */

module.exports = function logger(request, response) {
	require("colors");
	function logPretty(text) {
		console.log("[BLUEPRINT] ".green + "> " + text);
	};
	var address = request.socket + request.socket.remoteAddress;
	var date = new Date()).toUTCString();
	var text = prettifyLogger(data + ":" + address);
	logPretty(text);
};