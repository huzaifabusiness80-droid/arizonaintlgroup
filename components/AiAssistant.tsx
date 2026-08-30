"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Bot,
  User,
  RotateCcw,
  ArrowUpRight,
  ExternalLink,
  Loader2,
  Trash2,
  Sparkles,
} from "lucide-react";
import { useGeoLocation } from "@/context/GeoContext";
import { useLanguage } from "@/context/LanguageContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  model?: string;
}

const QUICK_PROMPTS_EN = [
  { label: "🇧🇭 Bahrain CR Setup", query: "How to register a CR and setup a company with 100% foreign ownership in Bahrain?" },
  { label: "✈️ Worldwide Visas", query: "What are the requirements and process for Schengen and UK tourist visas?" },
  { label: "🕋 Umrah & Flights", query: "What are the latest Umrah packages, flight bookings, and 5-star hotel options?" },
  { label: "🚗 Car Rental", query: "I want to rent a car with airport pickup in Bahrain/Pakistan." },
  { label: "💬 WhatsApp Chat", query: "I want to speak directly with an Arizona International specialist on WhatsApp." },
];

const QUICK_PROMPTS_AR = [
  { label: "🇧🇭 تأسيس الشركات بالبحرين", query: "كيف يمكنني تأسيس شركة وسجل تجاري بملكية أجنبية 100% في البحرين؟" },
  { label: "✈️ تأشيرات السفر", query: "ما هي متطلبات وتفاصيل استخراج تأشيرات الشنغن وبريطانيا؟" },
  { label: "🕋 باقات العمرة والطيران", query: "ما هي أحدث باقات العمرة وحجوزات الطيران والفنادق المتوفرة؟" },
  { label: "🚗 تأجير السيارات", query: "أرغب في حجز وتأجير سيارة مع التوصيل في البحرين/باكستان." },
  { label: "💬 تواصل عبر واتساب", query: "أرغب في التحدث مع مستشار مجموعة أريزونا عبر واتساب." },
];

export default function AiAssistant() {
  const { contact, isPakistan } = useGeoLocation();
  const { isArabic } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [recordedTranscript, setRecordedTranscript] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const [unreadBadge, setUnreadBadge] = useState(1);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: isArabic
        ? "مرحباً بك في **مجموعة أريزونا الدولية**! \n\nأنا مساعدك الذكي **Arizona AI**. كيف يمكنني مساعدتك اليوم في تأسيس الشركات في البحرين، استخراج التأشيرات العالمية، حجز الطيران، العمرة أو تأجير السيارات؟"
        : "Welcome to **Arizona International Group**!\n\nI am **Arizona AI**, your official corporate consultant. How can I assist you with **Bahrain Company Formation**, **Worldwide Visas**, **Umrah & Flights**, or **Car Rentals**?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const recordTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fullTranscriptRef = useRef<string>("");
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSound = (type: "send" | "receive") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "send") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.11);
      } else {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.16);
      }
    } catch {
      // AudioContext fallback
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadBadge(0);
      setShowTooltip(false);
    }
  }, [messages, isOpen]);

  const isRecordingRef = useRef(false);
  const finalTranscriptAccumulatorRef = useRef("");

  // Clean up timer and speech on unmount
  useEffect(() => {
    return () => {
      isRecordingRef.current = false;
      if (recordTimerRef.current) clearInterval(recordTimerRef.current);
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
        recognitionRef.current = null;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startVoiceRecording = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome, Edge, Safari, or a modern mobile browser.");
      return;
    }

    stopSpeaking();

    // Abort any lingering instance
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
      recognitionRef.current = null;
    }

    isRecordingRef.current = true;
    setIsRecording(true);
    setRecordDuration(0);
    setRecordedTranscript("");
    fullTranscriptRef.current = "";
    finalTranscriptAccumulatorRef.current = "";

    if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    const start = Date.now();
    recordTimerRef.current = setInterval(() => {
      setRecordDuration(Math.floor((Date.now() - start) / 1000));
    }, 500);

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptPiece = event.results[i][0]?.transcript || "";
          if (event.results[i].isFinal) {
            finalTranscriptAccumulatorRef.current += transcriptPiece + " ";
          } else {
            interim += transcriptPiece;
          }
        }
        const combined = (finalTranscriptAccumulatorRef.current + interim).trim().replace(/\s+/g, " ");
        if (combined) {
          fullTranscriptRef.current = combined;
          setRecordedTranscript(combined);
          setInput(combined);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition notice:", event?.error);
        if (event?.error === "not-allowed" || event?.error === "service-not-allowed") {
          alert("Microphone access was denied. Please allow microphone permissions in your browser address bar.");
          cancelVoiceRecording();
        }
      };

      recognition.onend = () => {
        // If user is still recording and recognition ended automatically (silence timeout)
        if (isRecordingRef.current) {
          try {
            // Re-instantiate fresh listener to prevent invalid state error
            const newRec = new SpeechRecognition();
            newRec.continuous = true;
            newRec.interimResults = true;
            newRec.maxAlternatives = 1;
            newRec.lang = "en-US";
            newRec.onresult = recognition.onresult;
            newRec.onerror = recognition.onerror;
            newRec.onend = recognition.onend;
            recognitionRef.current = newRec;
            newRec.start();
          } catch {
            // ignore
          }
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Failed to start voice recognition:", err);
      cancelVoiceRecording();
    }
  };

  const cancelVoiceRecording = () => {
    isRecordingRef.current = false;
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
      recordTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch {}
      recognitionRef.current = null;
    }
    setIsRecording(false);
    setRecordDuration(0);
    setRecordedTranscript("");
    fullTranscriptRef.current = "";
    finalTranscriptAccumulatorRef.current = "";
  };

  const finishAndSendVoiceRecording = () => {
    isRecordingRef.current = false;
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
      recordTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
      recognitionRef.current = null;
    }

    const transcriptToSend = (fullTranscriptRef.current || recordedTranscript || input).trim();
    setIsRecording(false);
    setRecordDuration(0);
    setRecordedTranscript("");
    fullTranscriptRef.current = "";
    finalTranscriptAccumulatorRef.current = "";

    if (transcriptToSend) {
      setVoiceEnabled(true);
      handleSendMessage(transcriptToSend);
    } else {
      setInput("I would like to inquire about Arizona International Group services.");
    }
  };

  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const cleanText = text
      .replace(/[#*`_~]/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[\u{1F600}-\u{1F6FF}]/gu, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.lang = "en-US";

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    setInput("");
    playSound("send");

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          userCountry: isPakistan ? "PK" : "BH",
          language: isArabic ? "ar" : "en",
        }),
      });

      const data = await response.json();
      const botResponseText =
        data.message ||
        "I'm here to assist you with Arizona International Group services. Please contact our team on WhatsApp for immediate support.";

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        model: data.model,
      };

      setMessages((prev) => [...prev, botMessage]);
      playSound("receive");

      if (voiceEnabled) {
        speakText(botResponseText);
      }
    } catch {
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I am pleased to connect you directly with our senior consultant.\n\n📲 **WhatsApp Specialist:** [Direct Chat on WhatsApp](${contact.whatsappLink()})\n📞 **Call Us:** ${contact.phone}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
      playSound("receive");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    stopSpeaking();
    setMessages([
      {
        id: "welcome-" + Date.now(),
        role: "assistant",
        content: isArabic
          ? "تمت إعادة تعيين المحادثة. كيف يمكنني مساعدتك في خدمات مجموعة أريزونا الدولية اليوم؟"
          : "Conversation restarted. How can Arizona International Group assist you today?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const renderMessageContent = (content: string, isUser: boolean = false) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: (string | React.ReactNode)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }
      const linkText = match[1];
      const linkUrl = match[2];
      const isWa = linkUrl.includes("wa.me") || linkUrl.includes("whatsapp");

      parts.push(
        <a
          key={match.index}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 px-2.5 py-1 my-1 rounded-md font-medium text-xs transition-colors ${isWa
              ? "bg-[#25D366] hover:bg-[#20bd5a] text-white"
              : isUser
                ? "bg-white/20 hover:bg-white/30 text-white underline"
                : "bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            }`}
        >
          {isWa ? <MessageSquare className="w-3 h-3 fill-current" /> : <ExternalLink className="w-3 h-3" />}
          <span>{linkText}</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return (
      <div className={`space-y-1 leading-relaxed text-xs sm:text-sm ${isUser ? "text-white" : "text-slate-800"}`}>
        {parts.map((part, idx) => {
          if (typeof part !== "string") return <React.Fragment key={idx}>{part}</React.Fragment>;
          return (
            <span key={idx} className="whitespace-pre-line">
              {part.split("\n").map((line, lIdx) => {
                const boldRegex = /\*\*([^*]+)\*\*/g;
                const lineParts: (string | React.ReactNode)[] = [];
                let bLast = 0;
                let bMatch;

                while ((bMatch = boldRegex.exec(line)) !== null) {
                  if (bMatch.index > bLast) {
                    lineParts.push(line.slice(bLast, bMatch.index));
                  }
                  lineParts.push(
                    <strong
                      key={bMatch.index}
                      className={isUser ? "font-bold text-white" : "font-bold text-slate-950"}
                    >
                      {bMatch[1]}
                    </strong>
                  );
                  bLast = boldRegex.lastIndex;
                }
                if (bLast < line.length) {
                  lineParts.push(line.slice(bLast));
                }

                return (
                  <React.Fragment key={lIdx}>
                    {lineParts}
                    {lIdx < line.split("\n").length - 1 && <br />}
                  </React.Fragment>
                );
              })}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Trigger Dock */}
      <div
        className={`fixed bottom-5 ${isArabic ? "left-5" : "right-5"
          } z-50 flex flex-col items-end pointer-events-auto select-none`}
      >
        {showTooltip && !isOpen && (
          <div
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
            className="mb-2.5 cursor-pointer flex items-center gap-2 bg-white px-3.5 py-2 rounded-lg shadow-md border border-slate-200 transition-all hover:border-[#93c5fd]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <div className="text-xs">
              <p className="font-medium text-slate-900">
                {isArabic ? "مساعد أريزونا الذكي" : "Arizona AI Consultant"}
              </p>
              <p className="text-[10.5px] text-slate-500">
                {isArabic ? "اسأل عن السجل التجاري والتأشيرات" : "Ask about Bahrain CR & Visas"}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-slate-400 hover:text-slate-600 p-0.5 ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {!isOpen && (
          <button
            id="arizona-ai-trigger"
            onClick={() => setIsOpen(true)}
            className="group flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-md transition-colors cursor-pointer"
            aria-label="Open Arizona AI Assistant"
          >
            <Bot className="w-6 h-6" />
            {unreadBadge > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-medium text-white">
                {unreadBadge}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Main AI Assistant Dialog */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-200 ease-out ${isExpanded
              ? "inset-3 sm:inset-6 md:inset-8"
              : `bottom-4 ${isArabic ? "left-4" : "right-4"} w-[94vw] sm:w-[400px] md:w-[420px] h-[82vh] max-h-[620px]`
            }`}
        >
          <div className="flex flex-col h-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0f172a] text-white border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#2563eb] text-white font-medium">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-medium text-xs sm:text-sm text-white">
                      Arizona AI
                    </h3>
                    <span className="text-[9px] font-medium px-1.5 py-0.2 rounded-md bg-blue-500/20 text-[#3b82f6]">
                      Official
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    {isArabic ? "مساعد مجموعة أريزونا" : "Corporate Intelligence"}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    if (isSpeaking) stopSpeaking();
                    setVoiceEnabled(!voiceEnabled);
                  }}
                  className={`p-1.5 rounded-md transition-colors ${voiceEnabled
                      ? "text-[#3b82f6] hover:bg-slate-800"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  title={voiceEnabled ? "Voice Output Active" : "Voice Output Muted"}
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  onClick={handleReset}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                  title="Restart Conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors hidden sm:flex"
                  title={isExpanded ? "Collapse" : "Expand"}
                >
                  {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => {
                    stopSpeaking();
                    setIsOpen(false);
                    setIsExpanded(false);
                  }}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Speaking State Banner */}
            {isSpeaking && (
              <div className="flex items-center justify-between px-3.5 py-1.5 bg-blue-50 border-b border-blue-100 text-[#2563eb] text-xs font-normal">
                <span>{isArabic ? "مساعد أريزونا يتحدث الآن..." : "Arizona AI is speaking..."}</span>
                <button
                  onClick={stopSpeaking}
                  className="text-[11px] font-medium hover:underline"
                >
                  {isArabic ? "إيقاف" : "Stop"}
                </button>
              </div>
            )}

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 items-start ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                >
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-md shrink-0 text-xs ${msg.role === "user"
                        ? "bg-slate-900 text-white"
                        : "bg-[#2563eb] text-white font-medium"
                      }`}
                  >
                    {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-lg px-3.5 py-2.5 shadow-sm ${msg.role === "user"
                        ? "bg-[#2563eb] text-white"
                        : "bg-white text-slate-900 border border-slate-200"
                      }`}
                  >
                    {renderMessageContent(msg.content, msg.role === "user")}

                    <div
                      className={`flex items-center justify-between mt-1.5 pt-1 border-t text-[10px] ${msg.role === "user"
                          ? "border-blue-400/30 text-blue-100"
                          : "border-slate-100 text-slate-400"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{msg.timestamp}</span>
                        {msg.role === "assistant" && (
                          <button
                            type="button"
                            onClick={() => speakText(msg.content)}
                            className="inline-flex items-center gap-0.5 text-slate-500 hover:text-[#2563eb] transition-colors p-0.5"
                            title="Listen to this message"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span className="text-[9px]">Play</span>
                          </button>
                        )}
                      </div>
                      {msg.role === "assistant" && msg.model && (
                        <span className="font-mono text-[9px] text-[#2563eb]">
                          {msg.model === "arizona-knowledge-engine" ? "Knowledge Engine" : msg.model}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 items-start">
                  <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[#2563eb] text-white shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-bounce [animation-delay:300ms]" />
                      <span className="text-xs text-slate-500 font-normal ml-1">
                        {isArabic ? "جاري التفكير..." : "Analyzing..."}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions / Category Tabs */}
            <div className="px-3.5 py-2.5 bg-slate-50/90 border-t border-slate-200">
              <div className="flex flex-wrap items-center gap-1.5">
                {(isArabic ? QUICK_PROMPTS_AR : QUICK_PROMPTS_EN).map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(item.query)}
                    disabled={isLoading || isRecording}
                    className="text-[11px] sm:text-xs px-2.5 py-1 rounded-full bg-white hover:bg-[#2563eb] hover:text-white border border-slate-200/90 text-slate-700 font-medium transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-start"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Input Box */}
            <div className="p-3 bg-white border-t border-slate-200">
              {isRecording ? (
                /* WhatsApp Style Voice Recorder Bar */
                <div className="flex items-center justify-between gap-2 p-2 bg-red-50/90 border border-red-200 rounded-xl animate-in fade-in zoom-in-95 duration-150">
                  {/* Cancel / Trash */}
                  <button
                    type="button"
                    onClick={cancelVoiceRecording}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors cursor-pointer"
                    title={isArabic ? "إلغاء التسجيل" : "Cancel & delete voice note"}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Timer & Blinking Dot */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                    <span className="font-mono text-xs font-semibold text-red-700">
                      {formatDuration(recordDuration)}
                    </span>
                  </div>

                  {/* Audio Wave Bars & Real-time text preview */}
                  <div className="flex-1 flex flex-col items-center justify-center px-1 overflow-hidden">
                    <div className="flex items-center gap-0.5 h-5">
                      {[30, 75, 45, 90, 60, 100, 50, 85, 40, 95, 60, 35, 80].map((h, i) => (
                        <span
                          key={i}
                          className="w-1 bg-red-500 rounded-full animate-pulse"
                          style={{
                            height: `${Math.max(5, (h * 18) / 100)}px`,
                            animationDelay: `${i * 90}ms`,
                            animationDuration: "600ms",
                          }}
                        />
                      ))}
                    </div>
                    {recordedTranscript ? (
                      <span className="text-[10.5px] sm:text-xs text-slate-900 font-medium truncate max-w-[180px] sm:max-w-[220px] bg-white px-2 py-0.5 rounded-md shadow-2xs border border-red-200 mt-0.5">
                        "{recordedTranscript}"
                      </span>
                    ) : (
                      <span className="text-[10px] text-red-700/90 font-medium mt-0.5">
                        Listening in English...
                      </span>
                    )}
                  </div>

                  {/* Send Voice Note */}
                  <button
                    type="button"
                    onClick={finishAndSendVoiceRecording}
                    className="p-2.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-md transition-transform active:scale-95 cursor-pointer flex items-center justify-center"
                    title={isArabic ? "إرسال التسجيل الصوتي" : "Send voice message"}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-1.5"
                >
                  {/* Left Voice Record Trigger */}
                  <button
                    type="button"
                    onClick={startVoiceRecording}
                    className="p-2 rounded-md bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-[#2563eb] border border-slate-200/60 transition-colors cursor-pointer"
                    title={isArabic ? "تسجيل رسالة صوتية (واتساب)" : "Record voice message (WhatsApp style)"}
                  >
                    <Mic className="w-4 h-4 text-[#2563eb]" />
                  </button>

                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      isArabic
                        ? "اكتب استفسارك أو اضغط 🎙️ للتسجيل الصوتي..."
                        : "Ask a question or tap 🎙️ to record voice..."
                    }
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563eb]"
                    disabled={isLoading}
                  />

                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="p-2 rounded-md bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-40 text-white transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </form>
              )}

              <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400">
                <span>
                  Powered by <span className="font-semibold text-slate-700">Muhammad Huzaifa</span>
                </span>
                <a
                  href={contact.whatsappLink("Hello Arizona International Group, I would like to inquire about your services.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#25D366] hover:underline font-medium"
                >
                  <span>WhatsApp Consultant</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
