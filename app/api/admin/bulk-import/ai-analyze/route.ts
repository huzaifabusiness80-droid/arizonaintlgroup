import { NextRequest, NextResponse } from "next/server";
import { analyzeSpreadsheetWithGemini, SECTION_SCHEMAS } from "@/lib/gemini-import";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, headers, rows } = body;

    if (!section || !Array.isArray(headers) || !Array.isArray(rows)) {
      return NextResponse.json(
        { success: false, error: "Section, headers array, and rows array are required." },
        { status: 400 }
      );
    }

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "No data rows provided for analysis." },
        { status: 400 }
      );
    }

    const schema = SECTION_SCHEMAS[section];
    if (!schema) {
      return NextResponse.json(
        { success: false, error: `Invalid section: ${section}. Supported: ${Object.keys(SECTION_SCHEMAS).join(", ")}` },
        { status: 400 }
      );
    }

    // Run Gemini AI Analysis
    const analysis = await analyzeSpreadsheetWithGemini(section, headers, rows);

    return NextResponse.json({
      section,
      sectionName: schema.name,
      targetFields: schema.fields,
      ...analysis,
    });
  } catch (error: any) {
    console.error("AI Analysis API Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to analyze spreadsheet with AI." },
      { status: 500 }
    );
  }
}
