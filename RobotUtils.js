const move = function(currentPos, currentDir, directionCode){
    let finalPosition;
    let finalDir;
    if(directionCode === 0){ //left
        if(currentDir === '^'){
            finalDir = '<';
        }
        else if(currentDir === '<'){
            finalDir = 'v';
        }
        else if(currentDir === 'v'){
            finalDir = '>';
        }
        else if(currentDir === '>'){
            finalDir = '^';
        }
        else throw 'Invalid current direction';
    }
    else if(directionCode === 1){ //right
        if(currentDir === '^'){
                finalDir = '>';
        }
        else if(currentDir === '>'){
            finalDir = 'v';
        }
        else if(currentDir === 'v'){
            finalDir = '<';
        }
        else if(currentDir === '<'){
            finalDir = '^';
        }
        else {
            throw new Error('Invalid current direction');
        }
    }
    // calculate new position
    if(finalDir === '^'){
        finalPosition = {x: currentPos.x, y: currentPos.y + 1};
    }
    else if(finalDir === '>'){
        finalPosition = {x: currentPos.x + 1, y: currentPos.y};
    }
    else if(finalDir === 'v'){
        finalPosition = {x: currentPos.x, y: currentPos.y - 1};
    }
    else if(finalDir === '<'){
        finalPosition = {x: currentPos.x - 1, y: currentPos.y};
    }
    else {
        throw new Error(`Invalid finalDir: ${finalDir}, currentDir: ${currentDir}, directionCode: ${directionCode}`);
    }
    return {position: finalPosition, direction: finalDir};
}

module.exports = move;