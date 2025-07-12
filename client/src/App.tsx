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
import { RestaurantsDemo } from "@/templates/restaurants";
import { TourismDemo } from "@/templates/tourism";
import { RetailDemo } from "@/templates/retail";
import { ServicesDemo } from "@/templates/services";

import ClientSelectorPage from "@/pages/ClientSelectorPage";
import TemplateEditor from "@/pages/TemplateEditor";
import { RestaurantsEditor } from "@/templates/restaurants";
import { TourismEditor } from "@/templates/tourism";
import { RetailEditor } from "@/templates/retail";
import { ServicesEditor } from "@/templates/services";

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
