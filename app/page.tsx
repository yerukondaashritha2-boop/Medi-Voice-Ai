'use client'

import { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import VoiceRecorder from './components/VoiceRecorder'
import ChatInterface from './components/ChatInterface'
import MedicalKnowledge from './components/MedicalKnowledge'

export default function Home() {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', content: string, timestamp: Date}>>([])
  const [isListening, setIsListening] = useState(false)

  const handleVoiceInput = async (transcript: string) => {
    if (!transcript.trim()) return
    
    const userMessage = { role: 'user' as const, content: transcript, timestamp: new Date() }
    setConversation(prev => [...prev, userMessage])
    setIsProcessing(true)
    
    try {
      // Try server-side API first, fallback to client-side
      let data
      try {
        const response = await fetch('/api/medical-ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: transcript, conversation: conversation })
        })
        data = await response.json()
      } catch (apiError) {
        // Fallback to client-side processing for static export
        const { processMedicalQuery } = await import('./lib/medicalAI')
        data = await processMedicalQuery(transcript)
      }
      
      const assistantMessage = { role: 'assistant' as const, content: data.response, timestamp: new Date() }
      setConversation(prev => [...prev, assistantMessage])
      
      // Speak the response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(data.response)
        utterance.rate = 0.9
        utterance.pitch = 1
        speechSynthesis.speak(utterance)
      }
      
    } catch (error) {
      console.error('Error processing voice input:', error)
      toast.error('Failed to process your request. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Volume2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Medi-Voice AI</h1>
                <p className="text-sm text-gray-600">AI-Powered Medical Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <span className="text-sm text-gray-600">
                {isListening ? 'Listening...' : 'Ready'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Voice Interface */}
          <div className="lg:col-span-2">
            <div className="medical-card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Mic className="w-5 h-5 mr-2 text-blue-500" />
                Voice Assistant
              </h2>
              
              <VoiceRecorder
                onTranscript={handleVoiceInput}
                isRecording={isRecording}
                setIsRecording={setIsRecording}
                isProcessing={isProcessing}
                setIsListening={setIsListening}
              />
              
              <div className="mt-6">
                <ChatInterface 
                  conversation={conversation}
                  isProcessing={isProcessing}
                />
              </div>
            </div>
          </div>

          {/* Medical Knowledge Panel */}
          <div className="lg:col-span-1">
            <MedicalKnowledge />
          </div>
        </div>
      </div>
    </main>
  )
}
