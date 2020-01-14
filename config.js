import Constants from 'expo-constants';

export const prodUrl = "https://someapp.herokuapp.com";

const ENV_CONFIG = {
  dev: {
    apiUrl: "http://localhost:3000",
  },
  staging: {
    apiUrl: prodUrl,
  },
  prod: {
    apiUrl: prodUrl,
  }
};

const getEnvVars = (env = "") => {
  if (env === null || env === undefined || env === "") return ENV_CONFIG.dev;
  if (env.indexOf("dev") !== -1) return ENV_CONFIG.dev;
  if (env.indexOf("staging") !== -1) return ENV_CONFIG.staging;
  if (env.indexOf("prod") !== -1) return ENV_CONFIG.prod;
}

export const ENV = getEnvVars(Constants.manifest.releaseChannel);