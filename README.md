# IdeaSynthesizer
### An AI-powered interdisciplinary research laboratory for cross-pollinating academic fields.

## Purpose
IdeaSynthesizer is designed to bridge the silos of human knowledge. By algorithmically synthesizing disparate academic domains, it empowers researchers, scholars, and visionaries to discover novel, rigorous, and boundary-pushing research paths that might otherwise remain hidden within specialized disciplines.

## Features
- **Conceptual Synthesis**: Advanced deep-level reasoning powered by Gemini AI to integrate methodologies from up to 10 disparate fields simultaneously.
- **Structural Frameworks**: Apply intellectual lenses like Game Theory, Systems Thinking, or Post-Humanism to ground speculative ideas in established logic.
- **Lab Journal**: A persistent digital workspace to track your intellectual evolution, record hypotheses, and link external resources.
- **Researcher Profile**: Manage your core domains of expertise and customize your academic persona.
- **Global Context**: Integrated search grounding (where applicable) to ensure research ideas remain relevant to modern academic trends and current events.
- **Creativity Control**: Precision-tuning for output, ranging from "Conservative" (peer-review ready) to "Radical" (boundary-pushing speculation).

## Tech Stack
- **Library**: React (v19)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Engine**: Google Gemini API (`@google/genai`)
- **Persistence**: Browser-native `localStorage` with a dedicated storage service layer.

## How to Run Locally
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
2. **API Key Configuration**:
   The application requires a valid Google Gemini API Key. This is expected to be available via the `process.env.API_KEY` injection (handled by the deployment environment).
3. **Serve the Application**:
   Because the project utilizes Modern ESM with an `importmap`, it must be served from a web server rather than opened directly as a file.
   ```bash
   # Using npx (Node.js required)
   npx serve .
   
   # Or using Python
   python -m http.server 8000
   ```
4. **Access the App**:
   Open your browser to `http://localhost:3000` or `http://localhost:8000`.

## Project Status
**Frontend Complete**: The core laboratory experience, landing page, authentication simulation, persistent lab journal, and AI synthesis engine are fully operational.

## Future Roadmap
- **Multi-user Collaboration**: Shared synthesis spaces and real-time co-authoring tools.
- **Interactive Mapping**: Visual graph-based navigation of interdisciplinary conceptual links.
- **Reference Integration**: Direct syncing with Zotero, Mendeley, and BibTeX.
- **Multimodal Research**: Generating synthesis reports from audio, video, and image-based data.

---
*© 2025 IdeaSynthesizer. All rights reserved.*