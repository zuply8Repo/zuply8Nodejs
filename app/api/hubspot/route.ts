import { NextRequest, NextResponse } from "next/server";

interface ContactData {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
}

interface HubSpotError {
  status?: string;
  message?: string;
  category?: string;
}

// Email validation using RFC 5322 compliant regex (simplified)
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length > 0 && email.length <= 254;
}

// Validate name fields (letters, spaces, hyphens, apostrophes, accented characters)
function validateName(name: string): boolean {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
  return nameRegex.test(name);
}

// Validate company name (alphanumeric + common business characters)
function validateCompany(company: string): boolean {
  const companyRegex = /^[a-zA-Z0-9\s.,'&\-()]{2,100}$/;
  return companyRegex.test(company);
}

// Sanitize input to prevent XSS and injection attacks
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .slice(0, 200); // Limit length to prevent buffer overflow attempts
}

// Validate the entire request body
function validateRequestBody(body: any): {
  valid: boolean;
  data?: ContactData;
  error?: string;
} {
  // Check if body exists
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  // Extract and sanitize fields
  const email = sanitizeInput(body.email || "");
  const firstName = sanitizeInput(body.firstName || "");
  const lastName = sanitizeInput(body.lastName || "");
  const company = sanitizeInput(body.company || "");

  // Validate email
  if (!email) {
    return { valid: false, error: "Email is required" };
  }
  if (!validateEmail(email)) {
    return { valid: false, error: "Invalid email format" };
  }

  // Validate first name
  if (!firstName) {
    return { valid: false, error: "First name is required" };
  }
  if (!validateName(firstName)) {
    return {
      valid: false,
      error: "First name must be 2-50 characters and contain only valid characters",
    };
  }

  // Validate last name
  if (!lastName) {
    return { valid: false, error: "Last name is required" };
  }
  if (!validateName(lastName)) {
    return {
      valid: false,
      error: "Last name must be 2-50 characters and contain only valid characters",
    };
  }

  // Validate company
  if (!company) {
    return { valid: false, error: "Company name is required" };
  }
  if (!validateCompany(company)) {
    return {
      valid: false,
      error: "Company name must be 2-100 characters and contain only valid characters",
    };
  }

  return {
    valid: true,
    data: { email, firstName, lastName, company },
  };
}

export async function POST(request: NextRequest) {
  try {
    // Check if HubSpot API token is configured
    if (!process.env.HUBSPOT_API_TOKEN) {
      console.error("HUBSPOT_API_TOKEN is not configured");
      return NextResponse.json(
        { error: "Service configuration error. Please contact support." },
        { status: 500 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // Validate request body
    const validation = validateRequestBody(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const contactData = validation.data!;

    // Make request to HubSpot API
    const hubspotResponse = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUBSPOT_API_TOKEN}`,
        },
        body: JSON.stringify({
          properties: {
            email: contactData.email,
            firstname: contactData.firstName,
            lastname: contactData.lastName,
            company: contactData.company,
          },
        }),
      }
    );

    // Handle HubSpot API response
    if (!hubspotResponse.ok) {
      const errorData: HubSpotError = await hubspotResponse.json();
      console.error("HubSpot API error:", errorData);

      // Check for specific error cases
      if (hubspotResponse.status === 409) {
        // Contact already exists - this might actually be acceptable
        return NextResponse.json(
          {
            success: true,
            message: "Contact information received successfully",
          },
          { status: 200 }
        );
      }

      if (hubspotResponse.status === 401 || hubspotResponse.status === 403) {
        // Authentication/authorization error
        return NextResponse.json(
          { error: "Service authentication error. Please contact support." },
          { status: 500 }
        );
      }

      // Generic error for other cases
      return NextResponse.json(
        {
          error:
            "Unable to process your request at this time. Please try again later.",
        },
        { status: 500 }
      );
    }

    // Success response
    const responseData = await hubspotResponse.json();
    return NextResponse.json(
      {
        success: true,
        message: "Contact created successfully",
        data: responseData,
      },
      { status: 200 }
    );
  } catch (error) {
    // Catch any unexpected errors
    console.error("Unexpected error in HubSpot API route:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred. Please try again later or contact support.",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

