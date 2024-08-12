import BaseField from "./base";

/**
 * @typedef {Object} DateFieldProps
 * @property {string} [label]
 * @property {string} [filedType]
 * @property {string} [placeholder]
 * @property {string} [col]
 * @property {null|array} [error]
 */
class DateField extends BaseField {
    /**
     *
     * @param {DateFieldProps} [props]
     */
    constructor({label, filedType = 'date', placeholder, col, error, value} = {}) {
        super();
        this.type = 'date_field'
        this.fieldType = filedType
        this.label = label
        this.placeholder = placeholder
        this.col = col
        this.error = error
        this.value = value
    }
}

export default DateField
