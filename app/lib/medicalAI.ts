'use client'

import { useState } from 'react'

// Client-side medical responses for static export
const getMedicalResponse = (message: string): string => {
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
  
  if (lowerMessage.includes('covid') || lowerMessage.includes('coronavirus')) {
    return `COVID-19 is a respiratory illness caused by the SARS-CoV-2 virus.

**Common symptoms:**
- Fever or chills
- Cough
- Shortness of breath
- Fatigue
- Loss of taste or smell

**Prevention:**
- Get vaccinated
- Wear masks in crowded areas
- Practice good hygiene
- Maintain social distance

**Important:** This is general information only. Consult healthcare professionals for specific guidance.`
  }
  
  if (lowerMessage.includes('diabetes') || lowerMessage.includes('blood sugar')) {
    return `Diabetes is a condition that affects how your body processes blood sugar.

**Types:**
- Type 1: Body doesn't produce insulin
- Type 2: Body doesn't use insulin properly
- Gestational: Develops during pregnancy

**Management:**
- Monitor blood sugar levels
- Follow prescribed medication
- Maintain healthy diet
- Regular exercise

**Important:** This is general information only. Consult healthcare professionals for proper management.`
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

export const processMedicalQuery = async (message: string): Promise<{response: string, timestamp: string}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const response = getMedicalResponse(message)
  
  return {
    response,
    timestamp: new Date().toISOString()
  }
}
