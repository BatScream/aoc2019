const start = 193651;
const end = 649729;
const passwords = [];
for(let i=start;i<=end;i++){
    if(compute(i)){
        passwords.push(i);
    }
}
console.log(passwords.length);

function compute(num){
    const arr = num.toString().split('');
    let foundSamePair = false;
    let neverDecrease = true;
    let pointer = 0;
    while(pointer < arr.length){
        const result = isSame(arr, pointer);
        if(result.found){
            foundSamePair = true;
            break;
        }
        else{
            pointer = result.pointer;
        }
    }

    if(!foundSamePair) return false;
    let max = arr[0];
    for(let i = 1;i < arr.length; i++){
        let cur = arr[i];
        if(cur >= max){
            max = cur;
        }else{
            neverDecrease = false;
            break;
        }
    }
    return foundSamePair && neverDecrease;
}

function isSame(arr, pointer){
    let value = arr[pointer];
    let numberOFStepsMoved = 0;
    while(arr[pointer] === value){
        pointer++;
        numberOFStepsMoved++;
    }
    if(numberOFStepsMoved === 2) return {pointer, found: true};
    return {pointer, found: false};
    
}
