/**
 * author @mery
 * Proposed solution for level 1
 * ES6 class
 * Contains property @array representing the desired collection
 */
export default class Collection {
  /**
   * Constructor
   * @param {string} string the string received by the user
   * @returns {array} the array property of the collection representing the desired output
   */
  constructor(string) {
    // calls the stringToCollection function with the received string and stores its value to the array property
    this.array = this.stringToCollection(string);
    // returs the array property
    return this.getArray();
  }
  /**
   * @returns {array} the array property of the collection class
   */
  getArray() {
    return this.array;
  }
  /**
   * Transforms the string received to the array desired
   * @param {string} string the string received by the user
   * @returns {array} the desired array
   */
  stringToCollection(string) {
    let maxLength = 0;
    // Array representing the desired output
    let resultArray = [];
    // Splits the received string with delimiter '\n'
    // Stores each line as an element of the array lines
    let lines = string.split("\n");
    // Filters the array lines to remove any empty line
    // Modified this to remove lines that don't start with a digit (headings)
    let filteredLines = lines.filter(function(el) {
      el = el.trim();
      return el && /^\d/.test(el);
    });

    // For each element of the array lines, trim it (remove white spaces in the beg and end),
    // then call the function lineToObject
    // Stores its value as an element of resultArray
    for (var i = 0; i < filteredLines.length; i++) {
      resultArray[i] = this.lineToObject(filteredLines[i].trim());
      maxLength =
        resultArray[i].classifier.length > maxLength
          ? resultArray[i].classifier.length
          : maxLength;
    }
    // Returns the desired array
    // each element of resultArray is an object constructed of one received line
    return this.formatClassifier(resultArray, maxLength);
  }
  /**
   * Receives a line and returns the desired object
   * @param {string} line a line of the input
   * @returns {object} the desired object
   */
  lineToObject(line) {
    // Composed descriptions have one space between each word
    // that's why spliting the line with a delimiter of one space or more will not work.
    // Splits the line with a delimiter of two spaces or more
    // Stores each property as an element of the array properties

    let properties = line.replace(/[" "]{2,}/g, "\t").split(/[\f\n\r\t\v]/g);
    //Filter the array properties to remove any monetary data (a single non digit character)
    let filteredProperties = properties.filter(function(el) {
      return el && !/^\D{1}$/.test(el);
    });
    let str;
    // Creates an object from the array properties and returns it
    // Makes sure that the data types are correct
    let start = filteredProperties[1]
      .replace(/\./g, "")
      .replace(/\s/, "")
      .match(/^\d+$/)
      ? 1
      : 0;
    let result = {
      //removes all the unnecessary characters from the description
      description: filteredProperties[start + 1].replace(/\*/g, "").trim(),
      //Remove all the dots and white spaces from the classifier and add zeros at the end
      //modified this to fit the test cases of level 3 (long classifiers)
      classifier:
        (str = properties[start].replace(/\./g, "").replace(/\s/, "")) +
        (str.length > 6
          ? str.length > 9
            ? "0".repeat(10 - str.length)
            : "0".repeat(9 - str.length)
          : "0".repeat(6 - str.length)),
      //For the following properties, the dots are removed, the comma is replaced by a
      //dot, and the last letter (currency) is removed from the end if exists

      openingBalance: Number(
        filteredProperties[start + 2]
          .replace(/\./g, "")
          .replace(",", ".")
          .replace(/\D$/, "")
          .trim()
      ),
      debit: Number(
        filteredProperties[start + 3]
          .replace(/\./g, "")
          .replace(",", ".")
          .replace(/\D$/, "")
          .trim()
      ),
      credit: Number(
        filteredProperties[start + 4]
          .replace(/\./g, "")
          .replace(",", ".")
          .replace(/\D$/, "")
          .trim()
      ),
      finalBalance: Number(
        filteredProperties[start + 5]
          .replace(/\./g, "")
          .replace(",", ".")
          .replace(/\D$/, "")
          .trim()
      )
    };

    //If the classifier is a multiple of 100000, then it has no parent
    //Else, remove two zeros or more zeros from the end
    //if the length of the result is 3 or less, remove the last digit
    //else, if the length is more than 3, remove the last two digits
    //then fill the parents with zeros
    result.parent =
      Number(result.classifier) % 10 ** (result.classifier.length - 1)
        ? (str = str.replace(/0{2,}$/, "")).length > 3
          ? str.slice(0, -2)
          : str.slice(0, -1)
        : null;
    return result;
  }

  formatClassifier(collection, maxLength) {
    collection.forEach(function(object) {
      let classifierLength = object.classifier.length;
      object.classifier += "0".repeat(maxLength - classifierLength);
      if (object.parent) {
        let parentLength = object.parent.length;
        object.parent += "0".repeat(maxLength - parentLength);
      }
    });
    return collection;
  }
}
