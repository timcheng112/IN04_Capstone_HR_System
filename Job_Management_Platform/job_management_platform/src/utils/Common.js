export const getUser = () => {
    const userId = document.cookie.valueOf('userSession=').substring(12)
    console.log(userId)

    if (userId) return userId
    else return null;
  }
  
  export const setUserSession = (userId) => {
    document.cookie = `userSession=${userId}; max-age=10; path=/;`;
  }