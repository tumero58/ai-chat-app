# AI Chat Application

This project implements a real-time chat application with AI interaction using Next.js and the Gemini API.

## Technologies Used

*   **Next.js:** A React framework for building server-rendered and statically generated web applications. Used for frontend development, API routes, and deployment on Vercel.
*   **React:** A JavaScript library for building user interfaces. Used for creating the chat interface components.
*   **Gemini API (`@google/generative-ai`):** Google's generative AI API. Used for integrating AI capabilities into the chat application.
*   **`react-markdown`:** A React component for rendering Markdown content. Used for displaying formatted text, lists, tables, and other Markdown elements in the chat messages.
*   **`remark-gfm`:** A plugin for `react-markdown` that adds support for GitHub Flavored Markdown (GFM). Used to enhance Markdown rendering with GFM features like task lists and tables.
*   **`react-syntax-highlighter`:** A React component for syntax highlighting of code blocks. Used to display code snippets in chat messages with proper syntax highlighting.
*   **`uuid`:** A library for generating universally unique identifiers (UUIDs). Used to create unique IDs for chat sessions.
*   **`react-spinners`:** A collection of loading spinner components for React. Used to display a loading indicator while waiting for AI responses.

## Why These Technologies?

*   **Next.js:** Provides server-side rendering (SSR) and static site generation (SSG) for improved performance and SEO. Offers built-in API routes for backend functionality. Simplifies deployment to Vercel.
*   **React:** A popular and efficient library for building dynamic user interfaces. Offers reusable components and a declarative programming style.
*   **Gemini API:** Provides powerful generative AI capabilities for natural language processing and conversation.
*   **`react-markdown` & `remark-gfm`:** Enables the display of richly formatted text in chat messages, enhancing the user experience. Handles various Markdown elements, including tables, lists, and code blocks.
*   **`react-syntax-highlighter`:** Improves the readability of code snippets in chat messages by applying syntax highlighting.
*   **`uuid`:** Ensures that each chat session has a unique identifier, which is crucial for managing chat history and context.
*   **`react-spinners`:** Provides a visual cue to the user that the application is processing a request, improving the user experience.

## Setup

1.  Clone the repository:

    ```bash
    git clone [invalid URL removed]
    ```

2.  Navigate to the project directory:

    ```bash
    cd ai-chat-app
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Create a `.env.local` file in the root of the project and add your Gemini API key:

    ```
    GEMINI_API_KEY=YOUR_ACTUAL_API_KEY
    ```

5.  Run the development server:

    ```bash
    npm run dev
    ```

## Deployment

This project is designed to be easily deployed on Vercel. Simply connect your GitHub repository to Vercel, and Vercel will automatically build and deploy your application.

## Challenges and Solutions

1.  **Challenge: Managing Conversation Context**

    *   **Description:** AI models have limited context windows, meaning they can only "remember" a certain number of previous messages in a conversation. As conversations grow longer, the AI might lose track of earlier exchanges.
    *   **Solution:** Implemented a basic context management strategy using history truncation. The API now sends only the last 10 messages of the conversation to the Gemini API. This keeps the request size manageable and helps maintain relevant context within the model's window. For a production application, implementing a database and more advanced context management (like summarization) would be the next step.

2.  **Challenge: Rendering Complex Content in Chat Messages**

    *   **Description:** Chat messages often contain more than just plain text. Users might share code snippets, lists, tables, or even mathematical equations. Displaying these correctly requires special handling.
    *   **Solution:** Used `react-markdown` with the `remark-gfm` plugin to render Markdown formatted text. This allows for lists, bold text, italics, links, and other common Markdown elements. Additionally, `react-syntax-highlighter` was integrated to provide syntax highlighting for code blocks, improving readability.

3.  **Challenge: Providing User Feedback During API Calls**

    *   **Description:** While waiting for the AI to generate a response, the user needs feedback that the application is working. A long delay without feedback can lead to a poor user experience.
    *   **Solution:** Implemented a loading indicator using the `react-spinners` library. A spinner is displayed while the application is waiting for a response from the Gemini API, providing visual feedback to the user.

4. **Challenge: Handling API Errors Gracefully**

    *   **Description:** Network issues, incorrect API keys, or problems on the Gemini API side can lead to errors. The application needs to handle these errors gracefully and provide informative messages to the user.
    *   **Solution:** Implemented detailed error logging on the backend. The API route now logs the full error object, including any response data, status codes, and headers from the Gemini API. On the frontend, a generic error message is displayed to the user if an API request fails. More specific error handling could be added in the future based on the error codes received from the backend.

## Time Spent

Approximately 7 hours.