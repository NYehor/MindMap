import rules from './validation-rules';
import messages from './validation-messages';

export function formValidation(fields) {

    const alerts = {};    
    Object.keys(fields).map(field => alerts[field] = []);

    for (const key in fields) {
        const fieldRules = rules.name[key];

        for (const rule in fieldRules) {

            const alert = messages[key][rule];
            const value = fields[key];
            
            if (!fieldRules[rule](value)) {
                alerts[key].push(alert);
            }
        }
    }


    return alerts;
};

export function isEmptyAlerts(alerts) {
    const inputs = Object.keys(alerts);
    let isEmpty = inputs.every(alert => alerts[alert].length === 0);
    return isEmpty;
}