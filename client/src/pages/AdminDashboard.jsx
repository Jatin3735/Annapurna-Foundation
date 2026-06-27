import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [volunteers, setVolunteers] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-primary text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold font-poppins">Admin Panel</h2>
        </div>
        <div className="flex-1 py-6 space-y-2 px-4">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${activeTab === 'dashboard' ? 'bg-accent text-white' : 'hover:bg-gray-800'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('volunteers')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${activeTab === 'volunteers' ? 'bg-accent text-white' : 'hover:bg-gray-800'}`}
          >
            Volunteers
          </button>
          <button 
            onClick={() => setActiveTab('authorities')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${activeTab === 'authorities' ? 'bg-accent text-white' : 'hover:bg-gray-800'}`}
          >
            Authorities
          </button>
        </div>
        <div className="p-4 border-t border-gray-700">
          <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-medium transition">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 capitalize">{activeTab}</h1>
        
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow border border-gray-100 text-center">
                  <h3 className="text-lg text-gray-500 font-medium mb-2">Total Volunteers</h3>
                  <p className="text-4xl font-bold text-primary">{volunteers.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow border border-gray-100 text-center">
                  <h3 className="text-lg text-gray-500 font-medium mb-2">Approved</h3>
                  <p className="text-4xl font-bold text-green-600">{volunteers.filter(v => v.status === 'Approved').length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow border border-gray-100 text-center">
                  <h3 className="text-lg text-gray-500 font-medium mb-2">Pending</h3>
                  <p className="text-4xl font-bold text-orange-500">{volunteers.filter(v => v.status === 'Pending').length}</p>
                </div>
              </div>
            )}

            {activeTab === 'volunteers' && (
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
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
                          <div className="text-xs text-gray-500">{new Date(vol.certificateDate).toLocaleDateString()}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">{vol.email}</div>
                          <div className="text-sm">{vol.phone}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
                        <td className="p-4 space-x-2">
                          {vol.status === 'Pending' && (
                            <>
                              <button onClick={() => handleApprove(vol._id)} className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">Approve</button>
                              <button onClick={() => handleReject(vol._id)} className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600">Reject</button>
                            </>
                          )}
                          <button onClick={() => handleDeleteVol(vol._id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button>
                        </td>
                      </tr>
                    ))}
                    {volunteers.length === 0 && (
                      <tr><td colSpan="5" className="p-8 text-center text-gray-500">No volunteers found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'authorities' && (
              <div>
                <p className="text-gray-600 mb-6">Manage authorities shown on the home page.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {authorities.map(auth => (
                    <div key={auth._id} className="bg-white border rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
                      <img src={auth.photoUrl} alt={auth.name} className="w-24 h-24 rounded-full object-cover mb-4" />
                      <h3 className="text-xl font-bold">{auth.name}</h3>
                      <p className="text-accent mb-2">{auth.designation}</p>
                      <p className="text-sm text-gray-500 mb-4">{auth.description}</p>
                      <button className="text-red-500 hover:underline text-sm mt-auto">Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
