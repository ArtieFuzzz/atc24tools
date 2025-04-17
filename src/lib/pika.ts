import Pika from "pika-id";

export default new Pika([
	{
		prefix: "notams",
		description: "Unique identifier for a group of NOTAMs",
		secure: true,
	},
]);
