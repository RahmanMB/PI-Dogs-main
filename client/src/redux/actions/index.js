/* Importing the axios library. */
import axios from "axios";
/* Importing the functions from the sort.js file. */
import {
	orderAscName,
	orderDescName,
	orderAscWeight,
	orderDescWeight,
} from "./sort";
/* Importing the types from the types.js file. */
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

/**
 * It's an async function that makes a get request to the server, and then dispatches the response to
 * the reducer.
 * @returns The dispatch function is being returned.
 */
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

/**
 * It's an async function that makes a get request to the server, and then dispatches the response to
 * the reducer.
 * @returns The response.data is an array of objects.
 */
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

/**
 * It's an async function that takes in a name, makes a get request to the server, and returns the
 * response data.
 * @param name - The name of the dog you want to search for.
 * @returns The response.data is being returned.
 */
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

/**
 * "I'm going to dispatch an action to the reducer, and the action is going to be a function that
 * returns an object with a type and a payload."
 *
 * The type is a string that tells the reducer what to do. The payload is the data that the reducer
 * will use to do it.
 *
 * The reducer is going to take the payload and use it to update the state.
 *
 * The state is going to be updated with the payload, and the component is going to re-render with the
 * new state.
 *
 * The component is going to re-render with the new state, and the new state is going to be passed to
 * the component as props.
 *
 * The component is going to re-render with the new props, and the new props are going to be used to
 * update the component's state.
 *
 * The component is going to re-render with the
 * @param id - the id of the dog you want to get the details.
 * @returns The response.data.shift() is returning the first item in the array.
 */
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

/**
 * It's a function that takes a value, and then returns a function that takes a dispatch, and then
 * returns a function that takes a try/catch block.
 *
 * The function that takes a value is the outermost function. It's the one that's being called in the
 * component.
 *
 * The function that takes a dispatch is the middle function. It's the one that's being returned by the
 * outermost function.
 *
 * The function that takes a try/catch block is the innermost function. It's the one that's being
 * returned by the middle function.
 *
 * The innermost function is the one that's actually doing the work. It's the one that's making the API
 * call.
 *
 * The middle function is the one that's calling the innermost function. It's the one that's calling
 * the function that's making the API call.
 *
 * The outermost function is the one
 * @param value - the value of the selected option from the dropdown
 * @returns The dispatch function is being returned.
 */
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

/**
 * It's a function that takes a value, and returns a function that takes a dispatch, and returns a
 * function that returns a dispatch with a payload of the response.data filtered by the value.
 * @param value - the value of the checkbox that is checked
 * @returns The response.data.filter((item) => item.temperaments?.includes(value))
 */
export const getFilterTemp = (value) => async (dispatch) => {
	const response = await axios.get(`/dogs`, {});
	return dispatch({
		type: GET_FILTER_TEMP,
		payload: response.data.filter((item) => item.temperaments?.includes(value)),
	});
};

/**
 * It's an async function that takes a value, dispatches an action, and returns a dispatch with a type
 * and a payload.
 *
 * The payload is a function that takes the response.data and returns a sorted array.
 *
 * The function is called in the component with the following code:
 * @param value - "asc" or "desc"
 * @returns The return value is the dispatch function.
 */
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

/**
 * It's an async function that makes an API call, then maps the response data to a new array, then
 * dispatches the new array to the reducer.
 * @param value - min or max
 * @returns a function.
 */
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

/**
 * It takes in a formData object, and then sends a POST request to the server with the formData object
 * as the body of the request.
 * @param formData - This is the data that you want to send to the server.
 * @returns The response from the server.
 */
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
