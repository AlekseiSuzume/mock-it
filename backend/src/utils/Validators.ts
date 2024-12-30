import { XMLValidator } from 'fast-xml-parser';

export function isValidJSON(text: string) {
	try {
		JSON.parse(text);
		return true;
	} catch (e) {
		return false;
	}
}

export function isValidXML(text: string) {
	try {
		const result = XMLValidator.validate(text);
		if (result === true) {
			return true;
		}
	} catch (e) {
		return false;
	}
}
