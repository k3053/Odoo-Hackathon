import { Home, Award, User, Settings } from "lucide-react";

const SidebarButton = ({ icon: Icon, text }) => (
    <button className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-white/20 rounded-lg">
      <Icon className="w-5 h-5" />
      <span>{text}</span>
    </button>
  );

const Sidebar = () => (
    <aside className="hidden md:flex flex-col w-64 bg-white/10 backdrop-blur-md border-r border-white/30 h-screen sticky top-0">
      <div className="p-4">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">StackIt</div>
        <nav className="space-y-2">
          <SidebarButton icon={Home} text="Home" />
          <SidebarButton icon={Award} text="Top Questions" />
          <SidebarButton icon={User} text="Users" />
          <SidebarButton icon={Settings} text="Settings" />
        </nav>
      </div>
    </aside>
  );

  export default Sidebar;