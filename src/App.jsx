import React, { useState } from 'react';
import Login from './components/auth/Login';
import EventHub from './components/events/EventHub';
import SuperAdminDashboard from './components/admin/SuperAdminDashboard';
import Layout from './components/layout/Layout';
import CommandCentre from './components/dashboard/CommandCentre';
import EventBrief from './components/planning/EventBrief';
import MasterPlan from './components/planning/MasterPlan';
import Readiness from './components/planning/Readiness';
import VenueMap from './components/commercial/VenueMap';
import PackageBuilder from './components/commercial/PackageBuilder';
import Proposals from './components/commercial/Proposals';
import Pipeline from './components/commercial/Pipeline';
import Campaigns from './components/marketing/Campaigns';
import Creators from './components/marketing/Creators';
import Programme from './components/marketing/Programme';
import Vendors from './components/operations/Vendors';
import RunOfShow from './components/live/RunOfShow';
import LiveCommand from './components/live/LiveCommand';
import Incidents from './components/live/Incidents';
import ClosureDashboard from './components/post/ClosureDashboard';

const pages = {
  dashboard: CommandCentre,
  brief: EventBrief,
  masterplan: MasterPlan,
  readiness: Readiness,
  venuemap: VenueMap,
  packages: PackageBuilder,
  proposals: Proposals,
  pipeline: Pipeline,
  campaigns: Campaigns,
  creators: Creators,
  programme: Programme,
  vendors: Vendors,
  runofshow: RunOfShow,
  livecommand: LiveCommand,
  incidents: Incidents,
  closure: ClosureDashboard,
};

export default function App() {
  const [user, setUser] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Navigation state with optional params for deep linking
  const [active, setActive] = useState('dashboard');
  const [navParams, setNavParams] = useState({});

  const handleLogout = () => {
    setUser(null);
    setSelectedEvent(null);
  };

  const handleNavigate = (page, params = {}) => {
    setActive(page);
    setNavParams(params);
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  if (user.roleId === 'superadmin') {
    return <SuperAdminDashboard user={user} onLogout={handleLogout} />;
  }

  if (!selectedEvent) {
    return <EventHub user={user} onLogout={handleLogout} onSelectEvent={setSelectedEvent} />;
  }



  const PageComponent = pages[active] || CommandCentre;

  return (
    <Layout 
      active={active} 
      onNavigate={handleNavigate} 
      user={user} 
      onLogout={handleLogout}
      event={selectedEvent}
      onBackToHub={() => setSelectedEvent(null)}
    >
      <PageComponent onNavigate={handleNavigate} navParams={navParams} user={user} event={selectedEvent} />
    </Layout>
  );
}
