export const initialLoginState = {
    isLoading: true,
    email: null,
    userToken: null,
  };

export const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "SIGNIN":
        return {
          ...prevState,
          email: action.email,
          isLoading: false,
        };
      case "SIGNOUT":
        return { ...prevState, isLoading: false, email: null, userToken: null };
    }
  };