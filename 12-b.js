var lcm = require('lcm');
const moon = (x, y, z) => {
    let position = [x, y, z];
    let velocity = [0, 0, 0];

    function applyGravity(moonB){
        for(let i=0;i<position.length;i++){
            if(getPosition(i) < moonB.getPosition(i)){
                velocity[i] = velocity[i] + 1;
            }else if(getPosition(i) > moonB.getPosition(i)){
                velocity[i] = velocity[i] - 1;
            }
        }
    }

    function applyVelocity(){
        for(let i=0;i<position.length;i++){
            position[i] = position[i] + velocity[i];
        }
        console.log(`pos=<x=${position[0]}, y=  ${position[1]}, z= ${position[2]}>, vel=<x= ${velocity[0]}, y= ${velocity[1]}, z= ${velocity[2]}>`);
    }

    function getPosition(axis){
        return position[axis];
    }

    function getVelocity(axis){
        return velocity[axis];
    }

    function getPotentialEnergy(){
        return Math.abs(position[0]) + Math.abs(position[1]) + Math.abs(position[2]);
    }

    function getKineticEnergy(){
        return Math.abs(velocity[0]) + Math.abs(velocity[1]) + Math.abs(velocity[2]);
    }

    function getTotalEnergy(){
        return getPotentialEnergy() * getKineticEnergy();
    }

    return {applyGravity, applyVelocity, getPosition, getTotalEnergy, getVelocity};
}

function step(combinations){
    combinations.forEach(combination => {
        const moonA = combination[0];
        const moonB = combination[1];
        moonA.applyGravity(moonB);
        moonB.applyGravity(moonA);
    });
    moons.forEach((moon) => {
        moon.applyVelocity();
    });
}


function getCombinations(array){
    var combinations = [];
    function run(){
        for(let i=0; i < array.length -1 ; i++){
            for(let j = i+1; j < array.length; j++){
                combinations.push([array[i], array[j]]);
            }
        }
        return combinations;
    }
    return run();
}

const moons = [moon(13, -13, -2), 
               moon(16, 2, -15), 
               moon(7, -18, -12), 
               moon(-3, -8, -8)];

const combinations = getCombinations(moons);
let startingX = moons.map(moon => ({position: moon.getPosition(0), velocity: moon.getVelocity(0)}));
let startingY = moons.map(moon => ({position: moon.getPosition(1), velocity: moon.getVelocity(1)}));
let startingZ = moons.map(moon => ({position: moon.getPosition(2), velocity: moon.getVelocity(2)}));
let foundX;
let foundY;
let foundZ;
let count = 0;
do{
    count++;
    step(combinations);
    let x = moons.map(moon => ({position: moon.getPosition(0), velocity: moon.getVelocity(0)}));
    let y = moons.map(moon => ({position: moon.getPosition(1), velocity: moon.getVelocity(1)}));
    let z = moons.map(moon => ({position: moon.getPosition(2), velocity: moon.getVelocity(2)}));
    foundX = (!foundX && JSON.stringify(startingX) === JSON.stringify(x))? count : foundX;
    foundY = (!foundY && JSON.stringify(startingY) === JSON.stringify(y))? count : foundY;
    foundZ = (!foundZ && JSON.stringify(startingZ) === JSON.stringify(z))? count : foundZ;
}while(!foundX || !foundY || !foundZ)

console.log(lcm(foundX, lcm(foundY, foundZ)))