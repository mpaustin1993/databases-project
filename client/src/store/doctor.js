import axios from 'axios';
import { action, thunk } from 'easy-peasy';

const doctorModel = {
	loading: true,

	//offices
	offices: [],
	officeErr: null,

	getOffices: thunk(async (action, payload) => {
		action.setOfficesError(null);
		action.setLoading(true);

		try {
			const res = await axios.get('/api/doctor/get/offices');
			if (res.status === 200) {
				action.setOffices(res.data.offices);
			}
		} catch (error) {
			action.setOfficesError(error.response.data.message);
		}
		action.setLoading(false);
	}),

	setLoading: action((state, loading) => {
		state.loading = loading;
	}),

	setOffices: action((state, offices) => {
		state.offices = offices;
	}),

	setOfficesError: action((state, error) => {
		state.officeErr = error;
	}),
};
export default doctorModel;
