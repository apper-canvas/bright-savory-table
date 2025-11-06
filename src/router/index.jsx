import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/organisms/Layout";

const Home = lazy(() => import("@/components/pages/Home"));
const Menu = lazy(() => import("@/components/pages/Menu"));
const Reservations = lazy(() => import("@/components/pages/Reservations"));
const About = lazy(() => import("@/components/pages/About"));
const Gallery = lazy(() => import("@/components/pages/Gallery"));
const Contact = lazy(() => import("@/components/pages/Contact"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-surface">
    <div className="text-center space-y-4">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
      <p className="text-secondary font-medium">Loading delicious content...</p>
    </div>
  </div>
);

const mainRoutes = [
  {
    path: "",
    index: true,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "menu",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Menu />
      </Suspense>
    ),
  },
  {
    path: "reservations",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Reservations />
      </Suspense>
    ),
  },
  {
    path: "about",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <About />
      </Suspense>
    ),
  },
  {
    path: "gallery",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Gallery />
      </Suspense>
    ),
  },
  {
    path: "contact",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Contact />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    ),
  },
];

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [...mainRoutes],
  },
];

export const router = createBrowserRouter(routes);