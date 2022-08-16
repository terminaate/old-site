class TextService {
	public static utf8ToHex(s: string): string {
		const utf8encoder = new TextEncoder();
		const encodedBuffer = utf8encoder.encode(s);
		let encodedString = '';
		for (const b of encodedBuffer) {
			encodedString += '0x' + ('0' + b.toString(16)).slice(-2);
		}
		return encodedString;
	}
}

export default TextService;