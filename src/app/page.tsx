import Button from "@/components/button";
import Card from "@/components/card";
import Container from "@/components/container";
import H1 from "@/components/h1";
import H3 from "@/components/h3";
import Label from "@/components/label";
import { linearGradient } from "@/constants/css.c";
import { programLang } from "@/data/programLang";
import { Mail, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const Home = () => {
  type linkBtnProps = { href: string; context: ReactNode };

  const LinkBtn: React.FC<linkBtnProps> = ({ href, context }) => {
    return (
      <Button className="group mr-5 mt-2 !rounded-full !bg-black dark:!bg-white hover:opacity-90">
        <Link href={href} className="!text-lime-500 flex">
          {context}
        </Link>
      </Button>
    );
  };

  const iconClass =
    "pl-2 origin-center transform transition-transform duration-300 ";

  const btnData: linkBtnProps[] = [
    {
      href: "/projects",
      context: (
        <>
          Projects
          <SquareArrowOutUpRight
            className={`${iconClass} group-hover:rotate-45 group-hover:-translate-y-1 group-hover:translate-x-0.5`}
            size={24}
          />
        </>
      ),
    },
    {
      href: "/contact",
      context: (
        <>
          Contact
          <Mail
            className={`${iconClass} group-hover:rotate-25 group-hover:-translate-y-0.5 group-hover:translate-x-1`}
            size={24}
          />
        </>
      ),
    },
  ];

  return (
    <div id="context" className="flex md:flex-row flex-col p-2 justify-between">
      <div id="left-box" className="flex-2/3">
        <div
          id="word-box"
          className="flex flex-col md:pt-12 pt-2 justify-center"
        >
          <H3 className="font-semibold">Hi, I’m Chris,</H3>
          <H1 className="font-semibold">A passionate software developer.</H1>
          <Label className="pt-1 font-semibold">
            I&apos;m a Hong Kong who loves building application products.
          </Label>
        </div>
        <div id="skill-box" className="flex flex-wrap my-4">
          {programLang.map((label) => {
            return (
              <Card
                key={label}
                className={`flex m-2 px-3 py-1 transform transition-transform duration-300 ease-in-out hover:scale-105`}
              >
                <Label className="">{label}</Label>
              </Card>
            );
          })}
        </div>
        <div className="my-4">
          {btnData.map((args) => {
            return <LinkBtn key={args.href} {...args} />;
          })}
        </div>
        <div>
          <Label className="font-semibold">
            {
              "Crafted using Next.js and Tailwind CSS, this website ensures a smooth, responsive experience on any screen size."
            }
          </Label>
        </div>
      </div>
      <img
        id="pictrue"
        className="flex-1/3 my-4 object-fill dark:text-white"
        alt="Decorative image"
      />
    </div>
  );
};

export default Home;
