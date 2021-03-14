<template>
	<div class="m-30">
		<multiselect
			v-model="value"
			tag-placeholder="Add this as new tag"
			placeholder="Filter by Region"
			label="name"
			track-by="name"
			:options="regions || []"
			:multiple="true"
			:taggable="false"
			:showLabels="false"
			:showNoResults="true"
			@input="emitUpdatedSelection">
		</multiselect>
	</div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  props: [
	'regions'
  ],
  data () {
    return {
      value: [],
      options: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' }
      ]
    }
  },
  methods: {
	  emitUpdatedSelection() {
		  this.$emit('updateRegionFilter', this.value);
	  }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
@import '~_scss_/_mixins';
@import '~_scss_/variables';
.multiselect {
	border-radius: 7px;
	width: 230px;
	@include box-shadow-with-hover(('color-hover': rgba(0,0,0,0.2))...);
	&__tags {
		transition: 1s;
		background: var(--active-element-bg-color);
		border-color: transparent;
		border-radius: 7px;
		.multiselect__tag {
			//fallback for ie
			background: hsl(209, 23%, 22%);
			//
			background: var(--inactive-element-bg-color);
			span:first-of-type {
				//fallback for IE
				color: hsl(0, 0%, 100%);
				//
				color: var(--inactive-text-color);
			}
			&-icon::after {
				color: var(--inactive-text-color);
			}
			&-icon:hover {
				//fallback for ie
				background: hsl(209, 23%, 22%);
				//
			}
		}
	}
	&__tag {
		overflow: visible;
		background: var(--active-element-bg-color);
	}
	&__tag-icon {
		transition: 0.5s;
		&:hover {
			background: initial;
			@include box-shadow((
				'color': rgba(0, 0, 0, 0.5),
				'x-shift': 0px,
				'y-shift': 0px,
				'fade': 6px,
				'size': 2px,
				'transition': 0.5s)...
			);
		}
		&::after {
			color: white;
		}
	}
	&__input {
		margin-bottom: 8px;
		margin-left: 10px;
		padding: 0;
		background-color: var(--active-element-bg-color);
		color: var(--active-text-color);
		&::placeholder {
			color: #999;
			font-size: 14px;
		}
	}
	&__placeholder {
		transition: 1s;
		color: var(--active-text-color);
		margin-left: 10px;
	}
	&__content-wrapper {
		border-color: var(--active-element-bg-color);
		border-bottom-right-radius: 7px;
		border-bottom-left-radius: 7px;
	}
	&__option--selected {
		background-color: initial;
	}
	&__option {
		//just these two values are a fall back for ie as ther would otherwise be green (the default of the plugin styles)
		color: hsl(200, 15%, 8%);
		background: hsl(0, 0%, 98%);
		//
		color: var(--active-text-color);
		background: var(--active-app-bg-color);
		padding: 8px;
		min-height: 32px;
		span:first-of-type {
			font-size: $text-regular;
		}
		&--highlight {
			//fallback for IE
			background: hsl(207, 26%, 17%);
			//
			background: var(--inactive-app-bg-color);
			span:first-of-type {
				//fallback for IE
				color: hsl(0, 0%, 100%);
				//
				color: var(--inactive-text-color);
			}
		}
		&--highlight#{&}--selected {
			background: hsl(0, 100%, 78%);
		}
	}
}
</style>