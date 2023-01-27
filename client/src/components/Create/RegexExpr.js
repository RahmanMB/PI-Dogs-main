/* const nameRegex =
  /^[a-zA-ZÃ§Ã‡Ä±ÄŸÄžÄ°Ã¶Ã-ÅŸÅžÃ¼Ãœ]+(?:\s[a-zA-ZÃ§Ã‡Ä±ÄŸÄžÄ°Ã¶Ã-ÅŸÅžÃ¼Ãœ]+)+$/; */
const nameRegex =
	/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(([',. -][a-zA-ZÀ-ÖØ-öø-ÿ])?[a-zA-ZÀ-ÖØ-öø-ÿ]*)*$/;
const numberRegex =
	/^(?!0\d|[2-9]\d{1}|1[8-9]\d|190)[3-9]|1\d{1,2}(\.\d{1,2})?$/;
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
