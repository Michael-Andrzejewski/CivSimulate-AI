// Lightweight markdown→HTML formatter for chat content.
//
// SECURITY: the output is injected via dangerouslySetInnerHTML, and the input
// is untrusted (user-typed goals AND model output, which a user can steer into
// emitting arbitrary HTML). We therefore escape all HTML special characters
// FIRST, then apply our own markdown transforms. Because escaping runs before
// any tag is introduced, raw HTML like `<img src=x onerror=...>` becomes inert
// text while our generated <strong>/<em>/<li> tags still render.
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function formatMarkdown(text: string): string {
  return escapeHtml(text)
    // Headers (h1-h6)
    .replace(/^######\s+(.+)$/gm, "<h6>$1</h6>")
    .replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>")
    .replace(/^####\s+(.+)$/gm, "<h4>$1</h4>")
    .replace(/^###\s+(.+)$/gm, "<h3>$1</h3>")
    .replace(/^##\s+(.+)$/gm, "<h2>$1</h2>")
    .replace(/^#\s+(.+)$/gm, "<h1>$1</h1>")
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Code blocks
    .replace(/```([^`]+)```/g, "<pre><code>$1</code></pre>")
    // Inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Bullet lists
    .replace(/^\*\s+(.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
    // Numbered lists
    .replace(/^\d+\.\s+(.+)$/gm, "<li>$1</li>")
    // Horizontal rule
    .replace(/^---$/gm, "<hr />")
    // Line breaks
    .replace(/\n/g, "<br />")
    // Block elements (headers, rules, lists, code blocks) already carry their
    // own spacing — drop the <br />s the surrounding newlines produced, so a
    // "## Title\n\n---\n\n" sequence doesn't render as a wall of blank lines.
    .replace(/(?:<br \/>)+(<h[1-6]>|<hr \/>|<ul>|<pre>)/g, "$1")
    .replace(/(<\/h[1-6]>|<hr \/>|<\/ul>|<\/pre>)(?:<br \/>)+/g, "$1");
}
