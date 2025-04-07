import { SignInButton } from "@clerk/nextjs";

const LoginButton = () => {
  return (
    <SignInButton>
      <button>Login</button>
    </SignInButton>
  );
};

export default LoginButton;