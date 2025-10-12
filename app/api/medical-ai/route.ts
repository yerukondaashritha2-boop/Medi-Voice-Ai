import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const medicalSystemPrompt = `You are Medi-Voice AI, a professional medical assistant designed to help healthcare professionals and patients with medical information. 

IMPORTANT MEDICAL DISCLAIMERS:
- Always remind users that this is not a substitute for professional medical advice
- For emergencies, advise users to call emergency services immediately
- Encourage users to consult with qualified healthcare professionals
- Never provide specific diagnoses or treatment recommendations

Your capabilities include:
- Explaining medical symptoms and conditions in simple terms
- Providing general health information
- Discussing medication information and interactions
- Offering wellness and prevention advice
- Helping with medical terminology
- Providing first aid guidance

Guidelines:
- Be accurate, helpful, and empathetic
- Use clear, understandable language
- Always prioritize patient safety
- Include appropriate disclaimers
- Stay within your scope of general medical information
- If asked about specific medical advice, redirect to healthcare professionals

Respond in a conversational, helpful manner while maintaining medical accuracy and safety.`

// Fallback medical responses for common queries
const getFallbackResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('headache') || lowerMessage.includes('head pain')) {
    return `Headaches can have many causes including stress, dehydration, or tension. 

**General advice:**
- Rest in a quiet, dark room
- Apply a cool compress to your forehead
- Stay hydrated
- Consider over-the-counter pain relief (if appropriate)

**Seek immediate medical attention if:**
- Sudden, severe headache
- Headache with fever, stiff neck, or confusion
- Headache after head injury

**Important:** This is general information only. Consult a healthcare professional for proper diagnosis and treatment.`
  }
  
  if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
    return `Fever is your body's natural response to infection or illness.

**General care:**
- Rest and stay hydrated
- Monitor temperature regularly
- Use fever-reducing medications as directed
- Cool compresses can help

**Seek medical attention if:**
- Fever above 103°F (39.4°C)
- Fever lasting more than 3 days
- Fever with severe symptoms

**Important:** This is general information only. Consult a healthcare professional for proper evaluation.`
  }
  
  if (lowerMessage.includes('chest pain') || lowerMessage.includes('chest discomfort')) {
    return `Chest pain can be serious and should be evaluated promptly.

**Immediate action needed:**
- If severe chest pain, call emergency services immediately
- Don't ignore chest pain, especially if it spreads to arm, neck, or jaw
- Chest pain with shortness of breath requires urgent care

**Common causes:**
- Heart-related issues
- Muscle strain
- Acid reflux
- Anxiety

**Important:** This is general information only. Chest pain requires professional medical evaluation.`
  }
  
  if (lowerMessage.includes('medication') || lowerMessage.includes('drug') || lowerMessage.includes('pill')) {
    return `Medication information should always be discussed with healthcare professionals.

**General guidelines:**
- Take medications as prescribed
- Don't share medications with others
- Store medications properly
- Be aware of potential interactions

**Important:** Always consult your doctor or pharmacist about:
- Medication interactions
- Side effects
- Proper dosing
- Storage requirements

**This is general information only. Consult healthcare professionals for specific medication advice.**`
  }
  
  if (lowerMessage.includes('leg pain') || lowerMessage.includes('leg ache') || lowerMessage.includes('legs hurt')) {
    return `Leg pain can have various causes and should be evaluated based on severity and duration.

**Common causes:**
- Muscle strain or overuse
- Poor circulation
- Nerve compression
- Arthritis or joint issues
- Blood clots (deep vein thrombosis)

**When to seek immediate medical attention:**
- Sudden, severe leg pain
- Pain with swelling, redness, or warmth
- Pain that worsens with walking
- Leg pain with chest pain or shortness of breath

**General care:**
- Rest and elevate the leg
- Apply ice for acute pain
- Gentle stretching and movement
- Over-the-counter pain relief (if appropriate)

**Important:** This is general information only. Persistent or severe leg pain requires professional medical evaluation.`
  }
  
  if (lowerMessage.includes('back pain') || lowerMessage.includes('backache')) {
    return `Back pain is very common and usually improves with time and proper care.

**Common causes:**
- Muscle or ligament strain
- Poor posture
- Herniated discs
- Arthritis
- Stress and tension

**Self-care measures:**
- Maintain good posture
- Gentle stretching and strengthening exercises
- Apply heat or ice
- Over-the-counter pain relief
- Stay active within comfort limits

**Seek medical attention if:**
- Pain persists for more than a few weeks
- Pain radiates down the leg
- Numbness or weakness in legs
- Loss of bowel or bladder control

**Important:** This is general information only. Consult healthcare professionals for proper diagnosis and treatment.`
  }
  
  // Default response for other queries
  return `Thank you for your medical question. I'm here to provide general health information.

**Important reminders:**
- This AI provides general information only
- Always consult healthcare professionals for medical advice
- For emergencies, call emergency services immediately
- Don't use this information to self-diagnose or self-treat

**For your specific question:** I recommend discussing this with your healthcare provider who can provide personalized medical advice based on your complete medical history and current condition.

Would you like me to help you find general information about any specific medical topic?`
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversation } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Try OpenAI API first
    try {
      // Build conversation context
      const messages = [
        { role: 'system', content: medicalSystemPrompt },
        ...conversation.slice(-10).map((msg: any) => ({
          role: msg.role,
          content: msg.content
        })),
        { role: 'user', content: message }
      ]

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages as any,
        max_tokens: 500,
        temperature: 0.7,
      })

      const response = completion.choices[0]?.message?.content || 'I apologize, but I could not process your request at this time.'

      return NextResponse.json({ 
        response,
        timestamp: new Date().toISOString()
      })

    } catch (openaiError: any) {
      console.error('OpenAI API error:', openaiError)
      
      // Check if it's a quota/rate limit error
      if (openaiError.status === 429 || openaiError.code === 'insufficient_quota') {
        console.log('Using fallback response due to OpenAI quota limit')
        
        const fallbackResponse = getFallbackResponse(message)
        
        return NextResponse.json({ 
          response: fallbackResponse,
          timestamp: new Date().toISOString(),
          fallback: true
        })
      }
      
      // For other OpenAI errors, still use fallback
      const fallbackResponse = getFallbackResponse(message)
      
      return NextResponse.json({ 
        response: fallbackResponse,
        timestamp: new Date().toISOString(),
        fallback: true
      })
    }

  } catch (error) {
    console.error('Error processing medical AI request:', error)
    
    // Final fallback response
    const fallbackResponse = `I apologize, but I'm experiencing technical difficulties. Please try again in a moment. 

For immediate medical concerns, please contact your healthcare provider or emergency services.

Remember: This AI assistant provides general information only and should not replace professional medical advice.`

    return NextResponse.json({ 
      response: fallbackResponse,
      timestamp: new Date().toISOString()
    })
  }
}
