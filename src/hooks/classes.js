export default (...classesList) => {
	const formatedClasses = [];
	if (!Array.isArray(classesList)) {
		return;
	}

	for (const classes of classesList) {
		if (typeof classes === 'object' && !Array.isArray(classes)) {
			for (const classKey in classes) {
				if (classes[classKey]) {
					formatedClasses.push(classKey);
				}
			}
		} else if (Array.isArray(classes)) {
			formatedClasses.push(...classes);
		} else if (typeof classes === 'string') {
			formatedClasses.push(classes);
		}
	}

	return formatedClasses.join(' ');
}