import React from "react";
import Label from "./label";
import { colors } from "@/data/color";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { extendLinksProps } from "@/types/extendLinks";

const Footer = () => {
  const extendLinks: extendLinksProps[] = [
    {
      label: "github",
      uri: "https://github.com/MrChris-git",
      icon: <Github key="github-icon" color="white" size={"2rem"} />,
    },
    {
      label: "linkedIn",
      uri: "https://www.linkedin.com/in/chan-ho-lam-395805277/",
      icon: <Linkedin key="linkedin-icon" color="white" size={"2rem"} />,
    },
  ];

  return (
    <div id="footer" className={`min-h-32 ${colors.bgDark}`}>
      <div className="flex flex-col justify-center items-center pt-2 !min-w-[80%] ">
        <div className="flex">
          {extendLinks.map(({ label, uri, icon }) => (
            <Link
              id={label}
              key={label}
              href={uri}
              target="_blank"
              className="m-2 flex justify-center items-center p-2 border-4 border-white rounded-xl transform transition-transform duration-300 ease-in-out hover:scale-115"
            >
              {icon}
            </Link>
          ))}
        </div>
        <div id="reference" className="flex flex-col">
          <Label className="text-center opacity-70 !text-white">
            Image reference by
          </Label>
          <Link
            href={"https://www.linkedin.com/"}
            className="opacity-70 !text-white"
          >
            https://www.linkedin.com/
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
