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

 const location = { x: 23, y: 19 };
 const aestroids = getAestroidDetails(location, data);
 let i = 0;
 let eliminatedAestroids = 0;
 let lastEliminatedAestroid;
 while(eliminatedAestroids < 200){
     let element = aestroids[i].splice(0, 1);
     if(element.length == 1){
         lastEliminatedAestroid = element;
         eliminatedAestroids++;
     }
     i++;
 }

 console.log((lastEliminatedAestroid[0].location.x * 100) + lastEliminatedAestroid[0].location.y);


 function getAestroidDetails(coordinates, data){
     const aestroids = [];
     for(let row = 0;row<data.length;row++){
         for(let col = 0;col<data[row].length;col++){
             const currentCoordinates = getCoordinates({row, col});
             if((currentCoordinates.x === coordinates.x && currentCoordinates.y === coordinates.y) || data[row][col] === '.'){
                 continue;
             }
             const direction = findDirection(coordinates, currentCoordinates);
             const angle = getAngle(coordinates, currentCoordinates);
             const distance = getDistance(coordinates, currentCoordinates);
             aestroids.push({location: currentCoordinates, direction, angle, distance});
         }
     }
        aestroids.sort((a, b) => {
        if(a.direction < b.direction) return -1;
        if(a.direction > b.direction) return 1;
        if(a.angle < b.angle) return -1;
        if(a.angle > b.angle) return 1;
        if(a.distance < b.distance) return -1;
        if(a.distance > b.distance) return 1;
        return 0;
        });
             
        let prevAestroid = aestroids[0];
        let result = [[prevAestroid]];
        let index = 0;
        for(let i=1;i<aestroids.length;i++){
            const currentAestroid = aestroids[i];
            if(prevAestroid.direction === currentAestroid.direction && prevAestroid.angle === currentAestroid.angle){
                result[index].push(currentAestroid);
            }else {
                result.push([currentAestroid]);
                index++;
            }
            prevAestroid = currentAestroid;
        }
     return result;
 }
 function getAngle(pointA, pointB) {
  var dy = pointA.y - pointB.y;
  var dx = pointA.x - pointB.x;
  var theta = Math.atan2(dy, dx);
  theta *= 180 / Math.PI;
  return theta;
}

function getDistance(pointA, pointB){
    return Math.abs(pointA.x-pointB.x) + Math.abs(pointA.y-pointB.y);
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


