import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import CopyButton from "@/components/copybutton";

function NodeExample() {
  const codeSnippet = `import { createLogger } from "@logpipe/logger";

const logger = createLogger({
  level: "info",
  apiKey: "your-api-key",
  uri: "https://your-log-endpoint.com",
});

logger.info("Hello, LogPipe!");`;
  return (
    <div className="flex h-full pt-6">
      <pre className="text-wrap bg-[#F7F7F7] flex rounded-xl w-full">
        <code className="pt-2 text-md w-full">
          <div className="justify-end flex px-2">
            <CopyButton element={codeSnippet} />
          </div>
          <div className="p-4">
            <SyntaxHighlighter
              language="javascript"
              customStyle={{ background: "none", padding: 0 }}
              className="bg-transparent"
            >
              {codeSnippet}
            </SyntaxHighlighter>
          </div>
        </code>
      </pre>
    </div>
  );
}

export default NodeExample;
