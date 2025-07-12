import { Bell, Menu , User} from "lucide-react";

const MobileHeader = () => (
    <header className="bg-white/20 backdrop-blur-md border-b border-white/30 shadow-lg sticky top-0 z-50 md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-2 hover:bg-white/20 rounded-lg">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">StackIt</div>
        <div className="flex items-center space-x-2">
          <Bell className="w-6 h-6 text-gray-700" />
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );

export default MobileHeader;