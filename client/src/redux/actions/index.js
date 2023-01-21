import axios from "axios";
import {
	GET_ALL_DOGS,
	GET_TEMPERAMENTS,
	GET_NAME,
	GET_FILTER_DATA,
	GET_FILTER_TEMP,
	ORDER_NAME,
	ORDER_WEIGHT,
} from "../types";

export const getAllDogs = () => async (dispatch) => {
	try {
		const res = await axios.get(`/dogs`, {});
		// console.log(res.data);
		return dispatch({
			type: GET_ALL_DOGS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

export const getTemperaments = () => async (dispatch) => {
	try {
		const res = await axios.get(`/temperaments`, {});
		// console.log(res.data);
		return dispatch({
			type: GET_TEMPERAMENTS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

export const getName = (name) => async (dispatch) => {
	try {
		const res = await axios.get(`/dogs?name=${name}`, {});
		// console.log(res.data);
		return dispatch({
			type: GET_NAME,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

export const getFilterData = (value) => async (dispatch) => {
	try {
		const res = await axios.get(`/dogs`, {});
		/* console.log(
			res.data.filter((item) => item.createdInDb.toString() === value)
		); */
		return dispatch({
			type: GET_FILTER_DATA,
			payload: res.data.filter((item) => item.createdInDb.toString() === value),
		});
	} catch (error) {
		console.log(error);
	}
};

export const getFilterTemp = (value) => async (dispatch) => {
	const res = await axios.get(`/dogs`, {});
	/* console.log(res.data.filter((item) => item.temperaments?.includes(value))); */
	return dispatch({
		type: GET_FILTER_TEMP,
		payload: res.data.filter((item) => item.temperaments?.includes(value)),
	});
};

export const orderName = (payload) => async (dispatch) => {
	return dispatch({
		type: ORDER_NAME,
		payload,
	});
};

export const orderWeight = (payload) => async (dispatch) => {
	return dispatch({
		type: ORDER_WEIGHT,
		payload,
	});
};
