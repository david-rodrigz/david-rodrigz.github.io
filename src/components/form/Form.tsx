import { useState } from 'react';
import { z } from 'zod';
import PhoneInput from './PhoneInput.jsx';

const defaultStyle = "appearance-none w-full px-4 py-2 mb-3 border-2 rounded-md outline-hidden focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100";

// Zod schema for form validation
const formSchema = z.object({
  firstname: z.string().min(1, 'First name is required').regex(/^[A-Za-z]+$/, 'First name should contain letters only.'),
  lastname: z.string().min(1, 'Last name is required').regex(/^[A-Za-z]+$/, 'Last name should contain letters only.'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required').regex(/^[A-Za-z]+$/, 'City should contain letters only.'),
  serviceType: z.string().min(1, 'Please select a service type'),
});

export default function Form() {
interface FormValues {
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    city: string;
    serviceType: string;
}

interface FormErrors {
    firstname?: string;
    lastname?: string;
    email?: string;
    address?: string;
    city?: string;
    serviceType?: string;
}

const [values, setValues] = useState<FormValues>({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    city: '',
    serviceType: '',
});
const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = formSchema.safeParse(values);
    if (!result.success) {
      // Map Zod errors to field names
      const fieldErrors = {};
      result.error.errors.forEach(err => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    // TODO: Submit logic here
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="block sm:flex gap-4 md:block lg:flex gap-4">
        <div className="w-full">
          <input
            type='text'
            name='firstname'
            id='firstname'
            placeholder='First Name'
            className={defaultStyle}
            value={values.firstname}
            onChange={handleChange}
            required
          />
          {errors.firstname && <div className="text-red-600 text-sm mb-2">{errors.firstname}</div>}
        </div>
        <div className="w-full">
          <input
            type='text'
            name='lastname'
            id='lastname'
            placeholder='Last Name'
            className={defaultStyle}
            value={values.lastname}
            onChange={handleChange}
            required
          />
          {errors.lastname && <div className="text-red-600 text-sm mb-2">{errors.lastname}</div>}
        </div>
      </div>
      <div>
        <input 
          type="email" 
          name="email" 
          id="email" 
          placeholder='Email'
          className={defaultStyle}
          value={values.email}
          onChange={handleChange}
          required
        />
        {errors.email && <div className="text-red-600 text-sm mb-2">{errors.email}</div>}
      </div>
      <PhoneInput className={defaultStyle} />
      <div>
        <input 
          type="text" 
          name="address" 
          id="address" 
          placeholder='Address'
          className={defaultStyle}
          value={values.address}
          onChange={handleChange}
          required
        />
        {errors.address && <div className="text-red-600 text-sm mb-2">{errors.address}</div>}
      </div>
      <div>
        <input 
          type="text" 
          name="city" 
          id="city" 
          placeholder='City'
          className={defaultStyle}
          value={values.city}
          onChange={handleChange}
          required
        />
        {errors.city && <div className="text-red-600 text-sm mb-2">{errors.city}</div>}
      </div>
      <select 
        name="state" 
        id="state" 
        className={defaultStyle + ' bg-gray-200 text-gray-800'}
        disabled
      >
        <option value="Idaho" selected>Idaho</option>
      </select>
      <div className="relative">
        <select 
          name="serviceType" 
          id="serviceType"
          className={defaultStyle}
          value={values.serviceType}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Service Type</option>
          <option value="Residential Roofing">Residential Roofing</option>
          <option value="Commercial Roofing">Commercial Roofing</option>
          <option value="Repairs & Maintenance">Repairs & Maintenance</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg className="mb-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {errors.serviceType && <div className="text-red-600 text-sm mb-2">{errors.serviceType}</div>}
      </div>
      <button 
        type="submit"
        className="w-full bg-orange-400 text-white hover:bg-orange-600 duration-200 ease-in-out cursor-pointer font-semibold px-5 py-2 mb-3 rounded-sm"
      >
        SUBMIT
      </button>
    </form>
  );
}