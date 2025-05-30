/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Input, message } from "antd";
import { Package, User, FileText, Plus, ChevronRight } from "lucide-react";
import styles from "@/app/styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import google from "@/assets/Social media logo.png";
import right from "@/assets/right.png";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useGetSpecefiqUserQuery,
  useUpdateSpecefiqUserMutation,
} from "@/redux/features/auth/authApi";
import {
  Controller,
 
  SubmitHandler,
  useForm,
} from "react-hook-form";
import LoadingPage from "@/app/loading";
import { useRouter } from "next/navigation";
interface FormValue {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
const MyProfilePage = () => {
  const user = useAppSelector(selectCurrentUser);
  const router = useRouter()
  const {
    data: singleUser,
    isLoading,
    error,
  } = useGetSpecefiqUserQuery(user?.userId);
  // console.log(singleUser);
  const [updateUser] = useUpdateSpecefiqUserMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    // console.log(data);
    try {
      // Ensure userId exists
      if (!user?.userId) {
        message.error("User ID is missing");
        return;
      }

      // Prepare modified data for the mutation
      const modifiedData = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      };

      // console.log("Data for update", modifiedData);

      // Call the mutation to update the user
      const res = await updateUser({
        id: user?.userId,
        userInfo: modifiedData,
      });

      // Check if the mutation was successful
      if (res.error) {
        // console.error("Failed to update user:", res.error);
        message.error("Failed to update user");
      } else {
        // console.log("User updated successfully:", res.data);
        message.success(res?.data?.message);
      }
    } catch (error:any) {
      message.error( error);
    }
  };


  // if(!singleUser){
  //        message.error(
  //       "Please Login into your account"
  //     );
  //     router.push("/login")
  // }

  if (isLoading) return <div><LoadingPage/></div>; // Show loading indicator while fetching user data
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 ">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200">
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/boxes"
                className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <Package className="h-5 w-5 mr-3 text-gray-500" />
                <span>Boxes</span>
              </Link>
            </li>
            <li>
              <Link
                href="/my-profile"
                className="flex items-center p-2 bg-[#f08080] text-white rounded-md"
              >
                <User className="h-5 w-5 mr-3" />
                <span>Account Details</span>
              </Link>
            </li>
            <li>
              <Link
                href="/billing"
                className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <FileText className="h-5 w-5 mr-3 text-gray-500" />
                <span>Billing History</span>
              </Link>
            </li>
          </ul>

          <div className="mt-8 border-t border-gray-200 pt-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              SUBSCRIPTION SETTINGS
            </h3>
            <Link href={"/subscription"}>
                <div className="flex items-center justify-between p-2  hover:bg-gray-100   rounded-md">
                <div className="flex flex-col">
                  <span className="text-gray-600 ">
                    {singleUser?.data?.firstName}
                  </span>
                  <span className="text-xs text-gray-600 ">
                    {singleUser?.data?.status}
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-600 " />
              </div>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Account Information Card */}
        <h1 className={`text-2xl font-bold p-4 ${styles.fontInter}`}>
          My Profile
        </h1>
        <div className="border-t border-gray-200 pt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  First Name
                </label>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue={singleUser?.data?.firstName || ""}
                  render={({ field }) => (
                    <Input {...field} className="rounded-lg" />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Last Name
                </label>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue={singleUser?.data?.lastName || ""}
                  render={({ field }) => (
                    <Input {...field} className="rounded-lg" />
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Email Address
                </label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={singleUser?.data?.email}
                  render={({ field }) => (
                    <Input {...field} className="rounded-lg" />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Phone Number
                </label>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue={singleUser?.data?.phone}
                  render={({ field }) => (
                    <Input {...field} className="rounded-lg" />
                  )}
                />
              </div>

      

          <Link href={"/changePass"}>    <div className="mt-10">
                <button className="-translate-y-1/2 mr-3 text-[#ff0000] hover:text-[#ff0000]/90">
                  Change Password
                </button>
              </div></Link>
            </div>

            <div className="mt-6 flex justify-center my-5">
              <button
                type="submit"
                className="text-white bg-[#ff8080] rounded-lg p-2"
              >
                Update
              </button>
            </div>
          </form>
        </div>
        {/* Connect Account Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">Connect Account</h2>
          <p className="text-gray-600 mb-6">
            Log in with ease by connecting to your other accounts.
          </p>
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <button className="w-full h-12 bg-[#F37975] hover:bg-[#f08080]/90 text-white border-none rounded-lg flex items-center justify-center">
              <FontAwesomeIcon
                icon={faFacebook}
                className="rounded-full w-7 h-7 bg-[#ffffff] text-[#0C82EE] mr-3"
              />
              Continue with Facebook
            </button>
            <div className=" h-12 mt-3 bg-white hover:bg-gray-50 border-gray-200 rounded-lg flex items-start space-x-2">
              <Image alt="google" src={right} width={30} height={30} />
              <Image
                className="mr-3"
                alt="google"
                src={google}
                width={30}
                height={30}
              />
              <p> Continue with Google</p>
            </div>
          </div>
        </div>

        {/* Billing Card */}
        {/* <div className={`${styles.fontInter} bg-white rounded-lg shadow-sm p-6 mb-8`}>
          <h2 className="text-xl font-semibold mb-6">Billing</h2>
          <div className="border-t border-gray-200 pt-6 ">
            <div className=" p-4 rounded-lg mb-4 bg-[#FBD5D4] text-[#F37975]">Billing Information</div>

            <div className="flex justify-end">
            <button className={`border border-[#F37975] text-[#f08080] hover:text-[#f08080]/90 hover:border-[#f08080]/90 rounded-full px-4 py-2 ${styles.fontPoppins}`} style={{ textShadow: "2px 2px 4px #00000040" }}>
  Add Payment Method
</button>

            </div>
          </div>
        </div> */}

        {/* Referrals Card */}
        {/* <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Referrals</h2>
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-100 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold mb-2">0</div>
                <div className="text-gray-500">Referral Claimed</div>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold mb-2">$0.00</div>
                <div className="text-gray-500">Referral Credit Earned</div>
              </div>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="text-gray-500 uppercase text-sm font-semibold mb-2">TRACK REWARDS</div>
              <div className="text-gray-600">Refer friends today!</div>
            </div>
          </div>
        </div> */}
      </main>
    </div>
  );
};

export default MyProfilePage;
