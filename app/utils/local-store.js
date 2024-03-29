// @flow
const electron = require('electron');
const path = require('path');
const fs = require('fs');

/**
 * Create a local file in which persistent data cand be stored
 */
class LocalStore {
  path: string;

  data: Object;

  constructor(opts: Object) {
    // Get app data path
    const userDataPath = (electron.app || electron.remote.app).getPath(
      'userData'
    );

    // Set the name of the file using [configName] parameter
    this.path = path.join(userDataPath, `${opts.configName  }.json`);

    this.data = parseDataFile(this.path, opts.defaults);
  }

  // This will just return the property on the `data` object
  get(key: string): string {
    return this.data[key];
  }

  // ...and this will set it
  set(key: string, val: string) {
    this.data[key] = val;

    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

/**
 * Returns the data stored in the store
 *
 * @param {String} filePath the path to the file wich contains the store
 * @param {Object} defaults defalut params of the store
 * @returns an object wich contains the params that were set in the store
 */
function parseDataFile(filePath: string, defaults: Object): Object {
  try {
    return JSON.parse(fs.readFileSync(filePath).toString());
  } catch (error) {
    // If there was some kind of error, return the passed in defaults instead.
    return defaults;
  }
}

// expose the class
export default LocalStore;
