import { FC } from "react";
import CompanyForm from "./components/company-form";
import { useGetCurrentCompany } from "@/services/company";

const SettingsView: FC = () => {
    const { data, isPending } = useGetCurrentCompany();

    return (
        <>
            <img
                src="/public/images/mesh.png"
                alt="Settings Board"
                className="w-full object-cover rounded-lg h-[100px] "
            />
            <div>
                <h6 className="text-2xl mt-7">Settings</h6>
                <div className="mt-5 flex gap-8">
                    <div className="max-w-36 max-h-36">
                        <img
                            src="/public/images/placeholder.png"
                            alt="Settings Board"
                            className="w-full object-cover h-full"
                        />
                    </div>
                    {data && !isPending && <CompanyForm company={data} />}
                </div>
            </div>
        </>
    );
};

export default SettingsView;
