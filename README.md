# Medi-Voice AI

A modern AI-powered medical voice assistant built with Next.js, TypeScript, and OpenAI.

## Features

- 🎤 **Voice Recognition**: Real-time speech-to-text using Web Speech API
- 🔊 **Text-to-Speech**: Natural voice responses using browser speech synthesis
- 🤖 **AI Medical Assistant**: Powered by OpenAI GPT for medical information
- 💬 **Conversation History**: Track and display chat interactions
- 📚 **Medical Knowledge Base**: Quick reference for symptoms, medications, and conditions
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- ⚡ **Real-time Processing**: Instant voice processing and responses

## Getting Started

### Prerequisites

- Node.js 18+ 
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd medi-voice-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Voice Interaction
1. Click the microphone button to start recording
2. Speak your medical question or concern
3. The AI will process your request and respond with voice and text
4. View conversation history in the chat interface

### Medical Knowledge
- Browse symptoms, medications, and conditions
- Quick reference for common medical information
- Safety guidelines and disclaimers

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **AI**: OpenAI GPT-3.5-turbo
- **Voice**: Web Speech API, Speech Synthesis API
- **Icons**: Lucide React

## Medical Disclaimer

⚠️ **Important**: This application is for educational and informational purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical concerns.

## Browser Compatibility

- Chrome (recommended)
- Edge
- Safari
- Firefox (limited voice support)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.
