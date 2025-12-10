import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NewCase from "./pages/NewCase";
import CaseAnalysis from "./pages/CaseAnalysis";
import MyCases from "./pages/MyCases";
import Profile from "./pages/Profile";
import Academy from "./pages/Academy";
import LetterGeneration from "./pages/LetterGeneration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/new-case" element={<NewCase />} />
            <Route path="/case-analysis" element={<CaseAnalysis />} />
            <Route path="/my-cases" element={<MyCases />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/letter-generation" element={<LetterGeneration />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
