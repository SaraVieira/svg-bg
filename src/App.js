import "styled-components/macro";
import React, { useState } from "react";
import Code from "./code";
import Logo from "./logo";
import useClipboard from "react-use-clipboard";
import logosvg from "./logosvg";

// eslint-disable-next-line
const symbols = /[\r\n%#()<>?\[\\\]^`{|}]/g;

const addNameSpace = (svg) => {
  if (!svg.includes("http://www.w3.org/2000/svg")) {
    return svg.replace(/<svg/g, `<svg xmlns='http://www.w3.org/2000/svg'`);
  }

  return svg;
};

const encodeSVG = (svg) => {
  if (!svg) return "";
  const replaced = addNameSpace(svg).replace(/'/g, '"');
  const replaced2 = replaced.replace(/>\s{1,}</g, "><").replace(/\s{2,}/g, " ");

  const encoded = replaced2.replace(symbols, encodeURIComponent).trim();

  return `background-image: url('data:image/svg+xml,${encoded}');`;
};

function App() {
  const [svg, setSVG] = useState("");
  const [isCopied, setCopied] = useClipboard(encodeSVG(svg), {
    successDuration: 1000,
  });
  return (
    <>
      <header className="logo-wrapper">
        <button
          name="logo"
          type="button"
          className="logo"
          onClick={() => setSVG(logosvg)}
        >
          <Logo />
        </button>
      </header>
      <main className="app">
        <label className="screenreader" htmlFor="textearea">
          Insert SVG Code
        </label>
        <textarea
          id="textearea"
          defaultValue={svg}
          onChange={(e) => setSVG(e.target.value)}
          placeholder="Paste your SVG here or click on the logo for an example"
        ></textarea>

        <section>
          <Code
            code={encodeSVG(svg) || `/* your css will be here */`}
            onClick={setCopied}
          ></Code>
          <div css={encodeSVG(svg)} className="show"></div>
          <button
            name={`${isCopied ? "Copied" : "Copy"} to Clipboard`}
            className="toast"
            onClick={setCopied}
          >
            {isCopied ? "Copied" : "Copy"} to Clipboard
          </button>
        </section>
      </main>
    </>
  );
}

export default App;
