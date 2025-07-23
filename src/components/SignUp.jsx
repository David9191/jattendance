import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');

  const { signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signUpNewUser(email, password);

      if (result.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      setError('an error occurred: ', error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSignUp}>
        <h2>Sign up</h2>
        <p>
          Already have an account?
          <br />
          <Link to="/signin">Sign in!</Link>
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
            Sign up
          </button>
          {error && <p>{error}</p>}
        </div>
      </form>
    </>
  );
};

export default SignUp;
