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
        const phoneValue = rawValue.replace(/\D/g, '');
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
            className={props.className} 
            name="phone"
            id="phone"
            required
        />
    );
}

// import { useState } from 'react';

// export default function PhoneInput(props) {
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [touched, setTouched] = useState(false);

//     // Format phone number as (999) 999-9999
//     const formatPhoneNumber = (value) => {
//         const phoneValue = value.replace(/\D/g, '');
//         let formattedPhoneNumber = '';
//         if (phoneValue.length > 0) {
//             formattedPhoneNumber += '(';
//             if (phoneValue.length > 3) {
//                 formattedPhoneNumber += phoneValue.substring(0, 3) + ') ';
//                 if (phoneValue.length > 6) {
//                     formattedPhoneNumber += phoneValue.substring(3, 6) + '-';
//                     formattedPhoneNumber += phoneValue.substring(6, 10);
//                 } else {
//                     formattedPhoneNumber += phoneValue.substring(3, 6);
//                 }
//             } else {
//                 formattedPhoneNumber += phoneValue;
//             }
//         }
//         return formattedPhoneNumber;
//     };

//     const handleChange = (e) => {
//         const rawValue = e.target.value;
//         const phoneValue = rawValue.replace(/\D/g, '');
//         setPhoneNumber(phoneValue);
//     };

//     const handleBlur = () => {
//         setTouched(true);
//     };

//     const formattedValue = formatPhoneNumber(phoneNumber);
//     const isInvalid = touched && phoneNumber.length !== 10;

//     return (
//         <>
//             <input
//                 type="text"
//                 value={formattedValue}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 placeholder="(999) 999-9999"
//                 maxLength="14"
//                 pattern="^\(\d{3}\) \d{3}-\d{4}$"
//                 className={props.className + (isInvalid ? ' border-red-400' : '')}
//                 name="phone"
//                 id="phone"
//                 required
//             />
//         </>
//     );
// }