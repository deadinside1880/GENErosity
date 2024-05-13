import React from "react";
import AboutBg from "../Assets/AboutBg.jpg";
import AboutBg2 from "../Assets/AboutBg2.jpg";

function About() {
  const { innerHeight, innerWidth } = window;
  return (
    <div>
      <div
        style={{
          height: innerHeight * 0.4,
          overflow: "clip",
          position: "relative",
        }}
      >
        <img
          src={AboutBg2}
          alt="ada"
          style={{
            width: innerWidth,
            opacity: 0.1,
          }}
        ></img>
        <div
          style={{
            position: "absolute",
            top: innerHeight * 0.2 - 40,
            left: innerWidth * 0.5 - 100,
          }}
        >
          <span class="text-4xl font-bold">About GENErosity</span>
        </div>
      </div>
      <div class="px-40 pt-10">
        Some of the greatest advancements in medical history have been the
        result of genomic research. The human genome project which was launched
        in 1990 and completed in 2003 generated the first sequence of the human
        genome. It provided fundamental information about the human blueprint
        which has accelerated the study of the human biology and ameliorated the
        understanding of medicine. The reason that genomic research is very
        important is that many widespread diseases that plague our world are
        genomic in origin. The biggest example of this is cancer. Scientist can
        now identify the gene mutation caused in certain kinds of cancers and
        therefore are able to counter it with much greater efficacy than before.
        For example, patients with metastatic melanoma with a mutation in BRAF
        kinase have been found to respond very well to vemurafenib, a
        BRAF-kinase inhibitor. However, this only works well for patients with
        this specific mutation. This paves the way to more effective treatments
        tailored to the patients needs. <br />
        There are many other benefits to genomic research and much more research
        is left to be done. However, there are a few major problems that limit
        the research that can be done in this space. One of the biggest concerns
        is the issue of privacy. Using genome information, you can identify not
        only the person whose genome it is, but also their family and 1 other
        information. This app aims to alleviate that issue
      </div>
    </div>
  );
}

export default About;
