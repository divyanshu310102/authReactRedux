import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../features/users/userSlice';
import { Edit, Trash } from 'lucide-react';

const Home = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  console.log(users)

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="p-4 border-b">Username</th>
            <th className="p-4 border-b">Email</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="p-4 border-b">{user.userName}</td>
              <td className="p-4 border-b">{user.email}</td>
              <td className="p-4 border-b">
                <button className="mr-2 p-1 bg-yellow-500 text-white rounded">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(user._id)} className="p-1 bg-red-500 text-white rounded">
                  <Trash className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
