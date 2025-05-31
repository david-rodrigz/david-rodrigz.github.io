import PhoneInput from './PhoneInput.jsx';

const defaultStyle = "appearance-none w-full px-4 py-2 mb-3 border-2 rounded-md outline-hidden focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100";

export default function Form() {
    return (
        <form action=''>
            <div className="block sm:flex gap-4 md:block lg:flex gap-4">
                <input
                    type='text'
                    name='firstname'
                    id='firstname'
                    placeholder='First Name'
                    className={defaultStyle}
                    required
                />
                <input
                    type='text'
                    name='lastname'
                    id='lastname'
                    placeholder='Last Name'
                    className={defaultStyle}
                    required
                />
            </div>
            <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder='Email'
                className={defaultStyle}
                required
            />
            <PhoneInput className={defaultStyle} />
            <input 
                type="text" 
                name="address" 
                id="address" 
                placeholder='Address'
                className={defaultStyle}
                required
            />
            <input 
                type="text" 
                name="city" 
                id="city" 
                placeholder='City'
                className={defaultStyle}
                required
            />
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
                    required
                >
                    <option value="" disabled selected>Select Service Type</option>
                    <option value="Residential Roofing">Residential Roofing</option>
                    <option value="Commercial Roofing">Commercial Roofing</option>
                    <option value="Repairs & Maintenance">Repairs & Maintenance</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg class="mb-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            <button 
                type="submit"
                className="w-full bg-orange-400 text-white hover:bg-orange-600 duration-200 ease-in-out cursor-pointer font-semibold px-5 py-2 mb-3 rounded-sm"
                block
            >
                SUBMIT
            </button>
        </form>
    );
}
