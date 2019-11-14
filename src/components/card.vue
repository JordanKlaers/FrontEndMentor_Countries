<template>
	<div class="card m-60">
		<img class="flag" :src="placeData.flag"/>
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
	watch: {}
};
</script>
<style lang='scss' type="text/scss">
@import '~_scss_/variables';
.card {
	background-color: white;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: rgba(0,0,0,0.1) 0px 4px 10px 8px;
	transition: 1s;
	&:hover {
		box-shadow: rgba(0,0,0,0.3) 0px 4px 10px 8px;
	}
}
img {
	width: 100%;
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


