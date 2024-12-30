class Converters {
	toISOString(date: Date) {
		return date.toISOString().replace('T', ' ').replace('Z', '');
	}
}

export const converter = new Converters();
