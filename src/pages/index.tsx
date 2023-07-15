import axios from "axios";
import React from "react";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function Home() {
  return (
    <html>
      <body>hello</body>
      <button
        onClick={async () => {
          const { data } = await axios.get("http://localhost:3000/api/hello");
          console.log(data);
        }}
      >
        {" "}
        fetch{" "}
      </button>
    </html>
  );
}
