import React from "react";
import Label from "./label";
import { colors } from "@/data/color";
import Container from "./container";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { extendLinksProps } from "@/types/extendLinks";

const Footer = () => {
  const extendLinks: extendLinksProps[] = [
    {
      label: "github",
      uri: "https://github.com/MrChris-git",
      icon: <Github color="white" size={"2rem"} />,
    },
    {
      label: "linkedIn",
      uri: "https://www.linkedin.com/in/chan-ho-lam-395805277/",
      icon: <Linkedin color="white" size={"2rem"} />,
    },
  ];

  return (
    <div
      id="footer"
      className={`flex justify-center min-h-32 ${colors.bgDark}`}
    >
      <div className="flex justify-center items-center pt-2 !min-w-[80%] ">
        <div className="flex">
          {extendLinks.map(({ label, uri, icon }) => {
            return (
              <Link
                id={label}
                key={label}
                href={uri}
                target="_blank"
                className="m-2 flex justify-center items-center p-2 border-4 border-white rounded-xl transform transition-transform duration-300 ease-in-out hover:scale-115"
              >
                {icon}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
