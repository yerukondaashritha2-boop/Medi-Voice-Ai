# Medi-Voice AI

A modern AI-powered medical voice assistant built with Next.js, TypeScript, and OpenAI. This application provides voice-based medical information and assistance with intelligent fallback responses.

## 🚀 Live Demo

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/medi-voice-ai)

## ✨ Features

- 🎤 **Voice Recognition**: Real-time speech-to-text using Web Speech API
- 🔊 **Text-to-Speech**: Natural voice responses using browser speech synthesis  
- 🤖 **AI Medical Assistant**: Powered by OpenAI GPT with intelligent fallback
- 💬 **Conversation History**: Track and display chat interactions
- 📚 **Medical Knowledge Base**: Quick reference for symptoms, medications, and conditions
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS and Framer Motion
- ⚡ **Real-time Processing**: Instant voice processing and responses
- 🛡️ **Smart Fallback**: Works even without OpenAI API quota

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **AI**: OpenAI GPT-3.5-turbo with intelligent fallback
- **Voice**: Web Speech API, Speech Synthesis API
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- OpenAI API key (optional - app works with fallback responses)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/medi-voice-ai.git
cd medi-voice-ai
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables (optional):**
Create a `.env.local` file:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Fork this repository**
2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy!

3. **Environment Variables in Vercel:**
   - `OPENAI_API_KEY`: Your OpenAI API key (optional)

### Deploy to GitHub Pages

1. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Select "GitHub Actions" as source
   - The workflow will automatically deploy

2. **Manual deployment:**
```bash
npm run build
npm run export
# Upload the 'out' folder to GitHub Pages
```

## 🎯 Usage

### Voice Interaction
1. Click the microphone button to start recording
2. Speak your medical question or concern
3. Get instant AI responses with voice and text
4. View conversation history in the chat interface

### Medical Knowledge
- Browse symptoms, medications, and conditions
- Quick reference for common medical information
- Safety guidelines and disclaimers

## ⚠️ Medical Disclaimer

**Important**: This application is for educational and informational purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical concerns.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI responses | No (fallback available) |

### Customization

- **Medical Knowledge**: Edit `app/components/MedicalKnowledge.tsx`
- **Fallback Responses**: Modify `app/api/medical-ai/route.ts`
- **Styling**: Update `tailwind.config.js` and `app/globals.css`

## 🌐 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Edge
- ✅ Safari
- ⚠️ Firefox (limited voice support)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m 'Add feature'`
5. Push: `git push origin feature-name`
6. Submit a pull request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- Next.js team for the amazing framework
- Tailwind CSS for styling
- Web Speech API for voice features

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/YOUR_USERNAME/medi-voice-ai/issues) page
2. Create a new issue with detailed description
3. Contact: [your-email@example.com]

---

**Made with ❤️ for better healthcare accessibility**