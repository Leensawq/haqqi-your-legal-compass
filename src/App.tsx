import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateCase from "./pages/CreateCase";
import Analysis from "./pages/Analysis";
import LetterGeneration from "./pages/LetterGeneration";
import MyCases from "./pages/MyCases";
import Academy from "./pages/Academy";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-case" element={<CreateCase />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/letter" element={<LetterGeneration />} />
          <Route path="/my-cases" element={<MyCases />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
