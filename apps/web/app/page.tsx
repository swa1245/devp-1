import { client } from "@repo/db/client";

export default async function Home() {
  try {
    const user = await client.user.findFirst();
    
    if (!user) {
      return <div>No users found</div>;
    }

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">User Details</h1>
        <div className="bg-white rounded-lg shadow p-4">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>ID:</strong> {user.id}</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching user:', error);
    return <div>Error loading user data</div>;
  }
}
