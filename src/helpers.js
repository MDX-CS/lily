import DotEnv from 'dotenv';

DotEnv.config();

/**
 * Communication with the env file.
 *
 * @param   {string} key  The key to be returned
 * @param   {string} empty  The defualt value
 * @returns {string} value  The env value
 */
function env(key, empty) {
  if (key in process.env) {
    return process.env[key];
  }

  if (empty !== undefined) {
    return empty;
  }

  return '';
}

export default {
  env,
};
