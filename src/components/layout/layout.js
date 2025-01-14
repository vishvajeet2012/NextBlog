import Header from "./header";

export default function CommenLayout({ children }) {

        const isAuth= false;

    return <div className="min-h-screen bg-white text-black">
    {isAuth && <Header/>}
        {children}
    </div>; 
}  