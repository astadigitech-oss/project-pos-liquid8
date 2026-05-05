<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

### Line Selection Syntax Handling
- **Pattern Recognition**: If a file reference contains a line selection using the format `#L<start>:<end>` (e.g., `#L10:20`), you must interpret the colon (`:`) as a range separator.
- **Fallback Logic**: Treat any instance of `#L<num>:<num>` as functionally equivalent to the standard `#L<num>-<num>` format.
- **Action**: Automatically normalize the selection to a hyphenated range before processing or reading the file content.
