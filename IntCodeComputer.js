const run  =  function *(program){
    let output = 0;
    let numberOfInputInstProcessed = 0;
    console.log('initial numberOfInputInstProcessed', numberOfInputInstProcessed);
    for(let i=0;i<program.length;)
    {
        if(program[i] === 99){
            console.log('quiting ', output);
            return;
        }
        if(program[i] === 4){
            output = program[program[i+1]];
            i+=2;
            console.log('yielding ', output);
            yield output;
            continue;
        }
        if(program[i] === 3){
            numberOfInputInstProcessed++;
            console.log('numberOfInputInstProcessed', numberOfInputInstProcessed);
            console.log('yielding for input ');
            program[program[i+1]] = yield;
            console.log('received input ', program[program[i+1]]);
            i+=2;
            continue;
        }
        const result = parseCode(program[i]);
        const opcode = result.opcode;
        const parameterModes = result.parameterModes;
        const parameterModeOne = parameterModes[0] || 0;
        const parameterModeTwo = parameterModes[1] || 0;
        const one = parameterModeOne? program[i+1] : program[program[i+1]];
        const two = parameterModeTwo? program[i+2] : program[program[i+2]];
        if(opcode === 5){
            if(one){
                i = two;
            }
            else{
                i+=3;
            }
            continue;
        }
        if(opcode === 6){
            if(!one){
                i = two;
            }
            else{
                i+=3;
            }
            continue;
        }
        if(opcode === 7){
            if(one < two){
                program[program[i+3]] = 1;
            }
            else{
                program[program[i+3]] = 0;
            }
            i+=4;
            continue;
        }
        if(opcode === 8){
            if(one === two){
                program[program[i+3]] = 1;
            }
            else{
                program[program[i+3]] = 0;
            }
            i+=4;
            continue;
        }                           
        if(opcode === 1 || opcode === 2){
            if(opcode === 1){
                program[program[i+3]] = one + two;
            }
            else{
                program[program[i+3]] = one * two;
            } 
            i+=4;
        }
        else i+=4;
    }
}

function parseCode(code){
    const opcode = code%100;
    const parameterModes = Math.floor(code/100).toString().split('').reverse().map(m => parseInt(m));
    return{
        opcode,
        parameterModes
    }
}

module.exports = run;