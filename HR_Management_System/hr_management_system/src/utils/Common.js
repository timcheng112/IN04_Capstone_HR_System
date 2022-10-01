export const getUserId = () => {
  var cookie = document.cookie.valueOf("userSession=").split(";")[1]

  if (cookie) {
    const userId = cookie.substring(13);
    console.log(userId);
    return userId;
  } else {
    console.log('No user logged in!')
    return null;
  }
  
};

export const getUserEmail = () => {
  const userEmail = document.cookie.valueOf("userEmail=").substring(10).split(";")[0];
  console.log(userEmail);

  if (userEmail) return userEmail;
  else return null;
};

export const setUserSession = (userId, email) => {
  document.cookie = `userEmail=${email}; max-age=3600; path=/;`;
  document.cookie = `userSession=${userId}; max-age=3600; path=/;`;
};

export const deleteUser = () => {
  document.cookie =
    "userEmail=none; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  document.cookie =
    "userSession=none; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
