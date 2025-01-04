function dialogueBox({ user, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-xl font-bold">
                            {(user.full_name || user.userName || 'NA').charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold ml-4 text-gray-800">{user.full_name || user.userName || user.id || 'N/A'}</h2>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-600">{user.email || 'N/A'}</span>
                    </div>
                    
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-gray-600">{user.phone || 'N/A'}</span>
                    </div>
                    
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-gray-600">{user.location || user.region || 'N/A'}</span>
                    </div>
                    
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mr-3 ${user.isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-gray-600">{user.isOnline ? 'Online' : 'Offline'}</span>
                    </div>
                </div>

                <button 
                    onClick={onClose} 
                    className="mt-8 w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default dialogueBox;