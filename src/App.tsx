import { lazy, Suspense } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";

const SearchResults = lazy(() => import("./pages/SearchResults"));
const Countries = lazy(() => import("./pages/Countries"));
const CountryDetail = lazy(() => import("./pages/CountryDetail"));
const RecipeDetail = lazy(() => import("./pages/RecipeDetail"));

function RecipeDetailRoute() {
  const { id } = useParams<{ id: string }>();
  return <RecipeDetail key={id} />;
}
const Favorites = lazy(() => import("./pages/Favorites"));
const Settings = lazy(() => import("./pages/Settings"));
const SignIn = lazy(() => import("./pages/SignIn"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-clay-300 border-t-clay-600" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:name" element={<CountryDetail />} />
          <Route path="/recipes/:id" element={<RecipeDetailRoute />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
