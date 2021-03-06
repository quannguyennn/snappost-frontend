let initialState = {
    showCreatePost: false,
    isDark: false,
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_CREATE_POST":
            return { ...state, showCreatePost: !state.showCreatePost }
        case "SET_MOOD":
            return { ...state, isDark: action.data.isDark }
        case "TOGGLE_DARK_MOOD":
            return { ...state, isDark: !state.isDark }
        default:
            return state;
    }
}

export default uiReducer;