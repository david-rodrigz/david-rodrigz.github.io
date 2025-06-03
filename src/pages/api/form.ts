export const prerender = false;
import type { APIRoute } from 'astro';
import { DataSchema } from "@/components/form/FieldTypes";
import sanitizeHtml from "sanitize-html";

export const POST: APIRoute = async ({ request }) => {
    const data = await request.json();

    // Sanitize each field as needed
    const sanitizedData = {
        ...data,
        firstName: sanitizeHtml(data.firstName),
        lastName: sanitizeHtml(data.lastName),
        email: sanitizeHtml(data.email),
        address: sanitizeHtml(data.address),
        city: sanitizeHtml(data.city),
        state: sanitizeHtml(data.state),
        serviceType: sanitizeHtml(data.serviceType),
        phone: sanitizeHtml(data.phone),
    };

    // Use Zod to validate the received data against the UserSchema
    const result = DataSchema.safeParse(sanitizedData);

    // Check if the validation is successful
    if (result.success) {
        return new Response(
            JSON.stringify({ success: true, message: "Form submitted successfully!" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    }

    // If validation errors, map them into an object
    const serverErrors = Object.fromEntries(
        result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
    );

    // Respond with a JSON object containing the validation errors
    return new Response(
        JSON.stringify({ errors: serverErrors }),
        { status: 400, headers: { "Content-Type": "application/json" } }
    );
};