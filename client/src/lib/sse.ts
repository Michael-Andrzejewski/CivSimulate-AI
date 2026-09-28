/**
 * Reads a server-sent-events stream from a fetch Response.
 *
 * Handles the failure modes the previous inline parsers missed:
 * - events split across network chunks (buffered until the \n\n terminator)
 * - multi-byte UTF-8 characters split across chunks (decoder streaming mode)
 * - the [DONE] terminator arriving split across chunks
 * - streams that end (or error) without ever sending [DONE]
 *
 * onEvent receives each parsed JSON payload in order. The promise resolves
 * when [DONE] is seen or the stream is exhausted, and rejects on network
 * errors — but only after every complete event that arrived beforehand has
 * been delivered.
 */
export async function readSSEStream(
  response: Response,
  onEvent: (data: any) => void,
): Promise<void> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error("Response has no body");

  const decoder = new TextDecoder();
  let buffer = "";

  // Delivers every "data:" line in one raw event block; returns true on [DONE]
  const handleEvent = (rawEvent: string): boolean => {
    for (const line of rawEvent.split("\n")) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (data === "[DONE]") return true;
      try {
        onEvent(JSON.parse(data));
      } catch {
        console.warn("[SSE] Skipping unparseable event:", data.slice(0, 200));
      }
    }
    return false;
  };

  // Processes complete events in the buffer; returns true if [DONE] was seen
  const processBuffer = (flush = false): boolean => {
    let separatorIndex = buffer.indexOf("\n\n");
    while (separatorIndex !== -1) {
      const rawEvent = buffer.slice(0, separatorIndex);
      buffer = buffer.slice(separatorIndex + 2);
      if (handleEvent(rawEvent)) return true;
      separatorIndex = buffer.indexOf("\n\n");
    }
    if (flush && buffer.trim()) {
      const rest = buffer;
      buffer = "";
      return handleEvent(rest);
    }
    return false;
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        buffer += decoder.decode(); // flush any buffered partial code point
        processBuffer(true);
        return;
      }
      buffer += decoder.decode(value, { stream: true });
      if (processBuffer()) return;
    }
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // reader already released
    }
  }
}
