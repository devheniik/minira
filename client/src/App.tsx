import { AuthProvider } from "@/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthLayout } from "@/layouts/AuthLayout.tsx";
import Dashboard from "@/views/Dashboard.tsx";
import Users from "@/views/users/Users.tsx";
import Settings from "@/views/Settings.tsx";
import { LoginView } from "@/views/LoginView.tsx";
import RegisterView from "@/views/RegisterView.tsx";
import RequireAuth from "@/components/auth/required-auth.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="login" element={<LoginView />} />
                        <Route path="register" element={<RegisterView />} />
                        <Route element={<AuthLayout />}>
                            <Route
                                index
                                element={
                                    <RequireAuth>
                                        <Dashboard />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                index
                                path="dashboard"
                                element={
                                    <RequireAuth>
                                        <Dashboard />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="users"
                                element={
                                    <RequireAuth>
                                        <Users />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="settings"
                                element={
                                    <RequireAuth>
                                        <Settings />
                                    </RequireAuth>
                                }
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </AuthProvider>
    );
}

export default App;
