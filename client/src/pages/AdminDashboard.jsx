import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Users, Shield, LogOut, ChevronRight } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [volunteers, setVolunteers] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!userInfo) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const volRes = await fetch(`${import.meta.env.VITE_API_URL}/volunteers`, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      const authRes = await fetch(`${import.meta.env.VITE_API_URL}/authorities`, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      
      if (volRes.ok) setVolunteers(await volRes.json());
      if (authRes.ok) setAuthorities(await authRes.json());
    } catch (err) {
      console.error('Error fetching data', err);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/admin/login');
  };

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/volunteers/${id}/approve`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/volunteers/${id}/reject`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteVol = async (id) => {
    if (!window.confirm('Are you sure you want to delete this volunteer?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/volunteers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'volunteers', label: 'Volunteers', icon: Users },
    { id: 'authorities', label: 'Authorities', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-primary text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold font-poppins">Admin Panel</h2>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 py-6 space-y-2 px-4 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button 
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-3 rounded-lg font-medium transition 
                  flex items-center gap-3
                  ${activeTab === item.id 
                    ? 'bg-accent text-white' 
                    : 'hover:bg-gray-800'
                  }
                `}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <ChevronRight size={16} className="ml-auto" />
                )}
              </button>
            );
          })}
        </div>
        
        <div className="p-4 border-t border-gray-700">
          <button 
            onClick={handleLogout} 
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-medium transition flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 hover:text-gray-900"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800 capitalize">{activeTab}</h1>
          <div className="w-6" /> {/* Spacer for alignment */}
        </div>

        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <h1 className="hidden lg:block text-3xl font-bold text-gray-800 mb-8 capitalize">{activeTab}</h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500">Loading...</div>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow border border-gray-100 text-center">
                    <h3 className="text-sm sm:text-lg text-gray-500 font-medium mb-2">Total Volunteers</h3>
                    <p className="text-3xl sm:text-4xl font-bold text-primary">{volunteers.length}</p>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow border border-gray-100 text-center">
                    <h3 className="text-sm sm:text-lg text-gray-500 font-medium mb-2">Approved</h3>
                    <p className="text-3xl sm:text-4xl font-bold text-green-600">
                      {volunteers.filter(v => v.status === 'Approved').length}
                    </p>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow border border-gray-100 text-center col-span-1 sm:col-span-2 lg:col-span-1">
                    <h3 className="text-sm sm:text-lg text-gray-500 font-medium mb-2">Pending</h3>
                    <p className="text-3xl sm:text-4xl font-bold text-orange-500">
                      {volunteers.filter(v => v.status === 'Pending').length}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'volunteers' && (
                <div className="bg-white rounded-xl shadow overflow-hidden">
                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                      <thead>
                        <tr className="bg-gray-100 text-gray-700 uppercase text-sm border-b">
                          <th className="p-4">Name</th>
                          <th className="p-4">Contact</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Reg No.</th>
                          <th className="p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {volunteers.map(vol => (
                          <tr key={vol._id} className="border-b hover:bg-gray-50">
                            <td className="p-4">
                              <div className="font-semibold text-gray-900">{vol.fullName}</div>
                              <div className="text-xs text-gray-500">
                                {new Date(vol.certificateDate).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm break-all">{vol.email}</div>
                              <div className="text-sm">{vol.phone}</div>
                            </td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                                vol.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                                vol.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                                'bg-orange-100 text-orange-700'
                              }`}>
                                {vol.status}
                              </span>
                            </td>
                            <td className="p-4 font-mono text-sm font-bold text-gray-700">
                              {vol.registrationNumber || '-'}
                            </td>
                            <td className="p-4">
                              <div className="flex flex-wrap gap-2">
                                {vol.status === 'Pending' && (
                                  <>
                                    <button 
                                      onClick={() => handleApprove(vol._id)} 
                                      className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 whitespace-nowrap"
                                    >
                                      Approve
                                    </button>
                                    <button 
                                      onClick={() => handleReject(vol._id)} 
                                      className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 whitespace-nowrap"
                                    >
                                      Reject
                                    </button>
                                  </>
                                )}
                                <button 
                                  onClick={() => handleDeleteVol(vol._id)} 
                                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 whitespace-nowrap"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {volunteers.length === 0 && (
                          <tr><td colSpan="5" className="p-8 text-center text-gray-500">No volunteers found.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden divide-y divide-gray-200">
                    {volunteers.map(vol => (
                      <div key={vol._id} className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold text-gray-900">{vol.fullName}</div>
                            <div className="text-xs text-gray-500">
                              {new Date(vol.certificateDate).toLocaleDateString()}
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            vol.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                            vol.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {vol.status}
                          </span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 w-16">Email:</span>
                            <span className="break-all">{vol.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 w-16">Phone:</span>
                            <span>{vol.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 w-16">Reg No:</span>
                            <span className="font-mono font-bold">{vol.registrationNumber || '-'}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {vol.status === 'Pending' && (
                            <>
                              <button 
                                onClick={() => handleApprove(vol._id)} 
                                className="flex-1 bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => handleReject(vol._id)} 
                                className="flex-1 bg-orange-500 text-white px-3 py-2 rounded text-sm hover:bg-orange-600"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          <button 
                            onClick={() => handleDeleteVol(vol._id)} 
                            className={`${vol.status === 'Pending' ? 'flex-1' : 'w-full'} bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600`}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                    {volunteers.length === 0 && (
                      <div className="p-8 text-center text-gray-500">No volunteers found.</div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'authorities' && (
                <div>
                  <p className="text-gray-600 mb-6 text-sm sm:text-base">Manage authorities shown on the home page.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {authorities.map(auth => (
                      <div key={auth._id} className="bg-white border rounded-xl p-4 sm:p-6 shadow-sm flex flex-col items-center text-center">
                        <img 
                          src={auth.photoUrl} 
                          alt={auth.name} 
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-4" 
                        />
                        <h3 className="text-lg sm:text-xl font-bold">{auth.name}</h3>
                        <p className="text-accent text-sm sm:text-base mb-2">{auth.designation}</p>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{auth.description}</p>
                        <button className="text-red-500 hover:underline text-sm mt-auto">
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;