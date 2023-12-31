import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import { userLoginValidations } from "./validation";
import { HandleLogin, HandleLoginByGoogle, HandleRegister } from "../APIs/Auth/auth";
import { ToastContainer } from "react-toastify";
import TwitterLogin from "react-twitter-login";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userLoginValidations) });

  const onSubmit = async (event) => {
    setLoading(true);
    await HandleLogin(event)
      .then((res) => {
        if (res.status === 200) {
          navigate('/profile');

          localStorage.setItem("loginToken", res.data.loginToken);
          localStorage.setItem(
            "userData",
            JSON.stringify(res.data.userDetails)
          );
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  function ErrorShowing(errorMessage) {
    return (
      <p class="text-[#ff0000]">
        {errorMessage}{" "}
      </p>
    );
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await HandleLoginByGoogle(tokenResponse)
        .then(async (res) => {
          console.log('userData', res)
          const reqData = {
            first_name: res.data.given_name,
            last_name: res.data.family_name,
            profile_pic: res.data.picture,
            email: res.data.email,
            loggedin_by: "google",
          };
          setGoogleLoading(true);
          await HandleRegister(reqData)
            .then((res) => {
              if (res.status === 201) {
                localStorage.setItem("loginToken", res.data.loginToken);
                localStorage.setItem(
                  "userData",
                  JSON.stringify(res?.data?.updatedUser ? res?.data?.updatedUser : res?.data?.user
                  )
                );
                navigate("/profile");
              }
              setGoogleLoading(false);
            })
            .catch(() => {
              setGoogleLoading(false);
            });
        })
        .catch((err) => console.log(err));
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const registration = () => {
    navigate("/");
  }

  const authHandler = async (err, data) => {
    console.log("error", err, "data",data);
    // try {
    //   const { oauth_token, oauth_token_secret } = data;
    //   const data = await axios.get(
    //     'https://api.twitter.com/1.1/account/verify_credentials.json',
    //     {
    //       headers: {
    //         Authorization: `Bearer ${oauth_token}`,
    //         oauth_token,
    //         oauth_token_secret,
    //       },
    //     }
    //   );
    //   const { name, email } = data.data;
    //   setUser({ name, email });
    // } catch (error) {
    //   console.error(error);
    // }
  };
// console.log("twitter user", user)
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors && errors.email
                  ? ErrorShowing(errors?.email?.message)
                  : ""}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password")}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors && errors.password
                  ? ErrorShowing(errors?.password?.message)
                  : ""}
              </div>
            </div>

            <div>
              <button
                onSubmit={handleSubmit}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-10 text-center text-sm text-gray-500">
            <button className="rounded-full py-2 px-4 border-solid border-4 border-light-blue-500" onClick={() => googleLogin()}>
              <img
                className="m-3 inline-block h-4 w-4  rounded-full ring-2 ring-white "
                src="/images/google.svg"
              />Continue with google
            </button>
          </div>

          <div className="mt-10 ml-20 ">
            <TwitterLogin
              authCallback={authHandler}
              consumerKey={'df2jzuvooRdjoh0MqEZNr9yXc'}
              consumerSecret={'XgvsJ2QQNMNid8bMv5dsq54ebESNzyxlwepmEmR0aArlPMJfIn'}
              requestTokenUrl={'http://localhost:4000/api/v1/auth/twitter/reverse'}
            />
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            <button onClick={registration}>Don't have an account? Create Now</button>
          </p>
        </div>
        <ToastContainer />
      </div>

    </>
  )
}
