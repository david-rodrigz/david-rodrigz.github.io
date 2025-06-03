import { useForm } from "react-hook-form";
import type { FormData, ValidFieldNames } from "./FieldTypes"
import { DataSchema } from "./FieldTypes"
import FormField from "./FormField"
import DOMPurify from 'dompurify';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

function sanitizeInput(input: string): string {
    return DOMPurify.sanitize(input);
}

export default function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormData>({
        resolver: zodResolver(DataSchema),
    });

    const onSubmit = async (data: FormData) => {
        // Remove non-numeric characters from phone
        const cleanedPhone = sanitizeInput(String(data.phone).replace(/\D/g, ""));

        // Sanitize all string fields
        const sanitizedData = {
            ...data,
            firstName: sanitizeInput(data.firstName),
            lastName: sanitizeInput(data.lastName),
            email: sanitizeInput(data.email),
            phone: cleanedPhone,
            address: sanitizeInput(data.address),
            city: sanitizeInput(data.city),
            state: sanitizeInput(data.state),
            serviceType: sanitizeInput(data.serviceType),
        };

        try {
            const response = await axios.post("/api/form", sanitizedData); // Make a POST request
            const { errors = {} } = response.data; // Destructure the 'errors' property from the response data

            // Define a mapping between server-side field names and their corresponding client-side names
            const fieldErrorMapping: Record<string, ValidFieldNames> = {
                firstName: "firstName",
                lastName: "lastName",
                email: "email",
                phone: "phone",
                address: "address",
                city: "city",
                state: "state",
                serviceType: "serviceType",
            };

            // Find the first field with an error in the response data
            const fieldWithError = Object.keys(fieldErrorMapping).find(
                (field) => errors[field]
            );

            // If a field with an error is found, update the form error state using setError
            if (fieldWithError) {
                // Use the ValidFieldNames type to ensure the correct field names
                setError(fieldErrorMapping[fieldWithError], {
                    type: "server",
                    message: errors[fieldWithError],
                });
            } else {
                // Log success message
                console.log("SUCCESS", sanitizedData);
            }
        } catch (error) {
            // alert("Submitting form failed!");
            console.error("Submitting form failed!" + error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="block sm:flex gap-4 md:block lg:flex gap-4">
                <div className="w-full">
                    <FormField 
                        type='text'
                        placeholder='First Name'
                        name='firstName'
                        register={register}
                        error={errors.firstName}
                    />
                </div>
                <div className="w-full">
                    <FormField 
                        type='text'
                        placeholder='Last Name'
                        name='lastName'
                        register={register}
                        error={errors.lastName}
                    />
                </div>
            </div>
            <FormField 
                type='email'
                placeholder='Email'
                name='email'
                register={register}
                error={errors.email}
            />
            <FormField 
                type='tel'
                placeholder='Phone Number'
                name='phone'
                register={register}
                mask='phone'
                error={errors.phone}
            />
            <FormField 
                type='text'
                placeholder='Address'
                name='address'
                register={register}
                error={errors.address}
            />
            <FormField 
                type='text'
                placeholder='City'
                name='city'
                register={register}
                error={errors.city}
            />
            <FormField 
                type='text'
                placeholder='State'
                name='state'
                value='Idaho'
                disabled
                register={register}
                error={errors.state}
            />
            <FormField 
                type='select'
                placeholder='Select Service'
                name='serviceType'
                register={register}
                error={errors.serviceType}
            />
            <button 
                type="submit"
                className="w-full bg-orange-400 text-white hover:bg-orange-600 duration-200 ease-in-out cursor-pointer font-semibold px-5 py-2 mb-3 rounded-sm"
            >
                SUBMIT
            </button>
    </form>
  );
}