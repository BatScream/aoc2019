
const MODES = Object.freeze({
    POSITION: 0,
    IMMEDIATE: 1,
    RELATIVE: 2
});

const run = function * (instructions){
    let relativeBase = 0;
    let data = [...instructions];
    for(let i=0;i<instructions.length;)
    {
        if(data[i] === 99){
            break;
        }
        const result = parseCode(data[i]);
        const opcode = result.opcode;
        const parameterModes = result.parameterModes;
        const parameterModeOne = parameterModes[0] || 0;
        const parameterModeTwo = parameterModes[1] || 0;
        const parameterModeThree = parameterModes[2] || 0;
    
        const one = (parameterModeOne == MODES.IMMEDIATE) ? data[i+1] : (parameterModeOne == MODES.POSITION) ? data[data[i+1]] : data[data[i+1] + relativeBase];
        const two = (parameterModeTwo == MODES.IMMEDIATE) ? data[i+2] : (parameterModeOne == MODES.POSITION) ? data[data[i+2]] : data[data[i+2] + relativeBase];
        if(opcode === 3){
            //console.log('yielding for input');
            data[parameterModeOne === 2 ? data[i+1] + relativeBase : data[i+1]] = yield;
            //console.log('got input yielding', data[parameterModeOne === 2 ? data[i+1] + relativeBase : data[i+1]]);
            i+=2;
            continue;
        }
        if(opcode === 4){
            console.log('yielding output', one);
            yield one;
            i+=2;
            continue;
        }
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
                data[parameterModeThree === 2 ? data[i+3] + relativeBase : data[i+3]] = 1;
            }
            else{
                data[parameterModeThree === 2 ? data[i+3] + relativeBase : data[i+3]] = 0;
            }
            i+=4;
            continue;
        }
        if(opcode === 8){
            if(one === two){
                data[parameterModeThree === 2 ? data[i+3] + relativeBase : data[i+3]] = 1;
            }
            else{
                data[parameterModeThree === 2 ? data[i+3] + relativeBase : data[i+3]] = 0;
            }
            i+=4;
            continue;
        }
        if(opcode === 9){
            relativeBase += one;
            data = Array.from({length: data.length + one}, (v, index) => data[index] || 0);
            i+=2;
            continue;
        }
        if(opcode === 1 || opcode === 2){
            if(opcode === 1){
                data[parameterModeThree === 2 ? data[i+3] + relativeBase : data[i+3]] = one + two;
            }
            else{
                data[parameterModeThree === 2 ? data[i+3] + relativeBase : data[i+3]] = one * two;
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
