import { z, ZodType } from 'zod';
import type { FieldError, UseFormRegister } from "react-hook-form";
import type { MaskType } from "./Masks"

// Defines the structure of the form
export type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    serviceType: serviceType;
};

// Defines the props required in each form field
export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
    value?: string;
    disabled?: boolean;
    mask?: MaskType;
}

// Defines a list of valid field names from which each field can have.
export type ValidFieldNames =
    | "firstName"
    | "lastName"
    | "email"
    | "phone"
    | "address"
    | "city"
    | "state"
    | "serviceType";

// Define serviceType options
export const serviceTypes = [
    "New Roof", 
    "Roof Replacement", 
    "Repairs & Maintenance"
];

// Includes the empty string since it is in an embedded option in the form
const serviceTypeOptions = ["", ...serviceTypes] as [string, ...string[]];

type serviceType = typeof serviceTypeOptions[number];

// Zod schema for data validation
export const DataSchema: ZodType<FormData> = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .min(1, "Phone number is required")
        .refine(val => val.replace(/\D/g, '').length >= 10, {
            message: "Invalid number. Must be 10 digits",
        }),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    serviceType: z.enum(serviceTypeOptions).refine(val => val !== "", {
        message: "Please select a Roofing service",
    }),
});