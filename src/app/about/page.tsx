"use client";
import Button from "@/components/button";
import Card from "@/components/card";
import H1 from "@/components/h1";
import H2 from "@/components/h2";
import H3 from "@/components/h3";
import Label from "@/components/label";
import { fetchJson, fetchText } from "@/utils/fetchData";
import { educationProps } from "@/types/education";
import Link from "next/link";
import { useEffect, useState } from "react";

const formatMonthYear = (date: Date) =>
  date.toLocaleString("en-US", { month: "short", year: "numeric" });

const formatDateRange = (start: Date, end: Date) =>
  `${formatMonthYear(start)} – ${formatMonthYear(end)}`;

const About = () => {
  const [aboutMe, setAboutMe] = useState<string | undefined>(undefined);
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
          startDate: new Date(`${item.startDate}-01`),
          endDate: new Date(`${item.endDate}-01`),
        }));
        setEducations(parsed);
      } catch (_error) {
        setEducations([]);
      }
    };

    const loadAboutMe = async () => {
      try {
        const data = await fetchText("/asset/json/introduce.txt");
        console.log(data);
        setAboutMe(data);
      } catch (_error) {
        setAboutMe("Unknown error");
      }
    };

    loadEducations();
    loadAboutMe();
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
