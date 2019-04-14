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
    // Array representing the desired output
    let resultArray = [];
    // Splits the received string with delimiter '\n'
    // Stores each line as an element of the array lines
    let lines = string.split("\n");
    // Filters the array lines to remove any empty line
    var filteredLines = lines.filter(function(el) {
      return /\S/.test(el);
    });
    // For each element of the array lines, call the function lineToObject
    // Stores its value as an element of resultArray
    for (var i = 0; i < filteredLines.length; i++) {
      resultArray[i] = this.lineToObject(filteredLines[i]);
    }
    // Returns the desired array
    // each element of resultArray is an object constructed of one received line
    return resultArray;
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
    let properties = line.split(/\s{2,}/);
    let str;
    // Creates an object from the array properties and returns it
    // Makes sure that the data types are correct
    let result = {
      description: properties[1],
      //Remove all the dots and white spaces from the classifier and add zeros at the end
      classifier:
        (str = properties[0].replace(/\./g, "").replace(/\s/, "")) +
        "0".repeat(6 - str.length),
      //For the following properties, the dots are removed, the comma is replaced by a
      //dot, and the last letter (currency) is removed from the end if exists
      openingBalance: Number(
        properties[2]
          .replace(/\./g, "")
          .replace(",", ".")
          .replace(/\D$/, "")
      ),
      debit: Number(
        properties[3]
          .replace(/\./g, "")
          .replace(",", ".")
          .replace(/\D$/, "")
      ),
      credit: Number(
        properties[4]
          .replace(/\./g, "")
          .replace(",", ".")
          .replace(/\D$/, "")
      ),
      finalBalance: Number(
        properties[5]
          .replace(/\./g, "")
          .replace(",", ".")
          .replace(/\D$/, "")
      )
    };
    //If the classifier is a multiple of 100000, then it has no parent
    //Else, remove all zeros at the end along with the last non zero number,
    //then fill the parents with zeros
    result.parent =
      Number(result.classifier) % 100000
        ? (str = result.classifier.replace(/0+$/, "").slice(0, -1)) +
          "0".repeat(6 - str.length)
        : null;
    return result;
  }
}
