import axios from 'axios';
import { action, thunk } from 'easy-peasy';
import { toast } from 'react-toastify';
const doctorModel = {
	loading: false,

	//offices
	offices: [],
	officeErr: null,
	//schedule
	availability: [],
	availabilityErr: null,
	allAvailability: [],
	allAvailabilityErr: null,

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

	addAvailability: thunk(
		async (
			action, {
				officeID,
				availabilityDate,
			}
		) => {
			action.setAvailabilityError(null);
			action.setLoading(true);
			try {
				const res = await axios.post('/api/doctor/add/availability', {
					officeID,
					availabilityDate,
				});

				if (res.status === 200) {
					toast.success('Schedule Added!');
				}

			} catch (err) {
				const errArr = []
				err.response.data.error.details.map(err => {
					return errArr.push(err.context.label);
				})
				action.setAvailabilityError(errArr.join('\n'))
				//toast.error(errArr.join('\n'))
			}
			action.setLoading(false);
		}
	),

	getAllAvailability: thunk(async (action, payload) => {
		action.setAllAvailabilityErr(null)
		action.setLoading(true)
		const doctorID = payload;
		console.log(doctorID);

		try {
			const res = await axios.get(`/api/doctor/allAvailability/${doctorID}`);
			if (res.status === 200) {
				action.setAllAvailability(res.data.availabilities)
				action.getAvailability(res.data.availability)
			}
		} catch (error) {
			action.setAllAvailabilityErr(error.response.message)
		}
		action.setLoading(false)
	}),

	updateAvailability: thunk(async (action) => {
		action.setAvailabilityError(null)
		action.setLoading(true)

		try {
			const res = await axios.get('/api/doctor/update/availability');
			if (res.status === 200) {
				action.getAvailability(res.data.availability)
			}
		} catch (error) {
			// action.setAvailabilityError(errArr.join('\n'))
		}
		action.setLoading(false)
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

	setAvailability: action((state, availability) => {
		state.availability = availability;
	}),

	setAvailabilityError: action((state, error) => {
		state.availabilityErr = error;
	}),

	getAvailability: action((state, availability) => {
		state.availability = availability
	}),

	setAllAvailability: action((state, availability) => {
		state.allAvailability = availability;
	}),

	setAllAvailabilityErr: action((state, error) => {
		state.allAvailabilityErr = error;
	}),

	//updateAvailabilityError: action((state, error) => {
	//state.availabilityErr = error;
	//}),

};
export default doctorModel;