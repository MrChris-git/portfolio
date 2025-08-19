"use client";

import Card from "@/components/card";
import H1 from "@/components/h1";
import H2 from "@/components/h2";
import Label from "@/components/label";
import { fetchData } from "@/utils/fetchData";
import { Download } from "lucide-react";
import React, { useEffect, useState } from "react";

export type contactInfoProps = {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
};

const Contact = () => {
  const [contactInfo, setContactInfo] = useState<contactInfoProps | null>(null);

  const handleEmailClick = () => {
    if (!contactInfo) return;
    window.location.href = `mailto:${contactInfo.email}`;
  };

  const handlePhoneClick = () => {
    if (!contactInfo) return;
    window.location.href = `tel:${contactInfo.phone}`;
  };

  useEffect(() => {
    const fetchContact = async () => {
      const data = await fetchData([
        "name",
        "title",
        "email",
        "phone",
        "linkedin",
        "github",
      ]);
      setContactInfo(data);
    };

    fetchContact();
  }, []);

  return (
    <div className="flex flex-col justify-center">
      {contactInfo && (
        <>
          <H1 className="text-center mt-2 font-semibold">Contact</H1>
          <Card className="flex flex-col m-2 my-6 p-6">
            <div className="flex flex-col text-center mb-6">
              <H2 className="text-2xl font-bold mb-2">{contactInfo.name}</H2>
              <Label className="text-lg opacity-80">{contactInfo.title}</Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Contact Information */}
              <Card className="flex flex-col p-4 md:p-6">
                <H2 className="text-xl font-semibold mb-4">Get In Touch</H2>
                <div className="space-y-4">
                  <div
                    className="flex items-start gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={handleEmailClick}
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <Label className="text-sm opacity-60">Email</Label>
                      <Label className="font-medium break-all text-sm md:text-base">
                        {contactInfo.email}
                      </Label>
                    </div>
                  </div>

                  <div
                    className="flex items-start gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={handlePhoneClick}
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <Label className="text-sm opacity-60">Phone</Label>
                      <Label className="font-medium break-all text-sm md:text-base">
                        {contactInfo.phone}
                      </Label>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Social Links */}
              <Card className="flex flex-col p-4 md:p-6">
                <H2 className="text-xl font-semibold mb-4">Connect With Me</H2>
                <div className="space-y-4">
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <Label className="text-sm opacity-60">LinkedIn</Label>
                      <Label className="font-medium break-all text-sm md:text-base">
                        {contactInfo.linkedin}
                      </Label>
                    </div>
                  </a>

                  <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <Label className="text-sm opacity-60">GitHub</Label>
                      <Label className="font-medium break-all text-sm md:text-base">
                        {contactInfo.github}
                      </Label>
                    </div>
                  </a>
                </div>
              </Card>
            </div>

            {/* Resume Download Section */}
            <Card className="flex flex-col mt-6 p-4 md:p-6">
              <H2 className="text-xl font-semibold mb-4">Resume</H2>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex md:flex-row flex-col items-center">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4 flex flex-col text-center sm:text-left">
                    <Label className="font-medium">Download Resume</Label>
                    <Label className="text-sm opacity-60">PDF format</Label>
                  </div>
                </div>
                <a
                  href={`asset/pdf/Chan Ho Lam Resume.pdf`}
                  download="Chan_Ho_Lam_Resume.pdf"
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <Download size={20} />
                  </svg>
                  Download
                </a>
              </div>
            </Card>

            {/* Availability Section */}
            <Card className="flex flex-col mt-6 p-4 md:p-6">
              <H2 className="text-xl font-semibold mb-4">Availability</H2>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <Label className="font-medium">
                  Available for new opportunities
                </Label>
              </div>
              <Label className="mt-2 opacity-70">
                {`I'm currently open to full-time positions, freelance work, and
            interesting projects. Feel free to reach out if you'd like to
            discuss potential collaborations!`}
              </Label>
            </Card>
          </Card>
        </>
      )}
    </div>
  );
};

export default Contact;
