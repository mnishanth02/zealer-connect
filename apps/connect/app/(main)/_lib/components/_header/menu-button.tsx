"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { Book, Menu, Search, Users } from "lucide-react";

export function MenuButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2">
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex cursor-pointer items-center gap-2">
            <Users className="mr-2" />
            Your Groups
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/browse" className="flex cursor-pointer items-center gap-2">
            <Search className="mr-2" />
            Browse Groups
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/docs" className="flex cursor-pointer items-center gap-2">
            <Book className="mr-2" />
            API Docs
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
