import { NextRequest, NextResponse } from "next/server";
import { CORE_SERVICES_DATA } from "@/lib/core-services";
import { allVisasData } from "@/lib/data";

const SYSTEM_PROMPT = `
You are "Arizona AI", the official elite AI Consultant and Voice Assistant for Arizona International Group.

========================================
ABOUT ARIZONA INTERNATIONAL GROUP:
========================================
Arizona International Group is an international corporate consulting, visa facilitation, travel management, car rental, and business services firm operating in Bahrain (Manama) and Pakistan (Islamabad / Rawalpindi).

OFFICIAL CONTACT INFORMATION:
- Bahrain Office / WhatsApp: +973 32306963
- Pakistan Office / WhatsApp: +92 313 5921434 / +92 302 9795921
- Email: Arizona.consultancy@yahoo.com / arizonaintlservices@gmail.com

========================================
CORE SERVICES SUMMARY:
========================================
1. Bahrain Business Setup & CR Formation (Commercial Registration, 100% Foreign Ownership, W.L.L., LMRA Work Permits, Corporate Bank Accounts, Office address).
2. Worldwide Visa Processing (Schengen, UK, USA, Canada, Australia, Malaysia eVisa, Bahrain Visas).
3. Flights, 5-Star Hotels & VIP Umrah Packages.
4. Luxury & Economy Car Rentals with Airport Pickups (Bahrain & Pakistan).
5. PRO Services, Document Attestation (MOFA/Embassy), and Clearances.

========================================
STRICT INSTRUCTIONS FOR YOUR RESPONSES:
========================================
1. LANGUAGE: Respond strictly in ENGLISH. Always speak and write in clear, natural English.
2. CONCISENESS & DIRECTNESS:
   - Answer ONLY what the user asked directly.
   - Keep answers conversational, crisp, and concise (typically 2 to 4 sentences or a few short bullet points).
   - NEVER dump huge generic templates or full service brochures unless specifically requested.
   - When spoken aloud via voice, it should sound natural, fast, intelligent, and helpful.
3. CONTACT INFO:
   - Provide the WhatsApp link or phone number (+973 32306963 / +92 313 5921434) naturally when relevant to closing an inquiry or when user asks for booking/consultation.
4. VOICE SPEECH TOLERANCE:
   - Queries may come via voice microphone. If words contain slight phonetic speech-to-text variations (e.g. 'see are' for 'CR', 'you can visa' for 'UK visa', 'variance' for 'Bahrain'), intelligently recognize the true intent and provide the exact helpful answer in English.
`;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, userCountry } = body as {
      messages: ChatMessage[];
      userCountry?: string;
      language?: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid message payload" },
        { status: 400 }
      );
    }

    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // List of modern models to attempt in order
    const candidateModels = [
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-2.5-flash",
      "gemini-1.5-pro",
      "gemini-pro",
    ];

    let aiResponseText = "";
    let modelUsed = "";

    // Prepare contents formatted for Gemini
    const contents: any[] = [
      {
        role: "user",
        parts: [
          {
            text: `${SYSTEM_PROMPT}\n\n[USER LOCATION: ${userCountry || "Bahrain/Pakistan/Global"}]`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Hello! I am Arizona AI, your corporate and visa consultant at Arizona International Group. I will provide direct, concise, and accurate answers in English to all your inquiries.",
          },
        ],
      },
    ];

    // Append history cleanly
    const recentMessages = messages.slice(-8);
    for (const m of recentMessages) {
      contents.push({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      });
    }

    if (apiKey) {
      for (const model of candidateModels) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents,
                generationConfig: {
                  temperature: 0.6,
                  topP: 0.9,
                  maxOutputTokens: 500,
                },
              }),
            }
          );

          if (res.ok) {
            const data = await res.json();
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply && reply.trim().length > 0) {
              aiResponseText = reply.trim();
              modelUsed = model;
              break;
            }
          }
        } catch {
          // continue to next model
        }
      }
    }

    // High-intelligence localized fallback engine
    if (!aiResponseText) {
      aiResponseText = generateIntelligentResponse(lastUserMessage, userCountry);
      modelUsed = "arizona-knowledge-engine";
    }

    return NextResponse.json({
      message: aiResponseText,
      model: modelUsed,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Concise, direct English knowledge fallback engine
 */
function generateIntelligentResponse(
  query: string,
  userCountry?: string
): string {
  const q = query.toLowerCase().trim();
  const isPak = userCountry === "PK" || /pakistan|islamabad|rawalpindi|lahore|karachi/i.test(query);
  const contactNumber = isPak ? "+92 313 5921434" : "+973 32306963";
  const whatsappUrl = isPak
    ? "https://wa.me/923135921434"
    : "https://wa.me/97332306963";

  // Greetings & Casual Queries
  if (/^(hi|hello|hey|salam|assalam|aoa|good morning|good evening|who are you|how are you)/i.test(q)) {
    return `Hello! I am **Arizona AI**, your consultant at Arizona International Group. How can I help you today with Bahrain business setup, visas, flight bookings, or car rentals?`;
  }

  // Bahrain CR & Business Setup
  if (/bahrain|cr|sijilat|wll|company|business|setup|formation|registration/i.test(q)) {
    return `We provide complete **Company Formation & Commercial Registration (CR)** in Bahrain with **100% Foreign Ownership**.\n\n✨ **What we handle:**\n- CR issuance & activity approvals via Sijilat\n- Commercial address & EWA setup\n- LMRA Investor & employee work visas\n- Corporate bank account opening\n\nWould you like to start your registration? Chat directly on [WhatsApp](${whatsappUrl}) or call **${contactNumber}**.`;
  }

  // Visas & Immigration
  if (/visa|schengen|uk|usa|america|canada|australia|malaysia|azerbaijan|visit|tourist/i.test(q)) {
    return `We process worldwide visas including **Schengen, UK, USA, Canada, Australia**, and fast-track **Malaysia & Azerbaijan eVisas** (3–5 days).\n\n✨ **Our support includes:** file preparation, verified flight/hotel vouchers, cover letters, and embassy appointments.\n\nShare your target country and passport nationality on [WhatsApp](${whatsappUrl}) for an instant assessment!`;
  }

  // Umrah & Flights
  if (/umrah|hajj|flight|ticket|hotel|makkah|madinah/i.test(q)) {
    return `We offer customized **VIP & Budget Umrah Packages** with 5-star hotel accommodations near Haram, luxury transport, and fast visa processing, plus discounted airline tickets worldwide.\n\nFor customized dates and flight quotes, message our travel team on [WhatsApp](${whatsappUrl}) or call **${contactNumber}**.`;
  }

  // Car Rental
  if (/car|rental|rent|vehicle|drive|chauffeur|airport transfer/i.test(q)) {
    return `We offer daily, weekly, and monthly **Car Rentals** (Economy, Sedans, and Luxury SUVs) with 24/7 airport pickup and chauffeur services in Bahrain and Pakistan.\n\nTo check rates and book your vehicle, chat on [WhatsApp](${whatsappUrl}) or call **${contactNumber}**.`;
  }

  // Contact / WhatsApp
  if (/contact|phone|number|whatsapp|call|office|address|location/i.test(q)) {
    return `You can reach Arizona International Group directly:\n- 🇧🇭 **Bahrain Office:** +973 32306963 (Manama)\n- 🇵🇰 **Pakistan Office:** +92 313 5921434 / +92 302 9795921 (Islamabad/Rawalpindi)\n- 💬 **WhatsApp:** [Click to Chat on WhatsApp](${whatsappUrl})`;
  }

  // General fallback
  return `At **Arizona International Group**, we assist with **Bahrain Company Formation (100% Foreign Ownership)**, **Worldwide Visas (Schengen, UK, USA, Canada)**, **Umrah Packages & Flights**, and **Car Rentals**.\n\nHow can I specifically assist you with your plans today? You can also connect with our team on [WhatsApp](${whatsappUrl}) (**${contactNumber}**).`;
}
