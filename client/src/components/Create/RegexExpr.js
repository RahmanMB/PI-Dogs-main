const nameRegex =
	/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(([',. -][a-zA-ZÀ-ÖØ-öø-ÿ])?[a-zA-ZÀ-ÖØ-öø-ÿ]*)*$/;
const numberRegex = /^-?[0-9]+(\.[0-9]+)?$/;
const urlRegex =
	// eslint-disable-next-line no-useless-escape
	/^((https?:)(\/\/\/?)([\w]*(?::[\w]*)?@)?([\d\w\.-]+)(?::(\d+))?)?([\/\\\w\.()-]*)?(?:([?][^#]*)?(#.*)?)*/gim;

const regexValidation = (name, value) => {
	switch (name) {
		case "name":
			return nameRegex.test(value)
				? ""
				: `${name} entered is invalid, try another one.`;

		case "image":
			return urlRegex.test(value)
				? ""
				: `${name} entered is invalid, try another one.`;

		default:
			return numberRegex.test(value)
				? ""
				: `${name} entered is invalid, enter a valid number.`;
	}
};

export default regexValidation;
