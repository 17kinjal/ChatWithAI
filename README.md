
# Chat with AI Application

This project is a React-based application built using Vite and TypeScript. It serves as an interactive AI chatbot interface, similar to ChatGPT. The application includes a feedback functionality where users can like or dislike individual AI responses by hovering over them. Additionally, users can preview their previous chats from the sidebar and start new chat sessions. Below are the instructions on how to start the service and use the application.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (version 16 or higher is recommended)
- npm or yarn package manager

## Getting Started

Follow these steps to start the service:

### Clone the Repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

### Install Dependencies:
Run the following command to install all necessary packages:

```bash
npm install
```

Alternatively, if you prefer Yarn:

```bash
yarn install
```

### Start the Frontend Development Server:
Use the following command to start the application in development mode:

```bash
npm run dev
```

Alternatively, with Yarn:

```bash
yarn dev
```

### Start the Backend Development Server:
Use the following command to start the application in development mode:

```bash
npm run dev:back
```

Alternatively, with Yarn:

```bash
yarn dev:back
```

### Access the Application:
Once the server is running, open your browser and navigate to:

```
http://localhost:5173
```

This will load the application in your browser.

## Using the Application

### Chat Interface:

- You can interact with the AI chatbot by entering your queries in the input field at the bottom of the chat window.
- Click the **Send** button or press **Enter** to submit your message.

### Chat History:

- The conversation history will be displayed in the chat window for context.

### AI Responses:

- The chatbot will provide responses in real time based on your input.

### Feedback Functionality:

- You can hover over a specific AI response to like or dislike it, providing feedback on the response.

### Previewing Previous Chats:

- You can preview your previous chats by accessing them from the sidebar.

### Starting New Chat:

- You can initiate a new chat session directly from the interface.

## AI Model Integration

This application communicates with the Google Gemini AI model. To enable the connection, you must provide a valid API key.
Currently, for testing purpose my personal Gemini account key is there to iinteract with the app. To setup with your personal Gemini
account, please follow the steps mentioned below:

1. **Set up your Google Gemini API key:**
   - After obtaining your API key from Google Gemini, add it to your `.env` file as follows:

   ```
   GOOGLE_API_KEY=your-google-api-key
   ```

2. **Handling Expired API Key:**
   - If your key expires, you can generate a new one through the Google Gemini console.
   - Once you have a new key, replace the value of `GOOGLE_API_KEY` in the `.env` file with the new key to restore functionality.

## Development Commands

Here are some useful commands for development:

### Build the Project:

```bash
npm run build
```

Alternatively, with Yarn:

```bash
yarn build
```

### Preview the Production Build:

```bash
npm run preview
```

Alternatively, with Yarn:

```bash
yarn preview
```

## Reasoning Behind Technical Choices

This application was built using React, TypeScript, and Redux for state management for the following reasons:

### React:

- React offers a robust component-based architecture, making it easier to build and maintain a dynamic user interface.
- It provides excellent support for declarative programming and reactive state updates, which are ideal for an interactive chatbot application.

### TypeScript:

- TypeScript ensures type safety, reducing the risk of runtime errors and improving developer productivity by catching errors during development.
- It integrates seamlessly with React, enabling better code quality and maintainability.

### Redux for State Management:

- Redux provides a predictable state container, making it easier to manage and debug application states.
- It is well-suited for applications like this one, where multiple components may need access to and modify shared data (e.g., conversation history).

## Reasoning Behind Design Choices

This application leverages Material-UI for designing the user interface for the following reasons:

### Consistent and Modern Design:

- Material-UI provides pre-built, high-quality components adhering to modern design standards, ensuring a polished and professional look.

### Customization Options:

- Material-UI allows for extensive customization, enabling the application to maintain a unique identity while using standard components.

### Ease of Use:

- Its easy-to-use API and comprehensive documentation speed up the development process for UI components.

### Responsiveness:

- Material-UI components are designed to be responsive by default, ensuring the application looks great on all device sizes.

## Trade-offs, Limitations, and Future Improvements

While the current implementation is robust and functional, there are some trade-offs and future improvements that could enhance the application further:

### Chat End Ratings with Subjective Feedback:

- A feature could be added to allow users to rate their conversation with the AI at the end of a chat session.
- Users could provide subjective feedback about their experience, which would help improve the chatbot's responses and user satisfaction.
- This feedback should be saved via an API call to ensure data persistence and analysis.

### Conversation Saving and Sharing:

- Once a chat session ends, the conversation could be automatically saved for future reference.
- A "Share" button could be added, enabling users to share their conversations with others through a link or social media.
- Implementing this feature would require API integration to store and retrieve conversations securely.

These features could significantly improve user engagement and broaden the application's functionality. However, implementing them would require additional time and resources, including backend support for storing user data and ensuring secure sharing options.
