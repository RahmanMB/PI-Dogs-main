import axios from "axios";
import {
	GET_ALL_DOGS,
	GET_NAME,
	GET_TEMPERAMENTS,
	GET_FILTER_TEMP,
	GET_FILTER_CREATED,
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

export const filterCreated = (payload) => {
	return {
		type: GET_FILTER_CREATED,
		payload,
	};
};

export const filterTemperaments = (payload) => async (dispatch) => {
	return dispatch({
		type: GET_FILTER_TEMP,
		payload,
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
