
const MODES = Object.freeze({
    POSITION: 0,
    IMMEDIATE: 1,
    RELATIVE: 2
});

const INSTRUCTIONS = Object.freeze({
  ADD: 1,
  MUL: 2,
  INPUT: 3,
  OUTPUT: 4,
  JUMP_IF_TRUE: 5,
  JUMP_IF_FALSE: 6,
  LESS_THAN: 7,
  EQUALS: 8,
  ADJUST_RELATIVE_BASE: 9,
  HALT: 99
});

const run = function *(instructions){
    let relativeBase = 0;
    let data = instructions.slice();
    for(let i=0;i<instructions.length;)
    {   
        const result = parseCode(data[i]);
        const opcode = result.opcode;
        const modes = result.parameterModes;
        switch(opcode){
            case INSTRUCTIONS.ADD:{
                const x = getValue(data[i+1], modes[2]);
                const y = getValue(data[i+2], modes[1])
                setValue(data[i+3], x + y, modes[0]);
                i+=4;
            }
                break;
            case INSTRUCTIONS.MUL:{
                const x = getValue(data[i+1], modes[2]);
                const y = getValue(data[i+2], modes[1]);
                setValue(data[i+3], x * y, modes[0]);
                i+=4;
            }
                break;
            case INSTRUCTIONS.INPUT:
                setValue(data[i+1], yield, modes[2]);
                i+=2;
                break;
            case INSTRUCTIONS.OUTPUT:
                yield getValue(data[i+1], modes[2]);
                i+=2;
                break;
            case INSTRUCTIONS.JUMP_IF_TRUE:{
                const compare = getValue(data[i+1], modes[2]);
                const jumpTo = getValue(data[i+2], modes[1]);
                if (compare !== 0) {
                    i = jumpTo;
                }else{
                    i+=3;
                }

            }
                break;
            case INSTRUCTIONS.JUMP_IF_FALSE:{
                const compare = getValue(data[i+1], modes[2]);
                const jumpTo = getValue(data[i+2], modes[1]);
                if (compare === 0) {
                    i = jumpTo;
                }else{
                    i+=3;
                }
            }
                break;
            case INSTRUCTIONS.LESS_THAN:{
                const x = getValue(data[i+1], modes[2]);
                const y = getValue(data[i+2], modes[1]);
                setValue(data[i+3], x < y ? 1 : 0, modes[0]);
                i+=4;
            }
                break;
            case INSTRUCTIONS.EQUALS:{
                const x = getValue(data[i+1], modes[2]);
                const y = getValue(data[i+2], modes[1]);
                setValue(data[i+3], x === y ? 1 : 0, modes[0]);
                i+=4;
            }
                break;
            case INSTRUCTIONS.ADJUST_RELATIVE_BASE:{
                const adjustBy = getValue(data[i+1], modes[2]);
                relativeBase += adjustBy;
                i+=2;
            }
                break;
            case INSTRUCTIONS.HALT:
                return;
        }
    }

    function getValue(value, mode = MODES.POSITION) {
        if (mode === MODES.POSITION) {
          return data[value] || 0;
        } else if (mode === MODES.IMMEDIATE) {
          return value;
        } else if (mode === MODES.RELATIVE) {
          return data[relativeBase + value] || 0;
        }
    }

    function setValue(index, value, mode = 0) {
        if (mode === MODES.POSITION) {
          data[index] = value;
        } else if (mode === MODES.RELATIVE) {
          data[relativeBase + index] = value;
        }
      }

    function parseCode(instruction){
        const parsed = String(instruction)
            .padStart(5, '0')
            .split('')
        const opcode = Number(parsed.slice(3).join(''));
        const parameterModes = parsed.slice(0, 3).map(modes => parseInt(modes));
        return{
            opcode,
            parameterModes
        }
    }      
}

module.exports = run;
