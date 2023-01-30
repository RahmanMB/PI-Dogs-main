const nameRegex =
	/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(([',. -][a-zA-ZÀ-ÖØ-öø-ÿ])?[a-zA-ZÀ-ÖØ-öø-ÿ]*)*$/;
const numberRegex = /^-?[0-9]+(\.[0-9]+)?$/;
const intRangeRegex = /^[1-9][0-9]*\s-\s[1-9][0-9]*$/;
const urlRegex =
	// eslint-disable-next-line no-useless-escape
	/^((https?:)(\/\/\/?)([\w]*(?::[\w]*)?@)?([\d\w\.-]+)(?::(\d+))?)?([\/\\\w\.()-]*)?(?:([?][^#]*)?(#.*)?)*/gim;

const regexValidation = (name, value, { height_min, weight_min }, nameDogs) => {
	switch (name) {
		case "name":
			return nameRegex.test(value)
				? 25 > value.length
					? nameDogs.find((nameDog) => nameDog === value.toLowerCase())
						? "Other name, already exists"
						: ""
					: "Enter a real name, characters exceeded."
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

		case "height_min":
			return numberRegex.test(value)
				? 180 > Number(value)
					? ""
					: `enter the ${name.split("_").join(" ")} less than 180`
				: `${name
						.split("_")
						.join(" ")} entered is invalid, enter a valid number.`;

		case "weight_min":
			return numberRegex.test(value)
				? 80 > Number(value)
					? ""
					: `enter the ${name.split("_").join(" ")} less than 80`
				: `${name
						.split("_")
						.join(" ")} entered is invalid, enter a valid number.`;

		case "height_max":
			return numberRegex.test(value)
				? Number(value) > Number(height_min)
					? 210 > Number(value)
						? ""
						: `enter the ${name.split("_").join(" ")} less than 210`
					: `${name
							.split("_")
							.join(
								" "
							)} entered is invalid, enter a valid number greater than ${height_min}.`
				: `${name
						.split("_")
						.join(" ")} entered is invalid, enter a valid number.`;

		case "weight_max":
			return numberRegex.test(value)
				? Number(value) > Number(weight_min)
					? 110 > Number(value)
						? ""
						: `enter the ${name.split("_").join(" ")} less than 110`
					: `${name
							.split("_")
							.join(
								" "
							)} entered is invalid, enter a valid number greater than ${weight_min}.`
				: `${name
						.split("_")
						.join(" ")} entered is invalid, enter a valid number.`;

		default:
			return;
	}
};

export default regexValidation;
