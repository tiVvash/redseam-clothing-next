import RegisterForm from "./RegisterForm";

export default function Register(){
    return(
        <div className="flex w-full h-screen">
            <div className="flex-1 bg-gray-100">
                <img src="/LoginPic.png" alt="" />
            </div>
            <div className="flex-1 flex items-center justify-center">
             <RegisterForm/>
            </div>
        </div>
    )
}