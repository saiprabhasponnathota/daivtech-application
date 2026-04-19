# DaivAI - AI Chat Web Application

This project is a React-based frontend development assignment for Daivtech Solutions Pvt Ltd. It accurately simulates an AI chat interface (ChatGPT-like UI) focusing on structure, layout, and key micro-interactions based on the provided Figma design requirements.

## 🚀 Feature Summary

The application successfully covers all mandatory requirements outlined in the assessment rubric:

### 1. Layout Structure
- **Left Sidebar:** Includes the DaivAI logo, "+ New Chat" button, and a history list of all previous chats.
- **Chat Management:** Each chat in the sidebar supports inline editing of the chat title and deleting the chat (which opens a confirmation modal popup to prevent accidental deletion).
- **Right Panel:** Features a responsive chat area, a custom AI engine dropdown selector in the header, and an input box for typing messages.
- **Sidebar Toggle:** The hamburger menu (☰) in the header correctly toggles the visibility of the sidebar for clean UI management.

### 2. Chat Functionality
- Users can type and send messages via the input box.
- Messages are displayed in a clean, side-by-side conversation format matching modern AI chatbots, with circular avatars for the user and rounded avatars for the AI.
- A typing indicator simulation is included (1-second delay) before the AI responds, simulating API latency.

### 3. Message Features
- **Hover Actions:** Hovering over any user message reveals hidden action buttons.
- **Edit Message:** Users can click edit to open a modal popup, modify their message, and save changes.
- **Delete Message:** Clicking delete opens a safety confirmation popup before the message is permanently removed from the conversation.

### 4. Chat Management & Persistence
- The "+ New Chat" button creates a fresh, empty session.
- Users can seamlessly switch between active chat sessions by clicking them in the sidebar.
- **State Persistence:** All chats, titles, and messages are persisted using `localStorage`, ensuring data remains intact upon browser refresh.

### 5. AI Engine Dropdown
- A fully custom dropdown menu is implemented (avoiding basic HTML select tags) featuring the requested engines: `Neural Nexus`, `Cerebral Prime`, `Synapse Ultra`, and `Logic Core`.
- Changing the engine alters the AI response behavior, appending the chosen engine name to its replies as a functional demonstration.

### 6. UI/UX Requirements
- Follows the clean, white aesthetic with soft shadows requested in the Figma design.
- Smooth transitions on buttons, hover states, and message actions.
- Functional typing animations while the AI simulates a generated response.

## 🛠️ Tech Stack & Implementation Details
- Built purely with **React (Vite)** to ensure component modularity.
- **No external UI libraries** (like Tailwind, MUI, or Bootstrap) were used, ensuring all CSS styling and flexbox layouts were manually written to demonstrate core frontend proficiency.
- Local state management using standard React Hooks (`useState`, `useEffect`).

## 💻 How to Run Locally

1. Open your terminal in the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the provided `localhost` link in your browser.
