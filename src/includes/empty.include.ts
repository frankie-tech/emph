//! safe to delete
// checks if the variable is equal to a false/empty value
export default function (variable: any): boolean {
    if ([undefined, null, false, 0, '', '0'].includes(variable)) return true;
    if (variable.pop) return variable.length === 0 ? true : false;
    if (variable instanceof Object)
        return Object.entries(variable).length === 0 ? true : false;

    return false;
}
