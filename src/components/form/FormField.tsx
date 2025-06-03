import type { FormFieldProps } from "./FieldTypes";
import { GetMaskedFieldProps } from "./Masks";
import { serviceTypes } from "./FieldTypes"
import { useState } from 'react';

const defaultFieldStyling = "appearance-none w-full px-4 py-2 border-2 rounded-sm outline-hidden focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100";
const errorMessageStyling = "text-red-600 text-sm mt-1 block"

const FormField: React.FC<FormFieldProps> = ({
    type,
    placeholder,
    name,
    register,
    error,
    valueAsNumber,
    value,
    disabled,
    mask,
}) => {
    // Apply input masking if a mask prop was passed
    let inputProps;

    if (mask) {
        const { onChange, ...restRegister } = register(name);
        const maskedFieldProps = GetMaskedFieldProps(mask);
        inputProps = {
            value: maskedFieldProps.formattedValue,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                maskedFieldProps.handleChange(e); // update mask state first
                onChange(e); // then update React Hook Form
            },
            ...restRegister,
        }
    }
    else {
        inputProps = {}
    }

    // Use the select element if type === 'select'
    if (type === "select") {
        const [selectValue, setSelectValue] = useState("");
        const { onChange, ...restRegister } = register(name);
        return (
            <div className="mb-3">
                <div className="relative">
                    <select
                        className={defaultFieldStyling +
                            (selectValue === "" ? " text-[#838383]" : " text-black") // Custom CSS for placeholder option
                        }
                        value={selectValue}
                        onChange={e => {
                            setSelectValue(e.target.value);
                            onChange(e); // Call React Hook Form's onChange
                        }}
                        disabled={disabled}
                        {...restRegister}
                    >
                        <option value="" disabled>{placeholder}</option>
                        {serviceTypes.map(serviceType => (
                            <option key={serviceType} value={serviceType}>{serviceType}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                {error && <span className={errorMessageStyling}>{error.message}</span>}
            </div>
        );
    }

    // If type != 'select', use the input element
    return (
        <div className="mb-3">
            <input
                type={type}
                className={defaultFieldStyling + (disabled ? " bg-gray-200 text-gray-500" : "")}
                placeholder={placeholder}
                {...register(name, { valueAsNumber })}
                value={value}
                disabled={disabled}
                {...inputProps}
            />
            {error && <span className={errorMessageStyling}>{error.message}</span>}
        </div>
    );
};

export default FormField;