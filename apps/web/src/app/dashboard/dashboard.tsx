"use client";

import { useState } from "react";
import { FileText, Download, Plus, Trash2, User, Briefcase, GraduationCap, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

interface CVData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experiences: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    year: string;
  }>;
  skills: string[];
}

const defaultCV: CVData = {
  personalInfo: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  },
  experiences: [],
  education: [],
  skills: [],
};

export default function Dashboard({
  customerState,
  session,
}: {
  customerState: ReturnType<typeof authClient.customer.state>;
  session: typeof authClient.$Infer.Session;
}) {
  const [cvData, setCvData] = useState<CVData>(defaultCV);
  const [newSkill, setNewSkill] = useState("");

  const hasProSubscription = customerState?.activeSubscriptions?.length! > 0;

  const updatePersonalInfo = (field: keyof CVData["personalInfo"], value: string) => {
    setCvData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const addExperience = () => {
    setCvData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { id: Date.now().toString(), company: "", position: "", startDate: "", endDate: "", description: "" },
      ],
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setCvData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = () => {
    setCvData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Date.now().toString(), school: "", degree: "", year: "" },
      ],
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setCvData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const downloadCV = () => {
    // Create a simple HTML version for printing
    const cvHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${cvData.personalInfo.fullName} - CV</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #333; }
          h1 { margin: 0; font-size: 28px; }
          .title { color: #ea580c; font-size: 18px; margin-top: 4px; }
          .contact { color: #666; font-size: 14px; margin-top: 8px; }
          .section { margin-top: 24px; }
          .section-title { font-size: 12px; text-transform: uppercase; color: #999; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin-bottom: 12px; }
          .summary { font-size: 14px; color: #555; line-height: 1.6; }
          .exp-item { margin-bottom: 16px; }
          .exp-header { display: flex; justify-content: space-between; }
          .exp-position { font-weight: bold; }
          .exp-company { color: #ea580c; font-size: 14px; }
          .exp-date { color: #999; font-size: 12px; }
          .exp-desc { font-size: 14px; color: #555; margin-top: 4px; }
          .skills { display: flex; flex-wrap: wrap; gap: 8px; }
          .skill { background: #f3f4f6; padding: 4px 12px; border-radius: 16px; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>${cvData.personalInfo.fullName}</h1>
        <div class="title">${cvData.personalInfo.title}</div>
        <div class="contact">${cvData.personalInfo.email} • ${cvData.personalInfo.phone} • ${cvData.personalInfo.location}</div>
        
        ${cvData.personalInfo.summary ? `<div class="section"><div class="section-title">Summary</div><p class="summary">${cvData.personalInfo.summary}</p></div>` : ""}
        
        ${cvData.experiences.length > 0 ? `
        <div class="section">
          <div class="section-title">Experience</div>
          ${cvData.experiences.map(exp => `
            <div class="exp-item">
              <div class="exp-header">
                <div>
                  <div class="exp-position">${exp.position}</div>
                  <div class="exp-company">${exp.company}</div>
                </div>
                <div class="exp-date">${exp.startDate} - ${exp.endDate}</div>
              </div>
              <div class="exp-desc">${exp.description}</div>
            </div>
          `).join("")}
        </div>` : ""}
        
        ${cvData.education.length > 0 ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${cvData.education.map(edu => `
            <div class="exp-item">
              <div class="exp-header">
                <div>
                  <div class="exp-position">${edu.degree}</div>
                  <div class="exp-company">${edu.school}</div>
                </div>
                <div class="exp-date">${edu.year}</div>
              </div>
            </div>
          `).join("")}
        </div>` : ""}
        
        ${cvData.skills.length > 0 ? `
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills">${cvData.skills.map(skill => `<span class="skill">${skill}</span>`).join("")}</div>
        </div>` : ""}
      </body>
      </html>
    `;
    
    const blob = new Blob([cvHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cvData.personalInfo.fullName || "my-cv"}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left: Form */}
      <div className="space-y-6">
        {/* Personal Info */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Personal Information</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={cvData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                value={cvData.personalInfo.title}
                onChange={(e) => updatePersonalInfo("title", e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={cvData.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                placeholder="john@email.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={cvData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={cvData.personalInfo.location}
                onChange={(e) => updatePersonalInfo("location", e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <textarea
                id="summary"
                className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={cvData.personalInfo.summary}
                onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                placeholder="Brief summary of your professional background..."
              />
            </div>
          </div>
        </Card>

        {/* Experience */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Experience</h2>
            </div>
            <Button size="sm" variant="outline" onClick={addExperience}>
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
          <div className="space-y-4">
            {cvData.experiences.map((exp) => (
              <div key={exp.id} className="space-y-3 rounded-lg border p-4">
                <div className="flex justify-end">
                  <Button size="sm" variant="ghost" onClick={() => removeExperience(exp.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                  />
                  <Input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                  />
                  <Input
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                  />
                  <Input
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                  />
                </div>
                <textarea
                  className="flex min-h-16 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Description of your role..."
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                />
              </div>
            ))}
            {cvData.experiences.length === 0 && (
              <p className="text-sm text-muted-foreground">No experience added yet.</p>
            )}
          </div>
        </Card>

        {/* Education */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Education</h2>
            </div>
            <Button size="sm" variant="outline" onClick={addEducation}>
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
          <div className="space-y-4">
            {cvData.education.map((edu) => (
              <div key={edu.id} className="flex items-start gap-3 rounded-lg border p-4">
                <div className="grid flex-1 gap-3 sm:grid-cols-3">
                  <Input
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                  />
                  <Input
                    placeholder="School"
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                  />
                  <Input
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                  />
                </div>
                <Button size="sm" variant="ghost" onClick={() => removeEducation(edu.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            {cvData.education.length === 0 && (
              <p className="text-sm text-muted-foreground">No education added yet.</p>
            )}
          </div>
        </Card>

        {/* Skills */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Skills</h2>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add a skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill()}
            />
            <Button onClick={addSkill}>Add</Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {cvData.skills.map((skill, index) => (
              <span
                key={index}
                className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
              >
                {skill}
                <button onClick={() => removeSkill(index)} className="ml-1 text-muted-foreground hover:text-foreground">
                  ×
                </button>
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* Right: Preview */}
      <div className="lg:sticky lg:top-20 lg:self-start">
        <Card className="overflow-hidden bg-white shadow-xl">
          <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <FileText className="h-4 w-4" />
              CV Preview
            </div>
            <Button size="sm" onClick={downloadCV} disabled={!hasProSubscription}>
              <Download className="mr-1 h-4 w-4" />
              {hasProSubscription ? "Download" : "Upgrade to Download"}
            </Button>
          </div>
          <div className="p-6 text-gray-900">
            {/* CV Preview Content */}
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {cvData.personalInfo.fullName || "Your Name"}
                </h3>
                <p className="text-orange-600">
                  {cvData.personalInfo.title || "Professional Title"}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  {cvData.personalInfo.email} {cvData.personalInfo.email && cvData.personalInfo.phone && "•"} {cvData.personalInfo.phone} {(cvData.personalInfo.email || cvData.personalInfo.phone) && cvData.personalInfo.location && "•"} {cvData.personalInfo.location}
                </div>
              </div>

              {cvData.personalInfo.summary && (
                <div>
                  <h4 className="text-xs font-semibold uppercase text-gray-400">Summary</h4>
                  <p className="mt-1 text-xs text-gray-600">{cvData.personalInfo.summary}</p>
                </div>
              )}

              {cvData.experiences.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase text-gray-400">Experience</h4>
                  {cvData.experiences.map((exp) => (
                    <div key={exp.id} className="mb-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-semibold">{exp.position}</p>
                          <p className="text-xs text-orange-600">{exp.company}</p>
                        </div>
                        <span className="text-xs text-gray-400">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {cvData.education.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase text-gray-400">Education</h4>
                  {cvData.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between">
                      <div>
                        <p className="text-sm font-semibold">{edu.degree}</p>
                        <p className="text-xs text-gray-500">{edu.school}</p>
                      </div>
                      <span className="text-xs text-gray-400">{edu.year}</span>
                    </div>
                  ))}
                </div>
              )}

              {cvData.skills.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase text-gray-400">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {cvData.skills.map((skill, i) => (
                      <span key={i} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {!hasProSubscription && (
          <Card className="mt-4 border-primary p-4">
            <p className="mb-3 text-sm text-muted-foreground">
              Upgrade to Pro to download your CV
            </p>
            <Button onClick={async () => await authClient.checkout({ slug: "pro" })} className="w-full">
              Upgrade to Pro - $5
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
