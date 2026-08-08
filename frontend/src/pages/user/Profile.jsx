function Profile() {
    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    return (
        <div className="mx-auto max-w-4xl px-6 py-16">

            <h1 className="text-3xl font-bold">
                Profile
            </h1>

            <div className="mt-6 rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200">

                <p>
                    <strong>Name:</strong>{" "}
                    {user?.name || "—"}
                </p>

                <p className="mt-3">
                    <strong>Email:</strong>{" "}
                    {user?.email || "—"}
                </p>

                <p className="mt-3">
                    <strong>Role:</strong>{" "}
                    {user?.role || "—"}
                </p>

            </div>

        </div>
    );
}

export default Profile;