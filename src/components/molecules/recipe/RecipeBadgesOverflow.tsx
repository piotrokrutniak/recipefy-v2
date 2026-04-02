"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FaLeaf, FaSeedling } from "react-icons/fa";

export type OverflowBadge = {
  label: string;
  color: "green" | "orange";
  icon?: "leaf" | "seedling";
};

export function RecipeBadgesOverflow({
  badges,
  small,
}: {
  badges: OverflowBadge[];
  small?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  if (badges.length === 0) return null;

  const iconClass = small ? "w-2.5 h-2.5" : "w-3 h-3";
  const textClass = small ? "text-xs" : undefined;

  return (
    <>
      {expanded ? (
        badges.map((badge, i) => (
          <Badge
            key={i}
            variant="outline"
            className={cn(
              "gap-1 font-normal",
              textClass,
              badge.color === "green"
                ? "border-green-500 text-green-700 bg-green-50"
                : "border-orange-500 text-orange-700 bg-orange-50"
            )}
          >
            {badge.icon === "leaf" && <FaLeaf className={cn(iconClass, "text-green-600")} />}
            {badge.icon === "seedling" && <FaSeedling className={cn(iconClass, "text-green-500")} />}
            {badge.label}
          </Badge>
        ))
      ) : null}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setExpanded((v) => !v);
        }}
        className={cn(
          "inline-flex items-center px-2 py-0.5 rounded-full border border-input text-muted-foreground hover:border-foreground hover:text-foreground",
          textClass ?? "text-sm"
        )}
      >
        {expanded ? "−" : `+${badges.length}`}
      </button>
    </>
  );
}
