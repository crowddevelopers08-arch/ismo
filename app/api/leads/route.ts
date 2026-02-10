import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

interface ISMOLeadData {
  name: string
  phone: string
  treatment?: string
  concern?: string
  preferredDateTime?: string
  source?: string
  formName?: string
  consent?: boolean
  email?: string
  procedure?: string
  concerns?: string
}

interface TelecrmResponse {
  [key: string]: any
}

/**
 * Generate form data string for TeleCRM system notes
 */
function generateFormDataString(leadData: ISMOLeadData): string {
  const details: string[] = []

  if (leadData.name) details.push(`Name: ${leadData.name}`)
  if (leadData.phone) details.push(`Phone: ${leadData.phone}`)
  if (leadData.email) details.push(`Email: ${leadData.email}`)
  if (leadData.treatment) details.push(`Treatment: ${leadData.treatment}`)
  if (leadData.concern) details.push(`Concern: ${leadData.concern}`)
  if (leadData.preferredDateTime) details.push(`Preferred Time: ${leadData.preferredDateTime}`)
  if (leadData.source) details.push(`Source: ${leadData.source}`)
  if (leadData.procedure) details.push(`Procedure: ${leadData.procedure}`)
  if (leadData.concerns) details.push(`Concerns: ${leadData.concerns}`)

  details.push(`Consent: ${leadData.consent ? "Yes" : "No"}`)
  details.push(`Form: ${leadData.formName || "Hair Consultation Form"}`)

  return details.join(" | ")
}

/**
 * Send lead data to TeleCRM for ISMO Clinic
 */
async function sendToTeleCRM(leadData: ISMOLeadData): Promise<TelecrmResponse> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000) // 15s timeout

  const endpoint = process.env.TELECRM_API_URL

  if (!endpoint) {
    throw new Error("TELECRM_API_URL environment variable is not set")
  }

  if (!process.env.TELECRM_API_KEY) {
    throw new Error("TELECRM_API_KEY environment variable is not set")
  }

  try {
    const formDataString = generateFormDataString(leadData)
    const simpleFormName = leadData.formName || "Hair Consultation Form"

    // ISMO Clinic specific TeleCRM payload
    const telecrmPayload = {
      fields: {
        Id: "",
        name: leadData.name,
        email: leadData.email || "",
        phone: (leadData.phone || "").replace(/\D/g, ""),
        city_1: "Chennai", // ISMO is in Chennai
        preferredtime: leadData.preferredDateTime || "",
        preferreddate: "",
        message: leadData.concern || leadData.concerns || "",
        select_the_procedure: leadData.treatment || leadData.procedure || "",
        Country: "India",
        LeadID: "",
        CreatedOn: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        "Lead Stage": "",
        "Lead Status": "new",
        "Lead Request Type": "hair_consultation",
        PageName: leadData.source || "https://www.ismoskinclinicchennai.in/",
        State: "Tamil Nadu",
        Age: "",
        FormName: simpleFormName,
        Pincode: "",
        // ISMO specific fields
        Treatment_Interested: leadData.treatment || "",
        Hair_Concern: leadData.concern || "",
        Clinic_Name: "ISMO Skin & Hair Clinic",
        Clinic_Location: "Alwarpet, Chennai",
      },
      actions: [
        { type: "SYSTEM_NOTE", text: `Form Name: ${simpleFormName}` },
        { type: "SYSTEM_NOTE", text: `Complete Form Data: ${formDataString}` },
        {
          type: "SYSTEM_NOTE",
          text: `Lead Source: ${leadData.source || "https://www.ismoskinclinicchennai.in/"}`,
        },
        { 
          type: "SYSTEM_NOTE", 
          text: `Treatment Interested: ${leadData.treatment || "Not specified"}` 
        },
        { 
          type: "SYSTEM_NOTE", 
          text: `Hair Concern: ${leadData.concern || "Not specified"}` 
        },
        {
          type: "SYSTEM_NOTE",
          text: `Preferred Appointment: ${leadData.preferredDateTime || "Not specified"}`,
        },
        { 
          type: "SYSTEM_NOTE", 
          text: `Clinic: ISMO Skin & Hair Clinic - Alwarpet, Chennai` 
        },
        { 
          type: "SYSTEM_NOTE", 
          text: `Consent Given: ${leadData.consent ? "Yes" : "No"}` 
        },
      ],
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TELECRM_API_KEY}`,
        "X-Client-ID": "ismo-clinic-nextjs-integration",
        Accept: "application/json",
      },
      body: JSON.stringify(telecrmPayload),
      signal: controller.signal,
    })

    if (response.status === 204) {
      clearTimeout(timeout)
      return { status: "success", message: "Lead created (204 No Content)" }
    }

    const responseText = await response.text()

    // Check for HTML response
    if (
      responseText.trim().startsWith("<!DOCTYPE") ||
      responseText.trim().startsWith("<html") ||
      responseText.includes("<!DOCTYPE html>")
    ) {
      console.warn(`HTML response from TeleCRM endpoint`, {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        bodyPreview: responseText.slice(0, 200),
      })
      throw new Error("TeleCRM returned HTML response instead of JSON")
    }

    try {
      const data = responseText ? JSON.parse(responseText) : {}
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status} from TeleCRM`)
      }
      clearTimeout(timeout)
      return data
    } catch {
      throw new Error(`Invalid JSON from TeleCRM: ${responseText.slice(0, 100)}...`)
    }
  } catch (error) {
    clearTimeout(timeout)
    throw error instanceof Error ? error : new Error(String(error))
  }
}

/**
 * GET /api/leads - Fetch leads for dashboard
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1", 10)
    const limit = parseInt(searchParams.get("limit") || "100", 10)
    const skip = (page - 1) * limit

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.lead.count(),
    ])

    const pages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      data: leads,
      pagination: {
        page,
        limit,
        total,
        pages,
      },
    })
  } catch (error) {
    console.error("Error fetching leads:", error)
    return NextResponse.json(
      {
        success: false,
        data: [],
        error: "Failed to fetch leads",
      },
      { status: 500 },
    )
  }
}

/**
 * POST /api/leads - Handle ISMO consultation form submission
 */
export async function POST(request: Request) {
  let leadData: ISMOLeadData

  try {
    leadData = await request.json()

    // Validate required fields
    if (!leadData.name || !leadData.phone) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required fields: name and phone" 
        },
        { status: 400 },
      )
    }

    const simpleFormName = leadData.formName || "Hair Consultation Form"

    // Try TeleCRM sync
    let telecrmSynced = false
    let telecrmError: string | null = null
    let telecrmId: string | null = null
    let telecrmResponse: TelecrmResponse | null = null

    try {
      const resp = await sendToTeleCRM(leadData)
      telecrmSynced = true
      telecrmResponse = resp
      // Extract TeleCRM ID if available
      telecrmId = (resp as any)?.data?.id ?? (resp as any)?.id ?? `tcrm_${Date.now()}`
    } catch (error) {
      telecrmSynced = false
      telecrmError = error instanceof Error ? error.message : "Unknown TeleCRM error"
      console.error("TeleCRM sync failed:", telecrmError)
      // Don't fail the submission - continue to save to database
    }

    // Store in Prisma database
    const createdLead = await prisma.lead.create({
      data: {
        name: leadData.name,
        phone: leadData.phone,
        email: leadData.email ?? null,
        treatment: leadData.treatment || leadData.procedure || null,
        concern: leadData.concern || leadData.concerns || null,
        preferredDateTime: leadData.preferredDateTime || null,
        source: leadData.source || "https://www.ismoskinclinicchennai.in/",
        formName: simpleFormName,
        consent: Boolean(leadData.consent ?? true),
        telecrmSynced,
        telecrmId,
        telecrmError,
        // status defaults to NEW, priority to MEDIUM
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: createdLead,
        telecrm: {
          synced: telecrmSynced,
          error: telecrmError,
          response: telecrmResponse,
        },
        message: telecrmSynced
          ? "Your hair consultation has been booked successfully! Our team will contact you soon."
          : "Consultation saved! Our team will contact you within 24 hours.",
        timestamp: new Date().toISOString(),
        formName: simpleFormName,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("ISMO lead submission error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process your consultation request",
        details: error instanceof Error ? error.message : "Unknown error",
        referenceId: `ISMO_ERR_${Date.now()}`,
      },
      { status: 500 },
    )
  }
}