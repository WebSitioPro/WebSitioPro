import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface PasswordProtectionProps {
  children: React.ReactNode;
  onAuthenticated: () => void;
}

const EDITOR_PASSWORD = "WebSitioPro2025!";

export default function PasswordProtection({ children, onAuthenticated }: PasswordProtectionProps) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if already authenticated in this session
    return sessionStorage.getItem("editorAuthenticated") === "true";
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === EDITOR_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("editorAuthenticated", "true");
      onAuthenticated();
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="mb-2">
                  <span style={{ color: '#C8102E' }}>WebSitio</span>
                  <span style={{ color: '#00A859' }}>Pro</span>
                </CardTitle>
                <CardDescription>
                  Editor Access Required
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <Input
                      type="password"
                      placeholder="Enter editor password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                  
                  {error && (
                    <div className="alert alert-danger d-flex align-items-center mb-3" role="alert">
                      <AlertCircle size={16} className="me-2" />
                      <small>{error}</small>
                    </div>
                  )}
                  
                  <Button type="submit" className="w-100" style={{ backgroundColor: '#C8102E' }}>
                    Access Editor
                  </Button>
                </form>
                
                <div className="mt-4 text-center">
                  <small className="text-muted">
                    This editor is password protected for security.
                  </small>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}