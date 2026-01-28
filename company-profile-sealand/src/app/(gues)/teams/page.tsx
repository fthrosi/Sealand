"use client";

import { useState,useEffect } from "react";
import { HierarchyTeamCard } from "@/components/teams/hierarchy";
import type { TeamMember,Division } from "@/types/team";
import { motion, easeOut } from "motion/react";
import { useNavbarStore } from "@/store/navbar";
import { getTeamsFormatated } from "@/api/teams";

function buildHierarchy(
  members: TeamMember[],
  parentId: string | null = null
): TeamMember[] {
  return members
    .filter((member) => member.managerId === parentId)
    .map((member) => ({
      ...member,
      subordinates: buildHierarchy(members, member.id),
    })) as any;
}

export default function TeamSection() {
  const [teams, setTeams] = useState<Division[]>([]);
  const fetchTeams = async () => {
    try {
      const response = await getTeamsFormatated();
      setTeams(response.data.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);
  const [selectedDivision, setSelectedDivision] =
    useState<string>("top-management");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentDivision = teams.find(
    (div) => div.id === selectedDivision
  );
  const members = currentDivision?.members || [];
  const hierarchyMembers = buildHierarchy(members);

  const titleVarian = {
    hidden: { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" },
    show: {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 1, ease: easeOut },
    },
  };
  const itemVariant = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  };
  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };
  const cardVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  const navbarHeight = useNavbarStore((state) => state.navbarHeight);
  return (
    <section
      style={{
        paddingTop: `${navbarHeight}px`,
        paddingBottom: `${navbarHeight}px`,
      }}
      id="teams"
    >
      <div className="container-layout flex flex-col items-center justify-center gap-8 2xl:gap-12">
        {/* Header */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          <motion.h2
            variants={titleVarian}
            className="text-primary xl:text-5xl text-2xl md:text-3xl lg:text-4xl font-bold text-center"
          >
            Our Team
          </motion.h2>
          <motion.p
            variants={itemVariant}
            className="xl:w-182.5 max-w-120 sm:w-100 lg:w-140 text-muted text-center text-xs lg:text-base"
          >
            Meet our talented professionals across different divisions who drive
            our company forward.
          </motion.p>
        </motion.div>

        {/* Division Selector */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <motion.label
            variants={itemVariant}
            className="text-lg font-semibold text-foreground"
          >
            Select Division:
          </motion.label>
          <motion.div
            variants={cardVariant}
            className="relative w-full sm:w-64"
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-left font-medium text-gray-900 hover:bg-gray-50 transition flex items-center justify-between"
            >
              <span>{currentDivision?.name || "Choose a division"}</span>
              <svg
                className={`w-5 h-5 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                {teams.map((division) => (
                  <button
                    key={division.id}
                    onClick={() => {
                      setSelectedDivision(division.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition ${
                      selectedDivision === division.id
                        ? "bg-blue-100 text-blue-900 font-semibold"
                        : "text-gray-900"
                    }`}
                  >
                    {division.name}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Division Title */}
        <motion.div
          variants={titleVarian}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-primary">
            {currentDivision?.name} Division
          </h3>
        </motion.div>

        {/* Team Members Hierarchical Tree */}
        <motion.div
          variants={cardVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-12 w-full"
        >
          {hierarchyMembers.map((member: any) => (
            <div key={member.id} className="flex flex-col items-center">
              <HierarchyTeamCard member={member} isTopLevel={true} />
            </div>
          ))}
        </motion.div>

        {/* Empty State */}
        {members.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No members found in this division.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
