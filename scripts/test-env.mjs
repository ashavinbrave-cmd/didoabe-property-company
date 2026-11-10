import os from 'node:os';

const getUserInfo = os.userInfo.bind(os);
os.userInfo = (...args) => {
  try {
    return getUserInfo(...args);
  } catch {
    // tsx only needs a per-user temporary directory suffix. Some restricted
    // Windows environments reject the native username lookup.
    return { username: process.env.USERNAME || 'didoabe-tests' };
  }
};
