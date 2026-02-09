// app/api/leads/[id]/route.ts
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import type { LeadStatus, LeadPriority } from "@prisma/client"

interface PatchBody {
  status?: LeadStatus
  priority?: LeadPriority
  telecrmSynced?: boolean
  telecrmId?: string | null
  telecrmError?: string | null
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params

  try {
    const body: PatchBody = await request.json()

    const updateData: any = {}

    if (body.status) updateData.status = body.status
    if (body.priority) updateData.priority = body.priority
    if (typeof body.telecrmSynced === "boolean") updateData.telecrmSynced = body.telecrmSynced
    if (body.telecrmId !== undefined) updateData.telecrmId = body.telecrmId
    if (body.telecrmError !== undefined) updateData.telecrmError = body.telecrmError

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ success: true, data: updatedLead })
  } catch (error) {
    console.error("Error updating lead:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update lead" },
      { status: 500 },
    )
  }
}
