export const getUser = () => {
    const userId = document.cookie.valueOf('userSession=').substring(12)
    console.log(userId)

    if (userId) return userId
    else return null;
  }
  
  export const setUserSession = (userId, email) => {
    document.cookie = `userSession=${userId}; max-age=3600; path=/;`;
    document.cookie = `userEmail=${email}; max-age=3600; path=/;`;
  }

  export const deleteUser = () => {
    document.cookie = 'userSession=none; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    document.cookie = 'userEmail=none; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }