# ResolveAI: Intelligent Request Triage System 🤖📧

An AI-powered request triage and routing system that transforms unstructured client requests into prioritized, actionable tasks. Built with **Google Gemini AI**, **FastAPI**, **React**, and follows modern full-stack architecture principles for scalability and maintainability.

Live Link: [resolve-ai-green.vercel.app](https://resolve-ai-green.vercel.app/)

<img width="1022" height="475" alt="image" src="https://github.com/user-attachments/assets/0384c534-cd1c-4c20-af87-9dcde86c5cf6" />
<img width="967" height="776" alt="image" src="https://github.com/user-attachments/assets/a4793b79-0b46-4f1e-b44b-ca6483821031" />


## 🚀 Features

- **Intelligent Request Analysis** - Analyzes unstructured client requests in real-time
- **Multi-Category Classification** - Automatically routes to Sales, Support, Billing, Technical, or Other
- **Dynamic Priority Assessment** - Assigns priority levels (Low, Medium, High, Urgent) based on business impact
- **Smart Team Routing** - Routes requests to appropriate teams: Sales Team, Client Success, Finance, or Engineering
- **AI-Powered Draft Responses** - Generates professional first-response drafts for team members
- **Structured Output** - Returns JSON-formatted triage decisions with reasoning
- **Real-time Processing** - Instant analysis using Google Gemini AI
- **Modern Responsive UI** - Clean, intuitive dashboard built with React
- **Cross-Origin Support** - CORS enabled for flexible deployment
- **Production-Ready API** - Health checks and error handling included

---

## 🏗️ Architecture

### Data Flow

```
Unstructured Request
        │
        ▼
   Input Validation
        │
        ▼
  Google Gemini AI
        │
        ▼
Triage Analysis Engine
    (Category, Priority,
     Owner, Draft Response)
        │
        ▼
   Structured JSON
        │
        ▼
  React Dashboard
```

### System Architecture

```
User
 │
 ▼
React Frontend (SPA)
 │
 ▼ (HTTP/HTTPS)
FastAPI Backend
 │
 ▼
Google Gemini API
 │
 ▼
Triage Result
 │
 ▼
Team Dashboard
```

### Request Flow

```
1. User submits unstructured request
         │
         ▼
2. Frontend validates & sends to backend
         │
         ▼
3. Backend constructs prompt with system instructions
         │
         ▼
4. Google Gemini analyzes request
         │
         ▼
5. Structured result returned (JSON schema)
         │
         ▼
6. Frontend displays categorization, priority, owner, and draft response
         │
         ▼
7. Team member can send/edit draft response
```

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API communication
- **CSS3** - Responsive styling

### Backend
- **FastAPI** - Modern, fast Python web framework
- **Python 3.12+** - Latest Python runtime
- **Pydantic** - Data validation and schema definitions
- **Google Genai SDK** - Official Google AI library
- **python-dotenv** - Environment configuration
- **CORS Middleware** - Cross-origin request support

### AI/ML
- **Google Gemini 3.1 Flash Lite** - Advanced reasoning and structured output
- **Structured Output (JSON Schema)** - Guaranteed response format
- **Few-Shot Learning** - Enhanced decision-making with examples

### Deployment Ready
- **Docker** - Containerization support
- **Environment Configuration** - .env based secrets management
- **Health Checks** - Built-in monitoring endpoints
- **CORS Configuration** - Multi-origin support for various deployments

---

## 📂 Project Structure

```
ResolveAI/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── RequestForm.tsx       # Form for submitting requests
│   │   │   ├── ResultCard.tsx        # Display triage results
│   │   │   └── SampleRequests.tsx    # Sample request templates
│   │   ├── api.ts                    # API client
│   │   ├── App.tsx                   # Main application
│   │   ├── main.tsx                  # React entry point
│   │   └── index.css                 # Global styles
│   ├── package.json                  # Frontend dependencies
│   ├── vite.config.ts                # Vite configuration
│   ├── tsconfig.json                 # TypeScript config
│   └── Dockerfile                    # Frontend container image
│
├── backend/
│   ├── app/
│   │   ├── main.py                   # FastAPI application & endpoints
│   │   ├── llm_client.py             # Google Gemini integration
│   │   ├── schemas.py                # Pydantic data models
│   │   ├── prompts.py                # System instructions & few-shot examples
│   │   └── __init__.py
│   ├── requirements.txt              # Python dependencies
│   ├── .env.example                  # Environment variables template
│   ├── Dockerfile                    # Backend container image
│   └── README.md                     # Backend-specific documentation
│
├── LICENSE
└── README.md                         # This file
```

---

## ⚙️ Workflow

### Request Submission & Triage Flow

1. **User Submits Request** - Enters unstructured request text in the frontend form
2. **Input Validation** - Frontend validates minimum length and format
3. **API Call** - Request sent to FastAPI backend's `/triage` endpoint
4. **Prompt Construction** - Backend builds prompt with system instructions and request text
5. **AI Analysis** - Google Gemini processes request with structured output schema
6. **Schema Validation** - Response validated against TriageResult Pydantic model
7. **Results Displayed** - Frontend shows:
   - Summary (1-2 sentence description)
   - Category (Sales, Support, Billing, Technical, Other)
   - Priority (Low, Medium, High, Urgent)
   - Priority Reasoning (explanation for priority assignment)
   - Team Owner (Sales Team, Client Success, Finance, Engineering)
   - Draft Response (professional first-response template)

---

## 🧠 Triage Intelligence

### Classification Categories

| Category | Purpose | Examples |
|----------|---------|----------|
| **Sales** | New business inquiries | New client sign-up, pricing questions, feature interest |
| **Support** | Product/service assistance | Usage help, general questions, standard support |
| **Billing** | Payment & invoice matters | Invoice issues, payment disputes, refunds |
| **Technical** | System/data issues | Bugs, outages, security concerns, data problems |
| **Other** | Miscellaneous | Feature requests, feedback, general inquiries |

### Priority Levels

| Priority | Trigger Conditions | SLA |
|----------|-------------------|-----|
| **Urgent** | Data exposure, active outage, security incident, real-time harm | Same-day response |
| **High** | Near-term deadline (this week), blocks business process | 24-hour response |
| **Medium** | Real business need, no hard deadline, sales inquiry | 48-72 hour response |
| **Low** | Exploratory, future update, cosmetic requests, general curiosity | Best effort |

### Routing Owners

| Owner | Handles |
|-------|---------|
| **Sales Team** | New business, pricing, custom project inquiries |
| **Client Success** | Account issues, service problems, escalations |
| **Finance** | Invoicing, payments, financial disputes |
| **Engineering** | Technical bugs, outages, security incidents |

### Decision Intelligence

The system applies advanced decision rules:

1. **Data Protection Priority** - Any mention of exposed/leaked customer data → Urgent (regardless of tone)
2. **Outage Assessment** - Active system outages → Urgent or High based on scope
3. **Primary Action Focus** - Multi-topic requests → categorized by PRIMARY need only
4. **Timeline Consideration** - "No deadline" or "future" mentions → Low priority
5. **Schema Enforcement** - All results constrained to allowed categories and priorities

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** (for frontend)
- **Python 3.12+** (for backend)
- **Google AI API Key** (from [Google AI Studio](https://aistudio.google.com))

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your Google AI API key
echo "GEMINI_API_KEY=your_key_here" > .env

# Start backend server (runs on http://localhost:8000)
uvicorn app.main:app --reload
```

### Health Check

```bash
curl http://localhost:8000/health
# Response: {"status":"ok"}
```

### Try the Triage API

```bash
curl -X POST http://localhost:8000/triage \
  -H "Content-Type: application/json" \
  -d '{"request_text": "We just discovered our database is exposed publicly. Please help immediately!"}'
```

---

## 📊 API Reference

### POST `/triage`

Analyzes and triages an unstructured request.

**Request Body:**
```json
{
  "request_text": "Your unstructured client request here"
}
```

**Response:**
```json
{
  "summary": "1-2 sentence summary of the request",
  "category": "Sales|Support|Billing|Technical|Other",
  "priority": "Low|Medium|High|Urgent",
  "priority_reason": "One sentence explaining the priority level",
  "owner": "Sales Team|Client Success|Finance|Engineering",
  "draft_response": "Professional first-response draft (2-4 sentences)"
}
```

**Status Codes:**
- `200` - Successful triage
- `422` - Invalid request format (validation error)
- `502` - Triage processing failed

### GET `/health`

Simple health check endpoint to verify the server is running.

**Response:**
```json
{
  "status": "ok"
}
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
GEMINI_API_KEY=your_google_ai_api_key_here
```

### CORS Configuration

Update allowed origins in [backend/app/main.py](backend/app/main.py#L9-L12):

```python
origins = [
    "http://localhost:5173",           # Local dev
    "https://your-domain.com",         # Production domain
    "https://app.your-domain.com",     # App subdomain
]
```

### LLM Model Selection

The system uses `gemini-3.1-flash-lite` by default. To change:

Edit [backend/app/llm_client.py](backend/app/llm_client.py#L19):

```python
MODEL_NAME = "gemini-3.1-flash"  # More capable
# or
MODEL_NAME = "gemini-2.5-flash-lite"  # Legacy
```

---

## 🐳 Docker Deployment

### Build Images

```bash
# Frontend
docker build -f frontend/Dockerfile -t resolveai-frontend .

# Backend
docker build -f backend/Dockerfile -t resolveai-backend .
```

### Run Containers

```bash
# Backend (requires GEMINI_API_KEY)
docker run -e GEMINI_API_KEY=your_key -p 8000:8000 resolveai-backend

# Frontend
docker run -p 80:3000 resolveai-frontend
```

---

## 📈 Performance Characteristics

| Metric | Value |
|--------|-------|
| **API Response Time** | ~2-5 seconds (Gemini processing) |
| **Frontend Load Time** | <1 second (Vite SPA) |
| **Concurrent Users** | Limited by API rate limits |
| **Request Validation** | Pydantic (< 1ms overhead) |
| **LLM Token Usage** | ~150-300 tokens per request |

---

## 🔮 Future Enhancements

- **User Authentication** - OAuth 2.0 / JWT-based auth
- **Request History** - Persist triaged requests to database
- **Audit Logging** - Track all triage decisions and modifications
- **Feedback Loop** - Learn from team corrections over time
- **Batch Processing** - Handle multiple requests in bulk
- **Custom Rules** - Business-specific triage logic
- **Analytics Dashboard** - Metrics on triage accuracy and team performance
- **Webhook Integration** - Send triage results to external systems
- **Rate Limiting** - Protect API from abuse
- **Advanced Search** - Query historical triage decisions
- **Role-Based Access** - Different dashboards for different teams
- **Mobile App** - Native mobile application

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Troubleshooting

### Backend Issues

**"GEMINI_API_KEY is not set"**
- Ensure `.env` file exists in `backend/` directory
- Verify `GEMINI_API_KEY` is set correctly
- Restart the backend server

**"Connection refused" from frontend**
- Check backend is running on port 8000
- Verify CORS origins in `main.py` include your frontend URL

**"Invalid JSON response"**
- Ensure Gemini API key is valid
- Check API quota hasn't been exceeded
- Verify request text is valid UTF-8

### Frontend Issues

**"Cannot reach backend"**
- Verify backend server is running
- Check browser console for CORS errors
- Ensure API endpoint URL is correct in `api.ts`

**"Build fails"**
- Clear `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version is 18+

---

## 📊 Example Use Cases

### Sales Inquiry
```
Input: "We're interested in your enterprise plan with custom integrations"
→ Category: Sales | Priority: Medium | Owner: Sales Team
```

### Critical Outage
```
Input: "Our production database is down and no one can access it"
→ Category: Technical | Priority: Urgent | Owner: Engineering
```

### Data Breach
```
Input: "We noticed customer credit cards were visible in our public folder"
→ Category: Technical | Priority: Urgent | Owner: Client Success
```

### Billing Issue
```
Input: "The invoice from last month has the wrong amount"
→ Category: Billing | Priority: High | Owner: Finance
```

---

## 📬 Support & Contact

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review the troubleshooting section above

---

## ⭐ If you found this project useful, please consider giving it a star!

---

**Built with ❤️ using Google Gemini AI, FastAPI, and React**
