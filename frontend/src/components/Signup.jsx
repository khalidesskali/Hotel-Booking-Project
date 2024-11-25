import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <div
        className="bg-gray-100 flex items-center justify-center"
        style={{ height: "calc(100vh - 72px)" }}
      >
        <form
          className="bg-white py-8 px-10 rounded-md shadow-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="font-semibold text-4xl text-center mb-5">StayHome</h2>
          <div className="mb-4">
            <label htmlFor="first-name" className="mb-1  block">
              First name
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              id="first-name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last-name" className="mb-1 block">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
              id="last-name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mail" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
              id="mail"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="pass" className="mb-2 block">
              Password
            </label>
            <input
              type="password"
              placeholder="Entery your password"
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
              id="pass"
            />
          </div>
          <Button className="w-full block bg-primary mb-2" type="submit">
            Signup
          </Button>
          <span className="block mx-auto font-medium w-fit text-sm ">
            already have an account?{"  "}
            <Link className="text-primary underline" to="/login">
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Signup;
