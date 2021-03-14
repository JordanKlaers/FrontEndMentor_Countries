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
import cssVariables from '_mixins_/cssVariables';
export default {
	name: 'bann1er',
	mixins: [ cssVariables ],
	data() {
		return {
			clickHandler: debounce(this.toggleMode, 300, { 'leading': true, 'trailing': false }),
			mode: 'light'
		}
	},
	methods: {
		toggleMode() {
			this.isLight = !this.isLight;
			let styles = document.getElementById('app').style;
			if (this.mode == 'light') this.mode = 'dark';
			else if (this.mode == 'dark') this.mode = 'light';
			this.active.forEach(activeStyle => {
				styles.setProperty(activeStyle, this[this.mode][activeStyle.replace('active', this.mode)]);
			});
			this.inactive.forEach(inactiveStyle => {
				styles.setProperty(inactiveStyle, this[this.mode][inactiveStyle.replace('inactive', this.mode)]);
			});
			/*	styles.setProperty('--active-element-bg-color', this['--light-element-bg-color']);
				styles.setProperty('--active-text-color', this['--light-text-color']);
				styles.setProperty('--active-app-bg-color', this['--light-app-bg-color']);
				styles.setProperty('--inactive-app-bg-color', this['--dark-app-bg-color']);
				styles.setProperty('--inactive-text-color', this['--dark-text-color']);
				styles.setProperty('--inactive-element-bg-color', this['--dark-element-bg-color']);
			} else {
				styles.setProperty('--active-element-bg-color', this['--dark-element-bg-color']);
				styles.setProperty('--active-text-color', this['--dark-text-color']);
				styles.setProperty('--active-app-bg-color', this['--dark-app-bg-color']);
				styles.setProperty('--inactive-app-bg-color', this['--light-app-bg-color']);
				styles.setProperty('--inactive-text-color', this['--light-text-color']);
				styles.setProperty('--inactive-element-bg-color', this['--light-element-bg-color']);
			}
			*/
		},
		retrieveCSSVariables() {
			let rootVariables = getComputedStyle(document.body);
			// console.log('rot variables: ', rootVariables);
			this['--dark-element-bg-color'] = rootVariables.getPropertyValue('--dark-element-bg-color'),
			this['--dark-app-bg-color'] = rootVariables.getPropertyValue('--dark-app-bg-color'),
			this['--dark-text-color'] = rootVariables.getPropertyValue('--dark-text-color'),
			this['--dark-element-bg-color'] = rootVariables.getPropertyValue('--dark-element-bg-color'),
			this['--light-text-color'] = rootVariables.getPropertyValue('--light-text-color'),
			this['--LightModeInput'] = rootVariables.getPropertyValue('--LightModeInput'),
			this['--light-app-bg-color'] = rootVariables.getPropertyValue('--light-app-bg-color'),
			this['--light-element-bg-color'] = rootVariables.getPropertyValue('--light-element-bg-color')
			this['--Dark-Neutral-1'] = rootVariables.getPropertyValue('--Dark-Neutral-1')
			this['--Dark-Neutral-2'] = rootVariables.getPropertyValue('--Dark-Neutral-2')
			this['--Light-Neutral-1'] = rootVariables.getPropertyValue('--Light-Neutral-1')
			this['--Light-Neutral-2'] = rootVariables.getPropertyValue('--Light-Neutral-2')
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
	background-color: var(--active-app-bg-color);
	position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
	span {
		display: inline-block;
		line-height: 20px;
		&.dark-mode {
			cursor: pointer;
		}
	}
}
</style>


