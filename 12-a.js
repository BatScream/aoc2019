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

    function getPotentialEnergy(){
        return Math.abs(position[0]) + Math.abs(position[1]) + Math.abs(position[2]);
    }

    function getKineticEnergy(){
        return Math.abs(velocity[0]) + Math.abs(velocity[1]) + Math.abs(velocity[2]);
    }

    function getTotalEnergy(){
        return getPotentialEnergy() * getKineticEnergy();
    }

    return {applyGravity, applyVelocity, getPosition, getTotalEnergy};
}

const moons = [moon(13, -13, -2), 
               moon(16, 2, -15), 
               moon(7, -18, -12), 
               moon(-3, -8, -8)];
const combinations = getCombinations(moons);
for(let i=0;i<1000;i++){
    console.log(`After ${i} steps`);
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

console.log(moons.reduce((acc, cur) => {
    acc = acc + cur.getTotalEnergy();
    return acc;
}, 0));


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