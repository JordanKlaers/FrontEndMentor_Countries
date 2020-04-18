<template>
	<div id="search-filter" class="p-lft-30 p-rgt-30 m-top-30">
		<i class="icon icon-search p-10 p-lft-30" @click='setCursorInput'>
			<input
				ref='input'
				class="m-lft-30"
				type="text"
				id="search"
				name="search"
				:value="searchValue"
				@input="emitSearchUpdate"
				placeholder="Search for a Country..."
				size="30">
		</i>
	</div>
</template>

<script>
import { debounce } from 'lodash-es';
export default {
	name: 'searchFilter',
	components: {
	},
	props: [ 'searchValue' ],
	methods: {
		setCursorInput() {
			this.$refs['input'].focus();
			this.$refs['input'].select();
		},
		emitSearchUpdate: debounce(function(event) {
			this.$emit('update:searchValue', event.target.value)
		}, 1000)
	}
};
</script>
<style lang='scss' type="text/scss">
@import '~_scss_/_mixins';
#search-filter {
	i {
		width: 100%;
		display: flex;
		border-radius: 7px;
		transition: 1s;
		background-color: var(--active-element-color);
		color: var(--active-text-color);
		@include box-shadow-with-hover(('color-hover': rgba(0,0,0,0.2))...);
	}
	input {
		min-width: 0;
		flex: 1;
		border: none;
		text-overflow: ellipsis;
		transition: 1s;
		color: var(--active-text-color);
		background-color: var(--active-element-color);
		&:focus{
			outline: none;
		}
		&::placeholder {
			transition: 1s;
			color: #999;
			color: var(--active-text-color);
		}
	}
}
</style>


