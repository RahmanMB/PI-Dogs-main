import {
	GET_ALL_DOGS,
	GET_NAME,
	GET_TEMPERAMENTS,
	GET_FILTER_TEMP,
	GET_FILTER_DATA,
	ORDER_NAME,
	ORDER_WEIGHT,
	DETAIL_TARGET,
} from "../types";

const initialState = {
	dogs: [],
	temperaments: [],
	target: {},
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_DOGS:
			return {
				...state,
				dogs: action.payload,
			};

		case GET_NAME:
			return {
				...state,
				dogs: action.payload,
			};

		case GET_TEMPERAMENTS:
			return {
				...state,
				temperaments: action.payload,
			};

		case GET_FILTER_DATA:
			return {
				...state,
				dogs: action.payload,
			};

		case GET_FILTER_TEMP:
			return {
				...state,
				dogs: action.payload,
			};

		case ORDER_NAME:
			return {
				...state,
				dogs: action.payload,
			};

		case ORDER_WEIGHT:
			return {
				...state,
				dogs: action.payload,
			};

		case DETAIL_TARGET:
			return {
				...state,
				target: action.payload,
			};

		default:
			return state;
	}
};

export default rootReducer;
