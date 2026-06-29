/**
 * Services Component
 * Demonstrates the new design system with Card components and teal accent styling
 * Based on reference design with hexagonal profile mask and service cards
 */

import { FaCode, FaServer, FaPalette } from "react-icons/fa";
import Card from "./Card";
import { Section, SectionLabel, SectionTitle, SectionSubtitle, SectionContent } from "./Section";
import "../styles/Card.css";

export default function Services() {
  const services = [
    {
      id: 1,
      icon: <FaCode strokeWidth={0.5} />,
      title: "Frontend Development",
      description:
        "Crafting pixel-perfect user interfaces with React, responsive design, and modern web standards.",
    },
    {
      id: 2,
      icon: <FaServer strokeWidth={0.5} />,
      title: "Backend Engineering",
      description:
        "Building scalable server-side systems with Node.js, databases, APIs, and clean architecture.",
    },
    {
      id: 3,
      icon: <FaPalette strokeWidth={0.5} />,
      title: "UI/UX for Developers",
      description:
        "Bridging design and functionality: user-centric design principles with developer implementation.",
    },
  ];

  return (
    <Section id="services">
      <SectionLabel>My services</SectionLabel>
      <SectionTitle>What I Do</SectionTitle>
      <SectionSubtitle>
        Comprehensive solutions for building modern, scalable web applications.
      </SectionSubtitle>
      <SectionContent>
        <div className="services-grid">
          {services.map((service) => (
            <Card
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              interactive
            />
          ))}
        </div>
      </SectionContent>
    </Section>
  );
}
