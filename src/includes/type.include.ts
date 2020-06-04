//! safe to delete
// returns the true type of a variable
export default function (variable: any): string {
    return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
}
