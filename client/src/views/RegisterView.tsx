import { RegisterForm } from "@/components/forms/register-form";

const RegisterView = () => {
    return (
        <div className="sm:block  lg:flex items-center h-full overflow-x-hidden">
            <div className=" max-w-[1440px] sm:px-[0] lg:px-[30px] m-auto ">
                <div className=" sm:block lg:flex gap-[20px] items-center justify-between ">
                    <img
                        src="/public/images/login/login-mobile.jpg"
                        alt="Login"
                        className="w-full  sm:block  lg:hidden  object-cover h-[200px]"
                    />
                    <div className="pl-0 xl:pl-[100px] sm:flex sm:justify-center lg:block sm:mt-[25px]">
                        <RegisterForm />
                    </div>
                    <img
                        src="/public/images/login/login.png"
                        alt="Login"
                        className="w-full sm:hidden lg:block  lg:max-w-[50%]  object-cover h-auto "
                    />
                </div>
            </div>
        </div>
    );
};

export default RegisterView;
