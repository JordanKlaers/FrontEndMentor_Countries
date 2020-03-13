<template>
	<div id="banner" class="p-30">
		<span class="ft-xtr-bold ft-sz-20">Where in the world?</span>
		<span
			class="ft-normal m-lft-auto ft-sz-18 dark-mode"
			@click="clickHandler">
			<i class='icon-moon-stroke ft-sz-16 p-rgt-15'></i>Dark Mode
		</span>
	</div>
</template>

<script>
import { debounce } from 'lodash-es';
export default {
	name: 'banner',
	computed: {
		hasCSSVariables() {
			return this['--DarkModeElements'] || this['--DarkModeBackground'] || this['--DarkModeText'] || this['--DarkModeElements'] || this['--LightModeText'] || this['--LightModeInput'] || this['--LightModeBackground'] || this['--LightModeElements'];
		}
	},
	props: {},
	data() {
		
		return {
			clickHandler: debounce(this.toggleMode, 300, { 'leading': true, 'trailing': false }),
			isLight: true,
			'--DarkModeElements': '',
			'--DarkModeBackground': '',
			'--DarkModeText': '',
			'--DarkModeElements': '',
			'--LightModeText': '',
			'--LightModeInput': '',
			'--LightModeBackground': '',
			'--LightModeElements': ''
		}
	},
	mounted() {
		
	},
	methods: {
		toggleMode() {
			if (!this.hasCSSVariables) this.retrieveCSSVariables();

			let styles = document.getElementById('app').style;
			this.isLight = !this.isLight;
			if (this.isLight) {
				styles.setProperty('--active-element-color', this['--LightModeElements']);
				styles.setProperty('--active-text-color', this['--LightModeText']);
				styles.setProperty('--active-bg-color', this['--LightModeBackground']);
				styles.setProperty('--inactive-bg-color', this['--DarkModeBackground']);
				styles.setProperty('--inactive-text-color', this['--DarkModeText']);
				styles.setProperty('--inactive-element-color', this['--DarkModeElements']);
			} else {
				styles.setProperty('--active-element-color', this['--DarkModeElements']);
				styles.setProperty('--active-text-color', this['--DarkModeText']);
				styles.setProperty('--active-bg-color', this['--DarkModeBackground']);
				styles.setProperty('--inactive-bg-color', this['--LightModeBackground']);
				styles.setProperty('--inactive-text-color', this['--LightModeText']);
				styles.setProperty('--inactive-element-color', this['--LightModeElements']);
			}
		},
		retrieveCSSVariables() {
			let rootVariables = getComputedStyle(document.body);
			this['--DarkModeElements'] = rootVariables.getPropertyValue('--DarkModeElements'),
			this['--DarkModeBackground'] = rootVariables.getPropertyValue('--DarkModeBackground'),
			this['--DarkModeText'] = rootVariables.getPropertyValue('--DarkModeText'),
			this['--DarkModeElements'] = rootVariables.getPropertyValue('--DarkModeElements'),
			this['--LightModeText'] = rootVariables.getPropertyValue('--LightModeText'),
			this['--LightModeInput'] = rootVariables.getPropertyValue('--LightModeInput'),
			this['--LightModeBackground'] = rootVariables.getPropertyValue('--LightModeBackground'),
			this['--LightModeElements'] = rootVariables.getPropertyValue('--LightModeElements')
		}
	},
	watch: {}
};
</script>
<style lang='scss' type="text/scss">
@import '~_scss_/_mixins';
#banner {
	@include box-shadow((color: rgba(0,0,0,0.05))...);
	display: flex;
	transition: 1s;
	color: var(--active-text-color);
	background-color: var(--active-element-color);
	span {
		display: inline-block;
		line-height: 20px;
		&.dark-mode {
			cursor: pointer;
		}
	}
}
</style>


