import { AuthProvider } from "@/providers/auth-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthLayout } from "@/layouts/AuthLayout.tsx";
import DashboardView from "@/views/dashboard/dashboard-view.tsx";
import MembersView from "@/views/members/members-view.tsx";
import SprintsView from "@/views/sprints/sprints-view";
import { LoginView } from "@/views/login/login-view.tsx";
import RegisterView from "@/views/register/register-view.tsx";
import RequireAuth from "@/components/auth/required-auth.tsx";
import JobTitlesView from "./views/job-titles/job-titles-view";
import Sprint from "./views/sprints/sprint-calendar-view.tsx";
import SettingsView from "./views/settings/settings-view.tsx";

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
                                        <DashboardView />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                index
                                path="dashboard"
                                element={
                                    <RequireAuth>
                                        <DashboardView />
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
                                path="sprints"
                                element={
                                    <RequireAuth>
                                        <SprintsView />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="job-titles"
                                element={
                                    <RequireAuth>
                                        <JobTitlesView />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="sprint/:id"
                                element={
                                    <RequireAuth>
                                        <Sprint />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="settings"
                                element={
                                    <RequireAuth>
                                        <SettingsView />
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
