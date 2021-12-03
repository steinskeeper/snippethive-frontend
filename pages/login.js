/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "../src/utils/axios";
import { AuthContext } from "../src/context/AuthContext";
import Link from "next/link";


import Head from "next/head";
function Login() {
 
  const router = useRouter();
  const { authenticated, setAuthenticated, setUsing, setToken, setUserInfo } =
    useContext(AuthContext);
  const [formData, setFormData] = useState({
    "email": "",
    "password": "",
  });
  useEffect(() => {
    if (authenticated) router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  const handleInputChange = (e) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };
  const responseEmail = (e) => {
    e.preventDefault();
    let user_signin = [formData];
    console.log(formData)
    //console.log(user_signin);
    axios({
      method: "POST",
      url: "/loginemail",
      data: formData,
    }).then((response) => {
      const data = response.data;
      console.log(data);
      if (data.status === "Invalid Credentials") {
        alert("Email or password doesn't match");
      } else {
        const using = "email";

        setToken(data.token);
        
        setAuthenticated(true);
        setUserInfo(data.userInfo);
        setUsing(using);
      }
    });
  };
  return (
    <div>
      <Head>
        <title>Sign In to Snippet Hive</title>
      </Head>

      <section className="bg-paper flex flex-col md:flex-row h-screen items-center">
        <div className="bg-blue-600 w-full md:w-1/2 xl:w-1/2 h-screen">
          <img
            src="https://images.unsplash.com/photo-1526666923127-b2970f64b422?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80https://images.unsplash.com/photo-1444313431167-e7921088a9d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1441&q=100"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="bg-paper w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
        >
          <div className="w-full h-100">
            <h1 className="text-4xl font-mono text-black"></h1>

            <h1 className="text-xl md:text-4xl font-sans font-bold mt-12">
              Sign in to Snippet Hive
            </h1>

            <form
              className="mt-6"
              action="#"
              method="POST"
              onSubmit={responseEmail}
            >
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="EmailID"
                  placeholder="Enter Email Address"
                  onChange={handleInputChange}
                  value={formData.email}
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-gray-500 focus:bg-white focus:outline-none"
                  autoComplete="true"
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  id="PWD"
                  placeholder="Enter Password"
                  onChange={handleInputChange}
                  value={formData.password}
                  minLength="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-gray-800
                focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-700 hover:text-gray-700 focus:text-gray-700"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full block bg-blue-600 hover:bg-orange-400 focus:bg-orange-400 text-white font-medium rounded-lg
              px-4 py-3 mt-6"
              >
                Sign In
              </button>
            </form>

            <hr className="my-6 border-gray-300 w-full" />

            <p className="mt-8">
              Need an account?{" "}
              <Link href="/signup">
                <a className="text-blue-500 hover:text-blue-700 font-semibold">
                  Sign Up
                </a>
              </Link>
            </p>
            <Link href="/">
              <a className="font-bold">Go back home</a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Login;
