<template>
	<div class="card" ref="card">
		<div class="aspect-ratio">
			<div class="flag-container" ref="flag-container">
				<div class="loading-dot"></div>
				<div class="loading-dot"></div>
				<div class="loading-dot"></div>
			</div>
		</div>
		<div class="place ft-xtr-bold m-30">
			{{placeData.name}}
		</div>
		<dl class="m-lft-30 m-rgt-30 verticle">
			<div class="row p-btm-10" v-for="(fact, index) in cardFacts" :key="index">
				<dt class="ft-bold">{{fact.label}}: </dt>
				<dd class="ft-normal">{{fact.value}}</dd>
			</div>
		</dl>
	</div>
</template>

<script>
import Axios from 'axios';
export default {
	name: 'card',
	props: {
		placeData: {
			default: () => { return {}; }
		}
	},
	computed: {
		flagURL() {
			return this.placeData && this.placeData.flag || '';
		},
		cardFacts() {
			let data = this.placeData || {};
			return [
				{
					label: 'Population',
					value: data.population || ''
				},
				{
					label: 'Region',
					value: data.region || ''
				},
				{
					label: 'Capital',
					value: data.capital || ''
				}
			]
		}
	},
	methods: {
		extractImage(val) {
			return val.image;//something else?
		},
		async getFlagImage(url) {
			try {
				const response = await Axios({
					method: 'get',
					url,
					dataType: "image/svg"
				});
				if (response && response.data) {
					return response.data || '';
				}
			} catch (err) {
				console.log('err?', err);
			}
		}
	},
	watch: {
		placeData: {
			immediate: true,
			handler(data) {
				if (data.flag) {
					Promise.resolve(this.getFlagImage(data.flag)).then(svgString => {
						this.$refs['flag-container'].innerHTML = svgString;
						const svg = this.$refs['flag-container'].querySelector('svg');
						let x = svg.getAttribute("width");
						let y = svg.getAttribute("height");
						let viewBoxValue = svg.getAttribute("viewBox");
						if (viewBoxValue) svg.setAttribute('viewBox', viewBoxValue);
						else svg.setAttribute('viewBox', `0 0 ${x} ${y}`);
						svg.removeAttribute('height');
						svg.removeAttribute('width');

						//works in chrome. Does not work in IE
						this.$refs['card'].setAttribute('style', `--ratio: ${(y/x) * 100}%;`);
						//does not work in chrome. Works in IE
						this.$refs['card'].style.setProperty('--ratio', `${(y/x) * 100}%;`);
					});
				}
			}
		}
	}
};
</script>
<style lang='scss' type="text/scss">
@import '~_scss_/variables';
@import '~_scss_/_mixins';

.card {
	background-color: var(--active-element-bg-color);
	border-radius: 10px;
	overflow: hidden;
	box-shadow: rgba(0,0,0,0.1) 0px 4px 10px 8px;
	transition: 1s;
	color: var(--active-text-color);
	&:hover {
		box-shadow: rgba(0,0,0,0.3) 0px 4px 10px 8px;
	}
	.aspect-ratio {
		//this requires the height and width css variables to be set on the element that is a parent of this class
		//the svgs can have different sizes, vewiboxDimensions and ratios so this allows for the svgs to work in every browser and fill the space equally despite the different dimensions
		@include svg-aspect-ratio-wrapper();
	}
	.flag-container {
		background-position-x: center;
		background-position-Y: center;
		background-size: contain;
		@mixin bounce($x, $name) {
			@keyframes #{$name} {
				0% {
					transform: translateX($x) translateY(-50%)
				}
				20% {
					transition-timing-function: ease-in-out;
					transform: translateX($x) translateY(-50%) translateY(-20px);
				}
				40% {
					transition-timing-function: ease-in-out;
					transform: translateX($x) translateY(-50%)
				}
			}
		}
		div.loading-dot {
			position: absolute;
			width: 20px;
			height: 20px;
			background-color: var(--inactive-app-bg-color);
			border-radius: 50%;
			&:nth-of-type(1) {
				@include bounce(-40px, bounceLeft);
				animation: bounceLeft 5s 0s infinite;
				top: 50%;
				left: 50%;
				transform: translateX(-40px) translateY(-50%);
			}
			&:nth-of-type(2) {
				@include bounce(-10px, bounceMiddle);
				animation: bounceMiddle 5s 1.6s infinite;
				top: 50%;
				left: 50%;
				transform: translateX(-10px) translateY(-50%);
			}
			&:nth-of-type(3) {
				@include bounce(20px, bouceRight);
				animation: bouceRight 5s 3.2s infinite;
				top: 50%;
				left: 50%;
				transform: translateX(20px) translateY(-50%);
			}
		}
	}
	img {
		width: 100%;
		&::before {
			content: '';
			position: absolute;
			
		}
	}
}
dl {
	dt, dd {
		display: inline-block;
		margin: 0;
		font-size: $text-regular;
		white-space: pre;
		display: contents;
	}
	dd {
		white-space: normal;
	}
	&.verticle {
		display: flex;
		flex-wrap: wrap;
		.row {
			flex-basis: 100%;
		}
	}
}
.place {
	font-size: $text-large;
}
</style>


