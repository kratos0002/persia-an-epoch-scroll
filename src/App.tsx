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
import Nuclear from "./pages/Nuclear.tsx";
import Nutmeg from "./pages/Nutmeg.tsx";
import Hormuz from "./pages/Hormuz.tsx";
import Ramayana from "./pages/Ramayana.tsx";
import Auth from "./pages/Auth.tsx";
import Admin from "./pages/Admin.tsx";
import Berlin from "./pages/Berlin.tsx";
import IbnBattuta from "./pages/IbnBattuta.tsx";
import ShareRedirect from "./pages/ShareRedirect.tsx";
import StoryPreview from "./pages/StoryPreview.tsx";
import NotFound from "./pages/NotFound.tsx";
import { MobileNotice } from "@/components/site/MobileNotice";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MobileNotice />
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
          <Route path="/mongol-india" element={<MongolIndia />} />
          <Route path="/nuclear" element={<Nuclear />} />
          <Route path="/nutmeg" element={<Nutmeg />} />
          <Route path="/hormuz" element={<Hormuz />} />
          <Route path="/ramayana" element={<Ramayana />} />
          <Route path="/berlin" element={<Berlin />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/share/:storyId" element={<ShareRedirect />} />
          <Route path="/preview/:storyId" element={<StoryPreview />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
