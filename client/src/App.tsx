import {AuthProvider} from "@/providers/auth-provider.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router";
import {AuthLayout} from "@/layouts/AuthLayout.tsx";
import Dashboard from "@/views/dashboard.tsx";
import MembersView from "@/views/members/members-view.tsx";
import Settings from "@/views/settings.tsx";
import {LoginView} from "@/views/login/login-view.tsx";
import RegisterView from "@/views/register/register-view.tsx";
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
                                path="members"
                                element={
                                    <RequireAuth>
                                        <MembersView />
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
