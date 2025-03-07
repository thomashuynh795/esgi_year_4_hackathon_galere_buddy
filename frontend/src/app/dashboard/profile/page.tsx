"use client";
import { useState, useEffect } from "react";

export default function UpdateProfileForm() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstname: "",
        name: "",
    });

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setMessage("No token found. Please log in.");
                setLoading(false);
                return;
            }

            const response = await fetch("http://localhost:3001/users/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user profile");
            }

            const data = await response.json();

            setProfile(data.user);
            setUser(data.user);
            setFormData({
                email: data.email || "",
                password: "",
                firstname: data.firstname || "",
                name: data.name || "",
            });

            setMessage("");
        } catch (error) {
            console.error("Error fetching profile:", error);
            setMessage("Could not load profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setAvatarFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setMessage("No token found. Please log in.");
                setLoading(false);
                return;
            }

            const formPayload = new FormData();
            Object.keys(formData).forEach((key) => {
                const value = (formData as any)[key];
                if (value) {
                    formPayload.append(key, value);
                }
            });

            if (avatarFile) {
                formPayload.append("avatarFile", avatarFile);
            }

            const response = await fetch("http://localhost:3001/users/me", {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formPayload,
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Profile updated successfully!");
                await fetchProfile();
            } else {
                setMessage(`Error: ${data.message || "Unknown error."}`);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage("An error occurred while updating your profile.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="text-center p-4">Loading...</p>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

            {profile ? (
                <div className="mb-8 p-4 border border-gray-300 rounded-md">
                    <div className="flex items-center gap-4">
                        {profile.avatarUrl && (
                            <img
                                src={profile.avatarUrl}
                                alt="Profile Avatar"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        )}

                        <div className="text-sm space-y-1">
                            <p>
                                <strong>ID:</strong> {profile.id}
                            </p>
                            <p>
                                <strong>Email:</strong> {profile.email}
                            </p>
                            <p>
                                <strong>First Name:</strong> {profile.firstname}
                            </p>
                            <p>
                                <strong>Last Name:</strong> {profile.name}
                            </p>
                            <p>
                                <strong>Role:</strong> {profile.role}
                            </p>
                            <p>
                                <strong>Impact Points:</strong> {profile.impactPoints}
                            </p>
                            <p>
                                <strong>Created At:</strong> {profile.createdAt}
                            </p>
                            <p>
                                <strong>Updated At:</strong> {profile.updatedAt}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-red-500 mb-4">No profile data found.</p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block font-medium mb-1">Email:</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Password:</label>
                    <input
                        type="password"
                        name="password"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">First Name:</label>
                    <input
                        type="text"
                        name="firstname"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={formData.firstname}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Last Name:</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Upload New Profile Picture:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
                >
                    {loading ? "Updating..." : "Update Profile"}
                </button>

                {message && <p className="text-sm text-red-600">{message}</p>}
            </form>
        </div>
    );
}
