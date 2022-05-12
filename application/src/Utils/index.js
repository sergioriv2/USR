const initialFetchingState = { loading: "idle", error: null, entity: {} };
const initialCareerState =
  {
    entity: {
      uid: JSON.parse(window.localStorage.getItem("career"))?.uid,
      descripcion: JSON.parse(window.localStorage.getItem("career"))
        ?.descripcion,
    },
  } || null;

export const makeLogoutReducer =
  () =>
  (state = { entity: false }, action) => {
    switch (action.type) {
      case "logout/set": {
        if (action.payload === true) {
          window.localStorage.removeItem("career");
          window.localStorage.removeItem("token");
        }
        return { entity: action.payload };
      }
      default:
        return state;
    }
  };

export const makeCareerReducer =
  () =>
  (state = initialCareerState, action) => {
    switch (action.type) {
      case "career/set": {
        window.localStorage.setItem("career", JSON.stringify(action.payload));
        return { entity: action.payload };
      }
      default:
        return state;
    }
  };

//Higher order reducer
export const makeFetchingReducer =
  (actions) =>
  (state = initialFetchingState, action) => {
    switch (action.type) {
      case actions[0]: {
        return { ...state, loading: "pending" };
      }
      case actions[1]: {
        localStorage.setItem("token", action.payload.token);

        return { entity: action.payload, loading: "succeded" };
      }
      case actions[2]: {
        return { error: action.error, loading: "rejected" };
      }
      default:
        return state;
    }
  };

export const makeUserReducer =
  (actions) =>
  (state = initialFetchingState, action) => {
    switch (action.type) {
      case actions[0]: {
        return { ...state, loading: "pending" };
      }
      case actions[1]: {
        return { entity: action.payload, loading: "succeded" };
      }
      case actions[2]: {
        return { error: action.error, loading: "rejected" };
      }
      default:
        return state;
    }
  };

//Make action creator
export const mac =
  (type, ...argNames) =>
  (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };

// CRUD Async types
export const makeAsyncTypes = (e) => [
  `${e}/pending`,
  `${e}/fulfilled`,
  `${e}/rejected`,
];

export const asyncFetchMac = (asyncTypes) => [
  mac(asyncTypes[0]),
  mac(asyncTypes[1], "payload"),
  mac(asyncTypes[2], "error"),
];
