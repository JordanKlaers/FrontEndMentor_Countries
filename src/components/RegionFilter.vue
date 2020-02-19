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
		background-color: var(--active-element-color);
		border-color: transparent;
		border-radius: 7px;
	}
	&__tag {
		overflow: visible;
		background-color: $DarkModeElements;
	}
	&__tag-icon {
		transition: 0.5s;
		&:hover {
			background-color: initial;
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
		background-color: var(--active-element-color);
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
		border-color: var(--active-element-color);
		border-bottom-right-radius: 7px;
		border-bottom-left-radius: 7px;
	}
	&__option--selected {
		background-color: initial;
	}
	&__option {
		color: var(--active-text-color);
		background: var(--active-bg-color);
		padding: 8px;
		min-height: 32px;
		span:first-of-type {
			font-size: $text-regular;
		}
		&--highlight {
			background: var(--inactive-bg-color);
			span:first-of-type {
				color: var(--inactive-text-color);
			}
		}
		&--highlight#{&}--selected {
			background: #939393;
		}
	}
}
</style>