"use client"

import type { TeamMember } from "@/types/team" 
import { Mail, Phone } from "lucide-react"

interface HierarchyTeamCardProps {
  member: TeamMember & { subordinates?: any[] }
  isTopLevel?: boolean
}

export function HierarchyTeamCard({ member, isTopLevel = false }: HierarchyTeamCardProps) {
  const hasSubordinates = member.subordinates && member.subordinates.length > 0

  return (
    <div className="flex flex-col items-center">
      {/* Member Card */}
      <div className="relative w-80 max-w-full h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group cursor-pointer">
        {/* Background Photo - Full Card */}
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${member.photo}`}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>

        {/* Content Overlay - Positioned at bottom */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          {/* Name & Position */}
          <h4 className="text-2xl sm:text-2xl font-bold mb-2">{member.name}</h4>
          <div className="w-12 h-1 bg-linear-to-r from-blue-400 to-blue-200 rounded-full mb-4"></div>
          <p className="text-sm sm:text-base font-medium text-blue-200 mb-4">{member.position}</p>
          
        </div>
      </div>

      {hasSubordinates && member.subordinates !== undefined && (
        <div className="w-full mt-8">
          <div className="flex flex-wrap justify-center gap-12 w-full">
            {member.subordinates.map((subordinate, index) => (
              <div key={subordinate.id} className="flex flex-col items-center">
                {/* Subordinate Card */}
                <div className="relative w-80 max-w-full h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group cursor-pointer">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${subordinate.photo || "/placeholder.svg"}`}
                    alt={subordinate.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>

                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h4 className="text-2xl sm:text-2xl font-bold mb-2">{subordinate.name}</h4>
                     <div className="w-12 h-1 bg-linear-to-r from-blue-400 to-blue-200 rounded-full mb-4"></div>
                    <p className="text-sm sm:text-base font-medium text-blue-200 mb-4">{subordinate.position}</p>

                   

                  </div>
                </div>

                {/* Render sub-subordinates below each subordinate */}
                {subordinate.subordinates && subordinate.subordinates.length > 0 && (
                  <div className="w-full mt-8">
                    <div className="flex flex-wrap justify-center gap-12 w-full">
                      {subordinate.subordinates.map((subSub: any) => (
                        <div key={subSub.id} className="flex flex-col items-center">
                          <div className="relative w-80 max-w-full h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group cursor-pointer">
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}${subSub.photo || "/placeholder.svg"}`}
                              alt={subSub.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>

                            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                              <h4 className="text-2xl sm:text-2xl font-bold mb-2">{subSub.name}</h4>
                              <div className="w-12 h-1 bg-linear-to-r from-blue-400 to-blue-200 rounded-full mb-4"></div>
                              <p className="text-sm sm:text-base font-medium text-blue-200 mb-4">{subSub.position}</p>

                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
