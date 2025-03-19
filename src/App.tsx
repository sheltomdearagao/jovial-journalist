
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

            {/* Rotas de seções temáticas dinâmicas */}
            <Route path="/noticias" element={<Index key="noticias" />} />
            <Route path="/reportagens" element={<Index key="reportagens" />} />
            <Route path="/entrevistas" element={<Index key="entrevistas" />} />
            <Route path="/curiosidades" element={<Index key="curiosidades" />} />
            <Route path="/entretenimento" element={<Index key="entretenimento" />} />
            <Route path="/opiniao" element={<Index key="opiniao" />} />
            <Route path="/esportes" element={<Index key="esportes" />} />
            <Route path="/cultura" element={<Index key="cultura" />} />
            <Route path="/ciencia" element={<Index key="ciencia" />} />
            <Route path="/tecnologia" element={<Index key="tecnologia" />} />
            <Route path="/meio-ambiente" element={<Index key="meio-ambiente" />} />
            <Route path="/eventos" element={<Index key="eventos" />} />
            
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
