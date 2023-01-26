const validation = (data) => {
	const errors = {};
	if (!data.name) errors.name = "You must enter a name";
	if (!Number(data.height_min))
		errors.height_min = "Enter a valid minimum height";
	if (!Number(data.height_max))
		errors.height_max = "Enter a valid maximum height";
	if (!Number(data.weight_min))
		errors.weight_min = "Enter a valid minimum weight";
	if (!Number(data.weight_max))
		errors.weight_max = "Enter a valid maximum weight";
	if (!data.life_span) errors.life_span = "You must enter a life span";
	if (!data.image) errors.image = "Insert a valid image";
	return errors;
};
export default validation;
