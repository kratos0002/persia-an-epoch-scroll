import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Index from "./pages/Index.tsx";
import HouseOfWisdom from "./pages/HouseOfWisdom.tsx";
import Buddhism from "./pages/Buddhism.tsx";
import Samurai from "./pages/Samurai.tsx";
import Rebellion1857 from "./pages/Rebellion1857.tsx";
import Napoleon from "./pages/Napoleon.tsx";
import Constantinople from "./pages/Constantinople.tsx";
import IndiaStates from "./pages/IndiaStates.tsx";
import MongolIndia from "./pages/MongolIndia.tsx";
import Auth from "./pages/Auth.tsx";
// ResetPassword removed — using OTP-only auth
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/persia" element={<Index />} />
          <Route path="/wisdom" element={<HouseOfWisdom />} />
          <Route path="/buddhism" element={<Buddhism />} />
          <Route path="/samurai" element={<Samurai />} />
          <Route path="/1857" element={<Rebellion1857 />} />
          <Route path="/napoleon" element={<Napoleon />} />
          <Route path="/constantinople" element={<Constantinople />} />
          <Route path="/india-states" element={<IndiaStates />} />
          <Route path="/auth" element={<Auth />} />
          {/* reset-password route removed — OTP auth only */}
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
