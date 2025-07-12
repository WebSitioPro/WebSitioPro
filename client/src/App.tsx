import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import ProPage from "@/pages/ProPage";
import EditorPage from "@/pages/EditorPage";
import { ProfessionalsDemo, ProfessionalsEditor } from "@/templates/professionals";
import RestaurantsDemo from "@/pages/RestaurantsDemo";
import TourismDemo from "@/pages/TourismDemo";
import RetailDemo from "@/pages/RetailDemo";
import ServicesDemo from "@/pages/ServicesDemo";

import ClientSelectorPage from "@/pages/ClientSelectorPage";
import TemplateEditor from "@/pages/TemplateEditor";
import RestaurantsEditor from "@/pages/RestaurantsEditor";
import TourismEditor from "@/pages/TourismEditor";
import RetailEditor from "@/pages/RetailEditor";
import ServicesEditor from "@/pages/ServicesEditor";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/pro" component={ProPage} />
      <Route path="/editor" component={EditorPage} />
      <Route path="/editor/clients" component={ClientSelectorPage} />
      <Route path="/editor/template/:templateId" component={TemplateEditor} />
      <Route path="/professionals-demo" component={ProfessionalsDemo} />
      <Route path="/restaurants-demo" component={RestaurantsDemo} />
      <Route path="/tourism-demo" component={TourismDemo} />
      <Route path="/retail-demo" component={RetailDemo} />
      <Route path="/services-demo" component={ServicesDemo} />

      <Route path="/template-editor" component={TemplateEditor} />
      <Route path="/editor/professionals" component={ProfessionalsEditor} />
      <Route path="/editor/restaurants" component={RestaurantsEditor} />
      <Route path="/editor/tourism" component={TourismEditor} />
      <Route path="/editor/retail" component={RetailEditor} />
      <Route path="/editor/services" component={ServicesEditor} />
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
