import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../src/context/AuthContext";
import axios from "../src/utils/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { NavBar } from "../src/components/NavBar";
export default function CreateSnippet() {
    const { authenticated, userInfo, token, using } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!authenticated) router.push("/login");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authenticated]);
    const [formData, setFormData] = useState({
        title: "",
        snippet: "",
        desc: "",
        language: "",
        theme: "",
        token: token,
    });
    const handleInputChange = (e) => {
        console.log(formData)
        const value = e.target.value;

        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };
    const sendtoserver = (e) => {
        e.preventDefault();
    
        axios({
          method: "POST",
          url: "create-snippet",
          data: formData,
          headers: {
            Authorization: token,
          },
        })
          .then((response) => {
            const data = response.data;
            if (data.message==="success") {
                router.push(`/snippet/${data.id}`);
                
            }
            console.log(data);
            
          })
          .catch((error) => {
            console.log(error);
          });
      };
    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />

            <div class="w-full flex justify-center bg-gray-200 h-screen items-center">
                <div class="rounded-xl bg-white w-full md:w-full lg:w-8/12 h-auto">
                    <div class="px-5 py-3 flex items-center justify-between text-blue-400 border-b">
                        <i class="fas fa-times text-xl"></i>


                    </div>
                    <div className="shadow-inner">
                        <input
                            type="text"
                            name="title"
                            onChange={handleInputChange}
                            value={formData.title}
                            placeholder="Enter Path Title"
                            required
                            className="w-full p-8 mt-2 appearance-none bg-black border-none focus:outline-none font-urban text-2xl text-white rounded-xl"
                        />
                    </div>

                    <div class="flex p-4 shadow-xl">





                        <div class="ml-3 flex flex-col w-full">
                            <textarea name="snippet"
                                onChange={handleInputChange}
                                value={formData.snippet} placeholder="Paste your snippet here" class="w-full h-80 text-xl  resize-none outline-none"></textarea>
                            <div>
                                <h4 className="text-2xl text-gray-600 font-urban p-2">Language</h4> <input name="language"
                                onChange={handleInputChange}
                                value={formData.language} className="border-2 border-gray-400 rounded-2xl text-center text-black font-mono text-xl" />
                            </div>
                            <div>
                                <h4 className="text-2xl text-gray-600 font-urban p-2">Theme</h4> <input name="theme"
                                onChange={handleInputChange}
                                value={formData.theme} className="border-2 border-gray-400 rounded-2xl text-center text-black font-mono text-xl" />
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center text-blue-400 justify-between py-6 px-4 border-t">
                        <div class="flex text-2xl pl-12">
                            <div class="flex items-center justify-center p-3 hover:bg-blue-100 rounded-full cursor-pointer">
                                <i class="fas fa-image"></i>
                            </div>
                            <div class="flex items-center justify-center p-3 hover:bg-blue-100 rounded-full cursor-pointer">
                                <i class="fas fa-poll-h"></i>
                            </div>
                            <div class="flex items-center justify-center p-3 hover:bg-blue-100 rounded-full cursor-pointer">
                                <i class="fas fa-smile"></i>
                            </div>
                            <div class="flex items-center justify-center p-3 hover:bg-blue-100 rounded-full cursor-pointer">
                                <i class="fas fa-calendar-alt"></i>
                            </div>
                        </div>

                        <div>
                            < button class="inline px-4 py-3 rounded-full font-bold text-white bg-blue-500 cursor-pointer" onClick={sendtoserver}>Publish</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
