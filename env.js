const variables = {
  development: {
    googleApiKey: "AIzaSyAyMq-QwUBWjOB4o5MvHwO5HKYHMxLJTzo",
  },
  production: {
    googleApiKey: "AIzaSyAyMq-QwUBWjOB4o5MvHwO5HKYHMxLJTzo",
  },
};

const getEnvVariables = () => {
  if (__DEV__) {
    return variables.development; // return this if in development mode
  }
  return variables.production; // otherwise, return this
};

export default getEnvVariables; // export a reference to the function
