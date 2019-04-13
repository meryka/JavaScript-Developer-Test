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
      return el;
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
    // Creates an object from the array properties and returns it
    // Makes sure that the data types are correct
    return {
      description: properties[1],
      classifier: properties[0],
      openingBalance: Number(properties[2]),
      debit: Number(properties[3]),
      credit: Number(properties[4]),
      finalBalance: Number(properties[5])
    };
  }
}
