import { apiClient, expressClient, API_BASE_URL, EXPRESS_API_URL } from './api';

/**
 * Service for MemberPass AI Assistant operations.
 * Communicates directly with backend APIs without fabricating responses.
 */

export const checkFastApiHealth = async () => {
  // Probes common health check endpoints
  const healthEndpoints = ['/health', '/api/health', '/'];
  for (const endpoint of healthEndpoints) {
    try {
      const res = await apiClient.get(endpoint, { timeout: 3000 });
      if (res.status >= 200 && res.status < 300) {
        return {
          connected: true,
          endpoint,
          data: res.data,
          url: API_BASE_URL,
        };
      }
    } catch {
      // Continue probe
    }
  }
  return {
    connected: false,
    url: API_BASE_URL,
    message: `FastAPI server is not responding at ${API_BASE_URL}`,
  };
};

export const checkExpressHealth = async () => {
  try {
    const res = await expressClient.get('/api/health', { timeout: 3000 });
    return {
      connected: res.data?.success || res.status === 200,
      data: res.data,
      url: EXPRESS_API_URL,
    };
  } catch (error) {
    return {
      connected: false,
      url: EXPRESS_API_URL,
      error: error.message,
    };
  }
};

/**
 * Send user query to the AI backend.
 * Tries the primary chat/query endpoints.
 * Never fabricates mock answers if the backend is down or missing.
 */
export const sendAssistantQuery = async (question, conversationHistory = []) => {
  const trimmed = question?.trim();
  if (!trimmed) {
    throw new Error('Please enter a valid question.');
  }

  // Common endpoint patterns in FastAPI AI backends
  const candidateEndpoints = [
    '/api/chat',
    '/api/query',
    '/chat',
    '/query',
    '/api/v1/chat',
  ];

  let lastError = null;

  for (const endpoint of candidateEndpoints) {
    try {
      // Standard payload supporting both single query and conversational schemas
      const payload = {
        query: trimmed,
        question: trimmed,
        message: trimmed,
        prompt: trimmed,
        history: conversationHistory.map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        })),
      };

      const res = await apiClient.post(endpoint, payload);

      if (res.data) {
        // Extract the textual response from various potential backend response envelopes
        let responseText = '';
        if (typeof res.data === 'string') {
          responseText = res.data;
        } else if (res.data.response) {
          responseText = res.data.response;
        } else if (res.data.answer) {
          responseText = res.data.answer;
        } else if (res.data.message) {
          responseText = res.data.message;
        } else if (res.data.reply) {
          responseText = res.data.reply;
        } else if (res.data.content) {
          responseText = res.data.content;
        } else if (res.data.data?.response) {
          responseText = res.data.data.response;
        } else {
          responseText = JSON.stringify(res.data, null, 2);
        }

        return {
          success: true,
          answer: responseText,
          raw: res.data,
          endpoint,
        };
      }
    } catch (err) {
      lastError = err;
      // If server responded with a 404 (endpoint not found), try the next candidate endpoint
      if (err.response && err.response.status === 404) {
        continue;
      }
      // If connection refused or network error, break immediately rather than wait for each candidate
      if (err.code === 'ECONNABORTED' || err.code === 'ERR_NETWORK' || !err.response) {
        break;
      }
    }
  }

  // Construct a detailed, transparent explanation of what happened
  const isNetworkDown =
    !lastError?.response ||
    lastError?.code === 'ERR_NETWORK' ||
    lastError?.message?.includes('Network Error');

  let detailedExplanation = '';
  if (isNetworkDown) {
    detailedExplanation =
      `Backend AI endpoint is unreachable at ${API_BASE_URL}. ` +
      `Ensure that the FastAPI backend server is running and accessible on port 8000. ` +
      `Per project guidelines, fake AI responses are not generated when the backend is offline.`;
  } else if (lastError?.response?.status === 404) {
    detailedExplanation =
      `Backend at ${API_BASE_URL} is reachable, but no chat/query endpoint was found ` +
      `(tested: ${candidateEndpoints.join(', ')}). ` +
      `Please check the FastAPI route definitions.`;
  } else if (lastError?.response?.status >= 500) {
    detailedExplanation =
      `The backend server returned an internal error (HTTP ${lastError.response.status}): ` +
      `${lastError.response.data?.detail || lastError.response.data?.message || 'Internal Server Error'}.`;
  } else {
    detailedExplanation =
      lastError?.message || 'An unknown error occurred while communicating with the AI backend.';
  }

  const errorObj = new Error(detailedExplanation);
  errorObj.isBackendError = true;
  errorObj.details = {
    code: lastError?.code,
    status: lastError?.response?.status,
    url: API_BASE_URL,
    technicalMessage: lastError?.message,
  };
  throw errorObj;
};

