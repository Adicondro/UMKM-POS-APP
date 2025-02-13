import { GetSessionParams, getSession } from "next-auth/react";
import React from "react";
import prisma from "@/libs/prismaClient";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";

const getOutlet = async (userSessionName: string) => {
    // const userSession = await getSession({ req });
    const res = await prisma.outlet.findMany({
        where: {
            user: { username: userSessionName },
        },
        select: {
            id: true,
            name: true,
            contact: true,
            address: true,
            createdAt: true,
            user: true,
        },
    });
    return res;
};

const OutletPage = async (req: NextApiRequest) => {
    const session = await getServerSession(AuthOptions);
    const outlets = await getOutlet(session?.user.username!);
    const userName = outlets.map((input) => input.user.username);
    let i = 0;
    const userSession = JSON.stringify(session).includes(`${userName[i]}`);
    console.log(session?.user.username);

    return (
        <section className="px-12 pt-12 flex flex-col gap-6">
            <div>
                <h1 className="font-bold text-2xl">Kelola Outlet</h1>
                <p className="text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis, numquam!
                </p>
            </div>
            <div className="grid grid-cols-2">
                {userSession ? (
                    <>
                        {outlets.map((input) => (
                            <div key={input.id} className="bg-white p-4 rounded">
                                <h1 className="font-bold">Nama outlet : {input.name}</h1>
                                <p>Pemilik : {input.user.username}</p>
                                <p className="text-xs text-gray-500">{Number(input.createdAt)}</p>
                                <p>alamat :  {input.address}</p>
                                <p>kontak : {input.contact}</p>
                                
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        <h1>tidak ada outlet</h1>
                    </>
                )}
            </div>
            <div></div>
            {/* <div className="mb-6">
                <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
                    <div className="text-sm text-gray-700">
                        Page{" "}
                        <span className="font-medium text-gray-700">
                            1 of 10
                        </span>
                    </div>

                    <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                        <a
                            href="#"
                            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-5 h-5 rtl:-scale-x-100"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                                />
                            </svg>

                            <span>previous</span>
                        </a>

                        <a
                            href="#"
                            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                        >
                            <span>Next</span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-5 h-5 rtl:-scale-x-100"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div> */}
        </section>
    );
};

export default OutletPage;
