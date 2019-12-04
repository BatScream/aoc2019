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
    for(let i = 0;i < arr.length-1; i++){
        if(arr[i] == arr[i+1]){
            foundSamePair = true;
            break;
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
