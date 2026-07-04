import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import App from "./app";
import "./index.css";

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>出错了</h2>
      <pre style={{ background: '#f5f5f5', padding: 10, borderRadius: 4 }}>{error.message}</pre>
      <button onClick={resetErrorBoundary} style={{ marginTop: 10, padding: '8px 16px' }}>
        重试
      </button>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
);
