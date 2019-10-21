export const updateTable = (table) => {
    return {
        type: 'UPDATE_TABLE',
        payload: {
            table
        }
    }
};