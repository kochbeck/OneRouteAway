import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

export  function RegisterButton() {
  return (
    <>
      <ClerkLoading>
        <div>Loading...</div>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <SignUpButton>
            <button>Register</button>
          </SignUpButton>
        </SignedOut>
      </ClerkLoaded>
    </>
  );
}