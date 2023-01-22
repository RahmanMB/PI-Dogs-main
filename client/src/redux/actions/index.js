import axios from "axios";
import {
	GET_ALL_DOGS,
	GET_TEMPERAMENTS,
	GET_NAME,
	GET_FILTER_DATA,
	GET_FILTER_TEMP,
	ORDER_NAME,
	ORDER_WEIGHT,
	DETAIL_TARGET,
} from "../types";

export const getAllDogs = () => async (dispatch) => {
	try {
		const response = await axios.get(`/dogs`, {});
		return dispatch({
			type: GET_ALL_DOGS,
			payload: response.data,
		});
	} catch (err) {
		console.log(err);
	}
};

export const getTemperaments = () => async (dispatch) => {
	try {
		const response = await axios.get(`/temperaments`, {});
		return dispatch({
			type: GET_TEMPERAMENTS,
			payload: response.data,
		});
	} catch (err) {
		console.log(err);
	}
};

export const getName = (name) => async (dispatch) => {
	try {
		const response = await axios.get(`/dogs?name=${name}`, {});
		return dispatch({
			type: GET_NAME,
			payload: response.data,
		});
	} catch (err) {
		console.log(err);
	}
};

export const detailTarget = (id) => async (dispatch) => {
	try {
		const response = await axios.get(`/dogs/${id}`, {});
		return dispatch({
			type: DETAIL_TARGET,
			payload: response.data.shift(),
		});
	} catch (error) {
		console.log(error);
	}
};

export const getFilterData = (value) => async (dispatch) => {
	try {
		const response = await axios.get(`/dogs`, {});
		return dispatch({
			type: GET_FILTER_DATA,
			payload: response.data.filter(
				(item) => item.createdInDb.toString() === value
			),
		});
	} catch (error) {
		console.log(error);
	}
};

export const getFilterTemp = (value) => async (dispatch) => {
	const response = await axios.get(`/dogs`, {});
	return dispatch({
		type: GET_FILTER_TEMP,
		payload: response.data.filter((item) => item.temperaments?.includes(value)),
	});
};

const orderAscName = (array) => {
	return array.sort((x, y) => {
		const nameX = x.name.toLowerCase();
		const nameY = y.name.toLowerCase();
		if (nameX < nameY) {
			return -1;
		}
		if (nameX > nameY) {
			return 1;
		}
		return 0;
	});
};
const orderDescName = (array) => {
	return array.sort((x, y) => {
		const nameX = x.name.toLowerCase();
		const nameY = y.name.toLowerCase();
		if (nameX < nameY) {
			return 1;
		}
		if (nameX > nameY) {
			return -1;
		}
		return 0;
	});
};
export const orderName = (value) => async (dispatch) => {
	const response = await axios.get(`/dogs`, {});
	return dispatch({
		type: ORDER_NAME,
		payload:
			value === "asc"
				? orderAscName(response.data)
				: orderDescName(response.data),
	});
};

const orderAscWeight = (array) => {
	return array.sort((x, y) => {
		const X = x.weight;
		const Y = y.weight;
		if (X < Y) {
			return -1;
		}
		if (X > Y) {
			return 1;
		}
		return 0;
	});
};
const orderDescWeight = (array) => {
	return array.sort((x, y) => {
		const X = x.weight;
		const Y = y.weight;
		if (X < Y) {
			return 1;
		}
		if (X > Y) {
			return -1;
		}
		return 0;
	});
};
export const orderWeight = (value) => async (dispatch) => {
	const response = await axios.get(`/dogs`, {});
	const arrayData = response.data.map((obj) => {
		const { weight_min, weight_max } = obj;
		return {
			...obj,
			weight: (Number(weight_min) + Number(weight_max)) / 2,
		};
	});
	return dispatch({
		type: ORDER_WEIGHT,
		payload:
			value === "min" ? orderAscWeight(arrayData) : orderDescWeight(arrayData),
	});
};

export const createData = (formData) => async () => {
	try {
		const response = await axios.post("/dogs", formData, {
			headers: { "Content-Type": "application/json" },
		});
		console.log(response.data.message);
		return response;
	} catch (error) {
		console.log(error);
	}
};
