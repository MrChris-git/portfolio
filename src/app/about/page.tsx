"use client";
import Button from "@/components/button";
import Card from "@/components/card";
import H1 from "@/components/h1";
import H2 from "@/components/h2";
import H3 from "@/components/h3";
import Label from "@/components/label";
import { fetchJson } from "@/utils/fetchData";
import { educationProps } from "@/types/education";
import Link from "next/link";
import { useEffect, useState } from "react";

const formatMonthYear = (date: Date) =>
  date.toLocaleString("en-US", { month: "short", year: "numeric" });

const formatDateRange = (start: Date, end: Date) =>
  `${formatMonthYear(start)} – ${formatMonthYear(end)}`;

const About = () => {
  const aboutMe =
    "Hi, I’m Chan Ho Lam, Chris — a recent graduate with a BSc (Hons) in Information Technology from the University of the West of England and a Higher Diploma in Software Engineering from the Hong Kong Institute of Vocational Education. I’m passionate about creating smart, user-friendly digital solutions. My experience includes building mobile apps, web applications, and management systems using technologies like JavaScript, TypeScript, React, React Native, Angular, Java, Python, PHP, and SQL. Some of my projects include a Fitness Community App, an EV Charger Management System, an AI Trip Planner, and an Equipment Management System. I love learning new technologies and solving real-world problems through code. My goal is to grow as a software developer while contributing to innovative projects that make an impact. When I’m not coding, you’ll find me following tech trends or experimenting with new tools.";
  const [educations, setEducations] = useState<educationProps[] | null>(null);

  useEffect(() => {
    type EducationJson = Omit<educationProps, "startDate" | "endDate"> & {
      startDate: string;
      endDate: string;
    };

    const loadEducations = async () => {
      try {
        const data = await fetchJson<EducationJson[]>(
          "/asset/json/educations.json"
        );
        const parsed: educationProps[] = data.map((item) => ({
          ...item,
          startDate: new Date(`${item.startDate}`),
          endDate: new Date(`${item.endDate}`),
        }));
        setEducations(
          parsed.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
        );
      } catch (_error) {
        setEducations([]);
      }
    };

    loadEducations();
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <H1 className="text-center py-6 font-semibold">Hello World!</H1>
      <Label className="px-4">{aboutMe}</Label>
      <Card className=" sm:p-8 flex-col my-6">
        <H2 className="text-center mb-2 font-semibold">Education</H2>
        {educations &&
          educations
            .slice()
            .reverse()
            .map(({ iconUri, school, degree, certUri, startDate, endDate }) => {
              return (
                <Card
                  className="m-2 sm:p-8 items-start md:flex-row flex-col"
                  key={`${school}-${startDate.toString()}`}
                >
                  {iconUri ? (
                    <img
                      className="mr-4 object-contain"
                      src={iconUri}
                      width={48}
                      alt={`${school} logo`}
                    />
                  ) : null}
                  <div className="flex w-full justify-between">
                    <div>
                      <H3 id="school">{school}</H3>
                      <br />
                      <Label id="degree" className="opacity-70">
                        {degree}
                      </Label>
                      <br />
                      <Label id="date">
                        {formatDateRange(startDate, endDate)}
                      </Label>
                    </div>
                    {certUri && (
                      <div>
                        <Link href={`/asset/pdf/${certUri}`} target="_blank">
                          <Button>Certification</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
      </Card>
    </div>
  );
};

export default About;
