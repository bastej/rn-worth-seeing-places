const variables = {
  development: {
    googleApiKey: "AIzaSyDIkCvDsASBHqtbP7lahJ-8Us2rh-vVu9g",
  },
  production: {
    googleApiKey: "AIzaSyDIkCvDsASBHqtbP7lahJ-8Us2rh-vVu9g",
  },
};

const getEnvVariables = () => {
  if (__DEV__) {
    return variables.development; // return this if in development mode
  }
  return variables.production; // otherwise, return this
};

export default getEnvVariables; // export a reference to the function
