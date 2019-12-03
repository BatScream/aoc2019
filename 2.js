const inp = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,1,19,5,23,2,23,6,27,1,27,5,31,2,6,31,35,1,5,35,39,2,39,9,43,1,43,5,47,1,10,47,51,1,51,6,55,1,55,10,59,1,59,6,63,2,13,63,67,1,9,67,71,2,6,71,75,1,5,75,79,1,9,79,83,2,6,83,87,1,5,87,91,2,6,91,95,2,95,9,99,1,99,6,103,1,103,13,107,2,13,107,111,2,111,10,115,1,115,6,119,1,6,119,123,2,6,123,127,1,127,5,131,2,131,6,135,1,135,2,139,1,139,9,0,99,2,14,0,0
];

for(let i=0;i<=99;i++){
    for(let j=0;j<=99;j++){
        const val = calc(i, j, [...inp]);
        if(val === 19690720){
            console.log(100*i+j);
            return;
        }
    }
}

function calc(noun, verb, data){
data[1] = noun;
data[2] = verb;
for(let i=0;i<data.length;i+=4)
{
    const opcode = data[i];
    if(opcode === 1){
        const one = data[data[i+1]];
        const two = data[data[i+2]];
        data[data[i+3]] = one + two;
    }
    if(opcode === 2){
        const one = data[data[i+1]];
        const two = data[data[i+2]];
        data[data[i+3]] = one * two;
    }
    if(opcode === 99){
        break;
    }
}
return data[0];
}

