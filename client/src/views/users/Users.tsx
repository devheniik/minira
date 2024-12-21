import useJobTitles from "@/hooks/useJobTitles.ts";
import UserCard from "./components/UserCard";
import CreateUserDialog from "./components/CreateUserDialog";

// !!! Remove !!!
const YUMMY_DATA = [
    {
        id: 1,
        name: "John Doe",
        description: "Software Engineer",
        companyId: 1,
        createdAt: "2024-12-21T13:08:42.394Z",
        updatedAt: "2024-12-21T13:08:42.394Z",
    },
    {
        id: 2,
        name: "Jane Smith",
        description: "Product Manager",
        companyId: 4,
        createdAt: "2024-12-21T13:08:42.394Z",
        updatedAt: "2024-12-21T13:08:42.394Z",
    },
    {
        id: 3,
        name: "Alice Johnson",
        description: "UX Designer",
        companyId: 3,
        createdAt: "2024-12-21T13:08:42.394Z",
        updatedAt: "2024-12-21T13:08:42.394Z",
    },
];

const Users = () => {
    const { data: jobTitles, isLoading, error } = useJobTitles();

    // !!! Remove !!!
    let parsedData = null;
    if (jobTitles?.length > 1) {
        parsedData = jobTitles;
    } else {
        parsedData = YUMMY_DATA;
    }

    //TODO: Correct handler
    if (isLoading) return <p>Loading job titles...</p>;
    if (error) return <p>Error loading job titles: {error.message}</p>;

    return (
        <>
            <ul className="w-full">
                {parsedData ? (
                    parsedData.map((title) => (
                        <UserCard key={title.id} title={title} />
                    ))
                ) : (
                    <li>No job titles available</li>
                )}
            </ul>
            <div className="mt-4 text-right">
                <CreateUserDialog />
            </div>
        </>
    );
};

export default Users;
