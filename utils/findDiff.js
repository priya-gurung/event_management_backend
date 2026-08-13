function normalize(val){
    if(val instanceof Date) return val.getTime();
    if(Array.isArray(val)){
        return [...val].map((v)=> String(v)).sort().join(',');
    }
    if(val === undefined || val === null) return '';
    return val;
}

function diffFields(oldField, newField, fields){
    const changes = [];
    for(const field of fields){
        const oldVal = oldField[field];
        const newVal = newField[field];
        if(normalize(oldVal) !== normalize(newVal)){
            changes.push({field, oldValue: oldVal, newValue: newVal});
        }
    }
    return changes;
}

module.exports = {diffFields};