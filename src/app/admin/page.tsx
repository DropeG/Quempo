import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import AdminDashboardClient, { AdminUserItem } from './AdminDashboardClient';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get('quempo_admin_session');

  if (adminCookie?.value !== 'authenticated') {
    redirect('/admin/login');
  }

  const supabase = await createClient();

  // Fetch metrics: Total Profiles Count & Total Trips Count
  const [{ count: totalUsersCount }, { count: totalTripsCount }, { data: rawProfiles }, { data: rawTrips }] =
    await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('trips').select('*', { count: 'exact', head: true }),
      supabase
        .from('profiles')
        .select('id, full_name, avatar_url, whatsapp_number, instagram_handle')
        .order('updated_at', { ascending: false }),
      supabase.from('trips').select('user_id'),
    ]);

  // Aggregate trip counts per user
  const tripCountMap: Record<string, number> = {};
  if (rawTrips) {
    for (const trip of rawTrips) {
      if (trip.user_id) {
        tripCountMap[trip.user_id] = (tripCountMap[trip.user_id] || 0) + 1;
      }
    }
  }

  const usersList: AdminUserItem[] = (rawProfiles || []).map((p) => ({
    id: p.id,
    fullName: p.full_name || 'Sin nombre',
    avatarUrl: p.avatar_url,
    whatsappNumber: p.whatsapp_number,
    instagramHandle: p.instagram_handle,
    isAdmin: false,
    tripsCount: tripCountMap[p.id] || 0,
  }));

  const adminUserDisplay = process.env.ADMIN_USERNAME || 'admin';

  return (
    <AdminDashboardClient
      adminEmail={adminUserDisplay}
      totalUsersCount={totalUsersCount || usersList.length}
      totalTripsCount={totalTripsCount || 0}
      usersList={usersList}
    />
  );
}
