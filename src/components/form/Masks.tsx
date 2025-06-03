import {useState} from 'react';

/*=====================================
   Create Field Masks
=====================================*/

// Types of field masks
export type MaskType = "phone"; // Add more if necessary

/**
 * Formats a given string as a US phone number.
 *
 * This function removes all non-digit characters from the input value and formats
 * the resulting digits as a phone number in the format: (XXX) XXX-XXXX.
 * If the input has fewer than 10 digits, it formats as much as possible.
 *
 * @param value - The input string to be formatted as a phone number.
 * @returns The formatted phone number string.
 */
const formatPhoneNumber = (value) => {
    const phoneValue = value.replace(/\D/g, '');
    let formattedPhoneNumber = '';
    if (phoneValue.length > 0) {
        formattedPhoneNumber += '(';
        if (phoneValue.length > 3) {
            formattedPhoneNumber += phoneValue.substring(0, 3) + ') ';
            if (phoneValue.length > 6) {
                formattedPhoneNumber += phoneValue.substring(3, 6) + '-';
                formattedPhoneNumber += phoneValue.substring(6, 10);
            } else {
                formattedPhoneNumber += phoneValue.substring(3, 6);
            }
        } else {
            formattedPhoneNumber += phoneValue;
        }
    }
    return formattedPhoneNumber;
};

/*=====================================
   Assign Field Masks
=====================================*/

// Return type
type maskedFieldProps = {
    formattedValue: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Logic for assigning field types
export function GetMaskedFieldProps(maskType: MaskType): maskedFieldProps {
    const [fieldInput, setFieldInput] = useState('');

    let formattedValue;
    let handleChange;

    switch(maskType) {
        case "phone":
            formattedValue = formatPhoneNumber(fieldInput);
            handleChange = (e) => {
                const rawValue = e.target.value;
                const phoneValue = rawValue.replace(/\D/g, ''); // Remove non-numeric values
                setFieldInput(phoneValue);
            };
            break;
        default:
            // In case an unknown mask type is ever passed, 
            // the field will behave as a normal input.
            formattedValue = fieldInput;
            handleChange = (e) => setFieldInput(e.target.value);
            break;
    }

    return {
        formattedValue: formattedValue,
        handleChange: handleChange,
    };
}