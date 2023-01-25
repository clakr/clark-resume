import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.contact.deleteMany();
  await prisma.about.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.education.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.experienceDesc.deleteMany();
  await prisma.leadership.deleteMany();
  await prisma.leadershipProject.deleteMany();
  await prisma.miscellaneous.deleteMany();

  await prisma.contact.createMany({
    data: [
      {
        desc: "#54 Bakersfield St., Laguna Bel Air 1, Sta. Rosa, Laguna, 4026, Philippines",
        type: "ADDRESS",
      },
      {
        desc: "clarktolosa@gmail.com",
        type: "EMAIL",
      },
      {
        desc: "(+63)977 4499 113",
        type: "PHONE",
      },
    ],
  });

  await prisma.about.createMany({
    data: [
      {
        desc: "I am a passionate Web Developer.",
      },
      {
        desc: "Currently in love with Frontend Engineering with libraries and modern JavaScript frameworks with the likes of Tailwind CSS, React, and Next. Also interested in managing, interpreting, and visualizing data in the Backend and engineering the connection of both Frontend and Backend.",
      },
      {
        desc: "Capable of Full Stack Web Development. Knowledgeable in modern technologies.",
      },
    ],
  });

  const feu = await prisma.organization.create({
    data: {
      position: "Student",
      name: "FEU - Institute of Technology",
      location: "MNL, PH",
      timeframeFrom: new Date(2018, 7, 1, 0, 0, 0, 0),
    },
  });

  const spcc = await prisma.organization.create({
    data: {
      position: "Student",
      name: "Systems Plus Computer College",
      location: "CAC, PH",
      timeframeFrom: new Date(2006, 5, 1, 0, 0, 0, 0),
      timeframeTo: new Date(2018, 2, 1, 0, 0, 0, 0),
    },
  });

  await prisma.education.createMany({
    data: [
      {
        organizationId: feu.id,
        degree: "B.S. Information Technology - Web and Mobile Application",
        thesis:
          "Fit-E: An LMS for Wellness and Recreation Program with Student Health Tracking and Recommender",
      },
      {
        organizationId: spcc.id,
        awards: "Graduated with High Honors & Best in Programming",
      },
    ],
  });

  const aguora = await prisma.organization.create({
    data: {
      position: "Web Developer Intern",
      name: "Aguora IT Solutions and Technology Inc.",
      location: "WFH",
      timeframeFrom: new Date(2022, 3, 1, 0, 0, 0, 0),
      timeframeTo: new Date(2022, 10, 1, 0, 0, 0, 0),
    },
  });

  const aguoraExp = await prisma.experience.create({
    data: {
      organizationId: aguora.id,
    },
  });

  await prisma.experienceDesc.createMany({
    data: [
      {
        experienceId: aguoraExp.id,
        desc: "Provide support for existing software revisions.",
      },
      {
        experienceId: aguoraExp.id,
        desc: "Build design systems for page, and components reusability.",
      },
      {
        experienceId: aguoraExp.id,
        desc: "Remodeled Santiago City's website for mobile responsive design.",
      },
      {
        experienceId: aguoraExp.id,
        desc: "Translate & Interpret UI mock designs to fully-functional web pages and applications.",
      },
      {
        experienceId: aguoraExp.id,
        desc: "Bootstrap a design system based on UI mock design, resulting in developing application modules with ease.",
      },
      {
        experienceId: aguoraExp.id,
        desc: "Conduct isolated Quality Assurance tests for every assigned task, resulting in filtered tests for the staging process.",
      },
      {
        experienceId: aguoraExp.id,
        desc: "Engineer & Maintain a Project Management System's Frontend & Backend for Marikina Polytechnic College's Smart Campus.",
      },
    ],
  });

  const feuLead = await prisma.leadership.create({
    data: {
      organizationId: feu.id,
    },
  });

  await prisma.leadershipProject.createMany({
    data: [
      {
        leadershipId: feuLead.id,
        course: "Capstone Project",
        name: "Fit-E: An LMS for Wellness and Recreation Program with Student Health Tracking and Recommender",
        purpose:
          "Analyzed project objectives to be feasible given the constrained timeframe. Coordinated with the beneficiary in integrating sensitive information to the system. Engineered Frontend & Backend in parallel to the UI design mockup. Reviewed documentation in alignment with the project desc and objectives",
        otherPositions:
          "Lead Frontend & Backend Developer, UI/UX Designer, and Project Documentation",
      },
      {
        leadershipId: feuLead.id,
        course: "eCommerce with Digital Marketing",
        name: "Pet Adoption Management System with Integration of MERN Stack and REST API",
        otherPositions: "Lead Frontend & Backend Developer and UI/UX Designer",
      },
    ],
  });

  await prisma.miscellaneous.createMany({
    data: [
      {
        name: "HTML",
        type: "TECHNICAL",
      },
      {
        name: "CSS",
        type: "TECHNICAL",
      },
      {
        name: "JavaScript",
        type: "TECHNICAL",
      },
      {
        name: "React",
        type: "TECHNICAL",
      },
      {
        name: "TailwindCSS",
        type: "TECHNICAL",
      },
      {
        name: "TypeScript",
        type: "TECHNICAL",
      },
      {
        name: "NextJS",
        type: "TECHNICAL",
      },
      {
        name: "PHP",
        type: "TECHNICAL",
      },
      {
        name: "Laravel",
        type: "TECHNICAL",
      },
      {
        name: "Bootstrap",
        type: "TECHNICAL",
      },
      {
        name: "jQuery",
        type: "TECHNICAL",
      },
      {
        name: "SQL",
        type: "TECHNICAL",
      },
      {
        name: "REST API",
        type: "TECHNICAL",
      },
      {
        name: "Filipino",
        type: "LANGUAGE",
      },
      {
        name: "English",
        type: "LANGUAGE",
      },
      {
        name: "Modern Technologies",
        type: "INTEREST",
      },
      {
        name: "Web Frameworks",
        type: "INTEREST",
      },
      {
        name: "Basketball",
        type: "INTEREST",
      },
      {
        name: "PC and Console Gaming",
        type: "INTEREST",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
