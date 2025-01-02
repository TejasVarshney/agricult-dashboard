
const Sidebar = () => {
    return (
        <nav className="mt-4">
          {[
            { name: 'Home', icon: <Home size={20} /> },
            { name: 'Orders', icon: <Package size={20} /> },
            { name: 'Settings', icon: <Settings size={20} /> },
            { name: 'Help', icon: <HelpCircle size={20} /> },
          ].map((item) => (
            <a
              key={item.name}
              href="https://google.com"
              className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </a>
          ))}
        </nav>
    );
}