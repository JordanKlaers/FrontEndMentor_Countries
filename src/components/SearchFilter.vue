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
				@input="event => $emit('update:searchValue', event.target.value)"
				placeholder="Search for a Country..."
				size="30">
		</i>
	</div>
</template>

<script>
export default {
	name: 'searchFilter',
	components: {
	},
	props: [ 'searchValue' ],
	methods: {
		setCursorInput() {
			this.$refs['input'].focus();
			this.$refs['input'].select();
		}
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
		background-color: white;
		@include box-shadow-with-hover(('color-hover': rgba(0,0,0,0.2))...);
	}
	input {
		min-width: 0;
		flex: 1;
		border: none;
		text-overflow: ellipsis;
		&:focus{
			outline: none;
		}
		&::placeholder {
			color: #999;
		}
	}
}
</style>


