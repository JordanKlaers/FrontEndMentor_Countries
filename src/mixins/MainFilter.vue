<script>
import { mapGetters } from 'vuex';
export default {
	name: 'main-filter-mixin',
	data() {
		return {
			regionsFilterList: [],
			searchValue: ''
		}
	},
	computed: {
		...mapGetters(['countriesAll']),
		filteredCountries() {
			let countries = this.countriesAll || [];
			//return only the countries that exit in the current array of regions to filter by, or ALL if the filter array is empty
			let directMatch = false;
			return countries.reduce((acc,cur) => {
				if (directMatch) {
					return acc;
				}
				let country = cur;
				let val = this.handleFilterCriteria(country, this.searchValue, this.regionsFilterList);
				if (val.directMatch) {
					directMatch = val.directMatch;
					return [val.country];
				} else if (val.shouldIncludeCountry) {
					acc.push(val.country);
				}
				return acc;
				//only return the first 20. TODO: implement lazyloading/faster searching-filtering/ image caching
			}, []).slice(0,19);
		},
		regions() {
			//take the full list of countries and return a list of the regions, with only unique values that exist (no empty values)
			return this.countriesAll && [...new Set(this.countriesAll.map(country => {
				return country.region;
			}))].reduce((acc,cur) => {
				let updatedVal = acc;
				if (cur) updatedVal = [...acc, { name: cur }];
				return updatedVal;
			}, [])
		}
	},
	methods: {
		updateSelectedRegionFilters(val) {
			this.regionsFilterList = val.map(region => region && region.name);
		},
		handleFilterCriteria(country, searchValue, regionsFilterList) {
			let shouldIncludeCountry = false;
			let directMatch = false;
			//if there is search text compare the text against values in the country object
			if (searchValue) {
				let num = Number(searchValue);
				//if the search value parses to a number, compare the area and population
				if (!!num) {
					//if area matches
					if (country.area === num)  {
						shouldIncludeCountry = true;
					}
					//return all countries that are greater than the searched value
					if (country.population > num) {
						shouldIncludeCountry = true;
					}
					if (country.population === num) {
						directMatch = true;
					}
				} else {
					//if the search text is not a number, compare it with the other fields for a match
					if (country.altSpellings.includes(searchValue)) {
						shouldIncludeCountry = true;
						directMatch = true;
					}
					if (country.borders.includes(searchValue)) {
						shouldIncludeCountry = true;
						directMatch = true;
					}
					if (country.capital == searchValue) {
						shouldIncludeCountry = true;
						directMatch = true;
					}
					if (country.demonym == searchValue) {
						shouldIncludeCountry = true;
						directMatch = true;
					}
					const directLanguageMatch = new RegExp(`\\|${searchValue}\\|`, 'gi');
					const partialLanguageMatch = new RegExp(`${searchValue}`, 'gi');
					const allLanguages = `|${country.languages.reduce((acc,cur) => {
							acc.push(cur.name);
							return acc;
						}, []).join('|')}|`;

					if (directLanguageMatch.test(allLanguages)) {
						shouldIncludeCountry = true;
						directMatch = true;
					} else if (partialLanguageMatch.test(allLanguages)) {
						shouldIncludeCountry = true;
					}

					const directCountryNameMatch = new RegExp(`^${searchValue}$`, 'gi');
					const partialCountryNameMatch = new RegExp(`${searchValue}`, 'gi');
					if (directCountryNameMatch.test(country.name)) {
						shouldIncludeCountry = true;
						directMatch = true;
					} else if (partialCountryNameMatch.test(country.name)) {
						shouldIncludeCountry = true;
					}
					if (country.nativeName == searchValue) {
						shouldIncludeCountry = true;
						directMatch = true;
					}
					if (country.region == searchValue) {
						shouldIncludeCountry = true;
						directMatch = true;
					}
				}
			}
			//after addressing the text filter, 
			//then if  there is a region selected, remove if it doesnt match
			if (regionsFilterList.length && !regionsFilterList.includes(country.region)) shouldIncludeCountry = false;

			//if there is no text entered, then add the country if there is a match (the counter to the condition above)
			if (!searchValue && regionsFilterList.length && regionsFilterList.includes(country.region)) shouldIncludeCountry = true;

			//if there is no search text or selected regions, just return the country
			if (!searchValue && !regionsFilterList.length) shouldIncludeCountry = true;
			return {
				country,
				shouldIncludeCountry,
				directMatch
			}
		}
	}
};
</script>
