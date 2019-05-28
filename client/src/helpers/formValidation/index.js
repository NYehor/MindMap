import rules from './validation-rules';
import messages from './validation-messages';

export default function(fields) {

    const alerts = {};
    Object.keys(fields).map(field => alerts[field] = []);

    for (const key in fields) {
        const fieldRules = rules.name[key];

        for (const rule in fieldRules) {
            const alert = messages[key][rule];
            const value = fields[key]
            if (!fieldRules[rule](value)) {
                alerts[key].push(alert);
            }
        }
    }

    return alerts;
};