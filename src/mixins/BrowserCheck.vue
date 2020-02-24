<script>
export default {
	name: 'browser-check',
	computed: {
		isInternetExplorer() {
			var ua = window.navigator.userAgent;

			var msie = ua.indexOf('MSIE ');
			if (msie > 0) {
				// IE 10 or older => return version number
				return true; //parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
			}

			var trident = ua.indexOf('Trident/');
			if (trident > 0) {
				// IE 11 => return version number
				var rv = ua.indexOf('rv:');
				return true; //parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
			}


			//to check if edge
			// var edge = ua.indexOf('Edge/');
			// if (edge > 0) {
			// 	// Edge => return version number
			// 	return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
			// }

			// other browser
			return false;
		}
	}
};
</script>