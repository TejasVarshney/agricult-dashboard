const TabFilter = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`
            flex-1 px-4 py-2 text-sm font-medium rounded-md capitalize
            transition-colors duration-150
            ${activeTab === tab
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabFilter; 