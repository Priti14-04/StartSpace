import { useEffect, useState, useContext } from "react";
import API from "../utils/api";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get("/users/profile");
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p className="text-sm text-gray-500 mt-2">Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default Profile;
