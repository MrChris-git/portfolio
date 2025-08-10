import Button from "@/components/button";
import Container from "@/components/container";
import H1 from "@/components/h1";
import H3 from "@/components/h3";
import Label from "@/components/label";
import { programLang } from "@/data/programLang";
import {
  Mail,
  SquareArrowOutUpRight,
  SquareArrowRight,
  SquareArrowRightIcon,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
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

  const btnData: linkBtnProps[] = [
    {
      href: "/projects",
      context: (
        <>
          Projects
          <SquareArrowOutUpRight
            className="pl-2 origin-center transform transition-transform duration-300 group-hover:rotate-45 group-hover:-translate-y-1"
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
            className="pl-2 origin-center transform transition-transform duration-300 group-hover:rotate-25 group-hover:-translate-y-0.5 group-hover:translate-x-1"
            size={24}
          />
        </>
      ),
    },
  ];

  return (
    <Container className="m-3 flex justify-center items-center">
      <div className="max-w-6xl w-full">
        <div id="context" className="">
          <div id="words" className="flex flex-col">
            <H3>Hi, I’m Chris,</H3>
            <H1>A passionate software developer.</H1>
            <Label>
              I'm a Hong Kong who loves building application products.
            </Label>
          </div>
          <div className="flex flex-wrap my-4">
            {programLang.map((label) => {
              return (
                <div
                  key={label}
                  className="flex m-2 px-3 py-1 bg-[#FFFFFF] dark:bg-[#121212] border border-gray-700 rounded-full items-center"
                >
                  <Label className="">{label}</Label>
                </div>
              );
            })}
          </div>
          {btnData.map((args) => {
            return <LinkBtn key={args.href} {...args} />;
          })}
        </div>
        <img id="pictrue" className="object-fill" />
      </div>
    </Container>
  );
};

export default Home;
