String.prototype.uppercaseFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.lowercaseFirstLetter = function() {
	return this.charAt(0).toLowerCase() + this.slice(1);
};

export function withUppercaseKeys(obj) {
    const objWithCapitalizedKeys = {};
    for(const entity in obj) {
        objWithCapitalizedKeys[entity.uppercaseFirstLetter()] = obj[entity];
    }
    return objWithCapitalizedKeys;
}

export function withLowercaseKeys(obj) {
    const objWithLowercaseKeys = {};
    for(const entity in obj) {
        objWithLowercaseKeys[entity.lowercaseFirstLetter()] = obj[entity];
    }
    return objWithLowercaseKeys;
}


