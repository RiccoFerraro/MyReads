class TitleUtility {

    public static makePascalOrCamelCaseToTitle(shelf: string | undefined) {
        // If the string is empty
        if (!(shelf) || shelf.length === 0 || !shelf.trim()) {
            return shelf;
        }
        let upperCaseWithAddedSpaceResult = shelf.replace(/([A-Z])/g, " $1");

        let result = `${upperCaseWithAddedSpaceResult.charAt(0)
            .toUpperCase()}${upperCaseWithAddedSpaceResult.slice(1)}`;

        return result;
    }
}

export default TitleUtility;