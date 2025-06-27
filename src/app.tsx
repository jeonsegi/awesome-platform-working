import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/layout/layout";
import Dashboard from "@/pages/dashboard";
import Products from "@/pages/products";
import Content from "@/pages/content";
import Orders from "@/pages/orders";
import Community from "@/pages/community";
import MyPage from "@/pages/my-page";
import Admin from "@/pages/admin";
import Payment from "@/pages/payment";
import Guide from "@/pages/guide";
import CorporateApplication from "@/pages/corporate-application";
import Landing from "@/pages/landing";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      {!isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/corporate-application" component={CorporateApplication} />
        </>
      ) : (
        <>
          <Route path="/" component={() => (
            <Layout>
              <Dashboard />
            </Layout>
          )} />
          <Route path="/products" component={() => (
            <Layout>
              <Products />
            </Layout>
          )} />
          <Route path="/content" component={() => (
            <Layout>
              <Content />
            </Layout>
          )} />
          <Route path="/orders" component={() => (
            <Layout>
              <Orders />
            </Layout>
          )} />
          <Route path="/community" component={() => (
            <Layout>
              <Community />
            </Layout>
          )} />
          <Route path="/my-page" component={() => (
            <Layout>
              <MyPage />
            </Layout>
          )} />
          <Route path="/admin" component={() => (
            <Layout>
              <Admin />
            </Layout>
          )} />
          <Route path="/payment/:orderId" component={() => (
            <Layout>
              <Payment />
            </Layout>
          )} />
          <Route path="/guide" component={() => (
            <Layout>
              <Guide />
            </Layout>
          )} />
        </>
      )}
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
