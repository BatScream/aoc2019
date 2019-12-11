 const fs = require('fs');
 const text = fs.readFileSync('input.txt','utf8');
 const data = [];
 text.split('\n').forEach(line => data.push(line.split("")));
 const Direction = {
     TOP: 0,
     TOP_RIGHT: 1,
     RIGHT: 2,
     BOTTOM_RIGHT: 3,
     BOTTOM: 4,
     BOTTOM_LEFT: 5,
     LEFT: 6,
     TOP_LEFT: 7
 }


 let winc;
 let maxNumberOfAestroids = 0;
 for(let row = 0;row<data.length;row++){
     for(let col = 0;col<data[row].length;col++){
         const item = data[row][col];
         if(item === '.') continue;
         const coordinates = getCoordinates({row, col});
         const aestroids = count(coordinates, data);
         if(aestroids > maxNumberOfAestroids){
             maxNumberOfAestroids = aestroids;
             winc = coordinates;
         }
     }
 }

 console.log(maxNumberOfAestroids);
 console.log(winc);


 function count(coordinates, data){
     const slopeMap = {};
     for(let row = 0;row<data.length;row++){
         for(let col = 0;col<data[row].length;col++){
             const currentCoordinates = getCoordinates({row, col});
             if((currentCoordinates.x === coordinates.x && currentCoordinates.y === coordinates.y) || data[row][col] === '.'){
                 continue;
             }
             const slope = calculateScope(coordinates, currentCoordinates);
             const direction = findDirection(coordinates, currentCoordinates);
             if(!slopeMap[slope]){
                 slopeMap[slope] = Object.keys(Direction).map(key => []);
             }
             slopeMap[slope][direction].push(currentCoordinates);
         }
     }
     //console.log(coordinates)
     //console.log(slopeMap);
     return Object.keys(slopeMap)
         .map(slope => slopeMap[slope]
         .map(direction => direction.length >= 1 ? 1 : 0)
         .reduce((acc, cur) => acc + cur, 0))
         .reduce((acc, cur) => acc + cur, 0);
 }

 function getCoordinates({row, col}){
     return {x: col, y: row};
 }

function calculateScope(pointA, pointB){
    const x2x1 = pointB.x - pointA.x;
    const y2y1 = pointB.y - pointA.y;
    if(y2y1 === 0){
        return 'und';
    }
    if(x2x1 === 0){
        return 0;
    }
    return y2y1/x2x1;
}

 function findDirection(pointA, pointB){
     if(pointA.x < pointB.x){
         if(pointA.y < pointB.y){
             return Direction.BOTTOM_RIGHT;
         }else if(pointA.y > pointB.y){
             return Direction.TOP_RIGHT;
         }
         return Direction.RIGHT;
     }
     else if(pointA.x > pointB.x){
         if(pointA.y < pointB.y){
             return Direction.BOTTOM_LEFT;
         }else if(pointA.y > pointB.y){
             return Direction.TOP_LEFT;
         }
         return Direction.LEFT;
     }
     else{
         if(pointA.y < pointB.y){
             return Direction.BOTTOM_LEFT;
         }else if(pointA.y > pointB.y){
             return Direction.TOP;
         }
     }
 }
//console.log(findDirection({x: 2, y:2}, {x: 4, y: 0}));

//console.log(calculateScope({x: 2, y:2}, {x: 1, y: 0}));