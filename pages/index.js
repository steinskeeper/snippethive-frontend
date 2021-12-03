import Head from "next/head";
import { NavBar } from "../src/components/NavBar";
import Link from "next/link";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import axios from "../src/utils/axios";

export default function Home(latestSnippets) {
  let snippets = (latestSnippets.latestSnippets)
  console.log(snippets)


  const [showModal, setShowModal] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [formData, setFormData] = useState({
    byte: "",
  });


  const addNotes = (e) => {
    e.preventDefault();
    setShowModal(false);
    setAlert(true);
    let bytes = [];
    bytes = JSON.parse(localStorage.getItem("bytes")) || [];
    bytes.push(formData.byte);
    localStorage.setItem("bytes", JSON.stringify(bytes));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };
  const codeString = `export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, )
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        markdown: matterResult.content,
        ...matterResult.data
    }
}`
  // Variable that can store code snippet as string

  return (
    <div>
      {showAlert ? (
        <div className="bg-paper text-center py-2 lg:px-4 fixed bottom-5 justify-center align-middle">
          <div
            className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex w-98"
            role="alert"
          >
            <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
              Saved
            </span>
            <span className="font-semibold mr-2 text-left flex-auto">
              Go to Bytes to find saved notes
            </span>
            <Link href="/bytes">
              <a>
                <svg
                  className="fill-current opacity-75 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      ) : null}
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NavBar />

        <div className="bg-paper">
          <div div className="flex">
            <div className="w-2/5 text-black pl-36 py-12 h-auto">
              <nav className="mt-5 px-2">
                <a
                  href="#"
                  className="group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-xl bg-gray-200 text-black w-32"
                >
                  <svg
                    className="mr-4 h-6 w-6 "
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
                    />
                  </svg>
                  Home
                </a>
                <a
                  href="#"
                  className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-semibold hover:text-blue-500"
                >
                  <svg
                    className="mr-4 h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                  </svg>
                  Tags
                </a>

                <a
                  href="#"
                  className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium hover:text-blue-500"
                >
                  <svg
                    className="mr-4 h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                  </svg>
                  Bookmarks
                </a>
                <a
                  href="#"
                  className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium hover:text-blue-500"
                >
                  <svg
                    className="mr-4 h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                  My Snippets
                </a>
                <a
                  href="#"
                  className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium hover:text-blue-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-4 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Profile
                </a>


                {showModal ? (
                  <>
                    <div className="justify-center items-center flex overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-full my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                              Quick Notes
                            </h3>
                            <button
                              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowModal(false)}
                            >
                              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                              </span>
                            </button>
                          </div>
                          {/*body*/}
                          <form action="#" onSubmit={addNotes}>
                            <div className="relative p-6 flex-auto">
                              <textarea
                                onChange={handleInputChange}
                                value={formData.byte}
                                className="bg-sanskrit rounded-xl h-48 w-full focus:outline-none p-4 text-lg"
                              ></textarea>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                              <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                              >
                                Close
                              </button>
                              <button
                                className="bg-orange-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="submit"
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}

                <div className="mt-5">
                  <div className="group inline-block relative">
                    <Link href="/create-snippet">
                      <a>
                        <button className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-full inline-flex items-center w-42 justify-center">
                          Create Snippet
                        </button>
                      </a>
                    </Link>

                  </div>
                </div>
              </nav>

              {/*<div className="flex-shrink-0 flex hover:bg-blue-500 rounded-full p-4 mt-12 mr-2">
                <a href="#" className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src=""
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-base leading-6 font-medium text-white">
                        DP
                      </p>
                      <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                        DP
                      </p>
                    </div>
                  </div>
                </a>
  </div>*/}
            </div>

            <div className="w-3/5 h-auto items-center align-middle justify-center">
              <div className="flex items-center align-middle justify-center">
                <div className="flex-1 m-2 align-middle justify-center">
                  <h2 className="px-4 py-2 text-2xl font-urban tracking-wide font-semibold text-gray-700">
                    Snippets
                  </h2>
                </div>
                <div className="flex-1 px-4 py-2 m-2">
                  <a
                    href="#"
                    className=" text-2xl font-medium rounded-full text-black float-right"
                  >
                    <svg
                      className="m-2 h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <g>
                        <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path>
                      </g>
                    </svg>
                  </a>
                </div>
              </div>


              <hr className="border-gray-200" />
              {snippets.map((snip) => (
                      <Link href="/snippet/[...slug]" as={`/snippet/${snip.id}/${snip.url_slug}`}>
                        <a>
                          <div className="p-4 my-10 rounded-2xl bg-gray-100">
                          <h3 class="font-black text-gray-800 md:text-3xl text-xl">{snip.title}</h3>
                          <h4 className="text-xl">{snip.language}</h4>
                          <SyntaxHighlighter language="python" style={dracula}>
                            {snip.snippet}
                          </SyntaxHighlighter>
                                              </div>
                        </a>
                      </Link>
                    ))} 
              <div className="p-4 my-5">
                <h3 class="font-black text-gray-800 md:text-3xl text-xl">Snippet to create a new function</h3>

                <h4 className="text-xl">Javascript</h4>
                <SyntaxHighlighter language="python" style={dracula}>
                  {codeString}
                </SyntaxHighlighter>
              </div>

            </div>

            <div className="w-2/5 h-12">
              <div className="relative text-black  w-80 p-5 pb-0 mr-16">
                <button type="submit" className="absolute ml-4 mt-3 mr-4">
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 56.966 56.966"
                    width="512px"
                    height="512px"
                  >
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </button>

                <input
                  type="search"
                  name="search"
                  placeholder="Search Snippets"
                  className="bg-gray-100 h-10 px-10 pr-5 w-full text-white text-sm focus:outline-none shadow rounded-xl border-0"
                />
              </div>




            </div>

            <div />
          </div>
        </div>
      </main>
    </div>
  );
}
export async function getServerSideProps() {
  const latestSnippets = axios.get('/all-snippets').then((response) => {
    return response.data.snippets;
  });



  return {
    props: {
      latestSnippets: await latestSnippets,

    },
  };
}
