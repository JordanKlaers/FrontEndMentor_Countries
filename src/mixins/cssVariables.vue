<script>
export default {
	name: 'css-variables',
	data() {
		return {
			light: {},
			dark: {},
			active: [],
			inactive: []
		}
	},
	mounted() {
		const properties = this.getCSSCustomPropIndex();
		properties.forEach(variable => {
			if (variable[0].includes('--light-')) this.light[variable[0]] = variable[1];
			if (variable[0].includes('--dark-')) this.dark[variable[0]] = variable[1];
			if (variable[0].includes('--active-') && !this.active.includes(variable[0])) this.active.push(variable[0]);
			if (variable[0].includes('--inactive-') && !this.inactive.includes(variable[0])) this.inactive.push(variable[0]);
		});
		console.log(this.light);
		console.log(this.dark);
		console.log(this.active);
		console.log(this.inactive);
	},
    methods: {
        isSameDomain(styleSheet) {
			// Internal style blocks won't have an href value
			if (!styleSheet.href) {
				return true;
			}
			return styleSheet.href.indexOf(window.location.origin) === 0;
        },
        /**
         * Get all custom properties on a page
         * @return array<array[string, string]>
         * ex; [["--color-accent", "#b9f500"], ["--color-text", "#252525"], ...]
         */
        getCSSCustomPropIndex() {
			// styleSheets is array-like, so we convert it to an array.
			// Filter out any stylesheets not on this domain
			const that = this;
			console.log('this or that: ', this, that)
			return [...document.styleSheets].filter(that.isSameDomain).reduce((finalArr, sheet) =>
				finalArr.concat(
					// cssRules is array-like, so we convert it to an array
					[...sheet.cssRules].reduce((propValArr, rule) => {
						//if the rule doesnt have style, it wont have the css variable
						if (!rule.style) return propValArr;
						const props = [...rule.style].map((propName) => [
							propName.trim(),
							rule.style.getPropertyValue(propName).trim()
						])
						// Discard any props that don't start with "--". Custom props are required to.
						.filter(([propName]) => propName.indexOf("--") === 0);
						return [...propValArr, ...props];
					}, [])
				),[]);
		}
    }
};
</script>
