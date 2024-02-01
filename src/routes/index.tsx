import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import { DashboardPage } from "@/components/templates/dashboard";
import { ProductionPage } from "@/components/templates/production";
import { SettingsPage } from "@/components/templates/settings";

export function AppRoutes() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/dashboard" />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/production" element={<ProductionPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
            </Router>
        </>
    )
}