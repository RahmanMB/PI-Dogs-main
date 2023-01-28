const nameRegex =
	/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(([',. -][a-zA-ZÀ-ÖØ-öø-ÿ])?[a-zA-ZÀ-ÖØ-öø-ÿ]*)*$/;
const numberRegex = /^-?[0-9]+(\.[0-9]+)?$/;
const intRangeRegex = /^[1-9][0-9]*\s-\s[1-9][0-9]*$/;
const urlRegex =
	// eslint-disable-next-line no-useless-escape
	/^((https?:)(\/\/\/?)([\w]*(?::[\w]*)?@)?([\d\w\.-]+)(?::(\d+))?)?([\/\\\w\.()-]*)?(?:([?][^#]*)?(#.*)?)*/gim;

const regexValidation = (name, value, { height_min, weight_min }) => {
	switch (name) {
		case "name":
			return nameRegex.test(value)
				? ""
				: `${name} entered is invalid, try another one.`;

		case "image":
			return urlRegex.test(value)
				? ""
				: `${name} entered is invalid, try another one.`;

		case "life_span":
			return intRangeRegex.test(value)
				? Number(value.split("-").map((el) => el.trim())[0]) <
				  Number(value.split("-").map((el) => el.trim())[1])
					? Number(value.split("-").map((el) => el.trim())[1]) < 30
						? ""
						: "Incorrect fact, dogs do not live that long."
					: "The second number must be greater than the first number."
				: "Invalid range format";

		case "height_min" || "weight_min":
			return numberRegex.test(value)
				? ""
				: `${name} entered is invalid, enter a valid number.`;

		case "height_max":
			return numberRegex.test(value)
				? Number(value) > Number(height_min)
					? ""
					: `${name} entered is invalid, enter a valid number greater than ${height_min}.`
				: `${name} entered is invalid, enter a valid number.`;
		case "weight_max":
			return numberRegex.test(value)
				? Number(value) > Number(weight_min)
					? ""
					: `${name} entered is invalid, enter a valid number greater than ${weight_min}.`
				: `${name} entered is invalid, enter a valid number.`;

		default:
			return;
	}
};

export default regexValidation;
