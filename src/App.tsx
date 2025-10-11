import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import NewsMedia from "./pages/NewsMedia";
import Induspark from "./pages/Induspark";
import ContactUs from "./pages/contactus";
import Appointment from "./pages/appointment";
import Wellnesscity from "./pages/wellnesscity"; // 1. Import the component
import Videos from "./pages/videos";
import ThankYou from "./pages/ThankYou";
import EMICalculatorPage from "./pages/EMICalculatorPage";
import StampDutyCalculator from "./components/StampDutyCalculator";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { BlogPage } from "./pages/BlogPage";
import { SubBlogPage } from "./pages/SubBlogPage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlogPage from "./pages/admin/AdminBlogPage";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="newsMedia" element={<NewsMedia />} />
            <Route path="induspark" element={<Induspark />} />
            <Route path="contactus" element={<ContactUs />} />
            <Route path="appointment" element={<Appointment />} />
            <Route path="wellnesscity" element={<Wellnesscity />} /> {/* 2. Add the route */}
            <Route path="videos" element={<Videos />} />
            <Route path="thankyou" element={<ThankYou />} />
            <Route path="emi-calculator" element={<EMICalculatorPage />} />
            <Route path="stamp-duty-calculator" element={<StampDutyCalculator />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="blogs" element={<BlogPage />} />
            <Route path="subblog/:slug" element={<SubBlogPage />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="blog" element={<AdminBlogPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};