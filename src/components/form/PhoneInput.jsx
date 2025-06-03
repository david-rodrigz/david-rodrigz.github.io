import { useState } from 'react';

export default function PhoneInput(props) {
    const [phoneNumber, setPhoneNumber] = useState('');

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

    const handleChange = (e) => {
        const rawValue = e.target.value;
        const phoneValue = rawValue.replace(/\D/g, ''); // Remove non-numeric values
        setPhoneNumber(phoneValue);
    };

    const formattedValue = formatPhoneNumber(phoneNumber);

    return (
        <input 
            type="tel" 
            value={formattedValue} 
            onChange={handleChange} 
            placeholder="Phone Number" 
            maxLength="14"
            pattern="^\(\d{3}\) \d{3}-\d{4}$"
            title="Please enter a valid phone number in the format (###) ###-####."
            className={props.className} 
            name="phone"
            id="phone"
            required
        />
    );
}