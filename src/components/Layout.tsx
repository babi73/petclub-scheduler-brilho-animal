
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import { NavLink, Outlet } from 'react-router-dom';
import { Calendar, PawPrint, Clock, User, Settings, List, Search, Plus } from 'lucide-react';

const Layout: React.FC = () => {
  // Check what properties are available in the sidebar context
  const sidebar = useSidebar();
  // We'll use the state to determine if it's collapsed 
  const isCollapsed = sidebar.state === "collapsed";

  const getNavClass = ({ isActive }: { isActive: boolean }) => {
    return `flex items-center p-2 rounded-lg text-base ${
      isActive 
        ? 'bg-petOrange/20 text-petBrown font-medium' 
        : 'hover:bg-petYellow/20 text-petBrown/70'
    }`;
  };

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar
        className={`bg-white border-r border-petYellow shadow-sm transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
        collapsible="icon"
      >
        <div className="p-4 flex justify-center items-center border-b border-petYellow/30">
          {isCollapsed ? (
            <PawPrint size={32} className="text-petOrange" />
          ) : (
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/e402b2bd-3375-4bb9-9ad4-2ab531a8d974.png" 
                alt="PetClub Logo" 
                className="h-12 w-12 object-contain"
                style={{ 
                  filter: 'brightness(1.1) drop-shadow(0 0 1px rgba(255,255,255,0.8))'
                }}
              />
              <div>
                <h1 className="text-xl font-bold text-petOrange">PetClub</h1>
                <p className="text-xs text-petBrown-light">O Clubinho do seu pet</p>
              </div>
            </div>
          )}
        </div>
        
        <SidebarContent>
          <SidebarTrigger className="self-end m-2" />
          
          <SidebarGroup>
            <SidebarGroupLabel className="text-petBrown/70">
              Menu Principal
            </SidebarGroupLabel>
            
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/" end className={getNavClass}>
                      <Calendar className="h-5 w-5 mr-3" />
                      {!isCollapsed && <span>Agendamentos</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/historico" className={getNavClass}>
                      <Clock className="h-5 w-5 mr-3" />
                      {!isCollapsed && <span>Histórico</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/clientes" className={getNavClass}>
                      <User className="h-5 w-5 mr-3" />
                      {!isCollapsed && <span>Clientes</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/pets" className={getNavClass}>
                      <PawPrint className="h-5 w-5 mr-3" />
                      {!isCollapsed && <span>Pets</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/servicos" className={getNavClass}>
                      <List className="h-5 w-5 mr-3" />
                      {!isCollapsed && <span>Serviços</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/configuracoes" className={getNavClass}>
                      <Settings className="h-5 w-5 mr-3" />
                      {!isCollapsed && <span>Configurações</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-petYellow/30 p-4 flex items-center justify-between">
          <SidebarTrigger className="text-petBrown p-2 rounded-full hover:bg-petYellow/20" />
          
          <div className="relative max-w-md w-full mx-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-petBrown/50" size={18} />
            <input
              type="text"
              placeholder="Buscar agendamentos, pets ou clientes..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-petOrange-light focus:ring-2 focus:ring-petYellow focus:outline-none"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-petBrown">Olá, Atendente</span>
            <div className="bg-petOrange/20 h-8 w-8 rounded-full flex items-center justify-center">
              <User size={16} className="text-petOrange" />
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-6 overflow-auto relative bg-petYellow-light/10">
          <Outlet />
          
          <button
            className="fixed bottom-8 right-8 bg-petOrange hover:bg-petOrange-dark text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 group animate-scale"
            aria-label="Novo Agendamento"
            onClick={() => window.location.href = "/novo-agendamento"}
          >
            <Plus size={24} />
            <span className="absolute right-full mr-2 bg-white text-petBrown px-3 py-1 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Novo Agendamento
            </span>
          </button>
        </main>
      </div>
    </div>
  );
};

export default Layout;
