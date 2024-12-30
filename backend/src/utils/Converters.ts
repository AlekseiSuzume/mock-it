class Converters {
	toISOString(date: Date) {
		return date.toISOString().replace('Z', '');
	}
}

export const converter = new Converters();
