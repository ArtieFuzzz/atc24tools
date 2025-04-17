export const AERODROMES = ["IPPH"]; // Supported Aerodromes.

export const validLocation = (location: string): boolean => {
	return AERODROMES.includes(location.toUpperCase());
};
