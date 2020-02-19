<template>
	<div class="card m-60">
		<div class="aspect-ratio">
			<div class="flag-container" ref="flag-container">
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
		<!-- <img class="flag" :src="placeData.flag"/> -->
		<div class="place ft-xtr-bold m-30">
			{{placeData.name}}
		</div>
		<dl class="m-lft-30 verticle">
			<div class="row p-btm-10" v-for="(fact, index) in cardFacts" :key="index">
				<dt class="ft-bold">{{fact.label}}: </dt>
				<dd class="ft-normal">{{fact.value}}</dd>
			</div>
		</dl>
	</div>
</template>

<script>
export default {
	name: 'card',
	components: {
	},
	props: {
		placeData: {
			default: () => { return {}; }
		}
	},
	data() {
		return {
			flag: new Image()
		}
	},
	mounted() {
		this.flag.onload = () => {
			const flagContainer = this.$refs['flag-container'];
			if (flagContainer) {
				let elements = [];
				[...flagContainer.childNodes].forEach(node => {
					elements.push(node);
					
				});
				elements.forEach(el => {
					if (el.nodeType == Node.ELEMENT_NODE) {
						// flagContainer.removeChild(el);
					}
				});
			}
			this.flag.setAttribute("xmlns", "http://www.w3.org/2000/svg");
			this.flag.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
			this.flag.setAttribute("version", "1.1");
			this.flag.setAttribute("width", "100%");
			this.flag.setAttribute("height", "100%");
			this.flag.setAttribute("viewBox", "0 0 100 100");
			this.flag.setAttribute("preserveAspectRatio", "none meet");
			this.$refs['flag-container'] && this.$refs['flag-container'].appendChild(this.flag);
		}
	},
	computed: {
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
	},
	watch: {
		placeData: {
			immediate: true,
			handler(data) {
				this.flag.src = data.flag;
			}
		}
	}
};
</script>
<style lang='scss' type="text/scss">
@import '~_scss_/variables';
@import '~_scss_/_mixins';

.card {
	background-color: var(--active-element-color);
	border-radius: 10px;
	overflow: hidden;
	box-shadow: rgba(0,0,0,0.1) 0px 4px 10px 8px;
	transition: 1s;
	color: var(--active-text-color);
	&:hover {
		box-shadow: rgba(0,0,0,0.3) 0px 4px 10px 8px;
	}
	.aspect-ratio {
		@include aspect-ratio(3,2);
	}
	.flag-container {
		// position: relative;
		@keyframes bounce {
			0% {
				transform: translateY()
			}
		}
		div {
			position: absolute;
			width: 20px;
			height: 20px;
			background-color: var(--inactive-bg-color);
			border-radius: 50%;
			&:nth-of-type(1) {
				top: 50%;
				left: 50%;
				transform: translateX(-40px) translateY(-50%);
			}
			&:nth-of-type(2) {
				top: 50%;
				left: 50%;
				transform: translateX(-10px) translateY(-50%);
			}
			&:nth-of-type(3) {
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


