import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import ProPage from "@/pages/ProPage";
import EditorPage from "./pages/EditorPage";
import RestaurantEditor from "./pages/RestaurantEditor";
import TemplateTools from "./pages/TemplateTools";
import ProfessionalsDemo from "@/pages/ProfessionalsDemo";
import RestaurantsDemo from "@/pages/RestaurantsDemo";
import TourismDemo from "@/pages/TourismDemo";
import RetailDemo from "@/pages/RetailDemo";
import ServicesDemo from "@/pages/ServicesDemo";
import ProFormPage from "@/pages/ProFormPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/pro" component={ProPage} />
      <Route path="/editor" component={EditorPage} />
      <Route path="/demo/professionals" component={ProfessionalsDemo} />
      <Route path="/demo/restaurants" component={RestaurantsDemo} />
      <Route path="/demo/tourism" component={TourismDemo} />
      <Route path="/demo/retail" component={RetailDemo} />
      <Route path="/demo/services" component={ServicesDemo} />
      
      {/* Legacy routes for backward compatibility */}
      <Route path="/professionals-demo" component={ProfessionalsDemo} />
      <Route path="/restaurants-demo" component={RestaurantsDemo} />
      <Route path="/tourism-demo" component={TourismDemo} />
      <Route path="/retail-demo" component={RetailDemo} />
      <Route path="/services-demo" component={ServicesDemo} />
      <Route path="/editor/:clientId" component={EditorPage} />
      <Route path="/restaurant-editor/:clientId" component={RestaurantEditor} />
      <Route path="/editor/tools" component={TemplateTools} />
      <Route path="/pro-form" component={ProFormPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;