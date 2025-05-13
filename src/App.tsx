
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebarProvider } from "./components/SidebarProvider";
import { CartProvider } from "./contexts/CartContext";
import Layout from "./components/Layout";
import Appointments from "./pages/Appointments";
import AppointmentForm from "./pages/AppointmentForm";
import History from "./pages/History";
import Clients from "./pages/Clients";
import Pets from "./pages/Pets";
import Services from "./pages/Services";
import Settings from "./pages/Settings";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <AppSidebarProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Appointments />} />
                <Route path="novo-agendamento" element={<AppointmentForm />} />
                <Route path="historico" element={<History />} />
                <Route path="clientes" element={<Clients />} />
                <Route path="pets" element={<Pets />} />
                <Route path="servicos" element={<Services />} />
                <Route path="produtos" element={<Products />} />
                <Route path="produtos/:petType" element={<Products />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="configuracoes" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppSidebarProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
