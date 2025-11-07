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
      error:
        "First name must be 2-50 characters and contain only valid characters",
    };
  }

  // Validate last name
  if (!lastName) {
    return { valid: false, error: "Last name is required" };
  }
  if (!validateName(lastName)) {
    return {
      valid: false,
      error:
        "Last name must be 2-50 characters and contain only valid characters",
    };
  }

  // Validate company
  if (!company) {
    return { valid: false, error: "Company name is required" };
  }
  if (!validateCompany(company)) {
    return {
      valid: false,
      error:
        "Company name must be 2-100 characters and contain only valid characters",
    };
  }

  return {
    valid: true,
    data: { email, firstName, lastName, company },
  };
}

export async function POST(request: NextRequest) {
  const requestId = `req_${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  try {
    console.log(`[${requestId}] Starting HubSpot API request`);

    // Check if HubSpot API token is configured
    if (!process.env.HUBSPOT_API_TOKEN) {
      console.error(
        `[${requestId}] CRITICAL: HUBSPOT_API_TOKEN is not configured in environment variables`
      );
      console.error(
        `[${requestId}] Available env vars:`,
        Object.keys(process.env).filter((key) => key.includes("HUBSPOT"))
      );
      return NextResponse.json(
        {
          error: "Service configuration error. Please contact support.",
          requestId,
        },
        { status: 500 }
      );
    }

    console.log(
      `[${requestId}] Environment check passed - HUBSPOT_API_TOKEN is present`
    );

    // Parse request body
    let body;
    try {
      body = await request.json();
      console.log(`[${requestId}] Request body parsed successfully`);
    } catch (error) {
      console.error(`[${requestId}] Failed to parse JSON:`, error);
      return NextResponse.json(
        { error: "Invalid JSON in request body", requestId },
        { status: 400 }
      );
    }

    // Validate request body
    const validation = validateRequestBody(body);
    if (!validation.valid) {
      console.warn(`[${requestId}] Validation failed:`, validation.error);
      return NextResponse.json(
        { error: validation.error, requestId },
        { status: 400 }
      );
    }

    const contactData = validation.data!;
    console.log(
      `[${requestId}] Validation passed for email: ${contactData.email}`
    );

    // Make request to HubSpot API
    console.log(`[${requestId}] Sending request to HubSpot API...`);
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

    console.log(
      `[${requestId}] HubSpot API responded with status: ${hubspotResponse.status}`
    );

    // Handle HubSpot API response
    if (!hubspotResponse.ok) {
      let errorData: HubSpotError;
      try {
        errorData = await hubspotResponse.json();
        console.error(
          `[${requestId}] HubSpot API error response:`,
          JSON.stringify(errorData, null, 2)
        );
      } catch (e) {
        console.error(`[${requestId}] Failed to parse HubSpot error response`);
        errorData = { message: "Unable to parse error response" };
      }

      // Check for specific error cases
      if (hubspotResponse.status === 409) {
        // Contact already exists - this might actually be acceptable
        console.log(
          `[${requestId}] Contact already exists (409) - treating as success`
        );
        return NextResponse.json(
          {
            success: true,
            message: "Contact information received successfully",
            requestId,
          },
          { status: 200 }
        );
      }

      if (hubspotResponse.status === 401 || hubspotResponse.status === 403) {
        // Authentication/authorization error
        console.error(
          `[${requestId}] Authentication error (${hubspotResponse.status}) - check API token validity`
        );
        return NextResponse.json(
          {
            error: "Service authentication error. Please contact support.",
            requestId,
          },
          { status: 500 }
        );
      }

      // Generic error for other cases
      console.error(
        `[${requestId}] HubSpot API returned error status ${hubspotResponse.status}`
      );
      return NextResponse.json(
        {
          error:
            "Unable to process your request at this time. Please try again later.",
          requestId,
        },
        { status: 500 }
      );
    }

    // Success response
    const responseData = await hubspotResponse.json();
    console.log(`[${requestId}] Contact created successfully in HubSpot`);
    return NextResponse.json(
      {
        success: true,
        message: "Contact created successfully",
        data: responseData,
        requestId,
      },
      { status: 200 }
    );
  } catch (error) {
    // Catch any unexpected errors
    console.error(`[${requestId}] UNEXPECTED ERROR:`, error);
    console.error(
      `[${requestId}] Error name:`,
      error instanceof Error ? error.name : "Unknown"
    );
    console.error(
      `[${requestId}] Error message:`,
      error instanceof Error ? error.message : String(error)
    );
    console.error(
      `[${requestId}] Error stack:`,
      error instanceof Error ? error.stack : "No stack trace"
    );

    return NextResponse.json(
      {
        error:
          "An unexpected error occurred. Please try again later or contact support.",
        requestId,
      },
      { status: 500 }
    );
  }
}

// Handle unsupported HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
