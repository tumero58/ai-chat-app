export const handleRequest = async (
  url: string,
  method: string,
  body?: Record<string, any>,
  headers?: Record<string, string>
): Promise<any> => {
  try {
    const fetchResponse = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  
    if (!fetchResponse.ok) {
      const errorText = await fetchResponse.text();
      throw new Error(`HTTP error ${fetchResponse.status}: ${errorText}`);
    }
  
    const response = await fetchResponse.json();
    return response;
  } catch (error: any) {
    console.error("Request error:", error);
    return {
      status: 500,
      message: "Internal server error",
      details: error.message,
    };
  }
};
  
export const METHODS = Object.freeze({
  POST: "POST",
  PUT: "PUT",
  GET: "GET",
});
