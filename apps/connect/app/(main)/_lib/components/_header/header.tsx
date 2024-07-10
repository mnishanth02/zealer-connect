import { cache, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@ui/components/common/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/ui/avatar";
import { buttonVariants } from "@ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { cn } from "@ui/lib/utils";
import { UserId } from "lucia";
import { Loader2Icon, LogOut } from "lucide-react";

import { getCurrentUser } from "@/lib/helper/session";

import { getUserProfileService } from "@/services/auth-service";
import HeaderLayout from "./header-layout";
import { MenuButton } from "./menu-button";

const profileLoader = cache(getUserProfileService);

export function Header() {
  return (
    <HeaderLayout>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <Image src="/logo.png" alt="logo" width={40} height={0} />
        </div>
        <div className="flex items-center justify-between gap-5">
          <Suspense fallback={<LoadingSpinner />}>
            <ThemeToggle />
            <HeaderActions />
          </Suspense>
        </div>
      </div>
    </HeaderLayout>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex w-40 items-center justify-center">
      <Loader2Icon className="h-4 w-4 animate-spin" />
    </div>
  );
}

async function HeaderActions() {
  const user = await getCurrentUser();
  const isSignedIn = !!user;

  if (isSignedIn && user) {
    return <SignedInActions userId={user.id} />;
  } else {
    return <SignedOutActions />;
  }
}

function SignedInActions({ userId }: { userId: UserId }) {
  return (
    <div className="flex items-center gap-4">
      <Suspense fallback={<AvatarPlaceholder />}>
        <ProfileDropdown userId={userId} />
      </Suspense>
      <div className="md:hidden">
        <MenuButton />
      </div>
    </div>
  );
}

function SignedOutActions() {
  return (
    <Link href="/sign-in" className={cn(buttonVariants())}>
      Sign In
    </Link>
  );
}

async function ProfileAvatar({ userId }: { userId: UserId }) {
  const profile = await profileLoader(userId);

  return (
    <Avatar className="flex items-center justify-center">
      <AvatarImage src="/logo.png" alt="User avatar" />
      <AvatarFallback>{profile?.displayName?.substring(0, 2).toUpperCase() ?? "U"}</AvatarFallback>
    </Avatar>
  );
}

async function ProfileDropdown({ userId }: { userId: UserId }) {
  const profile = await profileLoader(userId);

  if (!profile) {
    return <AvatarPlaceholder />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileAvatar userId={userId} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2">
        <DropdownMenuLabel>{profile.displayName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link className="flex cursor-pointer items-center" href="/api/sign-out">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AvatarPlaceholder() {
  return <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-800">..</div>;
}
