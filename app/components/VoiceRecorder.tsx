'use client'

import { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface VoiceRecorderProps {
  onTranscript: (transcript: string) => void
  isRecording: boolean
  setIsRecording: (recording: boolean) => void
  isProcessing: boolean
  setIsListening: (listening: boolean) => void
}

export default function VoiceRecorder({
  onTranscript,
  isRecording,
  setIsRecording,
  isProcessing,
  setIsListening
}: VoiceRecorderProps) {
  const [isSupported, setIsSupported] = useState(false)
  const [transcript, setTranscript] = useState('')
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        setIsSupported(true)
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = true
        recognition.lang = 'en-US'

        recognition.onstart = () => {
          setIsRecording(true)
          setIsListening(true)
          toast.success('Listening...')
        }

        recognition.onresult = (event) => {
          let finalTranscript = ''
          let interimTranscript = ''

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript
            } else {
              interimTranscript += transcript
            }
          }

          setTranscript(finalTranscript || interimTranscript)
          
          if (finalTranscript) {
            onTranscript(finalTranscript)
            setTranscript('')
          }
        }

        recognition.onend = () => {
          setIsRecording(false)
          setIsListening(false)
        }

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error)
          setIsRecording(false)
          setIsListening(false)
          toast.error('Speech recognition failed. Please try again.')
        }

        recognitionRef.current = recognition
      }
    }
  }, [onTranscript, setIsListening])

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      recognitionRef.current.start()
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop()
    }
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  if (!isSupported) {
    return (
      <div className="text-center py-8">
        <VolumeX className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Voice recognition is not supported in this browser.</p>
        <p className="text-sm text-gray-500 mt-2">Please use Chrome, Edge, or Safari.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Voice Recording Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className={`voice-button ${isRecording ? 'recording' : ''} ${
            isProcessing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isRecording ? (
            <MicOff className="w-8 h-8" />
          ) : (
            <Mic className="w-8 h-8" />
          )}
        </motion.button>
      </div>

      {/* Status Display */}
      <div className="text-center">
        <motion.div
          animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: isRecording ? Infinity : 0 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800"
        >
          <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-sm font-medium">
            {isRecording ? 'Recording...' : isProcessing ? 'Processing...' : 'Click to speak'}
          </span>
        </motion.div>
      </div>

      {/* Live Transcript */}
      {transcript && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <p className="text-sm text-blue-800">
            <span className="font-medium">You said:</span> {transcript}
          </p>
        </motion.div>
      )}

      {/* Quick Actions */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => speakText('Hello, I am your medical AI assistant. How can I help you today?')}
          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Volume2 className="w-4 h-4" />
          <span>Test Voice</span>
        </button>
      </div>
    </div>
  )
}
