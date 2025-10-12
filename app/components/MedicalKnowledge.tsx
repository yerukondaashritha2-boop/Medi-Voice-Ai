'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Stethoscope, 
  Heart, 
  Pill, 
  Activity, 
  AlertTriangle, 
  Shield,
  BookOpen,
  Zap
} from 'lucide-react'

export default function MedicalKnowledge() {
  const [activeTab, setActiveTab] = useState('symptoms')

  const medicalData = {
    symptoms: [
      { name: 'Chest Pain', severity: 'High', description: 'Immediate medical attention required' },
      { name: 'Shortness of Breath', severity: 'High', description: 'Could indicate respiratory issues' },
      { name: 'Fever', severity: 'Medium', description: 'Monitor temperature and duration' },
      { name: 'Headache', severity: 'Low', description: 'Common symptom, monitor patterns' },
    ],
    medications: [
      { name: 'Aspirin', type: 'NSAID', description: 'Pain relief and anti-inflammatory' },
      { name: 'Ibuprofen', type: 'NSAID', description: 'Anti-inflammatory and pain relief' },
      { name: 'Acetaminophen', type: 'Analgesic', description: 'Pain relief and fever reduction' },
      { name: 'Antibiotics', type: 'Antimicrobial', description: 'Treat bacterial infections' },
    ],
    conditions: [
      { name: 'Hypertension', category: 'Cardiovascular', description: 'High blood pressure condition' },
      { name: 'Diabetes', category: 'Metabolic', description: 'Blood sugar regulation disorder' },
      { name: 'Asthma', category: 'Respiratory', description: 'Chronic airway inflammation' },
      { name: 'Arthritis', category: 'Musculoskeletal', description: 'Joint inflammation and pain' },
    ]
  }

  const tabs = [
    { id: 'symptoms', label: 'Symptoms', icon: Activity },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'conditions', label: 'Conditions', icon: Heart },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="medical-card">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Medical Knowledge</h2>
            <p className="text-sm text-gray-600">Quick reference guide</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Medical Disclaimer</h4>
              <p className="text-sm text-yellow-700 mt-1">
                This AI assistant provides general information only. Always consult with healthcare professionals for medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Knowledge Tabs */}
      <div className="medical-card">
        <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {activeTab === 'symptoms' && (
            <div className="space-y-3">
              {medicalData.symptoms.map((symptom, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{symptom.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(symptom.severity)}`}>
                      {symptom.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{symptom.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'medications' && (
            <div className="space-y-3">
              {medicalData.medications.map((med, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{med.name}</h4>
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                      {med.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{med.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'conditions' && (
            <div className="space-y-3">
              {medicalData.conditions.map((condition, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{condition.name}</h4>
                    <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
                      {condition.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{condition.description}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="medical-card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-yellow-500" />
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center space-x-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Drug Interactions</span>
          </button>
          
          <button className="flex items-center space-x-2 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Safety Check</span>
          </button>
        </div>
      </div>
    </div>
  )
}
