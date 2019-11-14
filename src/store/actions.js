'use strict'
import Axios from 'axios';

export async function getCountriesAll({state, commit, rootState}, data) {
	try {
		const response = await Axios({
			method: 'get',
			url: 'http://restcountries.eu/rest/v2/all'
		});
		if (response && response.data) commit('UPDATE_COUNTRIES_ALL', response.data);
	} catch (err) {
		console.log('err?', err);
	}
}