const run = require('./IntCodeComputerForRobot.js');
const move = require('./RobotUtils.js');
const input = "3,8,1005,8,311,1106,0,11,0,0,0,104,1,104,0,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,0,10,4,10,1002,8,1,29,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,101,0,8,50,1,2,19,10,1006,0,23,1,103,14,10,1,1106,15,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,102,1,8,88,1006,0,59,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,1002,8,1,113,2,101,12,10,2,1001,0,10,2,1006,14,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,102,1,8,146,1,1106,11,10,1006,0,2,1,9,8,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,101,0,8,180,1,6,13,10,1,1102,15,10,2,7,1,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,0,8,10,4,10,1002,8,1,213,1006,0,74,2,1005,9,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,1002,8,1,243,3,8,1002,8,-1,10,101,1,10,10,4,10,108,1,8,10,4,10,101,0,8,264,2,104,8,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,1,8,10,4,10,1001,8,0,290,101,1,9,9,1007,9,952,10,1005,10,15,99,109,633,104,0,104,1,21101,387512640296,0,1,21101,0,328,0,1106,0,432,21102,1,665749660564,1,21101,339,0,0,1106,0,432,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21102,179318226984,1,1,21101,386,0,0,1105,1,432,21101,46266346499,0,1,21101,0,397,0,1105,1,432,3,10,104,0,104,0,3,10,104,0,104,0,21102,709580555028,1,1,21102,420,1,0,1106,0,432,21102,1,988220642068,1,21101,0,431,0,1106,0,432,99,109,2,21202,-1,1,1,21101,40,0,2,21102,1,463,3,21102,1,453,0,1106,0,496,109,-2,2106,0,0,0,1,0,0,1,109,2,3,10,204,-1,1001,458,459,474,4,0,1001,458,1,458,108,4,458,10,1006,10,490,1102,0,1,458,109,-2,2105,1,0,0,109,4,2102,1,-1,495,1207,-3,0,10,1006,10,513,21101,0,0,-3,21201,-3,0,1,22101,0,-2,2,21102,1,1,3,21101,532,0,0,1106,0,537,109,-4,2106,0,0,109,5,1207,-3,1,10,1006,10,560,2207,-4,-2,10,1006,10,560,22102,1,-4,-4,1105,1,628,21201,-4,0,1,21201,-3,-1,2,21202,-2,2,3,21102,1,579,0,1105,1,537,22101,0,1,-4,21101,1,0,-1,2207,-4,-2,10,1006,10,598,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,620,22101,0,-1,1,21102,620,1,0,106,0,495,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0".split(",").map(n => parseInt(n));;

let HullPaintingRobot = (program, moveFunc) => {

    let position = {x: 0, y: 0};
    let visitedPanels = {};
    let direction = '^';
    const computer = run(program);
    function start(){
        computer.next();
        let start = 0;
        while(true){
            let input = start === 0 ? 1: (getPanelColor(position) || 0);
            let colorCode = computer.next(input);
            while(typeof(colorCode.value) === 'undefined' && !colorCode.done){
                colorCode = computer.next(input);
            }
            if(colorCode.done) break;
            let directionCode = computer.next(input);
            while(typeof(directionCode.value) === 'undefined' && !directionCode.done){
                directionCode = computer.next(input);
            }
            if(directionCode.done) break;
            paint(position, colorCode.value);
            const result = moveFunc(position, direction, directionCode.value);
            position = result.position;
            direction = result.direction;
            start++;
        }
        return visitedPanels;
    }

    function paint(position, colorCode){
        const key = `${position.x},${position.y}`;
        visitedPanels[key] = colorCode;
    }

    function getPanelColor(position){
        const key = `${position.x},${position.y}`;
        return visitedPanels[key];
    }

    return {start};
}

function printGrid(grid) {
  const [[minX, maxX], [minY, maxY]] = Object.keys(grid)
    .map(x => x.split(',').map(Number))
    .reduce(
      (state, [x, y]) => {
        if (state[0][0] > x) state[0][0] = x
        if (state[0][1] < x) state[0][1] = x
        if (state[1][0] > y) state[1][0] = y
        if (state[1][1] < y) state[1][1] = y
        return state
      },
      [
        [Infinity, -Infinity],
        [Infinity, -Infinity]
      ]
    );

  let gridMap = ''
  for (let y = minY; y <= maxY; ++y) {
    for (let x = minX; x <= maxX; ++x) {
      gridMap += grid[`${x},${y}`] === 1 ? '#' : ' '
    }
    gridMap += '\n'
  }
  return gridMap
}


let robot = HullPaintingRobot(input, move);
const grid = robot.start();
console.log(printGrid(grid));

