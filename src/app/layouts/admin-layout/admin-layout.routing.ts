import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MonitoringComponent } from '../../pages/monitoring/monitoring.component';
import { LifeSecurityComponent } from '../../pages/life-security/life-security.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'monitoring',     component: MonitoringComponent },
    { path: 'life-security',  component: LifeSecurityComponent }
];
