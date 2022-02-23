import React, { useContext, useEffect, useState } from "react";
import axios from "../../src/utils/axios";

import { AuthContext } from "../../src/context/AuthContext";
import { useRouter } from "next/router";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { NavBar } from "../../src/components/NavBar";
import Link from "next/link";

export default function PathDetail({ detail }) {
  console.log(detail);

  return (
    <div>
      <NavBar />
      <div className="p-24 my-10 rounded-2xl bg-gray-100">
        <h3 class="font-black text-gray-800 md:text-3xl text-xl">
          {detail.title}
        </h3>
        <h4 className="text-xl">{detail.language}</h4>
        <Link href="/user/[...slug]" as={`/user/${detail.user_id}`}>
          <a>
            <h4 className="text-xl font-bold">{detail.username}</h4>
          </a>
        </Link>
        <SyntaxHighlighter language={detail.language} style={dracula}>
          {detail.snippet}
        </SyntaxHighlighter>
      </div>
      <div className="text-center">
        <h1 className="font-bold text-2xl">
          Similar Snippets ( Powered by Ai )
        </h1>
        <div class="w-4/6 z-50 relative mx-auto mt-10">
          <div class="bg-white w-full rounded-xl shadow-xl overflow-hidden p-1">
		  <Link href="/snippet/[...slug]" as={`/snippet/${Object.keys(detail.suggestions)[0]}`}>
				<a >
								<div class="w-full flex p-3 pl-4 items-center hover:bg-gray-300 rounded-lg cursor-pointer border-2">
								  <div class="mr-4">
									<div class="h-9 w-9 rounded-sm flex items-center justify-center text-3xl"></div>
								  </div>
								  <div>
									<h1 class="font-bold text-lg">
									  {Object.values(detail.suggestions)[0]}
									</h1>
								  </div>
								</div>
							</a>
			</Link>

			<Link href="/snippet/[...slug]" as={`/snippet/${Object.keys(detail.suggestions)[1]}`}>
				<a>
				  <div class="w-full flex p-3 pl-4 items-center hover:bg-gray-300 rounded-lg cursor-pointer border-2 mt-2">
					<div class="mr-4">
					  <div class="h-9 w-9 rounded-sm flex items-center justify-center text-3xl"></div>
					</div>
					<div>
					  <h1 class="font-bold text-lg">
						{" "}
						{Object.values(detail.suggestions)[1]}
					  </h1>
					</div>
				  </div>
				</a>
			</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const p_id = context.params.slug;
  const URL = `/viewsnippet?snippet_id=${p_id[0]}`;
  console.log(URL);
  console.log(p_id);

  const path = axios.get(URL).then((response) => {
    console.log(response.data);
    return response.data;
  });

  return {
    props: {
      detail: await path,
    },
  };
}
