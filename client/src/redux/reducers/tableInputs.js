const tableInputReducerDefaultState = [];

export default (state = tableInputReducerDefaultState, action) => {
    switch (action.type) {
        case 'UPDATE_TABLE':
            return [
                ...action.payload.table
            ];
        default:
            return state;
    }
};
