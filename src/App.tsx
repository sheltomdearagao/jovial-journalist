
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ArticleEditor from "./pages/ArticleEditor";
import ArticleView from "./pages/ArticleView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Páginas públicas */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/materia/:id" element={<ArticleView />} />

            {/* Rotas de seções temáticas - implementar posteriormente */}
            <Route path="/noticias" element={<Index />} />
            <Route path="/reportagens" element={<Index />} />
            <Route path="/entrevistas" element={<Index />} />
            <Route path="/curiosidades" element={<Index />} />
            <Route path="/entretenimento" element={<Index />} />
            <Route path="/opiniao" element={<Index />} />
            
            {/* Páginas protegidas - área de redação */}
            <Route
              path="/redacao"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/redacao/nova-materia"
              element={
                <ProtectedRoute>
                  <ArticleEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/redacao/editar-materia/:id"
              element={
                <ProtectedRoute>
                  <ArticleEditor />
                </ProtectedRoute>
              }
            />
            
            {/* Página não encontrada */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
