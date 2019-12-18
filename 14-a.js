function readReactions(){
    const fs = require('fs');
    const text = fs.readFileSync('input.txt','utf8');
    const reactions = {};
    text.split('\n').forEach(line => {
        const arr = line.split(' => ');
        const output = new Chemical(arr[1].trim().split(' ')[1], parseInt(arr[1].split(' ')[0]));
        const inputs = [];
        arr[0].split(', ').forEach(item => {
            inputs.push(new Chemical(item.trim().split(' ')[1], parseInt(item.split(' ')[0])));
        });
        reactions[output.name] = {
            quantity: output.quantity,
            reactants: inputs
        };
    });
    return reactions;
}

class Chemical{
    constructor(name, quantity){
        this.name = name;
        this.quantity = quantity;
    }
}

function calculate(reactions) {
    let leftOvers = {};
    Object.keys(reactions).forEach(key => leftOvers[key] = 0);
    function start(chemical){
        const multiplier = Math.ceil(chemical.quantity/reactions[chemical.name].quantity);
        let consumedOres = 0;
        reactions[chemical.name].reactants.forEach(reactant => {
            const quantityRequired = reactant.quantity * multiplier;
            if(reactant.name == 'ORE'){
                consumedOres += quantityRequired;
            }
            else if (leftOvers[reactant.name] < quantityRequired){
                consumedOres += start(new Chemical(reactant.name, quantityRequired - leftOvers[reactant.name]));
            }
            leftOvers[reactant.name] = leftOvers[reactant.name] - quantityRequired;
        });
        leftOvers[chemical.name] = (leftOvers[chemical.name] || 0) + (multiplier * reactions[chemical.name].quantity);
        console.log(leftOvers);
        return consumedOres;
    }
    return {start}
}

const reactions = readReactions();
console.log(calculate(reactions).start(new Chemical("FUEL", 1)));





