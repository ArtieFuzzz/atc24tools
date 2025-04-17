import Pika from "pika-id";

export default new Pika([
	{
		prefix: "notam",
		description: "Unique identifier for a NOtice To Air Men",
		secure: false,
	},
]);
