import { useEffect, useState } from 'react';
import { UserAuth } from '../contexts/AuthContext';
import { UserProfile } from '../contexts/UserProfileContext';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');

  const { signInUser, session } = UserAuth();
  const { setUserProfileToSession } = UserProfile();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInUser(email, password);

      if (result.success) {
        setUserProfileToSession(result.data.user.id);
        navigate('/select-department');
      }
    } catch (error) {
      setError('an error occurred: ');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      navigate('/select-department');
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSignIn}>
        <h2>Sign In</h2>
        <br />
        <p>
          Don't have an account? click here!
          <br />
          <Link to={'/signup'}>Sign Up</Link>
        </p>
        <br />
        <p>
          Do you want to go to Dashboard? click here!
          <br />
          <Link to={'/dashboard'}>Dashboard</Link>
        </p>
        <div className="input-container">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            placeholder="email"
            autoComplete="true"
            value={email}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            placeholder="password"
            autoComplete="true"
            value={password}
          />
          <button type="submit" disabled={loading}>
            Sign In
          </button>
          {error && <p>{error}</p>}
        </div>
      </form>
    </>
  );
};

export default SignIn;
