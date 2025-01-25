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
