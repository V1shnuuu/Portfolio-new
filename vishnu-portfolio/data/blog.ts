import { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    id: 'what-are-ai-agents',
    slug: 'what-are-ai-agents',
    title: 'What Are AI Agents — And Why They\'re Changing Everything',
    excerpt:
      'From simple chatbots to autonomous agents that browse the web, write code, and book meetings — understand the spectrum of AI agents and where the technology is headed.',
    category: 'ai',
    tags: ['AI Agents', 'LLM', 'Automation', 'GPT-4'],
    readTime: 7,
    date: '2025-01-15',
    featured: true,
    image: '/images/blog/ai-agents.png',
    author: {
      name: 'B Vishnu Priyan',
      initials: 'VP',
    },
    content: `
## The Agent Paradigm Shift

Until recently, AI was a tool you queried. You typed a prompt, it responded. The interaction was stateless, single-turn, and passive.

**AI agents change this fundamentally.**

An AI agent is a system that:
1. **Perceives** its environment (web, files, APIs, databases)
2. **Plans** a sequence of actions to achieve a goal
3. **Acts** — executing those actions with real tools
4. **Learns** from feedback and adjusts its approach

## The Spectrum of Agents

### Level 1: Chatbots
Simple Q&A systems. Static knowledge. No actions. Think early ChatGPT without plugins.

### Level 2: RAG Systems
Chatbots augmented with a knowledge base. Can retrieve from documents, websites, or databases. Still reactive — no multi-step planning.

### Level 3: Tool-Using Agents
Agents with access to tools: web search, code execution, API calls, email. Can complete multi-step tasks. This is where GPT-4 with function calling lives.

### Level 4: Autonomous Agents
Agents that plan long-horizon tasks, spawn sub-agents, manage memory, and self-correct. Think AutoGPT, Claude's computer use, or Devin.

## Why This Matters for Business

The business implications are staggering:

- A **customer support agent** that doesn't just answer questions but actually resolves tickets by querying your CRM, updating order status, and sending confirmations
- A **sales agent** that qualifies leads, books meetings to Calendly, and sends personalized follow-ups
- A **marketing agent** that monitors trends, drafts content, and schedules posts — autonomously

## Building Your First Agent

The stack is more accessible than ever:

\`\`\`python
from openai import OpenAI
import json

client = OpenAI()

tools = [{
    "type": "function",
    "function": {
        "name": "book_appointment",
        "description": "Book an appointment for a customer",
        "parameters": {
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "date": {"type": "string"},
                "time": {"type": "string"}
            }
        }
    }
}]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Book me an appointment for tomorrow at 3pm"}],
    tools=tools,
    tool_choice="auto"
)
\`\`\`

## The Bottom Line

AI agents aren't science fiction anymore. They're production software being deployed by companies today. The businesses that learn to build and deploy agents now will have a significant advantage over those that don't.

At Verix AI, we build custom agents for businesses ready to automate intelligently. [Get in touch](/contact) if you want to explore what's possible.
    `,
  },
  {
    id: 'voice-ai-for-business',
    slug: 'voice-ai-for-business',
    title: 'Voice AI in 2025: Beyond the Phone Tree',
    excerpt:
      'Modern voice AI doesn\'t sound like a robot anymore. Here\'s how businesses are using voice agents to handle calls, book appointments, and qualify leads at scale.',
    category: 'ai',
    tags: ['Voice AI', 'Automation', 'Business', 'NLP'],
    readTime: 6,
    date: '2025-01-08',
    featured: false,
    image: '/images/blog/voice-ai.png',
    author: {
      name: 'B Vishnu Priyan',
      initials: 'VP',
    },
    content: `
## The Voice AI Revolution

The phone tree — "Press 1 for billing, Press 2 for support" — has been the butt of customer service jokes for 30 years. Voice AI in 2025 is finally killing it.

Modern voice agents can:
- Handle natural, unscripted conversation
- Understand context across a multi-turn call
- Take real actions (book appointments, update CRM, send emails)
- Hand off to human agents when needed, with full context

## Technology Stack

Today's voice AI stack typically combines:

1. **ASR (Automatic Speech Recognition)**: Whisper, Deepgram, or AssemblyAI to transcribe speech in real-time
2. **LLM Brain**: GPT-4 or Claude for natural language understanding and response generation
3. **TTS (Text-to-Speech)**: ElevenLabs, Play.ht, or Cartesia for natural-sounding voices
4. **Orchestration**: Twilio, Bland AI, or Vapi for call handling infrastructure

## Real Use Cases

### Medical Clinics
Voice agents handle appointment booking, prescription refill requests, and post-visit follow-ups — freeing staff for in-person care.

### Real Estate
Agents qualify leads 24/7, answer property questions from MLS data, and book showing appointments directly to agent calendars.

### E-commerce
Order status, returns, and basic support handled by voice — escalating to humans only for complex issues.

## What to Watch For

- **Latency**: The best systems achieve <500ms response time, making conversations feel natural
- **Interruption handling**: Real conversations have interruptions. Good systems handle them gracefully
- **Emotion detection**: Newer systems can detect frustration and adjust tone or escalate

Voice AI is ready for production. The question isn't whether to use it — it's how quickly you can deploy it.
    `,
  },
  {
    id: 'building-ml-healthcare',
    slug: 'building-ml-healthcare',
    title: 'Building ML Systems for Healthcare: Lessons from Fever Oracle',
    excerpt:
      'What I learned building an ML-powered fever prediction system — from data cleaning to model deployment to the ethics of clinical AI.',
    category: 'ai',
    tags: ['Machine Learning', 'Healthcare', 'TensorFlow', 'LSTM'],
    readTime: 10,
    date: '2024-12-20',
    featured: false,
    image: '/images/blog/ml-healthcare.png',
    author: {
      name: 'B Vishnu Priyan',
      initials: 'VP',
    },
    content: `
## Why Healthcare ML Is Different

Building an ML model for Netflix recommendations and building one for healthcare have almost nothing in common — except that both use Python.

In healthcare, the stakes are different. A bad movie recommendation wastes 2 hours. A bad clinical alert either causes alarm fatigue (false positives) or misses a critical event (false negatives). Both have real human costs.

Here's what I learned building Fever Oracle.

## 1. Data Quality Is 80% of the Work

We started with a dataset that had:
- Missing values in 23% of SpO₂ readings
- Duplicate patient records with conflicting timestamps
- Vital sign values that were physiologically impossible (heart rate of 0 for 3 minutes)

Data cleaning wasn't glamorous, but it was essential. We built a validation pipeline that flagged suspicious values and applied sensor-appropriate imputation strategies.

## 2. Choose Your Architecture Based on Data Shape

We had time-series data — 4 vital signs measured every 30 seconds, looking at 4-hour windows. This pointed clearly to recurrent architectures.

We tested:
- **Simple LSTM**: Good baseline, 84% accuracy
- **Bidirectional LSTM**: 87% accuracy (couldn't use bidirectional in real-time deployment)
- **Transformer**: 86% accuracy, 4x slower, harder to deploy
- **2-layer LSTM with dropout**: 89% accuracy, fast inference — our winner

## 3. Understand What Metrics Actually Matter

Accuracy alone is meaningless in healthcare. With our dataset (12% fever incidence), a model that always predicts "no fever" gets 88% accuracy.

What actually matters:
- **Sensitivity (Recall)**: Are we catching actual fever cases? We targeted >85%
- **Specificity**: Are we creating alert fatigue? We targeted >90%
- **Time-to-detection**: Earlier is better
- **Calibration**: Are our confidence scores well-calibrated?

## 4. Clinical Validation Is Non-Negotiable

Technical metrics are necessary but not sufficient. We validated with actual clinical staff who gave us critical feedback:
- The alert UI needed to show trend graphs, not just scores
- Threshold confidence for alerting needed to be configurable per ward
- The model needed to explain *why* it was flagging a patient

## Conclusion

Healthcare ML is humbling. The technical challenges are solvable. The domain expertise, ethical responsibility, and clinical validation requirements are where most ML projects in healthcare fail. Respect the domain, partner with clinicians, and iterate slowly.
    `,
  },
  {
    id: 'nextjs-portfolio-architecture',
    slug: 'nextjs-portfolio-architecture',
    title: 'Architecting a High-Performance Next.js Portfolio in 2025',
    excerpt:
      'How I built a portfolio that scores 98+ on Lighthouse while maintaining beautiful animations, GSAP scroll effects, and a stunning dark aesthetic.',
    category: 'web',
    tags: ['Next.js', 'Performance', 'GSAP', 'Framer Motion', 'TypeScript'],
    readTime: 8,
    date: '2024-12-10',
    featured: true,
    image: '/images/blog/nextjs-portfolio.png',
    author: {
      name: 'B Vishnu Priyan',
      initials: 'VP',
    },
    content: `
## The Challenge: Beautiful but Fast

Portfolio sites have a reputation problem. They're either:
- Boring and static (fast, but forgettable)
- Visually stunning (memorable, but slow)

I refused to accept that tradeoff. This is what I learned building a Next.js portfolio that has both.

## Architecture Decisions

### 1. Next.js App Router for Routing Flexibility
The App Router allows per-page metadata, server components where appropriate, and a clean multi-page architecture. I split the site into 6 routes with smooth page transitions.

### 2. LazyMotion from Framer Motion
Instead of importing all of Framer Motion (60KB+), I use LazyMotion with domAnimation features only. This cuts the animation bundle by ~60%.

\`\`\`tsx
import { LazyMotion, domAnimation, m } from 'framer-motion';

// Use 'm' instead of 'motion' with LazyMotion
<LazyMotion features={domAnimation}>
  <m.div animate={{ opacity: 1 }}>...</m.div>
</LazyMotion>
\`\`\`

### 3. GSAP for Complex Scroll Animations
Framer Motion is great for component-level animations. GSAP with ScrollTrigger is better for complex scroll-driven sequences. I use both — Framer Motion for entry animations, GSAP for scroll effects.

### 4. Dynamic Imports for Heavy Components
The custom cursor and preloader are dynamically imported with \`{ ssr: false }\` — they add zero bytes to the initial bundle.

## Performance Wins

| Technique | Impact |
|-----------|--------|
| LazyMotion | -38KB JS |
| Dynamic cursor | -12KB initial load |
| next/image optimization | -60% image payload |
| font preloading | -200ms LCP |
| No Three.js | -580KB avoided |

## CSS 3D Without Three.js

You don't need Three.js for impressive 3D effects. Pure CSS with perspective can achieve most portfolio needs:

\`\`\`css
.card-3d {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.card-3d:hover {
  transform: rotateX(5deg) rotateY(-5deg);
}
\`\`\`

Combined with JS to track mouse position, you get a beautiful 3D parallax effect with zero library cost.

## The Result

Lighthouse scores after all optimizations:
- Performance: 98
- Accessibility: 100
- Best Practices: 100
- SEO: 100

Beautiful and fast. Not a tradeoff.
    `,
  },
];

// Featured posts for homepage
export const featuredBlogPosts = blogPosts.filter(p => p.featured);
