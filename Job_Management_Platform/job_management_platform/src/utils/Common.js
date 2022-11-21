export const getUserId = () => {
  var cookieEmail = document.cookie.valueOf("userEmail=").split(";")[0];
  var cookieId = document.cookie.valueOf("userSession=").split(";")[1];
  
  if (cookieId) {
    const tempId = cookieId.substring(13);
    const tempEmail = cookieEmail.substring(10);

    //console.log("tempEmail = " + tempEmail);
    //console.log("tempId = " + tempId);

    //a request was called, resets user session to 30 minutes
    document.cookie =
      "userEmail=none; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie =
      "userSession=none; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    document.cookie = `userEmail=${tempEmail}; max-age=3600 path=/;`;
    document.cookie = `userSession=${tempId}; max-age=3600; path=/;`;

//    console.log('30 more minutes')

    const userId = tempId;
    return userId;
  } else {
    console.log("No user logged in!");
    return null;
  }
};

export const getUserEmail = () => {
  var cookieEmail = document.cookie.valueOf("userEmail=").split(";")[0];
  var cookieId = document.cookie.valueOf("userSession=").split(";")[1];
  
  if (cookieEmail) {
    const tempId = cookieId.substring(13);
    const tempEmail = cookieEmail.substring(10);

    //console.log("tempEmail = " + tempEmail);
    //console.log("tempId = " + tempId);

    //a request was called, extends user session by 30 minutes
    document.cookie =
      "userEmail=none; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie =
      "userSession=none; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    document.cookie = `userEmail=${tempEmail}; max-age=1800; path=/;`;
    document.cookie = `userSession=${tempId}; max-age=1800; path=/;`;

    console.log('30 more minutes')

    const userEmail = tempEmail;
    return userEmail;
  } else {
    console.log("No user logged in!");
    return null;
  }
};

export const setUserSession = (userId, email) => {
  document.cookie = `userEmail=${email}; max-age=10; path=/;`;
  document.cookie = `userSession=${userId}; max-age=10; path=/;`;
};

export const deleteUser = () => {
  document.cookie =
    "userEmail=none; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  document.cookie =
    "userSession=none; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
