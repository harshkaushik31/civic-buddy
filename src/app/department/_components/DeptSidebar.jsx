import axios from "axios";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";


export default function DeptSidebar() {

    const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      DeptSidebar
      <div className="p-6 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 hover:transform hover:scale-105 shadow-lg"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
