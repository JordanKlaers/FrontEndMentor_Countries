<template>
	<div id="banner" class="p-30">
		<span class="ft-xtr-bold ft-sz-20">Where in the world?</span>
		<span
			class="ft-normal m-lft-auto ft-sz-18 dark-mode"
			@click="toggleMode">
			<i class='icon-moon-stroke ft-sz-16 p-rgt-15'></i>Dark Mode
		</span>
	</div>
</template>

<script>
export default {
	name: 'banner',
	components: {
	},
	props: {},
	data() {
		let rootVariables = getComputedStyle(document.body);
		console.log('HERERERE', document.body.style);
		return {
			rootVariables,
			isLight: true,
			'--DarkModeElements': rootVariables.getPropertyValue('--DarkModeElements'),
			'--DarkModeBackground': rootVariables.getPropertyValue('--DarkModeBackground'),
			'--DarkModeText': rootVariables.getPropertyValue('--DarkModeText'),
			'--DarkModeElements': rootVariables.getPropertyValue('--DarkModeElements'),
			'--LightModeText': rootVariables.getPropertyValue('--LightModeText'),
			'--LightModeInput': rootVariables.getPropertyValue('--LightModeInput'),
			'--LightModeBackground': rootVariables.getPropertyValue('--LightModeBackground'),
			'--LightModeElements': rootVariables.getPropertyValue('--LightModeElements')
		}
	},
	methods: {
		toggleMode() {
			let styles = document.body.style;
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


