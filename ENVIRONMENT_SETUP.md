# Medi-Voice AI Environment Setup

## Required Environment Variables

Create a `.env.local` file in the root directory:

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here
```

## Getting Your OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and paste it in your `.env.local` file

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your API keys secure and private
- Consider using environment-specific keys for production
