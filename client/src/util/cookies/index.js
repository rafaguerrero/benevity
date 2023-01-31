export const setCookieData = (name, value, expires) => {
  let expiration = '';

  if(expires) {
      const date = new Date();
      date.setTime(date.getTime() + expires);
      expiration = `expires=${date.toUTCString()};`;
  }

  document.cookie = `${name}=${value};${expiration}`;
};

export const getCookieData = (name) => {
  const cookie = document.cookie.split('; ').find(cookie => cookie.startsWith(`${name}=`));
  return cookie ? cookie.split('=')[1] : null;
};

export const removeCookieData = (name) => {
  setCookieData(name, '', 0);
};
