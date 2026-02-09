// app/api/leads/route.ts
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

interface LeadData {
  name: string
  phone: string
  email?: string
  procedure?: string
  treatment?: string
  date?: string
  time?: string
  message?: string
  city?: string
  age?: string
  preferredDate?: string
  consent?: boolean
  source?: string
  formName?: string
  concerns?: string
  hairProblems?: string
  pincode?: string
  familyConsultation?: string
}

interface TelecrmResponse {
  [key: string]: any
}

/**
 * Generate comprehensive form data string with all user details (for system notes)
 */
function generateFormDataString(leadData: LeadData): string {
  const details: string[] = []

  if (leadData.name) details.push(`Name: ${leadData.name}`)
  if (leadData.phone) details.push(`Phone: ${leadData.phone}`)
  if (leadData.email) details.push(`Email: ${leadData.email}`)
  if (leadData.procedure) details.push(`Procedure: ${leadData.procedure}`)
  if (leadData.treatment) details.push(`Treatment: ${leadData.treatment}`)
  if (leadData.concerns) details.push(`Concerns: ${leadData.concerns}`)
  if (leadData.hairProblems) details.push(`Hair Problems: ${leadData.hairProblems}`)
  if (leadData.pincode) details.push(`Pincode: ${leadData.pincode}`)
  if (leadData.date) details.push(`Date: ${leadData.date}`)
  if (leadData.time) details.push(`Time: ${leadData.time}`)
  if (leadData.preferredDate) details.push(`Preferred Date: ${leadData.preferredDate}`)
  if (leadData.city) details.push(`City: ${leadData.city}`)
  if (leadData.age) details.push(`Age: ${leadData.age}`)
  if (leadData.source) details.push(`Source: ${leadData.source}`)
  if (leadData.familyConsultation) details.push(`Family Consultation: ${leadData.familyConsultation}`)

  details.push(`Consent: ${leadData.consent ? "Yes" : "No"}`)

  if (leadData.message) {
    const messagePreview =
      leadData.message.length > 100 ? `${leadData.message.substring(0, 100)}...` : leadData.message
    details.push(`Message: ${messagePreview}`)
  }

  return details.join(" | ")
}

/**
 * Send lead data to TeleCRM
 */
async function sendToTeleCRM(leadData: LeadData): Promise<TelecrmResponse> {
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
    const simpleFormName = leadData.formName || "Dental Consultation Form"

    const telecrmPayload = {
      fields: {
        Id: "",
        name: leadData.name,
        email: leadData.email || "",
        phone: (leadData.phone || "").replace(/\D/g, ""),
        city_1: leadData.city || "",
        preferredtime: leadData.time || leadData.preferredDate || "",
        preferreddate: leadData.date || leadData.preferredDate || "",
        message: leadData.message || leadData.concerns || "",
        select_the_procedure: leadData.procedure || leadData.treatment || leadData.concerns || "",
        Country: "",
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
        "Lead Request Type": "consultation",
        PageName: leadData.source || "https://www.aloradentalwellnessbangalore.in/",
        State: "",
        Age: leadData.age || "",
        FormName: simpleFormName,
        Pincode: leadData.pincode || "",
      },
      actions: [
        { type: "SYSTEM_NOTE", text: `Form Name: ${simpleFormName}` },
        { type: "SYSTEM_NOTE", text: `Complete Form Data: ${formDataString}` },
        {
          type: "SYSTEM_NOTE",
          text: `Lead Source: ${leadData.source || "https://www.aloradentalwellnessbangalore.in/"}`,
        },
        { type: "SYSTEM_NOTE", text: `Concerns: ${leadData.concerns || "Not specified"}` },
        {
          type: "SYSTEM_NOTE",
          text: `Dental Procedure: ${leadData.procedure || leadData.treatment || "Not specified"}`,
        },
        {
          type: "SYSTEM_NOTE",
          text: `Family Consultation: ${leadData.familyConsultation || "Not specified"}`,
        },
        { type: "SYSTEM_NOTE", text: `Pincode: ${leadData.pincode || "Not specified"}` },
        {
          type: "SYSTEM_NOTE",
          text: `Procedure: ${leadData.procedure || leadData.treatment || "Not specified"}`,
        },
        {
          type: "SYSTEM_NOTE",
          text: `Preferred Date: ${leadData.date || leadData.preferredDate || "Not specified"}`,
        },
        { type: "SYSTEM_NOTE", text: `Age: ${leadData.age || "Not specified"}` },
        { type: "SYSTEM_NOTE", text: `Consent Given: ${leadData.consent ? "Yes" : "No"}` },
      ],
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TELECRM_API_KEY}`,
        "X-Client-ID": "nextjs-website-integration",
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

    if (
      responseText.trim().startsWith("<!DOCTYPE") ||
      responseText.trim().startsWith("<html") ||
      responseText.includes("<!DOCTYPE html>")
    ) {
      console.warn(`HTML response from ${endpoint}`, {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        bodyPreview: responseText.slice(0, 200),
      })
      throw new Error("TeleCRM returned HTML response instead of JSON")
    }

    try {
      const data = responseText ? JSON.parse(responseText) : {}
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status} from ${endpoint}`)
      }
      clearTimeout(timeout)
      return data
    } catch {
      throw new Error(`Invalid JSON from ${endpoint}: ${responseText.slice(0, 100)}...`)
    }
  } catch (error) {
    clearTimeout(timeout)
    throw error instanceof Error ? error : new Error(String(error))
  }
}

/**
 * GET /api/leads
 * Used by dashboard to fetch leads
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
 * POST /api/leads
 * Used by ConsultationForm
 */
export async function POST(request: Request) {
  let data: LeadData

  try {
    data = await request.json()

    if (!data.name || !data.phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, phone" },
        { status: 400 },
      )
    }

    const simpleFormName = data.formName || "Dental Consultation Form"

    // Try TeleCRM, but don't lose the lead if TeleCRM fails
    let telecrmSynced = false
    let telecrmError: string | null = null
    let telecrmId: string | null = null
    let telecrmResponse: TelecrmResponse | null = null

    try {
      const resp = await sendToTeleCRM(data)
      telecrmSynced = true
      telecrmResponse = resp
      // Attempt to pick ID if TeleCRM sends it
      telecrmId = (resp as any)?.data?.id ?? (resp as any)?.id ?? null
    } catch (error) {
      telecrmSynced = false
      telecrmError = error instanceof Error ? error.message : "Unknown TeleCRM error"
      console.error("TeleCRM sync failed:", telecrmError)
    }

    // Store in Prisma regardless
    const createdLead = await prisma.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email ?? null,
        course: data.procedure || data.treatment || null,
        message: data.message || data.concerns || null,
        source: data.source || "https://www.aloradentalwellnessbangalore.in/",
        formName: simpleFormName,
        consent: Boolean(data.consent ?? true),
        telecrmSynced,
        telecrmId,
        telecrmError,
        // status & priority use defaults from schema
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
          ? "Dental consultation submitted successfully"
          : "Consultation saved, but syncing to TeleCRM failed. Our team will follow up manually.",
        timestamp: new Date().toISOString(),
        formName: simpleFormName,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Dental lead submission error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process dental consultation",
        details: error instanceof Error ? error.message : "Unknown error",
        referenceId: `ERR-${Date.now()}`,
      },
      { status: 500 },
    )
  }
}
