 export const validateAndUpdateWidth = ({newTable, tableIndex, width}) => {
    let updatedWidth = parseInt(width);
    if(tableIndex === 0) {
        if(updatedWidth <= 20 || isNaN(updatedWidth)) {
            updatedWidth = 20;
        } else {
            updatedWidth = parseInt(newTable[1].width) + parseInt(newTable[2].width) + updatedWidth > 95
                ? 95 - parseInt(newTable[1].width) - parseInt(newTable[2].width) : updatedWidth;
        }
    }
    if(tableIndex === 1) {
        if(updatedWidth <= 20 || isNaN(updatedWidth)) {
            updatedWidth = 20;
        } else {
            updatedWidth = parseInt(newTable[2].width) + parseInt(newTable[0].width) + updatedWidth > 95
                ? 95 - parseInt(newTable[2].width) - parseInt(newTable[0].width) : updatedWidth;
        }
    }
    if(tableIndex === 2) {
        if(updatedWidth <= 20 || isNaN(updatedWidth)) {
            updatedWidth = 20;
        } else {
            updatedWidth = parseInt(newTable[1].width) + parseInt(newTable[0].width) + updatedWidth > 95
                ? 95 - parseInt(newTable[1].width) - parseInt(newTable[0].width) : updatedWidth;
        }
    }
    return updatedWidth;
};

 export const validateInputs = ({ numberStartN, numberIncreaseByX, numberEndM }) => {
     console.log('fefwefewjflkewjfkldsjlkjdslkfjlkdsj',typeof numberStartN,typeof numberIncreaseByX,typeof numberEndM)
     if(numberStartN === "" || numberIncreaseByX === "" || numberEndM === "") {
         return 'all input fields are required. to proceed';
     }

     if(numberStartN >= numberEndM) {
         return 'input N must be greater than input M';
     }

     if(numberEndM <= 0) {
         return 'input M must be greater than 0';
     }

     if(numberIncreaseByX <= 0) {
         return 'input X must be great than 0';
     }

     return 'pass';
 };