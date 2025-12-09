"use client";

import DashboardContent from '../components/DashboardContent';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../utils/use-auth';

export default function DashboardPage() {

  const auth = useAuth();
  console.log(auth);

  if(!auth) <p>Loading....</p>
  
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
}