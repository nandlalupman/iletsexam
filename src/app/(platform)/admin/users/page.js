import { getAdminUsers } from "@/lib/platform-data";

export default async function AdminUsersPage() {
  const users = await getAdminUsers();

  return (
    <div className="surface-card rounded-[32px] p-6">
      <h2 className="text-2xl font-bold text-white">Users</h2>
      <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10">
        {users.length ? (
          users.map((user) => (
            <div key={user.id} className="grid gap-4 border-b border-white/10 bg-white/5 px-5 py-4 lg:grid-cols-[1.15fr_1fr_0.85fr_0.7fr_0.7fr] lg:items-center">
              <div>
                <p className="font-semibold text-white">{user.fullName}</p>
                <p className="text-sm text-[#8ea1c1]">{user.email}</p>
              </div>
              <p className="text-sm text-[#d7dff0]">{user.phone}</p>
              <p className="text-sm text-[#d7dff0]">{new Date(user.joinedAt).toLocaleDateString("en-US")}</p>
              <p className="text-sm text-[#f5c842]">{user.testsTaken} tests</p>
              <p className="text-sm text-white">Band {user.latestBand}</p>
            </div>
          ))
        ) : (
          <div className="px-5 py-8 text-sm text-[#8ea1c1]">No student profiles yet.</div>
        )}
      </div>
    </div>
  );
}
