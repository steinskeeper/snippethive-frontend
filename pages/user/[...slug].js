import React, { useContext, useEffect, useState } from "react";
import axios from "../../src/utils/axios";
import Link from "next/link";

import { AuthContext } from "../../src/context/AuthContext";
import { useRouter } from "next/router";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { NavBar } from "../../src/components/NavBar";

export default function UserDetail({ detail }) {
  console.log(detail);
  var snippets = detail.snippets

  return (
   <>
   <NavBar/>
   <div class='items-center justify-center'>
  <h1 className="text-center text-6xl font-extrabold text-blue-500 mt-4">{detail.user.name}</h1>
</div>

   <div className="p-12">
       {snippets.map((snip) => (
                    <Link href="/snippet/[...slug]" as={`/snippet/${snip.id}/${snip.url_slug}`}>
                      <a>
                        <div className="p-4 my-10 rounded-2xl bg-gray-100">
                          <h3 class="font-black text-gray-800 md:text-3xl text-xl">{snip.title}</h3>
                          <h4 className="text-xl">{snip.language}</h4>
                          <SyntaxHighlighter language={snip.language} style={dracula}>
                            {snip.snippet}
                          </SyntaxHighlighter>
                        </div>
                      </a>
                    </Link>
                  ))}
   </div>
   </>
  );
}

export async function getServerSideProps(context) {
  const p_id = context.params.slug;
  const URL = `/user-info?user_id=${p_id[0]}`;
  console.log(URL);
  console.log(p_id);
 
  const path = axios
    .get(URL)
    .then((response) => {
      console.log(response.data);
      return response.data;
    });

  return {
    props: {
      detail: await path,
    },
  };
}
