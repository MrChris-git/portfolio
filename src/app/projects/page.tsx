"use client";

import Button from "@/components/button";
import Card from "@/components/card";
import H1 from "@/components/h1";
import H2 from "@/components/h2";
import Label from "@/components/label";
import { projects } from "@/data/projects";
import React, { useState } from "react";

const Projects = () => {
  const [project, setProject] = useState<number | null>(null);
  const selectedProject = project != null && projects[project];
  const formatLabelUpperCase = (key: string) =>
    key.charAt(0).toUpperCase() + key.slice(1);

  return (
    <div className="flex flex-col justify-center">
      <H1 className="text-center mt-2 font-semibold">Projects</H1>
      <Card className="flex flex-col m-2 my-6 p-6 ">
        <Card className="flex p-2 items-center flex-wrap">
          {projects.map(({ title, programLang, position }, index) => {
            return (
              <button
                className="flex-1 h-full"
                onClick={() => setProject(index)}
                key={`title-${index}`}
              >
                <Card className="m-1 p-2 flex-col min-h-37 transform transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer">
                  <Label className="cursor-pointer">{title}</Label>
                  <div className="my-2 flex items-center gap-2 mb-1 h-5">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    <span className="text-xs text-gray-400 uppercase tracking-wide font-medium leading-none">
                      Framework
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </div>
                  <Label className="opacity-60 cursor-pointer">
                    {programLang.frontend?.join(", ")}
                  </Label>
                  <Label className="cursor-pointer">{`position: ${position.join(
                    ", "
                  )}`}</Label>
                </Card>
              </button>
            );
          })}
        </Card>
        {selectedProject && (
          <Card className="flex flex-col mt-4 p-4">
            <H1>{selectedProject.title}</H1>
            <Label className="mt-2 whitespace-pre-line">
              {selectedProject.description}
            </Label>
            {selectedProject.score && (
              <Label>{`Score: ${selectedProject.score}`}</Label>
            )}
            <Label className="mt-2">{`Position: ${selectedProject.position.join(
              ", "
            )}`}</Label>
            <div className="flex flex-wrap mt-2">
              {Object.entries(selectedProject.programLang).map(
                ([category, tools]) => {
                  if (!tools || tools.length === 0) return null;
                  return tools.map((val) => {
                    return (
                      <div key={category}>
                        <Label>{formatLabelUpperCase(category)}</Label>
                        <Card className="m-1 px-3 py-1 rounded-xl transform transition-transform duration-300 ease-in-out hover:scale-105">
                          <Label>{val}</Label>
                        </Card>
                      </div>
                    );
                  });
                }
              )}
            </div>
            {selectedProject.demoUri && (
              <div className="mt-3 ">
                <Label>Demo Video:</Label>
                <div className="flex justify-center">
                  <div className="w-full max-w-[720px] aspect-video">
                    <video
                      className="h-full w-full rounded-lg object-cover"
                      src={
                        (selectedProject.demoUri &&
                          `/asset/video/${selectedProject.demoUri}`) ||
                        undefined
                      }
                      controls
                      playsInline
                    />
                  </div>
                </div>
              </div>
            )}
          </Card>
        )}
      </Card>
    </div>
  );
};

export default Projects;
